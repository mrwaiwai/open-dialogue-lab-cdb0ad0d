import type { Scenario } from '@/types/game';

const coachScenarios: Scenario[] = [
  {
    id: 41, role: 'coach', category: '參與意願', title: '熱身活動拒絕參與',
    description: '訓練班開始，所有小朋友圍圈做熱身操，但你見到嘉嘉企喺圈外約兩米位置，低頭望住地下，雙手緊握，無加入。',
    context: '室內體育館，其他小朋友開心做熱身，音樂播放中',
    options: [
      { id: 'A', text: '「唔想玩就返屋企啦！大家等緊你！」', type: 'closed', score: 0, childReaction: '小朋友眼淚湧出，轉身想離開，感到被拒絕和羞愧', childReactionEmoji: '😢', explanation: '威脅式回應傷害安全感', explanationPoints: [], color: 'red', responsePattern: '封閉式/威脅式' },
      { id: 'B', text: '「快啲入嚟，好好玩㗎！大家一齊玩！」', type: 'semi-open', score: 4, childReaction: '小朋友遲疑行入少少，但身體僵硬，動作勉強', childReactionEmoji: '😰', explanation: '催促式鼓勵未理解恐懼根源', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「嘉嘉，我見到你企喺一邊，無加入熱身。而家你嘅身體感覺係點？」', type: 'open', score: 10, childReaction: '小朋友抬頭望教練，身體放鬆，開始講出擔憂', childReactionEmoji: '😌', explanation: '接納當下狀態，讓孩子用自己節奏參與', explanationPoints: ['遊戲治療核心：接納', '讓孩子自己決定', '建立安全感'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 42, role: 'coach', category: '挫折處理', title: '比賽輸咗情緒失控',
    description: '接力賽結束，俊仔所屬隊伍輸咗。佢突然大力踢開地上嘅錐筒，然後坐喺地下，雙手抱頭，肩膀不停震動。',
    context: '運動場，其他小朋友繼續開心玩，俊仔獨自坐地上',
    options: [
      { id: 'A', text: '「輸咗就發脾氣？你咁樣好無品！企返起身！」', type: 'closed', score: 0, childReaction: '小朋友更激動，開始大喊甚至打自己，情緒完全失控', childReactionEmoji: '😡', explanation: '責備情緒令挫折感加劇', explanationPoints: [], color: 'red', responsePattern: '封閉式/責備式' },
      { id: 'B', text: '「無事㗎，係遊戲啫，唔緊要！下次再嚟！」', type: 'semi-open', score: 3, childReaction: '小朋友感到不被理解，繼續坐喺地下', childReactionEmoji: '😔', explanation: '輕描淡寫否定真實感受', explanationPoints: [], color: 'orange', responsePattern: '半開放式/否定式' },
      { id: 'C', text: '「俊仔，我見到你輸咗之後好激動，你而家感覺好失望？」', type: 'open', score: 10, childReaction: '小朋友喊出聲，開始表達挫敗感和對自己的失望', childReactionEmoji: '😭', explanation: '承認情緒真實性，透過遊戲處理挫折', explanationPoints: ['承認情緒', '陪伴而非糾正', '學習情緒調節'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 43, role: 'coach', category: '合作意願', title: '拒絕傳波給隊友',
    description: '小組遊戲需要團隊傳波，但浩然拎住個波好耐都唔肯傳出去，其他隊友伸手等緊。佢緊緊抱住個波。',
    context: '體育館，其他隊伍順利進行，浩然的隊友開始埋怨',
    options: [
      { id: 'A', text: '「你再唔傳波就唔俾你玩！快啲傳！」', type: 'closed', score: 0, childReaction: '小朋友勉強拋波但力度好大或亂拋，感到被針對', childReactionEmoji: '😠', explanation: '威脅令行為服從但未解決心理障礙', explanationPoints: [], color: 'red', responsePattern: '封閉式/威脅式' },
      { id: 'B', text: '「係 team work 嚟㗎，要傳俾其他人！」', type: 'semi-open', score: 3, childReaction: '小朋友依然緊張，慢慢傳波但表情焦慮', childReactionEmoji: '😰', explanation: '講道理但未理解恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式/說教式' },
      { id: 'C', text: '「浩然，我見到你拎住個波好耐，好似唔想傳出去。你擔心啲咩？」', type: 'open', score: 10, childReaction: '小朋友講出擔憂：怕傳唔好、怕被鬧', childReactionEmoji: '😌', explanation: '理解行為背後需要，逐步建立信任', explanationPoints: ['理解掌控需要', '降低恐懼', '漸進式建立信任'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 44, role: 'coach', category: '分離焦慮', title: '新小朋友緊抱家長唔肯入場',
    description: '新學員第一日嚟到，喺門口緊緊攬住媽媽嘅腳，大喊「唔好走！」其他小朋友已經開始活動。',
    context: '體育館入口，媽媽蹲低安慰緊',
    options: [
      { id: 'A', text: '「你唔好咁曳，媽媽一陣就返嚟㗎喇！」', type: 'closed', score: 1, childReaction: '攬得更緊，喊得更大聲', childReactionEmoji: '😭', explanation: '否定恐懼加劇分離焦慮', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「入面好好玩㗎！有好多玩具！嚟！」', type: 'semi-open', score: 4, childReaction: '望咗一眼入面但仍然唔肯放手', childReactionEmoji: '😰', explanation: '利誘但未處理分離恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '（蹲低）「你而家好驚，因為呢度係新嘅地方。你想點做？你可以先同媽媽坐喺門口睇住。」', type: 'open', score: 10, childReaction: '喊聲慢慢細咗，點頭坐喺門口，過咗一陣自己行入少少', childReactionEmoji: '🥺', explanation: '接納恐懼，提供漸進式參與選項', explanationPoints: ['尊重節奏', '提供安全選項', '漸進式參與'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 45, role: 'coach', category: '過度興奮', title: '完成挑戰後過度興奮撞人',
    description: '小明完成障礙賽後超興奮，開始亂跑亂跳，不小心撞跌咗另一個小朋友。被撞嘅小朋友坐喺地下喊。',
    context: '運動場，被撞嘅小朋友坐喺地下',
    options: [
      { id: 'A', text: '「你做咩撞人？坐低唔好郁！」', type: 'closed', score: 1, childReaction: '興奮即刻變恐懼，唔知點反應', childReactionEmoji: '😰', explanation: '懲罰興奮行為令小朋友混亂', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「快啲同佢講sorry！你唔應該亂跑。」', type: 'semi-open', score: 4, childReaction: '機械式講sorry但無真正理解', childReactionEmoji: '😐', explanation: '指令道歉無助建立真正同理心', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「小明，你好開心我睇到！你留意到你撞到另一個小朋友，佢而家點？」', type: 'open', score: 10, childReaction: '望向被撞嘅小朋友，表情由興奮變關心，主動走過去', childReactionEmoji: '😮', explanation: '肯定興奮同時引導留意他人，培養同理心', explanationPoints: ['肯定正面情緒', '引導注意他人', '培養同理心'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 46, role: 'coach', category: '攻擊行為', title: '追逐遊戲突然推跌他人',
    description: '追逐遊戲中，阿昊突然用力推咗前面嘅小朋友，令佢仆倒。阿昊企咗喺度望住，面上好似有啲得意又有啲驚。',
    context: '草地，被推跌嘅小朋友膝頭擦損',
    options: [
      { id: 'A', text: '「你做咩推人？出去罰企！」', type: 'closed', score: 0, childReaction: '不忿地行出去，口中細聲話「佢先嗌我」', childReactionEmoji: '😤', explanation: '懲罰無了解動機，仇恨加深', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「推人唔啱㗎，你要同佢講sorry。」', type: 'semi-open', score: 3, childReaction: '勉強講sorry但明顯唔情願', childReactionEmoji: '😐', explanation: '說教式糾正無助理解攻擊背後原因', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿昊，我見到你推咗佢。你嗰一刻心入面係咩感覺？發生咩事？」', type: 'open', score: 10, childReaction: '低頭，開始講出被人嗌花名感到嬲', childReactionEmoji: '😔', explanation: '了解攻擊背後的情緒和觸發點', explanationPoints: ['攻擊常有觸發因素', '了解動機', '教導替代表達方式'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 47, role: 'coach', category: '恐懼挑戰', title: '面對平衡木恐懼發抖',
    description: '到咗平衡木活動，所有小朋友都排隊等。阿詩排到最前，但企咗喺平衡木前面好耐，雙腳震緊，眼濕濕望住你。',
    context: '體育館，平衡木高約30cm，有軟墊',
    options: [
      { id: 'A', text: '「你睇人哋都做到，你都做得到！上去啦！」', type: 'closed', score: 2, childReaction: '勉強上去但雙腳發軟，中途喊住落返嚟', childReactionEmoji: '😭', explanation: '比較式鼓勵增加壓力', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「唔使驚，好安全㗎，我扶住你。」', type: 'semi-open', score: 5, childReaction: '拖住你隻手行但完全唔敢放手', childReactionEmoji: '😰', explanation: '提供安全感但未處理恐懼本身', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿詩，你企咗喺度好耐，你嘅身體邊度覺得最驚？你想點做？」', type: 'open', score: 10, childReaction: '指住個肚話「呢度好緊」，然後自己話「我想先踩低嗰條」', childReactionEmoji: '😌', explanation: '讓小朋友辨識身體感受，自己決定參與程度', explanationPoints: ['身體覺察', '自主決定', '漸進式挑戰'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 48, role: 'coach', category: '退出行為', title: '輸咗就話「唔玩喇」',
    description: '搶旗遊戲中，美琪連續三次被人搶走旗仔。佢突然停低，坐喺場邊話「我唔玩喇，好無聊！」',
    context: '運動場，其他小朋友繼續玩',
    options: [
      { id: 'A', text: '「咁快就放棄？你要學堅持！」', type: 'closed', score: 1, childReaction: '翻白眼，更加唔想玩', childReactionEmoji: '😤', explanation: '道德式批評令退出行為更堅定', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「我教你技巧，你一定搶到！」', type: 'semi-open', score: 4, childReaction: '聽教但仍然無動力，因為核心問題係挫敗感', childReactionEmoji: '😐', explanation: '技術指導有用但未處理情緒', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「美琪，你話唔想玩，係咪因為被人搶走旗仔令你好唔開心？」', type: 'open', score: 10, childReaction: '點頭，「我點都搶唔到...」開始講出挫敗感和自卑', childReactionEmoji: '😢', explanation: '辨識退出背後的挫敗感和自信問題', explanationPoints: ['退出常因挫敗', '先處理情緒', '再討論策略'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 49, role: 'coach', category: '競爭心態', title: '永遠想做第一個',
    description: '每個活動開始前，阿軒都衝到最前，推開其他人排隊。今次佢推咗一個細嘅小朋友跌倒，仍然嗌「我第一！」',
    context: '體育館排隊位置',
    options: [
      { id: 'A', text: '「你推人！排返隊尾！」', type: 'closed', score: 1, childReaction: '不忿但服從，下次仲係會爭', childReactionEmoji: '😤', explanation: '懲罰無改變內在動機', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「做第一唔代表最叻㗎。」', type: 'semi-open', score: 3, childReaction: '唔明白，繼續爭', childReactionEmoji: '😐', explanation: '道理太抽象', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿軒，你好想做第一個。做第一對你嚟講有咩意義？」', type: 'open', score: 10, childReaction: '停低諗，「因為第一個最叻嘛...」開始反思', childReactionEmoji: '🤔', explanation: '探問信念系統，了解競爭背後的需要', explanationPoints: ['了解競爭動機', '探問信念', '引導多元價值觀'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 50, role: 'coach', category: '等待困難', title: '唔肯等待輪候',
    description: '射球活動需要排隊等，但阿朗不停插隊、碰其他人、發出怪聲。佢嘅身體無法靜止超過十秒。',
    context: '體育館，排隊等射球',
    options: [
      { id: 'A', text: '「你企好！唔好郁！再插隊就唔俾你玩！」', type: 'closed', score: 0, childReaction: '企好三秒又開始郁，根本控制唔到', childReactionEmoji: '😣', explanation: '要求靜止對高活動量兒童極困難', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你可以原地跳住等。」', type: 'semi-open', score: 5, childReaction: '跳咗一陣，比較開心等緊', childReactionEmoji: '😊', explanation: '提供替代行為但未了解根本需要', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿朗，我見你好難企定定，你嘅身體係咪好想郁？等緊嘅時候你覺得點？」', type: 'open', score: 10, childReaction: '點頭話「我好想郁㗎」，開始講自己嘅感受', childReactionEmoji: '😌', explanation: '理解感覺統合需要，不批判高活動量', explanationPoints: ['理解而非壓制', '了解身體需要', '提供適當出口'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 51, role: 'coach', category: '器材使用', title: '見到器材就亂拋',
    description: '你將呼拉圈排好準備活動，但阿康一見到就開始亂拋呼拉圈，仲掟上空，完全無聽指示。',
    context: '體育館，呼拉圈散晒一地',
    options: [
      { id: 'A', text: '「放低！你搞亂晒！」', type: 'closed', score: 1, childReaction: '放低但臭住面，無理解為何唔可以', childReactionEmoji: '😤', explanation: '制止但無教導適當使用方式', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「呼拉圈唔係用嚟掟嘅，等我教你點用。」', type: 'semi-open', score: 5, childReaction: '願意聽但好快又想自己玩', childReactionEmoji: '😐', explanation: '教導使用方法有效但未理解衝動', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿康，你一見到呼拉圈就好興奮想玩！你最想用佢做啲咩？」', type: 'open', score: 10, childReaction: '「我想掟佢飛好遠！」開始表達創意想法', childReactionEmoji: '😊', explanation: '將衝動轉化為表達，了解後引導適當使用', explanationPoints: ['衝動背後有興趣', '先理解後引導', '轉化為適當活動'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 52, role: 'coach', category: '自我效能', title: '話「我做唔到」坐低',
    description: '新活動需要跳過三個障礙物，阿欣望咗一眼就即刻坐低，雙手攬住膝頭，搖頭話「我做唔到，我做唔到。」',
    context: '障礙物高度適中，其他小朋友正在嘗試',
    options: [
      { id: 'A', text: '「你試都未試過點知做唔到？起身！」', type: 'closed', score: 2, childReaction: '更加縮埋，覺得被迫做恐怖嘅事', childReactionEmoji: '😰', explanation: '否定恐懼令自信進一步下降', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「我陪你一齊做，好簡單㗎。」', type: 'semi-open', score: 5, childReaction: '猶豫但仍然好驚，對「好簡單」感到更大壓力', childReactionEmoji: '😣', explanation: '陪伴好但講「好簡單」否定咗困難', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿欣，你話做唔到。你望住啲障礙物嘅時候，身體話俾你知咩？」', type: 'open', score: 10, childReaction: '「我個心跳好快...」開始辨識恐懼的身體感覺', childReactionEmoji: '😌', explanation: '引導身體覺察，建立由內而外的勇氣', explanationPoints: ['身體覺察', '接納恐懼', '自主決定挑戰程度'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 53, role: 'coach', category: '依附行為', title: '只想同教練玩唔理其他人',
    description: '曉彤成堂都黏住你，拖住你隻手，唔肯同其他小朋友一齊活動。其他小朋友開始唔耐煩，話「教練成日陪佢」。',
    context: '體育館，其他小朋友望住',
    options: [
      { id: 'A', text: '「你要自己去玩，教練要照顧其他人。」', type: 'closed', score: 2, childReaction: '放手但即刻企喺角落，唔敢同人互動', childReactionEmoji: '😢', explanation: '直接推開令依附更不安全', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你可以同小明一齊玩，佢好友善㗎。」', type: 'semi-open', score: 4, childReaction: '望咗小明一眼但搖頭，繼續黏住教練', childReactionEmoji: '😰', explanation: '安排社交但未處理依附需要', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「曉彤，你好想同我一齊。同其他小朋友一齊嘅時候，你嘅感覺係點？」', type: 'open', score: 10, childReaction: '細聲話「我驚佢哋唔鍾意我」，真實恐懼被揭示', childReactionEmoji: '🥺', explanation: '了解依附背後的社交恐懼', explanationPoints: ['依附反映不安全感', '了解社交恐懼', '逐步建立同儕關係'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 54, role: 'coach', category: '模仿行為', title: '模仿他人攻擊行為',
    description: '自由遊戲時間，你見到阿俊學電視劇角色做出攻擊動作，用手做出「開槍」姿勢指住其他小朋友，被指嘅小朋友好驚。',
    context: '遊戲區，被指嘅小朋友退後',
    options: [
      { id: 'A', text: '「唔好做呢啲動作！好危險！」', type: 'closed', score: 2, childReaction: '停咗但去到另一邊繼續，覺得好玩', childReactionEmoji: '😏', explanation: '禁止但未處理模仿動機', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「我哋唔玩打仗，玩其他嘢啦。」', type: 'semi-open', score: 4, childReaction: '唔太情願轉做其他嘢', childReactionEmoji: '😐', explanation: '轉移但未了解攻擊遊戲的意義', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿俊，你做緊嘅角色好似好有力量。你鍾意佢咩？你留意到其他小朋友嘅反應嗎？」', type: 'open', score: 10, childReaction: '開始講佢鍾意嘅角色，然後望到其他人驚嘅表情', childReactionEmoji: '🤔', explanation: '了解力量需要，引導同理心覺察', explanationPoints: ['理解力量需要', '引導覺察他人感受', '提供適當替代'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 55, role: 'coach', category: '勝負態度', title: '成功後取笑其他人',
    description: '阿豪完成攀爬挑戰後，轉身對住仍在嘗試嘅小朋友嗌「你哋好慢呀！好簡單啫！」',
    context: '攀爬架旁，仍在嘗試的小朋友被取笑',
    options: [
      { id: 'A', text: '「你唔好笑人！好無禮貌！」', type: 'closed', score: 1, childReaction: '收聲但面不屑，無真正理解問題', childReactionEmoji: '😤', explanation: '制止但無引發同理心', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你叻唔代表可以笑人，每個人有自己嘅速度。」', type: 'semi-open', score: 4, childReaction: '聽到但唔太明', childReactionEmoji: '😐', explanation: '道理正確但未連結到感受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿豪，你完成咗好開心！你記唔記得你第一次爬嘅時候感覺係點？你覺得仲喺度爬嘅人而家點諗？」', type: 'open', score: 10, childReaction: '停低諗，「我嗰陣都好驚...」開始理解其他人嘅處境', childReactionEmoji: '😮', explanation: '連結自身經驗建立同理心', explanationPoints: ['回想自身經驗', '建立同理心', '從勝利者角度培養關懷'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 56, role: 'coach', category: '恐懼退縮', title: '受傷後唔肯再嘗試',
    description: '上星期跳繩時跌倒擦傷膝蓋嘅小雯，今日見到跳繩就企定唔郁，手不停摸住膝蓋上嘅膠布。',
    context: '跳繩活動區域，小雯站在邊緣',
    options: [
      { id: 'A', text: '「上次跌咗咋嘛，唔會再跌㗎！快啲跳！」', type: 'closed', score: 1, childReaction: '搖頭後退，恐懼加深', childReactionEmoji: '😰', explanation: '否定恐懼經驗令信任下降', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「我哋慢慢嚟，先用短繩。」', type: 'semi-open', score: 5, childReaction: '遲疑拎起短繩但好快放低', childReactionEmoji: '😣', explanation: '降低難度好但未處理創傷感受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「小雯，我見你摸住膝蓋，你係咪諗返上次跌倒嘅事？你而家嘅身體感覺係點？」', type: 'open', score: 10, childReaction: '點頭，「我驚會再跌...」開始表達恐懼和身體記憶', childReactionEmoji: '🥺', explanation: '承認創傷經驗，讓身體記憶被看見', explanationPoints: ['承認創傷記憶', '身體感受探問', '讓小朋友主導復原節奏'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 57, role: 'coach', category: '專注力', title: '不斷轉換活動無專注',
    description: '自由遊戲時間，阿樂每樣嘢玩唔到一分鐘就轉去第二樣。佢由波區去到積木區再去到畫畫區，全部半途而廢。',
    context: '遊戲室，阿樂在各區之間遊走',
    options: [
      { id: 'A', text: '「你揀一樣嘢玩！唔好成日轉！」', type: 'closed', score: 1, childReaction: '隨便揀咗一樣但好快又無興趣', childReactionEmoji: '😐', explanation: '限制但無了解轉換原因', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你試下呢個玩耐啲，好好玩㗎。」', type: 'semi-open', score: 3, childReaction: '多玩咗少少但仍然無法持續', childReactionEmoji: '😣', explanation: '建議有用但可能有感覺統合因素', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿樂，你試咗好多唔同嘅嘢。每樣嘢轉走嘅時候你嘅感覺係點？係咪有啲嘢令你停唔到？」', type: 'open', score: 10, childReaction: '停低諗，「我唔知...我就係想玩嗰樣」開始覺察自己的模式', childReactionEmoji: '🤔', explanation: '幫助覺察行為模式，了解專注困難', explanationPoints: ['覺察行為模式', '不批判探索', '可能反映感覺需要'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 58, role: 'coach', category: '規則理解', title: '想改遊戲規則',
    description: '玩緊圈圈遊戲，阿琛不停話「咁樣唔好玩！應該要可以跑出圈！」開始自己改規則，其他小朋友唔同意。',
    context: '遊戲進行中，阿琛同其他人爭拗',
    options: [
      { id: 'A', text: '「規則就係規則！你要跟！」', type: 'closed', score: 2, childReaction: '悶悶不樂繼續玩，感到唔被尊重', childReactionEmoji: '😤', explanation: '強制服從但創意和參與動機被壓制', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「我哋今次先跟呢個規則，下次可以試你嘅方法。」', type: 'semi-open', score: 5, childReaction: '勉強接受，期待下次', childReactionEmoji: '😐', explanation: '延遲有用但未即時處理需要', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿琛，你有自己嘅想法好好！你覺得點改會更好玩？我哋可以問下其他人點諗。」', type: 'open', score: 10, childReaction: '興奮講出自己的想法，其他人也開始加入討論', childReactionEmoji: '😊', explanation: '肯定創意，引導民主討論', explanationPoints: ['肯定創意思維', '引導群體討論', '培養協商能力'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 59, role: 'coach', category: '收拾責任', title: '唔肯執拾器材',
    description: '活動結束，你請大家一齊收拾。大部分小朋友都幫手，但阿天坐喺一邊話「我好攰，我唔執。」',
    context: '體育館散滿器材，其他人在收拾',
    options: [
      { id: 'A', text: '「人人都要執！你唔執下次唔使嚟！」', type: 'closed', score: 1, childReaction: '不情願去拎一兩件嘢，態度惡劣', childReactionEmoji: '😤', explanation: '威脅式要求無建立責任感', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你揀兩樣嘢執就得喇，好快㗎。」', type: 'semi-open', score: 5, childReaction: '接受咗，快速完成', childReactionEmoji: '😐', explanation: '降低要求有效但未探問原因', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿天，你話好攰。你嘅身體邊度最攰？今日嘅活動有咩令你特別累？」', type: 'open', score: 10, childReaction: '「我對腳好痛...」或者講出情緒疲累的原因', childReactionEmoji: '😌', explanation: '了解是身體還是情緒疲累，再適當處理', explanationPoints: ['分辨身體和情緒疲累', '理解後再要求', '適當調整期望'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 60, role: 'coach', category: '物品執著', title: '想帶玩具返屋企',
    description: '活動結束，阿芝攬住一個小布偶唔肯放低，話「我要帶佢返屋企！佢係我嘅！」眼淚喺眼眶打轉。',
    context: '離開前，媽媽在門口等',
    options: [
      { id: 'A', text: '「呢個係中心嘅！你唔可以帶走！放低！」', type: 'closed', score: 1, childReaction: '大喊大叫攬得更緊，完全崩潰', childReactionEmoji: '😭', explanation: '強行要求令分離更痛苦', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「下次返嚟可以再玩㗎，佢會等你㗎。」', type: 'semi-open', score: 5, childReaction: '遲疑，勉強放低但好唔捨得', childReactionEmoji: '😢', explanation: '安撫有效但未完全理解執著原因', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「阿芝，你好鍾意呢個布偶，佢對你嚟講好重要。你鍾意佢啲咩？」', type: 'open', score: 10, childReaction: '開始講布偶陪佢玩的感覺，「佢識聽我講嘢...」', childReactionEmoji: '🥺', explanation: '理解物品寄託的情感需要，布偶可能代表安全和陪伴', explanationPoints: ['物品寄託情感', '理解依附需要', '尋找替代方式滿足需要'], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default coachScenarios;
