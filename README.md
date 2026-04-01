# Open Dialogue Lab

A React + Vite communication training web app.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Safe public deployment

For a public site with AI enabled, deploy through Vercel and keep the DeepSeek key on the server.

Why not GitHub Pages for the AI version:

- GitHub Pages is static only and cannot safely hide `DEEPSEEK_API_KEY`
- exposing a `VITE_...` key in frontend code would let anyone use your paid API
- this repo now includes a serverless proxy at `api/deepseek.ts` for Vercel

### 1. Push the repo to GitHub

This repo already has a GitHub remote:

- `https://github.com/mrwaiwai/open-dialogue-lab-cdb0ad0d.git`

### 2. Deploy on Vercel

The project is already linked to Vercel locally via `.vercel/project.json`.

Set this environment variable in Vercel:

- `DEEPSEEK_API_KEY`

Then deploy from the connected GitHub repo. The frontend will call `/api/deepseek`, so the secret stays on the server.

### 3. Expected public URL

After Vercel finishes deployment, you will get a public URL like:

- `https://open-dialogue-lab-cdb0ad0d.vercel.app`

You can later attach a custom domain if needed.

## Vercel CLI deploy (optional)

```bash
vercel deploy -y
```

For production deploy:

```bash
vercel deploy --prod -y
```

## GitHub Pages

There is still a GitHub Pages workflow in `.github/workflows/deploy.yml`, but it is manual-only now.
Use it only for a static fallback build without AI secret handling.

## WordPress one-click upload package

Build and create uploadable plugin zip:

```bash
npm run build:release
```

Output file:

- `open-dialogue-lab-wordpress.zip`

### WordPress usage

1. Go to `Plugins` -> `Add New Plugin` -> `Upload Plugin`.
2. Upload `open-dialogue-lab-wordpress.zip` and activate it.
3. Add shortcode `[open_dialogue_lab]` in any page/post.

## Notes

- The app uses hash routing for easier static hosting and WordPress embedding.
- Public AI deployment should use the Vercel proxy instead of a client-side `VITE_DEEPSEEK_API_KEY`.
- Template-specific dependencies and branding references have been removed.
