import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const distDir = resolve(projectRoot, "dist");

if (!existsSync(distDir)) {
  throw new Error("dist/ not found. Run `npm run build` first.");
}

const pluginSlug = "open-dialogue-lab";
const outputDir = resolve(projectRoot, "wordpress-build");
const pluginDir = resolve(outputDir, pluginSlug);
const appDir = resolve(pluginDir, "app");
const zipPath = resolve(projectRoot, `${pluginSlug}-wordpress.zip`);

rmSync(outputDir, { recursive: true, force: true });
rmSync(zipPath, { force: true });
mkdirSync(appDir, { recursive: true });

cpSync(distDir, appDir, { recursive: true });

const assetsDir = resolve(appDir, "assets");
if (!existsSync(assetsDir)) {
  throw new Error("dist/assets not found.");
}

const files = readdirSync(assetsDir);
const cssFile = files.find((file) => file.startsWith("index-") && file.endsWith(".css"));
const jsFile = files.find((file) => file.startsWith("index-") && file.endsWith(".js"));

if (!jsFile) {
  throw new Error("Could not find built JS bundle in dist/assets.");
}

const version = JSON.parse(readFileSync(resolve(projectRoot, "package.json"), "utf8")).version ?? "1.0.0";

const pluginPhp = `<?php
/**
 * Plugin Name: Open Dialogue Lab
 * Description: Embed the Open Dialogue Lab web app with shortcode [open_dialogue_lab].
 * Version: ${version}
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Open Dialogue Lab
 */

if (!defined('ABSPATH')) {
    exit;
}

function odl_page_has_shortcode() {
    if (!is_singular()) {
        return false;
    }

    $post = get_queried_object();

    return $post instanceof WP_Post && has_shortcode($post->post_content, 'open_dialogue_lab');
}

function odl_body_class($classes) {
    if (odl_page_has_shortcode()) {
        $classes[] = 'odl-shortcode-page';
    }

    return $classes;
}

add_filter('body_class', 'odl_body_class');

function odl_get_deepseek_api_key() {
    return defined('OPEN_DIALOGUE_LAB_DEEPSEEK_API_KEY') ? trim((string) OPEN_DIALOGUE_LAB_DEEPSEEK_API_KEY) : '';
}

function odl_has_server_deepseek_proxy() {
    return odl_get_deepseek_api_key() !== '';
}

function odl_output_header_logo_hiding() {
    if (!odl_page_has_shortcode()) {
        return;
    }
    ?>
    <style id="odl-hide-theme-logo">
        body.odl-shortcode-page header .wp-block-site-logo,
        body.odl-shortcode-page header .wp-block-site-logo img,
        body.odl-shortcode-page header .wp-block-site-logo a,
        body.odl-shortcode-page header .custom-logo-link,
        body.odl-shortcode-page header img.custom-logo,
        body.odl-shortcode-page header .custom-logo,
        body.odl-shortcode-page header .site-logo,
        body.odl-shortcode-page header .site-branding img,
        body.odl-shortcode-page header .site-branding svg,
        body.odl-shortcode-page .wp-site-blocks > header .wp-block-site-logo,
        body.odl-shortcode-page .wp-site-blocks > header .custom-logo-link,
        body.odl-shortcode-page .wp-site-blocks > header img.custom-logo {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }

        body.odl-shortcode-page header .site-branding,
        body.odl-shortcode-page .wp-site-blocks > header .wp-block-group,
        body.odl-shortcode-page .wp-site-blocks > header .wp-block-group__inner-container {
            gap: 0 !important;
        }
    </style>
    <?php
}

add_action('wp_head', 'odl_output_header_logo_hiding', 99);

function odl_enqueue_assets() {
    $base = plugin_dir_url(__FILE__) . 'app/assets/';
    ${cssFile ? `wp_enqueue_style('odl-app-style', $base . '${cssFile}', array(), '${version}');` : ""}
    wp_enqueue_script('odl-app-script', $base . '${jsFile}', array(), '${version}', true);

    $runtime_config = array(
        'deepseekProxyUrl' => rest_url('open-dialogue-lab/v1/deepseek'),
        'deepseekProxyEnabled' => odl_has_server_deepseek_proxy(),
    );

    wp_add_inline_script('odl-app-script', 'window.openDialogueLabConfig = ' . wp_json_encode($runtime_config) . ';', 'before');

    if (odl_page_has_shortcode()) {
        $inline_css = <<<'CSS'
body.odl-shortcode-page .wp-block-site-logo,
body.odl-shortcode-page .wp-block-site-logo img,
body.odl-shortcode-page .wp-block-site-logo a,
body.odl-shortcode-page .custom-logo-link,
body.odl-shortcode-page .custom-logo,
body.odl-shortcode-page .site-logo,
body.odl-shortcode-page .site-branding .custom-logo-link,
body.odl-shortcode-page .site-branding img.custom-logo,
body.odl-shortcode-page header .site-branding img,
body.odl-shortcode-page header .site-branding svg {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
}
CSS;

        ${cssFile ? `wp_add_inline_style('odl-app-style', $inline_css);` : `wp_register_style('odl-inline-style', false, array(), '${version}'); wp_enqueue_style('odl-inline-style'); wp_add_inline_style('odl-inline-style', $inline_css);`}
    }
}

function odl_register_rest_routes() {
    register_rest_route(
        'open-dialogue-lab/v1',
        '/deepseek',
        array(
            'methods' => WP_REST_Server::CREATABLE,
            'permission_callback' => '__return_true',
            'callback' => 'odl_proxy_deepseek_request',
        )
    );
}

add_action('rest_api_init', 'odl_register_rest_routes');

function odl_proxy_deepseek_request(WP_REST_Request $request) {
    $api_key = odl_get_deepseek_api_key();

    if ($api_key === '') {
        return new WP_Error(
            'odl_missing_deepseek_key',
            'DeepSeek API key is not configured on the server.',
            array('status' => 503)
        );
    }

    $params = $request->get_json_params();
    $messages = isset($params['messages']) && is_array($params['messages']) ? $params['messages'] : array();
    $model = isset($params['model']) ? sanitize_text_field((string) $params['model']) : 'deepseek-chat';
    $temperature = isset($params['temperature']) ? (float) $params['temperature'] : 0.72;
    $max_tokens = isset($params['max_tokens']) ? (int) $params['max_tokens'] : 1800;
    $response_format = isset($params['response_format']) && is_array($params['response_format']) ? $params['response_format'] : array('type' => 'json_object');

    if (empty($messages)) {
        return new WP_Error(
            'odl_missing_messages',
            'DeepSeek request payload is missing messages.',
            array('status' => 400)
        );
    }

    $payload = array(
        'model' => $model,
        'messages' => $messages,
        'temperature' => $temperature,
        'max_tokens' => $max_tokens,
        'response_format' => $response_format,
        'stream' => false,
    );

    $response = wp_remote_post(
        'https://api.deepseek.com/chat/completions',
        array(
            'timeout' => 90,
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $api_key,
            ),
            'body' => wp_json_encode($payload),
        )
    );

    if (is_wp_error($response)) {
        return new WP_Error(
            'odl_deepseek_request_failed',
            $response->get_error_message(),
            array('status' => 502)
        );
    }

    $status = (int) wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    $decoded = json_decode($body, true);

    if ($status >= 400) {
        $message = '';

        if (is_array($decoded) && isset($decoded['error']) && is_array($decoded['error']) && isset($decoded['error']['message'])) {
            $message = (string) $decoded['error']['message'];
        }

        if ($message === '') {
            $message = 'DeepSeek API request failed.';
        }

        return new WP_Error(
            'odl_deepseek_api_error',
            $message,
            array(
                'status' => $status ?: 502,
                'details' => $decoded,
            )
        );
    }

    return rest_ensure_response(is_array($decoded) ? $decoded : array());
}

function odl_remove_theme_logo_dom() {
    if (!odl_page_has_shortcode()) {
        return;
    }
    ?>
    <script id="odl-remove-theme-logo">
        document.addEventListener('DOMContentLoaded', function () {
            var selectors = [
                'header .wp-block-site-logo',
                'header .custom-logo-link',
                'header img.custom-logo',
                'header .custom-logo',
                'header .site-logo',
                'header .site-branding img',
                'header .site-branding svg'
            ];

            document.querySelectorAll(selectors.join(',')).forEach(function (node) {
                node.remove();
            });

            document.querySelectorAll('header .site-branding, header .wp-block-group, header .wp-block-group__inner-container').forEach(function (node) {
                node.style.gap = '0';
            });
        });
    </script>
    <?php
}

add_action('wp_footer', 'odl_remove_theme_logo_dom', 99);

function odl_render_app() {
    odl_enqueue_assets();
    return '<div id="open-dialogue-lab-root"></div>';
}

add_shortcode('open_dialogue_lab', 'odl_render_app');
`;

writeFileSync(resolve(pluginDir, `${pluginSlug}.php`), pluginPhp, "utf8");

const readmeTxt = `=== Open Dialogue Lab ===
Contributors: open-dialogue-lab
Tags: education, communication, game
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: ${version}
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A communication training mini-game. Use shortcode [open_dialogue_lab].
`;

writeFileSync(resolve(pluginDir, "readme.txt"), readmeTxt, "utf8");

execSync(`cd "${outputDir}" && zip -rq "${zipPath}" "${pluginSlug}"`);

console.log(`WordPress plugin package created: ${zipPath}`);
