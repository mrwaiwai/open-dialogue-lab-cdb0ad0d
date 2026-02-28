import type { Scenario } from '@/types/game';

const coachScenarios: Scenario[] = [
  {
    id: 41, role: 'coach', category: '參與意願', title: '熱身活動拒絕參與',
    description: '訓練班開始，十二個小朋友圍成一個圈做熱身操，音樂播緊節奏輕快嘅兒歌。但你留意到嘉嘉企喺圈外大約兩米嘅位置，低頭望住地下嘅白線，雙手緊握住自己件外套嘅衫角，膊頭微微縮埋。佢嘅嘴唇輕輕郁緊，似乎喺度同自己講嘢。你行近少少，聽到佢細聲講「我唔識做……」',
    context: '室內體育館，燈光明亮，其他小朋友笑住跟住音樂郁。嘉嘉係第三堂嚟，前兩堂都有類似退縮行為，但今日特別嚴重——佢媽媽啱啱喺門口同你講咗嘉嘉噚晚發惡夢',
    options: [
      { id: 'A', text: '「唔想玩就返屋企啦！全部人都等緊你一個，你知唔知幾阻住？」', type: 'closed', score: 0, childReaction: '眼淚即刻湧出，轉身跑向門口想搵媽媽，途中撞跌咗一個錐筒', childReactionEmoji: '😢', explanation: '威脅式回應直接破壞安全感，令焦慮兒童確認「呢度唔安全」嘅信念', explanationPoints: ['威脅離開觸發分離焦慮，令恐懼倍增', '公開指責造成羞恥感，日後更難參與', '將責任推畀小朋友，忽視佢嘅內在掙扎', '破壞教練作為安全基地嘅角色'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「嘉嘉你可以企喺度睇住先，想加入隨時入嚟。」', type: 'judgmental', score: 3, childReaction: '繼續企喺一邊，身體稍微放鬆咗少少，但眼神仍然迴避', childReactionEmoji: '😐', explanation: '容許觀察係尊重節奏嘅第一步，但未主動探問退縮背後嘅原因', explanationPoints: ['提供選擇權係正面嘅，但過於被動', '未探問「唔想參與」背後嘅情緒或恐懼', '小朋友可能將「睇住先」理解為被排斥', '錯失建立連結嘅機會'], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「快啲入嚟啦嘉嘉！好好玩㗎！大家一齊跳，你一定鍾意！」', type: 'semi-open', score: 4, childReaction: '遲疑行入咗少少，但身體僵硬，雙手仍然握緊，眼神飄忽', childReactionEmoji: '😰', explanation: '熱情催促雖然出於好意，但未理解恐懼嘅根源，可能令焦慮兒童感到更大壓力', explanationPoints: ['過度樂觀嘅語氣否定咗小朋友真實嘅恐懼', '催促參與可能觸發「戰或逃」反應', '雖然有邀請，但未提供漸進式參與嘅選項', '對焦慮兒童嚟講，「好好玩」嘅保證無法取代安全感'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '（慢慢行到嘉嘉旁邊，蹲低到佢嘅高度）「嘉嘉，我見到你企咗喺度好耐。你而家嘅身體感覺係點？」', type: 'open', score: 10, childReaction: '抬頭望住教練，眼眶紅紅，細聲講「我個肚好緊……我驚做錯」', childReactionEmoji: '😌', explanation: '蹲低至同一高度傳遞平等同尊重，問身體感覺幫助小朋友辨識情緒，建立內在覺察能力', explanationPoints: ['蹲低係非語言嘅安全訊號，傳遞「我喺度陪你」', '問身體感覺而非「點解唔玩」，避免令小朋友覺得被質問', '引導身體覺察（Body Awareness）係情緒教育嘅基礎', '接納當下狀態，讓小朋友用自己嘅節奏參與'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 42, role: 'coach', category: '挫折處理', title: '比賽輸咗情緒失控',
    description: '接力賽剛結束，俊仔所屬嘅藍隊以半步之差輸咗。俊仔係最後一棒，佢突然大力踢開地上嘅橙色錐筒，錐筒飛咗出去撞到牆壁彈返嚟。然後佢坐喺地下，雙手抱住頭，肩膀不停震動，細聲講「都係我……都係我令大家輸……」旁邊嘅隊友想拍佢膊頭，佢大力撥開。',
    context: '戶外運動場，下午三點半陽光猛烈。紅隊正在慶祝，藍隊其他成員企咗喺一邊靜靜望住俊仔。俊仔嘅爸爸喺觀眾席望住，面色凝重',
    options: [
      { id: 'A', text: '「輸咗就發脾氣踢嘢？你咁樣好無品！全部人都睇住你！」', type: 'closed', score: 0, childReaction: '更加激動，開始用拳頭捶地，大喊「我最差！我乜都做唔好！」', childReactionEmoji: '😡', explanation: '公開責備將挫敗感加上羞恥感，令情緒完全崩潰', explanationPoints: ['「無品」嘅標籤攻擊人格而非行為', '公開指責令羞恥感倍增，尤其爸爸在場', '未區分情緒（失望）同行為（踢嘢），全盤否定', '強化「輸＝差」嘅認知模式'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「冷靜下先，做三個深呼吸，吸——呼——」', type: 'judgmental', score: 4, childReaction: '嘗試深呼吸但身體仍然繃緊，吸咗兩啖又開始喊', childReactionEmoji: '😣', explanation: '呼吸技巧本身有效，但喺情緒高峰期未被「接住」之前難以執行', explanationPoints: ['調節技巧需要喺情緒被承認之後先有效', '跳過情緒直接教技巧，小朋友會覺得「你唔明白我」', '冷靜指令暗示「你嘅情緒係唔啱嘅」', '時機正確嘅話深呼吸係有效工具，但而家太早'], color: 'yellow', responsePattern: '判斷式' },
      { id: 'C', text: '「無事㗎俊仔，係遊戲啫，唔緊要嘅！下次一定贏！」', type: 'semi-open', score: 3, childReaction: '停咗喊但望住教練，眼神充滿委屈，細聲講「你唔明……」', childReactionEmoji: '😔', explanation: '輕描淡寫否定真實感受，「唔緊要」呢三個字令小朋友覺得自己嘅痛苦不被理解', explanationPoints: ['「唔緊要」否定咗對佢嚟講極重要嘅感受', '過早保證「下次贏」跳過咗當下嘅處理', '令小朋友學到「唔開心唔應該表達」', '錯失教導健康面對失敗嘅機會'], color: 'orange', responsePattern: '半開放式' },
      { id: 'D', text: '（坐喺俊仔旁邊地上，保持少少距離）「俊仔，我見到你輸咗之後好激動。你而家心入面最大嘅感覺係咩？」', type: 'open', score: 10, childReaction: '慢慢抬起頭，眼紅紅，喊住講「我覺得都係我害大家輸……我跑得唔夠快」', childReactionEmoji: '😭', explanation: '坐喺旁邊而非企喺上面，傳遞陪伴而非權威。問「最大嘅感覺」幫助辨識核心情緒', explanationPoints: ['物理位置（坐低）傳遞「我同你一齊」嘅訊息', '承認情緒真實性係共同調節（Co-regulation）嘅第一步', '問「最大嘅感覺」引導情緒辨識而非壓抑', '保持少少距離尊重身體界限，唔急於觸碰'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 43, role: 'coach', category: '合作意願', title: '拒絕傳波給隊友',
    description: '小組傳波遊戲已經進行咗三分鐘，但浩然一直緊緊抱住個籃球唔肯傳出去。其他四個隊友伸晒手等緊，開始發出唔耐煩嘅聲音。你留意到浩然嘅手指用力到指節發白，下巴微微震緊。隊友小芬話：「你唔傳我哋點玩呀？」浩然抱得更緊。',
    context: '室內體育館，其他三隊已經順利完成幾個回合。浩然係今個學期新加入嘅學員，之前喺舊學校被同學排擠嘅經歷令佢對團隊活動特別敏感',
    options: [
      { id: 'A', text: '「浩然，我見你拎住個波好耐，你隻手握得好緊。你擔心傳出去之後會發生咩事？」', type: 'open', score: 10, childReaction: '手指慢慢鬆開少少，細聲講「我驚佢哋接到之後唔會傳返俾我……以前都係咁」', childReactionEmoji: '😌', explanation: '觀察身體語言並反映，問「擔心咩」而非「點解唔傳」，打開安全空間讓小朋友講出過去嘅經歷', explanationPoints: ['指出身體狀態（手握緊）幫助小朋友覺察自己嘅緊張', '問「擔心」而非「點解唔做」避免質問式壓力', '過去被排擠嘅經歷影響當下行為——創傷知情視角', '建立信任後先處理行為，次序正確'], color: 'green', responsePattern: '開放式' },
      { id: 'B', text: '「再唔傳波就罰你出去坐！全隊因為你先玩唔到！」', type: 'closed', score: 0, childReaction: '勉強將波大力拋出去，波飛咗去好遠，然後自己跑去角落蹲低', childReactionEmoji: '😠', explanation: '威脅加上公開歸咎，重複咗佢過去被排擠嘅經驗模式', explanationPoints: ['將團隊問題歸咎於一人，強化被排斥感', '威脅懲罰令「傳波」同「恐懼」連結更強', '勉強傳波嘅攻擊性力度反映壓抑嘅憤怒', '錯失處理過去創傷經歷嘅機會'], color: 'red', responsePattern: '封閉式' },
      { id: 'C', text: '「係 team work 嚟㗎浩然，團隊合作最重要！每人都要傳俾人㗎。」', type: 'semi-open', score: 3, childReaction: '聽到道理但身體仍然僵硬，慢慢將波傳出去但全程低頭，唔敢望任何人', childReactionEmoji: '😰', explanation: '講道理未觸及核心恐懼，行為改變係表面嘅，內心嘅不安全感仍然存在', explanationPoints: ['抽象概念「團隊合作」對焦慮兒童無效', '忽視咗「唔肯傳」背後嘅心理障礙', '服從行為唔等於真正嘅合作意願', '未處理過去嘅社交創傷經歷'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你唔傳波其他人都玩唔到㗎喎，你覺得咁樣公唔公平？」', type: 'judgmental', score: 2, childReaction: '低頭唔出聲，手指攥得更緊，眼眶開始紅', childReactionEmoji: '😔', explanation: '內疚式勸說令小朋友感到自責，但無解決根本嘅社交恐懼', explanationPoints: ['引發內疚感但未提供解決方案', '「公平」嘅道德壓力加重心理負擔', '內疚同恐懼疊加，情緒更難處理', '忽視行為背後嘅保護性動機'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 44, role: 'coach', category: '分離焦慮', title: '新小朋友緊抱家長唔肯入場',
    description: '新學員樂樂第一日嚟到體育館，佢緊緊攬住媽媽嘅大腿，成個人掛喺度，大聲喊「唔好走！你唔好走！」媽媽蹲低安慰緊，但樂樂嘅手指扣住媽媽件衫，指甲都陷入去。門口其他等緊嘅家長投嚟同情嘅目光，樂樂嘅媽媽眼眶紅紅，望住你好似求助咁。',
    context: '體育館入口，玻璃門後面可以見到其他小朋友已經開始玩。走廊嘅回音令樂樂嘅喊聲特別大。媽媽之前講過樂樂喺幼稚園都有嚴重分離焦慮，睇緊心理輔導',
    options: [
      { id: 'A', text: '「你唔好咁曳啦！媽媽一陣就返嚟，你再喊媽媽就唔嚟接你㗎喇！」', type: 'closed', score: 0, childReaction: '攬得更加緊，喊聲變成尖叫，開始踢腳，媽媽都忍唔住喊', childReactionEmoji: '😭', explanation: '威脅「媽媽唔嚟接」直接觸發最深層嘅分離恐懼，完全破壞安全感', explanationPoints: ['威脅遺棄係最具破壞性嘅回應，直接觸發依附系統', '「曳」嘅標籤將恐懼等同於壞行為', '喺媽媽面前責備加重媽媽嘅內疚同焦慮', '令分離焦慮惡化，可能需要更長時間恢復'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「入面好好玩㗎！有好多彩色波波同滑梯！你鍾唔鍾意波波？」', type: 'semi-open', score: 4, childReaction: '喊聲細咗少少，眼角望咗入面一眼，但仍然唔肯放手', childReactionEmoji: '😰', explanation: '利誘策略短期可能有效，但未處理分離恐懼嘅根源', explanationPoints: ['引起好奇心係正面嘅，但唔足以克服依附焦慮', '未回應「唔好走」背後嘅核心恐懼', '過度強調「好玩」可能令小朋友覺得大人唔理解佢嘅痛苦', '需要先接納恐懼，再引導探索'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「媽媽會喺門口等你㗎，做完就見到佢。我保證。」', type: 'judgmental', score: 3, childReaction: '半信半疑望住媽媽，媽媽點頭，但樂樂仍然緊握唔放「你應承？」', childReactionEmoji: '😣', explanation: '口頭保證提供部分安全感，但對嚴重分離焦慮嘅小朋友嚟講，語言承諾不足以取代身體嘅安全感', explanationPoints: ['保證有用但對嚴重焦慮嘅小朋友效果有限', '未接納恐懼本身，只處理結果', '小朋友需要嘅係感受到安全，唔只係聽到安全', '漸進式分離比承諾更有效'], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '（蹲低到樂樂嘅高度，聲音溫柔而穩定）「樂樂，你好驚因為呢度係你未去過嘅地方，而且媽媽唔喺身邊會好唔安全。你想點做？可以先同媽媽坐喺門口睇住入面。」', type: 'open', score: 10, childReaction: '喊聲慢慢細咗，望住教練，然後望住媽媽，細聲話「我……我可以坐喺度睇住先？」', childReactionEmoji: '🥺', explanation: '接納恐懼、命名情緒、提供漸進式參與選項，同時保留媽媽作為過渡期嘅安全基地', explanationPoints: ['蹲低加穩定語調係非語言嘅安全訊號', '命名恐懼（「好驚」「未去過」「唔安全」）讓情緒被看見', '「你想點做」賦予自主權，減少失控感', '漸進式參與（坐喺門口睇）符合分離焦慮嘅治療原則'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 45, role: 'coach', category: '過度興奮', title: '完成挑戰後過度興奮撞人',
    description: '小明剛完成障礙賽，以全場最快時間衝過終點。佢雙手舉高大叫「耶！我贏咗！」然後開始喺場內全速奔跑，張開雙手好似飛機咁轉圈。轉到第三個圈嘅時候，佢嘅手肘撞正喺旁邊等緊嘅小朋友曉晴嘅面。曉晴跌坐喺地下，摸住面大聲喊，鼻血開始流出嚟。小明停低，面色由興奮變成驚恐。',
    context: '室內運動場，其他家長開始站起身望。曉晴嘅媽媽衝入嚟。小明素來係精力充沛嘅細路，兒科醫生之前提過佢可能有ADHD傾向，衝動控制較弱',
    options: [
      { id: 'A', text: '「你做咩撞人？！坐低唔好郁！你睇吓你做嘅好事！」', type: 'closed', score: 0, childReaction: '由興奮直接轉為恐懼，雙手開始震，眼淚湧出，退後幾步撞到牆', childReactionEmoji: '😰', explanation: '懲罰興奮情緒令小朋友混亂——佢唔明白點解開心都係錯', explanationPoints: ['將意外等同故意行為，判斷不公平', '懲罰興奮情緒會令小朋友壓抑所有正面情緒', '對可能有ADHD嘅兒童，衝動控制需要教導而非懲罰', '公開責備加上有鼻血嘅場面，創傷風險極高'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你開心係好嘅，但跑嘅時候要睇路，唔好撞到人。」', type: 'judgmental', score: 3, childReaction: '聽到但眼神定格喺曉晴嘅鼻血，全身僵硬，未能處理', childReactionEmoji: '😐', explanation: '教導「睇路」嘅時機太早——小明而家被嚇到，無法吸收任何指導', explanationPoints: ['情緒高峰期嘅教導無法被前額葉處理', '未回應小明自己嘅驚恐情緒', '「但」字否定咗前面嘅肯定', '需要先穩定兩個小朋友嘅情緒'], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「快啲同曉晴講 sorry！你撞親人喇，唔應該亂跑！」', type: 'semi-open', score: 4, childReaction: '機械式行過去細聲講 sorry，但眼神空洞，身體僵硬，明顯仍在震驚中', childReactionEmoji: '😐', explanation: '指令式道歉無助建立真正嘅同理心，小明自己都需要被照顧', explanationPoints: ['強迫道歉產生嘅係服從，唔係真正嘅歉意', '忽視小明自己嘅驚恐——撞親人佢都好驚', '機械式 sorry 唔會令曉晴感到被照顧', '錯失引導留意他人感受嘅教育機會'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '（先確認曉晴有人照顧，然後走到小明身邊）「小明，你好開心贏咗，跑得好快。你而家見到曉晴喊緊，你心入面感覺點？」', type: 'open', score: 10, childReaction: '望住曉晴，下巴震緊，「我……我唔係故意……佢流緊血……」開始流淚', childReactionEmoji: '😮', explanation: '先肯定興奮嘅合理性，再引導留意行為嘅影響，讓同理心自然產生', explanationPoints: ['先確保傷者安全，示範危機處理嘅優先次序', '肯定「好開心贏咗」保護正面情緒', '問「你心入面感覺點」引導內在同理心', '讓小明自己發現影響，比被告知更深刻'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 46, role: 'coach', category: '攻擊行為', title: '追逐遊戲突然推跌他人',
    description: '追逐遊戲進行到一半，阿昊突然用雙手大力推咗前面嘅志賢嘅背脊，志賢向前仆倒，膝頭同手掌擦損流血。阿昊企咗喺度，面上嘅表情好複雜——嘴角有一絲得意，但眼神閃過驚恐。你留意到阿昊嘅耳仔變紅。其他小朋友全部停低望住。志賢坐喺地下喊住望住自己嘅手掌。',
    context: '草地操場，天陰有風。阿昊過去三堂已經有兩次類似推人行為。佢嘅家庭輔導員之前同你溝通過，阿昊喺屋企經常目睹家庭衝突，對「力量」有扭曲嘅理解',
    options: [
      { id: 'A', text: '「你做咩推人？！出去罰企！你再推人以後都唔使嚟！」', type: 'closed', score: 0, childReaction: '面色一沉，大聲嗌「佢先撞我！」不忿行出去，途中踢咗一腳草地', childReactionEmoji: '😤', explanation: '懲罰式回應重複咗佢喺屋企見到嘅「用力量解決問題」模式', explanationPoints: ['以暴制暴強化「力量＝控制」嘅扭曲信念', '公開懲罰觸發羞恥感，防禦機制啟動', '「以後都唔使嚟」嘅威脅破壞僅存嘅安全連結', '未了解推人背後嘅觸發點同動機'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「阿昊，我見到你推咗志賢。你嗰一刻心入面係咩感覺？發生咗咩事令你想推佢？」', type: 'open', score: 10, childReaction: '低頭沉默咗一陣，然後細聲講「佢……佢跑嘅時候踩咗我隻腳……我好嬲……」', childReactionEmoji: '😔', explanation: '直接觀察行為而非判斷，問「心入面嘅感覺」幫助佢將身體衝動同情緒連結', explanationPoints: ['觀察式語言（「我見到」）減少防禦反應', '問感覺而非問「點解」避免觸發辯護', '了解觸發點（被踩腳）揭示攻擊並非無緣由', '幫助小朋友學習辨識「嬲→衝動→行為」嘅鏈條'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「推人唔啱㗎，你要同志賢講 sorry。嚟，行過去同佢道歉。」', type: 'semi-open', score: 3, childReaction: '勉強行過去，唔望志賢，細聲講咗句含糊嘅 sorry，然後即刻行開', childReactionEmoji: '😐', explanation: '指令式道歉處理咗表面行為，但未觸及攻擊背後嘅情緒同家庭經歷', explanationPoints: ['機械式道歉無法建立真正嘅同理心', '未探問推人嘅觸發因素', '對有家庭暴力經歷嘅兒童，需要更深層嘅介入', '服從式回應可能強化「聽話就冇事」嘅表面策略'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你去幫志賢起身先，拍走佢身上嘅草。」', type: 'judgmental', score: 4, childReaction: '做咗幫忙嘅動作但全程唔出聲，表情僵硬，無真正嘅反思', childReactionEmoji: '😐', explanation: '指引修復行為係正面嘅，但跳過咗情緒處理，修復只停留喺物理層面', explanationPoints: ['行為上嘅修復係好嘅開始，但不足夠', '未處理阿昊自己嘅情緒狀態', '修復需要情感連結，唔只係物理行動', '缺乏反思嘅修復可能令行為重複'], color: 'yellow', responsePattern: '判斷式' },
    ],
  },
  {
    id: 47, role: 'coach', category: '恐懼挑戰', title: '面對平衡木恐懼發抖',
    description: '到咗平衡木活動，八個小朋友排隊等。阿詩排到最前面，但佢企咗喺平衡木前面成兩分鐘，雙腳明顯震緊，膝頭微微彎曲。佢嘅眼眶泛紅，望住你嘅眼神好似喺求救。後面嘅小朋友開始話「快啲啦！」「你行唔行㗎？」阿詩嘅手指開始無意識咁捽自己隻手臂。',
    context: '體育館，平衡木高約30cm，鋪咗軟墊。阿詩上個月喺學校體育堂跌落平衡木扭親腳踝，請咗兩個禮拜假。今日係佢傷癒後第一次面對平衡木',
    options: [
      { id: 'A', text: '「人哋都做到㗎，你睇吓小明同曉晴都行晒過去，你都一定得！上去！」', type: 'closed', score: 2, childReaction: '勉強踏上去，但雙腳發軟行到一半蹲低唔郁得，全身震到同學都見到，最後喊住落嚟', childReactionEmoji: '😭', explanation: '比較式鼓勵無視個人創傷經歷，強迫面對恐懼可能造成再次創傷', explanationPoints: ['比較式語言（「人哋都做到」）加重自卑感', '強迫面對未處理嘅創傷可能造成二次創傷', '忽視上次受傷嘅經歷對身體記憶嘅影響', '公開場合嘅失敗經驗會令恐懼更加根深蒂固'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「唔使驚，好安全㗎，我全程扶住你，跌唔到㗎。」', type: 'semi-open', score: 5, childReaction: '拖住教練隻手踏上去，但全程握到教練手指發白，唔敢放手，行完之後手震', childReactionEmoji: '😰', explanation: '提供身體安全感係正面嘅，但未處理內在恐懼，依賴外在支撐無法建立自主信心', explanationPoints: ['身體支撐提供即時安全感，有短期效果', '「跌唔到」嘅保證同佢嘅身體記憶矛盾——佢曾經跌過', '依賴外在支撐無法建立內在勇氣', '未讓小朋友辨識同表達恐懼，錯失情緒教育機會'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以等下一輪先，排返後面慢慢嚟。」', type: 'judgmental', score: 3, childReaction: '鬆咗口氣行返後面，但恐懼仍然存在，到下一輪又再企喺度唔郁', childReactionEmoji: '😐', explanation: '容許迴避減少即時壓力，但無處理恐懼根源，迴避行為會持續甚至惡化', explanationPoints: ['短期減壓但長期強化迴避模式', '恐懼喺無處理嘅情況下唔會自行消失', '等下一輪只係推遲問題，唔係解決問題', '未利用呢個時刻建立面對恐懼嘅策略'], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '（行到阿詩旁邊，示意其他小朋友先用另一條平衡木）「阿詩，你企咗喺度好耐，我見到你對腳震緊。你嘅身體邊度覺得最驚？你想點做？」', type: 'open', score: 10, childReaction: '指住個肚話「呢度好緊好似打結咁」，然後話「我……我想先踩低嗰條試吓」', childReactionEmoji: '😌', explanation: '先移除公開壓力，再引導身體覺察，讓小朋友自己決定漸進式挑戰嘅步伐', explanationPoints: ['安排其他人用另一條，移除觀眾壓力', '問「身體邊度最驚」引導內感受覺察（Interoception）', '「你想點做」賦予自主權，係克服恐懼嘅關鍵', '小朋友自己提出「踩低嗰條」——自發嘅漸進暴露比被迫更有效'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 48, role: 'coach', category: '退出行為', title: '輸咗就話「唔玩喇」',
    description: '搶旗遊戲進行中，美琪連續三次衝出去都被對手搶先一步攞到旗仔。第三次之後，佢突然停低，面紅耳赤，行去場邊坐低，交叉雙手，大聲話「我唔玩喇！呢個遊戲好無聊好蠢！」其他隊友望住佢，有人話「又嚟……」美琪聽到之後側過面，但你見到佢嘴唇震緊。',
    context: '戶外操場，下午四點。美琪係隊入面跑得最快嘅，但對手今日用咗新策略。美琪嘅完美主義傾向一直好明顯，佢嘅成績單永遠要全 A',
    options: [
      { id: 'A', text: '「咁快就放棄？你要學堅持！運動員唔會因為輸就唔玩！」', type: 'closed', score: 1, childReaction: '翻白眼，「我唔係運動員！」語氣更加堅定要退出，開始摘手帶', childReactionEmoji: '😤', explanation: '道德式批評令退出決心更堅定，「堅持」嘅說教對完美主義兒童反效果', explanationPoints: ['對完美主義兒童嚟講，「堅持」意味住繼續經歷失敗', '道德式批評加重羞恥感', '「運動員」嘅標準太遠，無法產生共鳴', '忽視三次連續失敗對自我效能感嘅打擊'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「美琪，你話唔想玩，我見到你跑咗三次都好盡力。你而家心入面最大嘅感覺係咩？」', type: 'open', score: 10, childReaction: '沉默咗幾秒，嘴唇震咗震，然後細聲講「我……我點做都搶唔到……我以為我係最快……」眼淚流出嚟', childReactionEmoji: '😢', explanation: '觀察到努力並反映，問「最大嘅感覺」幫助完美主義兒童辨識挫敗感嘅核心', explanationPoints: ['「跑咗三次都好盡力」肯定過程而非結果', '問感覺而非勸說返去玩，先接住情緒', '完美主義兒童需要學習「努力但未成功」唔等於「失敗」', '情緒被接住之後先有空間討論返去嘅可能性'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「我教你一個新策略，你一定搶到！嚟，我同你講……」', type: 'semi-open', score: 4, childReaction: '勉強聽但眼神空洞，核心係情緒未被處理，學唔入新策略', childReactionEmoji: '😐', explanation: '技術指導有價值但時機太早——情緒未被接住之前，前額葉無法有效學習', explanationPoints: ['情緒高漲時認知學習效果極低', '跳過情緒直接教策略暗示「你嘅方法唔啱」', '對完美主義兒童，「一定搶到」嘅保證係壓力', '需要先處理「努力但失敗」嘅情緒經驗'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「咁你做下休息都得啦，諗清楚先。」', type: 'judgmental', score: 3, childReaction: '繼續坐喺一邊成個活動都無參與，同隊友嘅距離越嚟越遠', childReactionEmoji: '😔', explanation: '容許休息係尊重嘅，但「諗清楚」暗示佢嘅決定係衝動嘅，未主動連結', explanationPoints: ['被動容許而非主動連結，錯失教育時機', '「諗清楚」帶有判斷性——暗示佢嘅反應唔理性', '未鼓勵回歸，退出可能變成習慣性模式', '隊友嘅「又嚟」反映團體動力需要處理'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 49, role: 'coach', category: '競爭心態', title: '永遠想做第一個',
    description: '每個活動開始前阿軒都衝到最前面，今次佢推開咗排喺第一位嘅六歲細妹妹心心，心心跌坐喺地下嘴唇震緊。阿軒仍然大聲嗌「我第一！我第一！」面上係興奮嘅表情，完全無留意到心心跌咗。其他小朋友有啲開始學佢爭住排前面。',
    context: '室內體育館排隊位置，有家長透過玻璃望入嚟。阿軒係獨生子，家庭高度競爭性，爸爸經常講「做第一先有用」。心心係今個月先加入嘅細妹妹，性格文靜',
    options: [
      { id: 'A', text: '「你推人！排返隊尾！你再爭就罰你企出去！」', type: 'closed', score: 1, childReaction: '不忿服從，但小聲嗌「佢行得慢咪我行先囉」，排到隊尾但姿態抗拒', childReactionEmoji: '😤', explanation: '懲罰改變位置但無改變信念，「做第一」嘅內在動機完全未被處理', explanationPoints: ['外在懲罰只改變行為位置，唔改變信念', '下次無人睇住嘅時候仲係會爭', '未處理家庭灌輸嘅「第一＝有價值」信念', '其他正在學佢嘅小朋友都未被引導'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「做第一唔代表最叻㗎，過程先重要。」', type: 'semi-open', score: 3, childReaction: '歪頭唔明白，「但爸爸話第一先有用」——道理太抽象', childReactionEmoji: '😐', explanation: '抽象概念對七歲兒童效果有限，尤其同家庭信念矛盾時', explanationPoints: ['「過程先重要」對兒童嚟講太抽象', '同家庭傳遞嘅信息矛盾，令小朋友更困惑', '未處理推人嘅即時行為', '需要用具體經驗而非道理嚟改變認知'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你要讓心心先，佢細過你，大個仔要讓細嘅。」', type: 'judgmental', score: 2, childReaction: '被迫讓但唔明點解年紀同排隊有關，「但我快過佢」', childReactionEmoji: '😔', explanation: '以年紀為由嘅讓步無邏輯基礎，未解釋公平同尊重嘅真正意義', explanationPoints: ['年紀唔係排隊嘅合理標準，理由牽強', '未回應「做第一」背後嘅深層需要', '被迫讓步唔會建立尊重，只會建立怨恨', '錯失探問競爭動機嘅機會'], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '（先檢查心心無事，再同阿軒傾）「阿軒，你好想做第一個，我見到你為咗排第一推咗心心。做第一對你嚟講代表咩？」', type: 'open', score: 10, childReaction: '停低諗咗一陣，「因為……第一個就最叻，爸爸會開心」，開始揭示家庭信念', childReactionEmoji: '🤔', explanation: '先處理被推跌嘅小朋友，再探問競爭動機，揭示家庭價值觀對行為嘅影響', explanationPoints: ['先照顧受傷者示範關懷嘅優先次序', '「代表咩」引導反思信念而非表面行為', '揭示家庭信念（「爸爸會開心」）係行為根源', '了解動機後可以引導更健康嘅成就觀'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 50, role: 'coach', category: '等待困難', title: '唔肯等待輪候',
    description: '射球活動需要排隊等，但阿朗已經插咗三次隊，不停碰前面嘅小朋友、發出怪聲、身體左搖右擺。佢嘅腳不停踏地，手指無意識咁彈，成個人好似有電咁。排喺佢後面嘅小朋友投訴：「教練佢又撞我！」阿朗即刻話「我冇呀！」但你明明見到佢嘅手肘碰到人。',
    context: '室內體育館，排隊等射球。阿朗有感覺統合需要，OT報告指出佢嘅前庭覺同本體覺需要較高嘅刺激輸入，靜止不動對佢嚟講係極大嘅挑戰',
    options: [
      { id: 'A', text: '「你企好！唔好郁！再插隊再碰人就唔俾你射球！」', type: 'closed', score: 0, childReaction: '嘗試企好但三秒後又開始搖，身體控制唔到，眼神焦慮——佢真係唔係故意', childReactionEmoji: '😣', explanation: '要求感覺統合需要高嘅兒童完全靜止，等同要求近視嘅人唔戴眼鏡去睇字', explanationPoints: ['靜止不動對高感覺需要嘅兒童係生理上極困難嘅', '懲罰佢控制唔到嘅事情係不公平嘅', '「唔好郁」嘅指令反而增加身體焦慮', '需要提供替代感覺輸入而非禁止活動'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「阿朗，我見你好難企定，你嘅身體係咪好想郁？等緊嘅時候你嘅身體感覺係點？」', type: 'open', score: 10, childReaction: '用力點頭「我好想郁㗎！企喺度我個身體好唔舒服，好似有蟲喺入面爬」', childReactionEmoji: '😌', explanation: '問身體感覺而非責備行為，幫助小朋友同大人都理解感覺統合需要', explanationPoints: ['認可「好難企定」而非批判，減少羞恥感', '「身體感覺點」引導內感受覺察', '小朋友嘅描述（「好似有蟲爬」）揭示感覺統合需要', '理解需要後可以一齊搵合適嘅替代策略'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「你可以原地跳住等，或者做吓深蹲。」', type: 'semi-open', score: 5, childReaction: '開心跳咗幾下，比較平靜咁等——替代行為滿足咗部分感覺需要', childReactionEmoji: '😊', explanation: '提供替代感覺輸入係正確方向，但未幫助小朋友理解自己嘅身體需要', explanationPoints: ['替代活動滿足前庭覺／本體覺需要，即時有效', '但未引導小朋友覺察自己嘅感覺需要', '長遠需要教佢自己辨識「身體需要郁」嘅訊號', '未回應「插隊碰人」對其他小朋友嘅影響'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「等唔到就你先出去冷靜區坐一陣再返嚟排。」', type: 'judgmental', score: 2, childReaction: '唔想出去但又知道自己控制唔到，好矛盾咁行出去，覺得自己「壞」', childReactionEmoji: '😔', explanation: '隔離移除咗問題但強化「我有問題」嘅自我認知，未提供支援', explanationPoints: ['「冷靜區」變成咗隱性懲罰而非支援', '對感覺統合需要嘅兒童，問題係生理性嘅，隔離解決唔到', '反覆被移除會建立「我同其他人唔同」嘅負面自我形象', '需要嘅係調適環境而非移除兒童'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 51, role: 'coach', category: '器材使用', title: '見到器材就亂拋',
    description: '你花咗五分鐘將十二個呼拉圈整齊排成一行準備障礙賽，但阿康一見到就衝過去，拎起呼拉圈開始亂掟——掟上天花板、滾去場嘅另一邊、疊埋一齊再推跌。佢笑得好大聲好興奮，完全無留意到你同其他小朋友。呼拉圈散晒一地，你排好嘅路線完全破壞晒。其他小朋友有啲學佢掟，場面開始混亂。',
    context: '室內體育館，訓練時間有限只剩四十分鐘。阿康喺學校被標籤為「曳仔」，經常因為衝動行為被罰。佢對新奇刺激嘅事物反應特別強烈，可能同感覺尋求行為有關',
    options: [
      { id: 'A', text: '「放低！你搞亂晒我排好嘅嘢！你成日都係咁！出去！」', type: 'closed', score: 1, childReaction: '放低呼拉圈但成個人即刻變晒，臭住面行出去，小聲講「我又做錯……」', childReactionEmoji: '😤', explanation: '「成日都係咁」嘅標籤強化負面自我形象，佢已經喺學校被標籤夠多', explanationPoints: ['「成日都係咁」係人格批評，強化「壞」嘅自我認知', '重複學校嘅懲罰模式，教練本應係唔同嘅安全角色', '未理解興奮同衝動背後嘅感覺尋求需要', '趕走佢令其他跟住掟嘅小朋友嘅行為都未處理'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「阿康，你一見到呼拉圈就好興奮！你最想用佢做啲咩？你話俾我聽。」', type: 'open', score: 10, childReaction: '眼睛發光，「我想掟佢飛好遠好遠！好似飛碟咁！」表達咗創意同感覺需要', childReactionEmoji: '😊', explanation: '將衝動行為重新定義為「興奮」而非「搞破壞」，引導表達後再引導適當使用', explanationPoints: ['肯定情緒（興奮）而非批判行為（亂掟）', '「你最想做咩」將衝動轉化為有意識嘅表達', '了解感覺尋求動機後可以設計滿足需要嘅活動', '建立「先表達再行動」嘅模式取代「衝動行為」'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「呼拉圈唔係用嚟掟嘅，等我教你正確嘅用法，睇住我做一次。」', type: 'semi-open', score: 5, childReaction: '願意望住教練示範，但好快又手痕想自己試，注意力維持唔到一分鐘', childReactionEmoji: '😐', explanation: '教導正確用法係合理嘅，但未回應衝動背後嘅感覺尋求需要', explanationPoints: ['教導有效但時機需要配合——興奮高峰期學習效果差', '未理解「亂掟」可能係感覺尋求行為而非故意搗亂', '單向示範對高活動量兒童嘅吸引力有限', '需要互動式而非觀察式嘅教導方法'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你破壞咗器材就要負責執返好，全部排返一行先可以繼續玩。」', type: 'judgmental', score: 3, childReaction: '唔情願咁執，但邊執邊玩，將呼拉圈滾嚟滾去，執得好慢', childReactionEmoji: '😐', explanation: '自然後果教育有其道理，但對衝動型兒童需要更多支援同理解', explanationPoints: ['自然後果係正面嘅教育策略', '但對衝動控制困難嘅兒童，後果教育需要配合情緒支援', '「執返好」嘅過程可能變成另一個玩嘅機會', '未處理其他開始跟住掟嘅小朋友'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 52, role: 'coach', category: '自我效能', title: '話「我做唔到」坐低',
    description: '新活動需要連續跳過三個高低不同嘅障礙物。阿欣望咗一眼就即刻坐低喺地上，雙手攬住膝頭，成個人縮成一舊，不停搖頭話「我做唔到，我做唔到，我一定跌……」佢嘅呼吸開始變快變淺，你留意到佢嘅面色有啲蒼白。',
    context: '障礙物分三級：最矮15cm、中間25cm、最高35cm。其他小朋友正在開心嘗試，有啲跳唔過都笑住再嚟。阿欣係隊入面年紀最細嘅，上學期因為跳繩唔識被同學笑過',
    options: [
      { id: 'A', text: '「你試都未試過點知做唔到？起身！人哋細過你都跳到！」', type: 'closed', score: 2, childReaction: '更加縮埋，呼吸更加急促，開始捉住自己嘅衫角搣，「我就係做唔到……」', childReactionEmoji: '😰', explanation: '否定恐懼並用比較施壓，對已經喺焦慮狀態嘅兒童等同推佢入更深嘅恐慌', explanationPoints: ['「試都未試過」否定佢基於過去經驗嘅合理恐懼', '比較式語言加重自卑感同羞恥感', '呼吸急促同面色蒼白可能係焦慮發作嘅前兆', '強迫行動會破壞自主感，進一步降低自我效能'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「我陪你一齊做，好簡單㗎嘅，你一定得！」', type: 'semi-open', score: 5, childReaction: '猶豫望住教練，但「好簡單」呢三個字令佢更加覺得「連簡單嘅嘢都做唔到嘅自己好差」', childReactionEmoji: '😣', explanation: '陪伴係正面嘅，但講「好簡單」否定咗佢真實感受到嘅困難', explanationPoints: ['陪伴嘅意圖係好嘅，提供社會支援', '但「好簡單」暗示「你都做唔到就係你嘅問題」', '「一定得」嘅過度保證增加失敗後嘅挫敗感', '需要承認困難嘅真實性，先接納再陪伴'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以做最矮嗰個先，唔使一次過做晒三個。」', type: 'judgmental', score: 4, childReaction: '考慮緊，望咗望最矮嗰個，但仍然唔敢起身', childReactionEmoji: '😐', explanation: '降低難度係合理嘅調適策略，但未處理內在恐懼同自我對話', explanationPoints: ['分階段挑戰係正確方向', '但未回應「我一定跌」嘅災難化思維', '身體嘅焦慮反應（呼吸急促）需要先被處理', '選擇權需要配合情緒支援先有效'], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '（坐到阿欣旁邊，聲音輕柔穩定）「阿欣，你話做唔到。望住啲障礙物嘅時候，你嘅身體話俾你知咩？你嘅心跳係點？」', type: 'open', score: 10, childReaction: '「我個心跳好快好快……好似要爆出嚟……上次跳繩我跌咗全部人笑我」眼淚流出嚟', childReactionEmoji: '😌', explanation: '坐低同身體感覺提問引導內感受覺察，揭示過去嘅創傷經歷係恐懼嘅根源', explanationPoints: ['坐到旁邊傳遞「唔急，我喺度」嘅訊息', '問心跳引導身體覺察，係情緒調節嘅第一步', '過去被笑嘅經歷被揭示——理解行為嘅根源', '當過去嘅傷痛被看見，當下嘅恐懼先可以被處理'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 53, role: 'coach', category: '依附行為', title: '只想同教練玩唔理其他人',
    description: '曉彤成堂都黏住你，拖住你隻手唔放，你行去邊佢就跟去邊。你試過引導佢同其他小朋友玩，但佢即刻用力攬住你隻腳。其他小朋友開始唔耐煩，「教練你成日同佢一齊！」曉彤聽到之後攬得更緊，面貼住你嘅大腿。',
    context: '室內體育館，活動進行中。曉彤嘅家庭最近經歷父母離婚，佢同媽媽住，爸爸每兩週見一次。佢嘅幼稚園老師反映佢近期特別「黐身」，無法獨立參與群體活動',
    options: [
      { id: 'A', text: '「曉彤你要自己去玩，教練要照顧其他人，你唔可以成日黐住我。」', type: 'closed', score: 2, childReaction: '放開手但企喺角落唔郁，低頭望住地下，眼淚無聲咁流——又一個大人推開佢', childReactionEmoji: '😢', explanation: '直接推開正在經歷依附不安全嘅兒童，重複咗佢感受到嘅「被遺棄」模式', explanationPoints: ['對正經歷父母離婚嘅兒童，被推開觸發遺棄恐懼', '「你唔可以」嘅限制令佢確認「我嘅需要係多餘嘅」', '角落裏嘅退縮行為係更深層嘅迴避型依附反應', '錯失建立安全基地嘅機會'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「曉彤，你好想同教練一齊。同其他小朋友一齊嘅時候你感覺係點？你心入面擔心咩？」', type: 'open', score: 10, childReaction: '抬頭望住你，眼眶紅紅，好細聲講「我驚……佢哋唔鍾意我……你都會唔見咗……好似爸爸咁」', childReactionEmoji: '🥺', explanation: '問「擔心咩」打開安全空間，讓佢表達對失去連結嘅恐懼，揭示家庭變故嘅影響', explanationPoints: ['認可佢嘅需要（「你好想同教練一齊」）而非否定', '問感受引導佢辨識恐懼嘅來源', '「爸爸唔見咗」揭示依附行為嘅真正根源', '教練可以成為過渡性安全基地（Transitional Safe Base）'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「你可以同小明一齊玩，佢好友善嘅，你一定會鍾意佢。」', type: 'semi-open', score: 4, childReaction: '望咗小明一眼但搖頭，手攬得更緊，「我只想同你」', childReactionEmoji: '😰', explanation: '安排社交對象出於好意，但未處理依附焦慮嘅根源', explanationPoints: ['指定社交對象無視佢嘅內在恐懼', '「一定會鍾意」嘅保證佢無法信任——因為失去爸爸嘅經歷', '需要先建立安全感，再慢慢擴展社交圈', '對依附焦慮嘅兒童，信任需要時間同一致性'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「我哋一齊做完呢個活動，之後你試吓自己玩五分鐘好唔好？」', type: 'judgmental', score: 3, childReaction: '暫時接受但五分鐘到嘅時候更加焦慮，望住你計時好似好驚', childReactionEmoji: '😐', explanation: '設定時限係結構化嘅嘗試，但缺乏對依附焦慮嘅理解，計時增加焦慮', explanationPoints: ['結構化漸進有其道理，但執行方式需要更細緻', '計時令分離變成倒數，增加焦慮感', '未了解「黐身」背後嘅家庭變故', '需要先建立安全感再設定漸進目標'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 54, role: 'coach', category: '模仿行為', title: '模仿攻擊動作嚇到人',
    description: '自由遊戲時間，你見到阿俊學電視劇嘅角色做出攻擊動作——佢用雙手做出「開槍」姿勢指住其他三個小朋友，仲配上「砰砰砰」嘅聲效，行住追佢哋。被指住嘅小朋友反應各異：一個笑住走，一個面有難色但跟住玩，最細嗰個蹲低攬住頭喊「唔好射我」。阿俊見到細嘅嗰個喊仍然繼續「射」。',
    context: '室內遊戲區，下午五點。阿俊嘅爸爸鍾意同佢睇動作片，阿俊經常模仿片入面嘅暴力場景。蹲低喊嘅係四歲嘅芊芊，佢性格敏感，之前有被大人大聲嗌嘅經歷',
    options: [
      { id: 'A', text: '「唔好做呢啲動作！好危險㗎！開槍係犯法㗎你知唔知？」', type: 'closed', score: 2, childReaction: '停咗一陣但去咗另一邊繼續做，仲細聲講「我係好人射壞人」', childReactionEmoji: '😏', explanation: '禁止但未處理模仿動機，「犯法」嘅概念太抽象，佢認為自己係「英雄」', explanationPoints: ['禁止行為但未理解模仿背後嘅心理需要', '「犯法」對六歲兒童嚟講太抽象', '佢心中嘅角色係「英雄」，禁止令佢困惑', '被嚇到嘅芊芊嘅情緒未被處理'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「阿俊，你喺度扮緊咩角色？你有冇留意到芊芊嘅樣？佢嘅表情話緊俾你知咩？」', type: 'open', score: 10, childReaction: '停低望住芊芊蹲喺地下喊，面色慢慢變——「佢……佢好驚？但我只係玩……」開始理解影響', childReactionEmoji: '🤔', explanation: '問佢扮嘅角色了解動機，引導觀察他人反應建立同理心', explanationPoints: ['「扮緊咩角色」接納佢嘅想像而非否定', '引導觀察他人表情係建立同理心嘅核心方法', '「佢嘅表情話緊咩」將理解他人變成可學習嘅技能', '區分「你嘅意圖（玩）」同「對方嘅感受（驚）」'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「玩其他嘢啦阿俊，呢啲動作唔適合喺度做，去玩波啦。」', type: 'semi-open', score: 3, childReaction: '轉去攞波但唔明點解唔可以做英雄，過一陣又用波「射」人', childReactionEmoji: '😐', explanation: '轉移注意力短期有效但未解釋原因，行為會以其他形式重複', explanationPoints: ['轉移活動係暫時方案但唔持久', '未解釋點解呢啲動作影響到人', '用波「射」人顯示核心行為未改變', '芊芊嘅情緒仍未被照顧'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你嚇親芊芊喇，佢喊緊。你同佢講 sorry 佢就會冇事。」', type: 'judgmental', score: 4, childReaction: '行過去講 sorry 但唔太明白自己做錯咩，芊芊仍然驚', childReactionEmoji: '😐', explanation: '指出影響同要求道歉，但未深入引導觀察同理解他人感受', explanationPoints: ['指出直接影響（「佢喊緊」）係正面嘅', '但「講 sorry 就冇事」簡化咗情緒修復嘅過程', '阿俊需要理解「點解」佢嘅行為令人驚', '芊芊需要被安撫，唔只係收到 sorry'], color: 'yellow', responsePattern: '判斷式' },
    ],
  },
  {
    id: 55, role: 'coach', category: '成功態度', title: '成功後取笑失敗嘅人',
    description: '阿朗成功投中三分波之後極度興奮，開始用手指住排隊等緊嘅阿琪大聲笑「你好渣！你連一球都投唔中！哈哈哈！」阿琪嘅面由紅變白，嘴唇抿埋，低頭望住自己對鞋。旁邊幾個小朋友有啲跟住笑，有啲不安咁望住你。阿琪嘅眼淚開始滴落喺波鞋上面。',
    context: '室內籃球場，籃球班第六堂。阿朗各方面能力較強，但最近開始出現越嚟越多嘅驕傲行為。阿琪上個月先開始學籃球，進步緩慢但一直好努力練習',
    options: [
      { id: 'A', text: '「唔好笑人！好無禮貌！你做乜嘢咁討厭？道歉！」', type: 'closed', score: 2, childReaction: '停咗笑但臭住面，小聲講「我只係講事實……」無真正反思', childReactionEmoji: '😏', explanation: '責備停止咗行為但「討厭」嘅標籤攻擊人格，防禦機制啟動', explanationPoints: ['「討厭」攻擊人格而非行為，觸發防禦', '「講事實」嘅回應顯示佢認為自己冇錯', '強迫道歉唔會產生真正嘅反思', '阿琪嘅情緒仍然未被照顧'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「阿朗，你投到好開心我見到。你望下阿琪嘅面，佢而家嘅表情係點？佢心入面可能感覺點？」', type: 'open', score: 10, childReaction: '停低望住阿琪，見到眼淚，笑容慢慢消失——「佢……佢喊咗？」聲音細咗', childReactionEmoji: '😮', explanation: '先肯定成功嘅喜悅，再引導觀察他人表情，讓同理心自然產生而非被迫', explanationPoints: ['肯定投中嘅成就保護正面自我感覺', '引導觀察他人表情係社交情緒學習嘅核心', '自己發現（「佢喊咗？」）比被告知更有影響力', '驚訝反應顯示佢真係冇留意到——唔係存心傷害'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「大家都係嚟學㗎，每個人進度唔同，唔使比較。」', type: 'semi-open', score: 4, childReaction: '聽到但唔太明白同佢有咩關係，「但佢真係投唔中㗎嘛」', childReactionEmoji: '😐', explanation: '道理正確但太抽象，七歲兒童需要具體嘅情感引導而非抽象概念', explanationPoints: ['「唔使比較」嘅道理佢認知上可能明白但情感上未連結', '未引導佢觀察取笑對他人嘅具體影響', '阿琪嘅眼淚——最直接嘅教材——被浪費咗', '需要將抽象道理轉化為具體觀察'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「阿朗你同阿琪講 sorry，以後唔好再笑人。」', type: 'judgmental', score: 3, childReaction: '敷衍講 sorry 但心底唔覺得自己有錯，阿琪收到 sorry 但仍然好傷心', childReactionEmoji: '😐', explanation: '指令式道歉停止咗當下行為但無觸發真正嘅反思同同理心', explanationPoints: ['機械式 sorry 唔會令阿琪感到被理解', '「以後唔好」係行為禁令但無情感教育', '阿朗需要自己理解取笑嘅影響，唔係被告知', '跟住笑嘅其他小朋友嘅群體動力未被處理'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 56, role: 'coach', category: '挫折恢復', title: '受傷後唔肯再嘗試',
    description: '上個月練習跳箱嘅時候阿琪跌落嚟扭親左腳踝，打咗兩個禮拜石膏。今日佢復課，但一見到體育館角落嘅跳箱就企定咗——雖然今日嘅活動係跑步同拋接完全唔關跳箱事。佢嘅目光不斷飄向跳箱嘅方向，然後話「教練……我可唔可以唔入去？我……我會跌……」佢嘅左腳無意識咁向後縮。',
    context: '室內體育館，跳箱放喺角落已用布蓋住但仍然見到形狀。阿琪嘅媽媽話佢呢兩個禮拜晚晚發惡夢夢到跌落嚟，佢嘅兒科醫生建議慢慢重新接觸運動環境',
    options: [
      { id: 'A', text: '「上次跌咗今次就識避㗎啦！唔會再跌㗎，嚟入嚟！今日又唔係跳箱！」', type: 'closed', score: 2, childReaction: '搖頭後退，左腳縮得更後，「但佢喺度……」眼淚湧出——創傷反應被否定', childReactionEmoji: '😰', explanation: '否定恐懼無法消除創傷記憶——身體記得嗰次跌落嘅痛，邏輯講唔到', explanationPoints: ['創傷記憶儲存喺身體（體感記憶），邏輯說服無效', '「識避」暗示上次係佢嘅錯，加重自責', '恐懼對象已泛化（見到形狀就驚），需專業處理', '否定惡夢兩個禮拜嘅創傷反應'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「好安全㗎阿琪，我會全程睇住你，你唔會跌㗎。」', type: 'semi-open', score: 5, childReaction: '猶豫行入少少但身體僵硬，每隔幾秒就望一次跳箱嘅方向', childReactionEmoji: '😣', explanation: '保證安全有部分效果，但創傷記憶同邏輯安慰喺唔同嘅腦區處理', explanationPoints: ['口頭保證提供部分認知安全感', '但身體嘅恐懼反應（望跳箱、僵硬）未被處理', '創傷儲存喺杏仁核，邏輯說服經過前額葉——路徑唔同', '需要身體層面嘅安全感建立，唔只係語言'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以先做其他活動，唔使做跳箱相關嘅嘢。」', type: 'judgmental', score: 4, childReaction: '鬆咗口氣但仍然好緊張，不斷望住跳箱，無法全心投入任何活動', childReactionEmoji: '😌', explanation: '容許迴避減少即時壓力，但恐懼已泛化到整個環境，需要更主動嘅介入', explanationPoints: ['短期減壓係合理嘅', '但恐懼已泛化（唔只怕跳箱，怕整個場地），迴避無法解決', '兒科醫生建議嘅「慢慢重新接觸」需要主動引導', '未幫助佢處理身體嘅創傷記憶'], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '（蹲低，聲音溫柔）「阿琪，你仲記得上次跌嗰陣嘅感覺。你而家嘅身體邊度有感覺？你嘅左腳而家點？想同我講講嗎？」', type: 'open', score: 10, childReaction: '望住自己嘅左腳，「佢……佢仲記得好痛……夢到都覺得痛」開始將身體記憶講出嚟', childReactionEmoji: '🥺', explanation: '承認創傷記憶存在喺身體入面，引導佢將感受講出嚟係創傷處理嘅第一步', explanationPoints: ['問「身體邊度有感覺」幫助辨識創傷儲存嘅位置', '「你嘅左腳而家點」直接連結受傷部位嘅身體記憶', '將創傷經歷用語言表達出嚟係 Narrative Exposure 嘅基礎', '教練嘅角色唔係治療師但可以提供安全嘅初步表達空間'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 57, role: 'coach', category: '專注困難', title: '不斷轉換活動無專注',
    description: '自由遊戲時間開始咗十分鐘，阿康已經換咗六樣嘢玩——籃球拍咗幾下掟低、呼拉圈轉咗兩圈走開、跳繩跳咗三下放低、去搖下平衡板、攞咗個波又放低、而家喺度推住一架推車四圍走。佢嘅眼神不斷掃描四周，好似每樣嘢都吸引到佢但又留唔住佢。佢嘅呼吸比較淺而快。',
    context: '室內體育館自由遊戲時間，其他小朋友各自專注玩緊唔同嘢。阿康嘅注意力情況一直係教學團隊關注嘅重點，佢嘅家長正在安排教育心理學家評估',
    options: [
      { id: 'A', text: '「阿康你揀一樣玩！唔好成日轉！你咁樣乜都學唔到！」', type: 'closed', score: 1, childReaction: '揀咗籃球但十五秒後又放低，坐立不安好似被困住——佢控制唔到', childReactionEmoji: '😣', explanation: '強迫專注對注意力困難嘅兒童係極大嘅壓力，等同要求色盲嘅人分顏色', explanationPoints: ['注意力困難可能有神經發展基礎，唔係「唔聽話」', '「乜都學唔到」嘅負面預言打擊自我效能', '強迫選擇增加焦慮，焦慮進一步降低專注力', '需要調適環境而非強迫兒童適應'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「阿康，我見你好快就轉嚟轉去。你嘅身體想話俾你知咩？每次轉嘅時候感覺點？」', type: 'open', score: 10, childReaction: '停低諗咗一陣，「我唔知……我就係想郁……每樣嘢都好悶好快……但我唔係唔想玩」', childReactionEmoji: '😌', explanation: '問身體嘅訊息幫助佢開始覺察自己嘅注意力模式，「唔係唔想玩」揭示內在動機仍在', explanationPoints: ['引導身體覺察係自我認識嘅起步', '「我唔係唔想玩」揭示動機存在但執行困難', '理解「好悶好快」嘅主觀體驗有助調適活動設計', '為將來嘅專業評估提供有用嘅觀察資料'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「你鍾意邊樣最多？揀一樣我哋一齊玩。」', type: 'semi-open', score: 4, childReaction: '「我唔知邊樣最鍾意」無法從多個選項中做決定，更加焦慮', childReactionEmoji: '😐', explanation: '提供陪伴係正面嘅，但開放式選擇對注意力困難嘅兒童可能造成決策疲勞', explanationPoints: ['陪伴嘅意圖係好嘅', '但「揀一樣」對注意力困難嘅兒童係困難嘅決策', '太多選項造成決策疲勞（Decision Fatigue）', '可以嘗試提供兩個選項而非開放選擇'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你玩多陣先轉下一樣，每樣至少三分鐘。」', type: 'judgmental', score: 3, childReaction: '嘗試但好快又想轉，望住鐘好焦慮，「仲有幾耐？」', childReactionEmoji: '😐', explanation: '設定時限結構化係嘗試，但三分鐘對注意力困難嘅兒童可能係好長嘅時間', explanationPoints: ['結構化有其價值但需要配合個人能力調整', '固定時限可能增加焦慮而非建立專注', '望鐘嘅行為顯示注意力用喺計時而非活動上', '需要理解佢嘅注意力上限再設合理目標'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 58, role: 'coach', category: '規則改變', title: '想改遊戲規則',
    description: '捉人遊戲進行到一半，阿明突然企定唔郁，大聲話「呢個規則唔啱！應該要俾被捉嘅人有機會挑戰！」其他小朋友停低，有啲話「教練定嘅規則點會唔啱？」有啲話「佢嘅主意幾好喎。」場面開始分裂，兩邊開始嗌交。阿明面色漲紅，手指指住你「你定嘅規則唔公平！」',
    context: '戶外操場，遊戲進行咗十分鐘。阿明係班入面思考力最強嘅，佢嘅邏輯能力超越同齡，但社交表達方式直接到令人不舒服。佢經常挑戰權威，但理由通常有道理',
    options: [
      { id: 'A', text: '「規則係我定嘅，你要跟！唔鍾意就唔好玩！」', type: 'closed', score: 1, childReaction: '不忿但服從，內心更加抗拒，小聲講「你就係唔聽人講嘢……」', childReactionEmoji: '😤', explanation: '權威式壓制關閉咗溝通，對思考力強嘅兒童嚟講更加反效果', explanationPoints: ['以權力壓制思考力強嘅兒童，破壞尊重', '「唔鍾意就唔好玩」係情感勒索', '錯失培養批判思維同協商能力嘅機會', '可能令佢日後更加用對抗方式表達'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「阿明，你覺得規則有問題，你見到咩令你覺得唔公平？講嚟聽吓你嘅想法。」', type: 'open', score: 10, childReaction: '面色慢慢正常返，開始條理清晰咁解釋「因為跑得慢嘅人永遠被捉，佢哋就唔想玩……」', childReactionEmoji: '😌', explanation: '認真對待佢嘅觀點，引導佢用合適方式表達，將衝突轉化為群體學習機會', explanationPoints: ['認真聆聽而非壓制，尊重思考能力', '「你見到咩」引導觀察力而非情緒化表達', '佢嘅觀察（跑得慢嘅人唔想玩）可能真係有道理', '可以引導全班一齊討論，建立民主同協商能力'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「你嘅想法幾好嘅，不過我哋而家跟住呢個規則先玩，下堂先試你嘅版本。」', type: 'semi-open', score: 5, childReaction: '接受但有啲失望，「你真係會記住？」帶住質疑', childReactionEmoji: '😐', explanation: '肯定想法同延遲處理係平衡嘅做法，但需要確保真係跟進，否則破壞信任', explanationPoints: ['肯定想法係正面嘅第一步', '延遲處理保持當下活動嘅流暢性', '但如果唔跟進承諾，會嚴重破壞信任', '思考力強嘅兒童會記住你嘅每一個承諾'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「大家投票決定用邊個規則。少數服從多數。」', type: 'judgmental', score: 4, childReaction: '投票輸咗之後更加嬲，「呢個唔公平！佢哋只係因為慣咗！」', childReactionEmoji: '😤', explanation: '民主投票表面公平但多數暴力可能令少數意見被忽視，未深入討論', explanationPoints: ['投票係民主工具但唔係所有問題嘅最佳解決方案', '未經討論嘅投票係多數暴力', '阿明嘅觀點可能有道理但被數量壓過', '需要先討論理據再決定，唔係直接投票'], color: 'yellow', responsePattern: '判斷式' },
    ],
  },
  {
    id: 59, role: 'coach', category: '收拾整理', title: '唔肯執拾器材',
    description: '活動結束，你宣布執拾時間。十個小朋友開始幫手搬波、疊墊、掛繩。但阿俊直接坐喺場邊嘅長凳上面，攤開身體，話「我好攰呀教練，我對腳好痛，我唔執得……」但你留意到佢五分鐘前仲衝緊去搶波，完全無「攰」嘅跡象。其他小朋友開始投訴：「點解佢唔使做？」',
    context: '室內體育館，活動結束。器材包括二十個波、六塊軟墊、十條跳繩。阿俊過去每次都用各種理由逃避執拾。你留意到佢嘅表情唔似真攰——佢嘅眼神好精靈咁望住你嘅反應',
    options: [
      { id: 'A', text: '「唔執就下次唔俾你嚟玩！人哋都做緊，淨係你唔做！起身！」', type: 'closed', score: 1, childReaction: '不忿起身執但做得好粗暴，將波掟入箱唔係放入箱，全程臭住面', childReactionEmoji: '😤', explanation: '威脅產生嘅係被迫服從而非責任感，粗暴嘅執拾方式反映抗議', explanationPoints: ['威脅得到嘅係表面服從同暗中抗議', '粗暴執拾可能損壞器材', '其他小朋友見到「罰就要做」嘅模式，而非「大家一齊做」嘅文化', '未了解每次逃避嘅真正原因'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「阿俊，你話好攰唔想執。你嘅身體而家具體邊度唔舒服？你嘅腳邊度痛？」', type: 'open', score: 10, childReaction: '眨咗幾下眼，諗咗一陣——佢無預期你會認真問，「其實……唔係真係好痛……我只係唔想做……」', childReactionEmoji: '😌', explanation: '認真問身體狀況令佢無法繼續用謊言迴避，同時保留佢嘅面子同尊嚴', explanationPoints: ['認真對待佢嘅「理由」令佢自己發現不一致', '比揭穿謊言更有效——佢主動承認「唔係真係痛」', '保留面子同尊嚴，唔係公開拆穿', '打開咗「點解唔想做」嘅真實對話空間'], color: 'green', responsePattern: '開放式' },
      { id: 'C', text: '「大家一齊執會快啲㗎，你都係團隊一份子。」', type: 'semi-open', score: 3, childReaction: '「但我真係好攰呀」繼續坐住唔郁，唔被說服', childReactionEmoji: '😔', explanation: '團隊責任嘅道理佢聽過好多次，已經免疫——需要新嘅角度', explanationPoints: ['重複嘅道理效果遞減', '未回應佢嘅「攰」（無論真假都需要回應）', '其他小朋友嘅投訴需要被公平處理', '團隊意識需要通過體驗建立，唔只係講道理'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你執完先可以走得㗎。快啲做完快啲返屋企。」', type: 'judgmental', score: 2, childReaction: '唔情願咁起身，用最慢嘅速度執，邊執邊嘆氣——做咗但無任何成長', childReactionEmoji: '😤', explanation: '自然後果式指令令佢做咗但無建立內在責任感，下次仍然會逃避', explanationPoints: ['「做完先走」係外在動機而非內在責任', '最慢速度執係被動攻擊式抗議', '每次都用外在後果嚟推動，無建立習慣', '需要探問「唔想做」嘅根本原因'], color: 'orange', responsePattern: '判斷式' },
    ],
  },
  {
    id: 60, role: 'coach', category: '物品執著', title: '想帶玩具返屋企',
    description: '活動結束，所有小朋友排隊等家長嚟接。阿琪攬住一個中心嘅啡色絨毛熊公仔唔肯放手，雙手緊緊攬住，面貼住公仔嘅頭。佢嘅眼濕濕望住你，好細聲咁講「教練……我可唔可以帶佢返屋企？佢一個人喺度會驚……」你留意到佢嘅手指不停摩擦公仔嘅耳仔——一個自我安撫嘅動作。',
    context: '體育館出口走廊，準備離開。阿琪嘅嫲嫲即將到達。阿琪嘅家庭情況比較特殊——爸爸長期出差，媽媽工作繁忙，主要由嫲嫲照顧。佢對柔軟物品有明顯嘅依附行為，書包入面經常有一條自己嘅毛巾仔',
    options: [
      { id: 'A', text: '「呢個係中心嘅嘢，唔可以帶走㗎！快啲放低佢！」', type: 'closed', score: 1, childReaction: '攬得更加緊，開始喊，「但佢一個人會驚㗎……」全身震緊唔肯放', childReactionEmoji: '😭', explanation: '直接拒絕同催促放低忽視咗對物品嘅依附背後嘅情感需要', explanationPoints: ['強行分離觸發依附焦慮反應', '「佢會驚」係投射自己嘅孤單感', '忽視自我安撫行為（摩擦耳仔）嘅意義', '破壞同教練嘅信任連結'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你下次嚟又可以見到佢㗎，佢會喺度等你。」', type: 'semi-open', score: 4, childReaction: '「但中間嗰幾日佢好孤單……」仍然唔肯放，延遲策略對佢無效', childReactionEmoji: '😢', explanation: '延遲重逢嘅承諾有部分安慰作用，但未處理「中間」嘅分離焦慮', explanationPoints: ['「下次見」提供一定嘅確定性', '但分離焦慮嘅核心係「中間冇人陪」嘅恐懼', '佢嘅擔心係投射——「幾日好孤單」描述嘅係自己', '需要回應投射背後嘅真實感受'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「俾返佢啦，不如我哋影張相記住佢，你可以成日睇。」', type: 'judgmental', score: 5, childReaction: '猶豫考慮緊，「但相片唔可以攬……」揭示佢需要嘅係觸覺安慰', childReactionEmoji: '😐', explanation: '替代方案有創意，但「唔可以攬」嘅回應揭示佢需要嘅係物理觸覺而非視覺記憶', explanationPoints: ['影相係有創意嘅替代方案', '但佢嘅需要係觸覺安撫（攬、摸耳仔），相片滿足唔到', '揭示物品依附嘅感官維度——觸覺需要', '可以喺理解需要後提供更貼合嘅替代方案'], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '（蹲低同佢講）「阿琪，你好鍾意呢個公仔。佢有咩咁特別？你攬住佢嘅時候感覺點？」', type: 'open', score: 10, childReaction: '將面埋入公仔，「佢好暖……攬住佢我就唔驚……喺屋企有時得我一個人……」', childReactionEmoji: '🥺', explanation: '問「攬住佢感覺點」連結到觸覺安撫嘅需要，揭示孤單感係依附行為嘅根源', explanationPoints: ['問「有咩特別」打開情感表達嘅空間', '「攬住佢感覺點」連結感官體驗同情緒需要', '「得我一個人」揭示家庭照顧嘅缺口', '理解根源後可以同家長溝通，提供更全面嘅支援'], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default coachScenarios;
