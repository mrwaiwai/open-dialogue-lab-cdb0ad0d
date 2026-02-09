import type { Scenario } from '@/types/game';

const coachScenarios: Scenario[] = [
  {
    id: 41, role: 'coach', category: '參與意願', title: '熱身活動拒絕參與',
    description: '訓練班開始，所有小朋友圍圈做熱身操，但你見到嘉嘉企喺圈外約兩米位置，低頭望住地下，雙手緊握，無加入。',
    context: '室內體育館，其他小朋友開心做熱身',
    options: [
      { id: 'A', text: '「唔想玩就返屋企！大家等緊你！」', type: 'closed', score: 0, childReaction: '眼淚湧出轉身想離開', childReactionEmoji: '😢', explanation: '威脅式回應傷害安全感', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「快啲入嚟，好好玩㗎！大家一齊玩！」', type: 'semi-open', score: 4, childReaction: '遲疑行入少少但身體僵硬', childReactionEmoji: '😰', explanation: '催促未理解恐懼根源', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以企喺度睇住先。」', type: 'judgmental', score: 3, childReaction: '繼續企喺一邊但仍然孤立', childReactionEmoji: '😐', explanation: '容許但未探問原因', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「嘉嘉，我見到你企喺一邊。而家你嘅身體感覺係點？」', type: 'open', score: 10, childReaction: '抬頭望教練，開始講出擔憂', childReactionEmoji: '😌', explanation: '接納當下讓孩子用自己節奏參與', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 42, role: 'coach', category: '挫折處理', title: '比賽輸咗情緒失控',
    description: '接力賽結束，俊仔所屬隊伍輸咗。佢突然大力踢開地上嘅錐筒，然後坐喺地下，雙手抱頭，肩膀不停震動。',
    context: '運動場，其他小朋友繼續開心玩',
    options: [
      { id: 'A', text: '「輸咗就發脾氣？你咁樣好無品！」', type: 'closed', score: 0, childReaction: '更激動，開始大喊甚至打自己', childReactionEmoji: '😡', explanation: '責備令挫折感加劇', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「無事㗎，係遊戲啫，唔緊要！」', type: 'semi-open', score: 3, childReaction: '感到不被理解，繼續坐喺地下', childReactionEmoji: '😔', explanation: '輕描淡寫否定真實感受', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「冷靜下先，深呼吸。」', type: 'judgmental', score: 4, childReaction: '嘗試但情緒仍然強烈', childReactionEmoji: '😣', explanation: '技巧有用但未接住情緒', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「俊仔，我見到你輸咗之後好激動，你而家感覺好失望？」', type: 'open', score: 10, childReaction: '喊出聲，開始表達挫敗感', childReactionEmoji: '😭', explanation: '承認情緒真實性陪伴處理', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 43, role: 'coach', category: '合作意願', title: '拒絕傳波給隊友',
    description: '小組遊戲需要團隊傳波，但浩然拎住個波好耐都唔肯傳出去，其他隊友伸手等緊。佢緊緊抱住個波。',
    context: '體育館，其他隊伍順利進行',
    options: [
      { id: 'A', text: '「再唔傳波就唔俾你玩！快傳！」', type: 'closed', score: 0, childReaction: '勉強拋波但力度大或亂拋', childReactionEmoji: '😠', explanation: '威脅未解決心理障礙', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「係 team work 嚟㗎，要傳俾人！」', type: 'semi-open', score: 3, childReaction: '依然緊張，慢慢傳但焦慮', childReactionEmoji: '😰', explanation: '講道理但未理解恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你唔傳其他人都玩唔到㗎喎。」', type: 'judgmental', score: 2, childReaction: '內疚但仍然猶豫', childReactionEmoji: '😔', explanation: '內疚式勸說未解決根本', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「浩然，我見你拎住個波好耐，好似唔想傳出去。你擔心啲咩？」', type: 'open', score: 10, childReaction: '講出擔憂：怕傳唔好、怕被鬧', childReactionEmoji: '😌', explanation: '理解行為背後需要', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 44, role: 'coach', category: '分離焦慮', title: '新小朋友緊抱家長唔肯入場',
    description: '新學員第一日嚟到，喺門口緊緊攬住媽媽嘅腳，大喊「唔好走！」其他小朋友已經開始活動。',
    context: '體育館入口，媽媽蹲低安慰緊',
    options: [
      { id: 'A', text: '「你唔好咁曳，媽媽一陣返嚟！」', type: 'closed', score: 1, childReaction: '攬得更緊，喊得更大聲', childReactionEmoji: '😭', explanation: '否定恐懼加劇分離焦慮', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「入面好好玩㗎！有好多玩具！」', type: 'semi-open', score: 4, childReaction: '望咗一眼但仍然唔肯放手', childReactionEmoji: '😰', explanation: '利誘但未處理分離恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「媽媽喺門口等你，入完去就見到。」', type: 'judgmental', score: 3, childReaction: '半信半疑仍然猶豫', childReactionEmoji: '😣', explanation: '保證但未接納恐懼', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '（蹲低）「你好驚因為呢度係新嘅地方。你想點做？可以先喺門口睇住。」', type: 'open', score: 10, childReaction: '喊聲慢慢細，點頭坐喺門口', childReactionEmoji: '🥺', explanation: '接納恐懼提供漸進參與', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 45, role: 'coach', category: '過度興奮', title: '完成挑戰後過度興奮撞人',
    description: '小明完成障礙賽後超興奮，開始亂跑亂跳，不小心撞跌咗另一個小朋友。被撞嘅小朋友坐喺地下喊。',
    context: '運動場，被撞嘅小朋友坐喺地下',
    options: [
      { id: 'A', text: '「你做咩撞人？坐低唔好郁！」', type: 'closed', score: 1, childReaction: '興奮即刻變恐懼', childReactionEmoji: '😰', explanation: '懲罰興奮令小朋友混亂', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「快啲同佢講sorry！唔應該亂跑。」', type: 'semi-open', score: 4, childReaction: '機械式講sorry但無理解', childReactionEmoji: '😐', explanation: '指令道歉無助建立同理心', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你開心係好，但要睇路。」', type: 'judgmental', score: 3, childReaction: '聽到但未必記住', childReactionEmoji: '😐', explanation: '教導但時機未到', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「小明，你好開心我睇到！你留意到你撞到人，佢而家點？」', type: 'open', score: 10, childReaction: '望向被撞嘅人，主動走過去', childReactionEmoji: '😮', explanation: '肯定興奮引導留意他人', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 46, role: 'coach', category: '攻擊行為', title: '追逐遊戲突然推跌他人',
    description: '追逐遊戲中，阿昊突然用力推咗前面嘅小朋友，令佢仆倒。阿昊企咗喺度望住，面上好似有啲得意又有啲驚。',
    context: '草地，被推跌嘅小朋友膝頭擦損',
    options: [
      { id: 'A', text: '「你做咩推人？出去罰企！」', type: 'closed', score: 0, childReaction: '不忿行出去，「佢先嗌我」', childReactionEmoji: '😤', explanation: '懲罰無了解動機', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「推人唔啱㗎，要同佢講sorry。」', type: 'semi-open', score: 3, childReaction: '勉強講sorry但唔情願', childReactionEmoji: '😐', explanation: '說教式糾正無助理解背後原因', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你去幫佢起身先。」', type: 'judgmental', score: 4, childReaction: '做咗但無真正反思', childReactionEmoji: '😐', explanation: '指令行動未處理情緒', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿昊，我見到你推咗佢。你嗰一刻心入面係咩感覺？」', type: 'open', score: 10, childReaction: '低頭講出被人嗌花名感到嬲', childReactionEmoji: '😔', explanation: '了解攻擊背後的情緒', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 47, role: 'coach', category: '恐懼挑戰', title: '面對平衡木恐懼發抖',
    description: '到咗平衡木活動，所有小朋友都排隊等。阿詩排到最前，但企咗喺平衡木前面好耐，雙腳震緊，眼濕濕望住你。',
    context: '體育館，平衡木高約30cm',
    options: [
      { id: 'A', text: '「人哋都做到，你都做得到！上去！」', type: 'closed', score: 2, childReaction: '勉強上去但雙腳發軟喊住落', childReactionEmoji: '😭', explanation: '比較式鼓勵增加壓力', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「唔使驚，好安全，我扶住你。」', type: 'semi-open', score: 5, childReaction: '拖住你隻手但唔敢放手', childReactionEmoji: '😰', explanation: '提供安全感但未處理恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以等下一輪再嚟。」', type: 'judgmental', score: 3, childReaction: '鬆一口氣但恐懼仍在', childReactionEmoji: '😐', explanation: '容許迴避但未處理', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿詩，你企咗好耐，你嘅身體邊度覺得最驚？你想點做？」', type: 'open', score: 10, childReaction: '指住個肚話「呢度好緊」自己話想先踩低嗰條', childReactionEmoji: '😌', explanation: '讓小朋友辨識身體感受自主決定', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 48, role: 'coach', category: '退出行為', title: '輸咗就話「唔玩喇」',
    description: '搶旗遊戲中，美琪連續三次被人搶走旗仔。佢突然停低，坐喺場邊話「我唔玩喇，好無聊！」',
    context: '運動場，其他小朋友繼續玩',
    options: [
      { id: 'A', text: '「咁快就放棄？你要學堅持！」', type: 'closed', score: 1, childReaction: '翻白眼更加唔想玩', childReactionEmoji: '😤', explanation: '道德式批評令退出更堅定', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「我教你技巧，你一定搶到！」', type: 'semi-open', score: 4, childReaction: '聽教但無動力，核心係挫敗感', childReactionEmoji: '😐', explanation: '技術指導有用但未處理情緒', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「咁你做下休息都得。」', type: 'judgmental', score: 3, childReaction: '繼續坐喺一邊無參與', childReactionEmoji: '😔', explanation: '容許但未鼓勵回來', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「美琪，你話唔想玩，係咪因為被人搶走令你好唔開心？」', type: 'open', score: 10, childReaction: '點頭「我點都搶唔到」講出挫敗', childReactionEmoji: '😢', explanation: '辨識退出背後的挫敗感', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 49, role: 'coach', category: '競爭心態', title: '永遠想做第一個',
    description: '每個活動開始前，阿軒都衝到最前，推開其他人排隊。今次佢推咗一個細嘅小朋友跌倒，仍然嗌「我第一！」',
    context: '體育館排隊位置',
    options: [
      { id: 'A', text: '「你推人！排返隊尾！」', type: 'closed', score: 1, childReaction: '不忿服從但下次仲係會爭', childReactionEmoji: '😤', explanation: '懲罰無改變內在動機', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「做第一唔代表最叻㗎。」', type: 'semi-open', score: 3, childReaction: '唔明白繼續爭', childReactionEmoji: '😐', explanation: '道理太抽象', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你要讓其他人先。」', type: 'judgmental', score: 2, childReaction: '被迫讓但唔明點解', childReactionEmoji: '😔', explanation: '要求但未解釋', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿軒，你好想做第一個。做第一對你嚟講有咩意義？」', type: 'open', score: 10, childReaction: '停低諗「因為第一個最叻」開始反思', childReactionEmoji: '🤔', explanation: '探問信念了解競爭動機', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 50, role: 'coach', category: '等待困難', title: '唔肯等待輪候',
    description: '射球活動需要排隊等，但阿朗不停插隊、碰其他人、發出怪聲。佢嘅身體無法靜止超過十秒。',
    context: '體育館，排隊等射球',
    options: [
      { id: 'A', text: '「你企好！唔好郁！再插隊唔俾玩！」', type: 'closed', score: 0, childReaction: '企好三秒又開始郁，根本控制唔到', childReactionEmoji: '😣', explanation: '要求靜止對高活動量兒童極困難', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你可以原地跳住等。」', type: 'semi-open', score: 5, childReaction: '跳咗一陣比較開心等', childReactionEmoji: '😊', explanation: '替代行為但未了解根本需要', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「等唔到就出去冷靜。」', type: 'judgmental', score: 2, childReaction: '唔想出去但又靜唔到', childReactionEmoji: '😔', explanation: '隔離未處理需要', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿朗，我見你好難企定，你嘅身體係咪好想郁？等緊嘅時候覺得點？」', type: 'open', score: 10, childReaction: '點頭「我好想郁㗎」講出感受', childReactionEmoji: '😌', explanation: '理解感覺統合需要不批判', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 51, role: 'coach', category: '器材使用', title: '見到器材就亂拋',
    description: '你將呼拉圈排好準備活動，但阿康一見到就開始亂拋呼拉圈，仲掟上空，完全無聽指示。',
    context: '體育館，呼拉圈散晒一地',
    options: [
      { id: 'A', text: '「放低！你搞亂晒！」', type: 'closed', score: 1, childReaction: '放低但臭住面無理解', childReactionEmoji: '😤', explanation: '制止但無教導適當使用', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「呼拉圈唔係用嚟掟，等我教你點用。」', type: 'semi-open', score: 5, childReaction: '願意聽但好快又想自己玩', childReactionEmoji: '😐', explanation: '教導有效但未理解衝動', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你破壞器材就要執好佢。」', type: 'judgmental', score: 3, childReaction: '執好但依然想玩', childReactionEmoji: '😐', explanation: '後果式教育但未處理興奮', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿康，你一見到呼拉圈就好興奮！你最想用佢做啲咩？」', type: 'open', score: 10, childReaction: '「我想掟佢飛好遠！」表達創意', childReactionEmoji: '😊', explanation: '將衝動轉化為表達後引導', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 52, role: 'coach', category: '自我效能', title: '話「我做唔到」坐低',
    description: '新活動需要跳過三個障礙物，阿欣望咗一眼就即刻坐低，雙手攬住膝頭，搖頭話「我做唔到，我做唔到。」',
    context: '障礙物高度適中，其他小朋友正在嘗試',
    options: [
      { id: 'A', text: '「你試都未試過點知做唔到？起身！」', type: 'closed', score: 2, childReaction: '更加縮埋覺得被迫做恐怖嘅事', childReactionEmoji: '😰', explanation: '否定恐懼令自信下降', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「我陪你一齊做，好簡單㗎。」', type: 'semi-open', score: 5, childReaction: '猶豫但對「好簡單」感到壓力', childReactionEmoji: '😣', explanation: '陪伴好但講「好簡單」否定困難', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以做矮啲嗰個先。」', type: 'judgmental', score: 4, childReaction: '考慮但仍然猶豫', childReactionEmoji: '😐', explanation: '降低難度但未處理恐懼', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿欣，你話做唔到。望住啲障礙物嘅時候身體話俾你知咩？」', type: 'open', score: 10, childReaction: '「我個心跳好快」開始辨識恐懼', childReactionEmoji: '😌', explanation: '引導身體覺察建立內在勇氣', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 53, role: 'coach', category: '依附行為', title: '只想同教練玩唔理其他人',
    description: '曉彤成堂都黏住你，拖住你隻手，唔肯同其他小朋友一齊活動。其他小朋友開始唔耐煩。',
    context: '體育館，其他小朋友望住',
    options: [
      { id: 'A', text: '「你要自己去玩，教練要照顧其他人。」', type: 'closed', score: 2, childReaction: '放手但企喺角落唔敢互動', childReactionEmoji: '😢', explanation: '直接推開令依附更不安全', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你可以同小明一齊玩，佢好友善。」', type: 'semi-open', score: 4, childReaction: '望咗小明一眼但搖頭', childReactionEmoji: '😰', explanation: '安排社交但未處理依附', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「我哋一齊做完呢個活動你再自己玩。」', type: 'judgmental', score: 3, childReaction: '暫時接受但仍黏住', childReactionEmoji: '😐', explanation: '設限但未了解需要', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「曉彤，你好想同我一齊。同其他小朋友嘅時候感覺係點？」', type: 'open', score: 10, childReaction: '「我驚佢哋唔鍾意我」真實恐懼揭示', childReactionEmoji: '🥺', explanation: '了解依附背後的社交恐懼', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 54, role: 'coach', category: '模仿行為', title: '模仿他人攻擊行為',
    description: '自由遊戲時間，你見到阿俊學電視劇角色做出攻擊動作，用手做出「開槍」姿勢指住其他小朋友，被指嘅小朋友好驚。',
    context: '遊戲區，被指嘅小朋友退後',
    options: [
      { id: 'A', text: '「唔好做呢啲動作！好危險！」', type: 'closed', score: 2, childReaction: '停咗但去另一邊繼續覺得好玩', childReactionEmoji: '😏', explanation: '禁止但未處理模仿動機', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「玩其他嘢啦，呢啲唔適合。」', type: 'semi-open', score: 3, childReaction: '轉玩但唔明點解', childReactionEmoji: '😐', explanation: '轉移但未解釋', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你嚇親人喇，佢好驚。」', type: 'judgmental', score: 4, childReaction: '望咗望對方但無特別反應', childReactionEmoji: '😐', explanation: '指出影響但未深入', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿俊，你喺度扮緊咩？你見到佢嘅表情係點？」', type: 'open', score: 10, childReaction: '望向對方「佢好驚」開始反思', childReactionEmoji: '🤔', explanation: '引導觀察他人反應建立同理心', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 55, role: 'coach', category: '成功態度', title: '成功後取笑其他人',
    description: '阿朗成功投籃後開始大聲笑，指住未投中嘅小朋友話「你好渣！」被笑嘅小朋友面色變紅。',
    context: '籃球場，其他小朋友排隊等',
    options: [
      { id: 'A', text: '「唔好笑人！好無禮貌！」', type: 'closed', score: 2, childReaction: '停咗但仍然覺得自己叻', childReactionEmoji: '😏', explanation: '責備但未處理優越感', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「大家都係嚟學，唔使比較。」', type: 'semi-open', score: 4, childReaction: '聽到但唔太明白', childReactionEmoji: '😐', explanation: '道理但太抽象', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你同佢講sorry。」', type: 'judgmental', score: 3, childReaction: '敷衍講sorry', childReactionEmoji: '😐', explanation: '指令但無真正反思', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿朗，你投到好開心。你望下佢嘅表情，佢而家感覺係點？」', type: 'open', score: 10, childReaction: '望咗望「佢好唔開心」開始意識到', childReactionEmoji: '😮', explanation: '引導觀察他人感受', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 56, role: 'coach', category: '挫折恢復', title: '受傷後唔肯再嘗試',
    description: '上次練習時跌親嘅阿琪今日返嚟，但一見到相同嘅活動就退後，話「我唔做呢個，我會跌」。',
    context: '體育館，上次跌親嘅位置',
    options: [
      { id: 'A', text: '「上次跌咗今次就唔會㗎，嚟！」', type: 'closed', score: 2, childReaction: '搖頭後退更加驚', childReactionEmoji: '😰', explanation: '否定恐懼無法消除創傷', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「好安全㗎，我會睇住你。」', type: 'semi-open', score: 5, childReaction: '猶豫但仍然驚', childReactionEmoji: '😣', explanation: '保證但創傷記憶仍在', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以做其他活動先。」', type: 'judgmental', score: 4, childReaction: '鬆一口氣但迴避持續', childReactionEmoji: '😌', explanation: '容許但未處理恐懼', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿琪，你仲記得上次跌嗰陣嘅感覺。你身體而家點？想同我講講嗎？」', type: 'open', score: 10, childReaction: '「我隻腳仲記得好痛」開始講出創傷', childReactionEmoji: '🥺', explanation: '承認創傷記憶讓其被說出來', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 57, role: 'coach', category: '專注困難', title: '不斷轉換活動無專注',
    description: '自由遊戲時間，阿康由籃球玩到呼拉圈再玩到繩，每樣都玩唔夠一分鐘就轉。佢四圍走，無法定落嚟。',
    context: '體育館自由遊戲時間',
    options: [
      { id: 'A', text: '「你揀一樣玩！唔好成日轉！」', type: 'closed', score: 1, childReaction: '揀咗一樣但坐立不安', childReactionEmoji: '😣', explanation: '強迫專注但無法持續', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你鍾意邊樣最多？」', type: 'semi-open', score: 4, childReaction: '「我唔知」無法決定', childReactionEmoji: '😐', explanation: '問題但未觸及核心', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「玩多陣先轉下一樣。」', type: 'judgmental', score: 3, childReaction: '嘗試但好快又想轉', childReactionEmoji: '😐', explanation: '設限但未理解需要', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿康，我見你好快就轉嚟轉去，你嘅身體想話俾你知咩？」', type: 'open', score: 10, childReaction: '「我唔知，我就係想郁」開始覺察', childReactionEmoji: '😌', explanation: '引導身體覺察理解需要', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 58, role: 'coach', category: '規則改變', title: '想改遊戲規則',
    description: '玩緊捉人遊戲，阿明突然話「呢個規則唔啱，應該要咁玩！」其他小朋友唔同意，開始嗌交。',
    context: '操場，遊戲進行中',
    options: [
      { id: 'A', text: '「規則係我定嘅，你要跟！」', type: 'closed', score: 1, childReaction: '不忿但服從，內心抗拒', childReactionEmoji: '😤', explanation: '強制服從無發展自主', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你嘅想法幾好，不過而家跟住呢個先。」', type: 'semi-open', score: 5, childReaction: '接受但有啲失望', childReactionEmoji: '😐', explanation: '肯定但未深入探討', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「大家投票決定。」', type: 'judgmental', score: 4, childReaction: '輸咗投票更加嬲', childReactionEmoji: '😤', explanation: '民主但未處理需要', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿明，你想改規則，你覺得而家嘅規則有咩問題？」', type: 'open', score: 10, childReaction: '開始解釋覺得唔公平嘅地方', childReactionEmoji: '😌', explanation: '了解改變動機再討論', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 59, role: 'coach', category: '收拾整理', title: '唔肯執拾器材',
    description: '活動完結，所有小朋友都幫手執器材，但阿俊坐喺一邊話「我好攰，我唔執」。',
    context: '體育館，器材散落各處',
    options: [
      { id: 'A', text: '「唔執就下次唔俾你玩！」', type: 'closed', score: 1, childReaction: '不忿起身執但臭住面', childReactionEmoji: '😤', explanation: '威脅但未建立責任感', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「大家一齊執快啲㗎。」', type: 'semi-open', score: 3, childReaction: '「但我真係好攰」繼續唔郁', childReactionEmoji: '😔', explanation: '鼓勵但未回應攰', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你執完先走得。」', type: 'judgmental', score: 2, childReaction: '唔情願執', childReactionEmoji: '😤', explanation: '強制但無內在動機', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「阿俊，你話好攰唔想執。你嘅身體而家感覺點？」', type: 'open', score: 10, childReaction: '「我隻腳好酸」開始講身體狀況', childReactionEmoji: '😌', explanation: '了解攰嘅原因再處理', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 60, role: 'coach', category: '物品執著', title: '想帶玩具返屋企',
    description: '活動完結，阿琪攬住一個公仔唔肯放手，話「我好鍾意佢，我想帶返屋企」。眼濕濕望住你。',
    context: '體育館出口，準備離開',
    options: [
      { id: 'A', text: '「呢個係中心嘅，唔可以帶走！」', type: 'closed', score: 1, childReaction: '開始喊攬得更緊', childReactionEmoji: '😭', explanation: '直接拒絕無處理情緒', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你下次嚟又可以玩㗎。」', type: 'semi-open', score: 4, childReaction: '「但我想佢喺我身邊」', childReactionEmoji: '😢', explanation: '延遲但未處理依附', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「俾返佢，我哋影張相記住佢。」', type: 'judgmental', score: 5, childReaction: '猶豫考慮緊', childReactionEmoji: '😐', explanation: '替代方案但未探問', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿琪，你好鍾意呢個公仔。佢有咩咁特別令你想帶走？」', type: 'open', score: 10, childReaction: '開始講佢同公仔嘅故事', childReactionEmoji: '🥺', explanation: '了解依附背後的情感連結', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default coachScenarios;
