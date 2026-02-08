import type { Scenario } from '@/types/game';

const teacherScenarios: Scenario[] = [
  {
    id: 1, role: 'teacher', category: '課堂專注', title: '學生望窗外發呆',
    description: '數學課進行到一半，你發現志明望住窗外已經好幾分鐘，手指不停玩筆，完全無留意你的講解。其他同學都專心聽書。',
    context: '課室環境，黑板寫滿數學算式，其他學生做筆記',
    options: [
      { id: 'A', text: '「志明！你係咪無聽書？坐好啦！」', type: 'closed', score: 0, childReaction: '身體突然坐直，眼神依然呆滯，表面服從但內心抗拒，繼續心不在焉', childReactionEmoji: '😰', explanation: '指令式回應', explanationPoints: ['只針對表面行為，無了解背後原因', '令學生感到被責備，產生防衛心理', '無助建立信任，學生只會表面配合'], color: 'red', responsePattern: '封閉式/指令式' },
      { id: 'B', text: '「點解你又唔專心？尋日都係咁！」', type: 'judgmental', score: 2, childReaction: '低頭避開眼神接觸，雙手握拳放在大髀上，感到被針對和羞愧', childReactionEmoji: '😔', explanation: '質問式回應', explanationPoints: ['「點解」帶有質問語氣，增強防衛心', '翻舊賬令學生感到被標籤', '學生難以表達真實困難'], color: 'orange', responsePattern: '半封閉式/判斷式' },
      { id: 'C', text: '「志明，我留意到你望咗窗外好幾次，而家有啲咩喺你心入面？」', type: 'open', score: 10, childReaction: '抬頭望向老師，表情由緊張轉為放鬆，深呼吸後開始說出真相', childReactionEmoji: '😌', explanation: '開放式回應', explanationPoints: ['描述觀察而非判斷行為', '開放式提問邀請真誠表達', '建立安全對話空間，促進信任關係', '有助了解問題根源，提供適切支援'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 2, role: 'teacher', category: '小組合作', title: '小組活動爆發衝突',
    description: '小組專題習作時間，你聽到激烈爭執聲。走近一看，見到家豪同美玲互相推開對方的工作紙，志強企喺一邊唔敢出聲。',
    context: '小組桌面散落文具、工作紙，兩個學生面紅耳赤',
    options: [
      { id: 'A', text: '「邊個開始嘅？講！」', type: 'closed', score: 1, childReaction: '兩個學生立即互相指責對方，音量越來越大，完全無解決問題', childReactionEmoji: '😠', explanation: '追究責任式回應令衝突升級', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你哋兩個都唔啱，返去座位面壁思過！」', type: 'judgmental', score: 0, childReaction: '學生憤怒地各自行開，感到不公平，衝突未解決仲可能加深', childReactionEmoji: '😤', explanation: '懲罰式處理無助學生學習衝突解決技巧', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「我見到你哋兩個好似有啲唔同意見，可以分別同我講下發生咩事嗎？」', type: 'open', score: 10, childReaction: '兩個學生深呼吸冷靜落嚟，輪流表達自己的觀點和感受', childReactionEmoji: '😮‍💨', explanation: '開放式回應協助學生表達需要，學習衝突解決', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 3, role: 'teacher', category: '學業表現', title: '測驗成績明顯退步',
    description: '派發數學測驗卷，你見到雅文收到卷後，眼眶紅紅，快速將卷摺埋塞入書包。上次測驗佢攞 85 分，今次只有 52 分。',
    context: '課室派卷時段，有啲學生興奮，有啲失落',
    options: [
      { id: 'A', text: '「係咪無溫書？要加倍努力啦！」', type: 'judgmental', score: 2, childReaction: '學生更加低頭，感到羞愧和壓力，將自己封閉起來', childReactionEmoji: '😞', explanation: '假設式判斷未了解真實原因', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'B', text: '「今次唔理想，下次一定要進步，我哋一齊努力！」', type: 'semi-open', score: 5, childReaction: '學生勉強點頭，但無真正表達困難，壓力依然存在', childReactionEmoji: '😐', explanation: '鼓勵式回應有善意但缺乏情緒接納', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「雅文，我睇到你收到成績後好似有啲失落，想同我傾下你嘅感受嗎？」', type: 'open', score: 10, childReaction: '學生眼淚流出來，開始講述溫習時的困難或家中變故', childReactionEmoji: '😢', explanation: '情緒接納式回應讓學生感到被理解', explanationPoints: ['先接納情緒再處理問題', '讓學生主導分享內容', '建立信任後才能提供真正幫助'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 4, role: 'teacher', category: '社交孤立', title: '午飯時間獨處',
    description: '午飯時間，你注意到小敏一個人坐喺課室角落食飯，其他同學都三五成群去飯堂。佢望住桌面，用筷子慢慢撥弄飯盒。',
    context: '午飯時間課室，大部分座位空置，只有小敏獨自一人',
    options: [
      { id: 'A', text: '「小敏，快啲去飯堂搵同學一齊食啦！」', type: 'closed', score: 2, childReaction: '搖頭說「唔想去」，更加縮埋自己，感到被迫社交', childReactionEmoji: '😣', explanation: '指令式社交要求忽略真實需要', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「點解你唔同其他同學一齊食飯？你要主動啲！」', type: 'judgmental', score: 1, childReaction: '低聲說「佢哋唔鍾意我」，然後沉默，感到被責備', childReactionEmoji: '😔', explanation: '質問加建議令學生覺得問題出在自己身上', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「小敏，我留意到你呢排都一個人食飯，你而家感覺點？」', type: 'open', score: 10, childReaction: '眼框泛紅，開始講出被排擠的經歷或自己的不安', childReactionEmoji: '🥺', explanation: '溫柔觀察加情感探問，讓學生感到安全', explanationPoints: ['不急於解決，先理解處境', '描述觀察而非質問', '給予表達空間'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 5, role: 'teacher', category: '時間管理', title: '功課持續拖延',
    description: '已經連續三日，俊賢都無交功課。你見到佢書包打開，入面嘅功課冊都係空白嘅。佢避開你嘅目光。',
    context: '早上收功課時段，其他同學排隊交功課',
    options: [
      { id: 'A', text: '「又無做功課？你再唔交就打電話俾你屋企人！」', type: 'closed', score: 0, childReaction: '表情恐懼，但依然無法表達困難，問題持續', childReactionEmoji: '😰', explanation: '威脅式回應增加恐懼但未解決根本原因', explanationPoints: [], color: 'red', responsePattern: '封閉式/威脅式' },
      { id: 'B', text: '「你係咪唔識做？要唔要我幫你溫？」', type: 'semi-open', score: 5, childReaction: '猶豫點頭，但真正原因可能唔係唔識做', childReactionEmoji: '😐', explanation: '假設原因為學業困難，可能忽略家庭因素', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「俊賢，我留意到你呢幾日都無交功課，可以同我講下發生咩事嗎？」', type: 'open', score: 10, childReaction: '深呼吸後透露屋企發生變故，或自己有其他困難', childReactionEmoji: '😌', explanation: '無判斷地邀請分享，讓學生感到安全表達', explanationPoints: ['避免假設原因', '開放空間讓學生自己表達', '建立解決問題的夥伴關係'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 6, role: 'teacher', category: '情緒爆發', title: '課堂突然哭泣',
    description: '上緊常識課，你講到「家庭」課題時，坐喺中間嘅嘉欣突然低頭，肩膀不停震動，開始細聲喊。全班同學都望住佢。',
    context: '課室正在上課，投影片顯示「我的家庭」主題',
    options: [
      { id: 'A', text: '「嘉欣，唔好喊啦，我哋繼續上堂。」', type: 'closed', score: 0, childReaction: '努力忍住眼淚但情緒更加崩潰，感到被忽視', childReactionEmoji: '😭', explanation: '壓抑情緒令學生感到不被允許表達感受', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你係咪唔舒服？要唔要去醫療室？」', type: 'semi-open', score: 4, childReaction: '搖頭但繼續哭，問題未被真正理解', childReactionEmoji: '😢', explanation: '轉移注意力到身體不適，迴避情緒處理', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「嘉欣，我見到你好傷心，如果你想講嘅話，我喺度聽。」', type: 'open', score: 10, childReaction: '慢慢抬頭，感受到接納，點頭表示想傾', childReactionEmoji: '🥺', explanation: '接納情緒表達，提供安全空間', explanationPoints: ['不急於停止哭泣', '表達陪伴意願', '讓學生決定是否分享'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 7, role: 'teacher', category: '參與度低', title: '唔舉手發言',
    description: '你發問咗好幾條問題，班上大部分同學都舉手，但你留意到文軒從頭到尾都低住頭，雙手放喺枱底。其實佢嘅作業顯示佢都識答。',
    context: '課堂問答環節，氣氛活躍',
    options: [
      { id: 'A', text: '「文軒，你答呢條！企起身！」', type: 'closed', score: 1, childReaction: '驚慌企起身，口窒窒答唔到，全班笑，更加退縮', childReactionEmoji: '😰', explanation: '突然被叫起令害羞學生更加恐懼課堂', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「文軒好叻㗎，不如你都試下舉手？」', type: 'semi-open', score: 4, childReaction: '勉強舉手但聲音好細，壓力大', childReactionEmoji: '😣', explanation: '公開讚美加要求令內向學生壓力更大', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「文軒，我留意到你作業做得好好，你有冇想分享但又猶豫緊嘅嘢？」', type: 'open', score: 10, childReaction: '抬頭微笑，細聲說「我驚答錯」，開始表達自己嘅擔憂', childReactionEmoji: '😊', explanation: '私下肯定加開放提問，建立安全感', explanationPoints: ['肯定能力建立自信', '理解沉默背後原因', '不強迫但邀請參與'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 8, role: 'teacher', category: '校園欺凌', title: '疑似被欺凌',
    description: '小息後，你見到明仔返到課室，校服膊頭有腳印，眼眶紅紅。佢話「跌親啫」就坐低，但你留意到佢手臂有瘀痕。',
    context: '小息後課室，明仔神情閃縮',
    options: [
      { id: 'A', text: '「邊個打你？同我講佢哋嘅名！」', type: 'closed', score: 2, childReaction: '搖頭否認，更加封閉，怕被報復', childReactionEmoji: '😰', explanation: '追問施暴者令受害者更恐懼被報復', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你要堅強啲，唔好俾人蝦！下次打返佢！」', type: 'judgmental', score: 0, childReaction: '更加自責，覺得被欺負係自己嘅錯', childReactionEmoji: '😞', explanation: '歸咎受害者，強化無力感', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「明仔，我留意到你膊頭同手臂有啲痕跡，你而家感覺安唔安全？」', type: 'open', score: 10, childReaction: '停頓咗一陣，然後開始細聲講出被欺負嘅經過', childReactionEmoji: '🥺', explanation: '關注安全感而非追究，讓受害者感到被保護', explanationPoints: ['先確保安全感', '描述觀察不強迫', '讓學生按自己節奏分享'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 9, role: 'teacher', category: '特殊需要', title: '學習障礙表現',
    description: '抄寫練習時，你走到曉晴枱頭，見到佢寫咗好耐但只得兩行字，而且好多字左右倒轉。佢好畀力咁握住支筆，手指震緊。',
    context: '抄寫堂，其他同學已經寫咗大半頁',
    options: [
      { id: 'A', text: '「你要快啲寫啦！其他同學都寫完喇！」', type: 'closed', score: 0, childReaction: '更加緊張，字越寫越差，開始流眼淚', childReactionEmoji: '😭', explanation: '催促令學習困難學生壓力倍增', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你嘅字寫得唔靚，擦咗重寫。」', type: 'judgmental', score: 1, childReaction: '用力擦到紙都爛，自信心嚴重受損', childReactionEmoji: '😔', explanation: '否定努力令學生對學習產生恐懼', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「曉晴，我見到你好努力咁寫，寫字嘅時候你感覺點？有冇邊度覺得困難？」', type: 'open', score: 10, childReaction: '放鬆握筆力度，開始解釋自己「啲字會跳嚟跳去」', childReactionEmoji: '😌', explanation: '肯定努力加探問困難，有助識別學習需要', explanationPoints: ['肯定過程而非結果', '了解學習困難的具體表現', '為支援計劃收集資訊'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 10, role: 'teacher', category: '環境轉變', title: '轉校適應困難',
    description: '新來嘅轉校生思琪已經返咗學兩個禮拜，但佢仲係一個人坐，落堂唔同人傾，上堂面無表情。你留意到佢成日望住舊學校嘅水壺。',
    context: '課室，其他同學已經熟絡，思琪仍然格格不入',
    options: [
      { id: 'A', text: '「思琪，你要主動啲同同學傾偈啦！」', type: 'closed', score: 2, childReaction: '點頭但無行動，覺得係自己嘅問題', childReactionEmoji: '😐', explanation: '忽略適應困難，將責任推畀新生', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「大家歡迎思琪！邊個做佢嘅buddy？」', type: 'semi-open', score: 5, childReaction: '有人被指定做buddy但互動生硬，思琪感到被安排', childReactionEmoji: '😣', explanation: '有善意但未了解思琪嘅個人感受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「思琪，嚟到新學校兩個禮拜喇，你而家嘅感覺係點？有啲咩最掛住舊學校？」', type: 'open', score: 10, childReaction: '眼神亮起來，開始講舊學校嘅朋友和生活，慢慢打開心扉', childReactionEmoji: '😌', explanation: '承認轉變帶來的情緒，讓學生表達思念', explanationPoints: ['承認轉變是困難的', '讓學生主導話題', '建立師生信任基礎'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 11, role: 'teacher', category: '身體形象', title: '體育課唔肯參與',
    description: '體育堂換好運動服後，你發現小美一直躲喺更衣室門口，雙手攬住自己，唔肯出去操場。其他女同學已經開始熱身。',
    context: '操場旁更衣室門口，小美穿住運動短褲顯得唔自在',
    options: [
      { id: 'A', text: '「快啲出嚟！全班等緊你！」', type: 'closed', score: 0, childReaction: '勉強行出去但成堂雙手攬住自己，完全無參與', childReactionEmoji: '😰', explanation: '忽略身體形象焦慮，令學生更加不安', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「運動對身體好㗎，唔好唔肯出嚟。」', type: 'semi-open', score: 3, childReaction: '慢慢行出但全程不自在，無法專注運動', childReactionEmoji: '😣', explanation: '講道理但未理解背後的身體形象壓力', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「小美，我見到你企咗喺度好耐，你而家嘅感覺係點？有啲咩令你唔想出去？」', type: 'open', score: 10, childReaction: '細聲說出對身材嘅不安或曾被取笑嘅經歷', childReactionEmoji: '🥺', explanation: '安全探問讓學生表達身體形象焦慮', explanationPoints: ['理解拒絕背後的脆弱', '不公開討論敏感話題', '提供支持而非催促'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 12, role: 'teacher', category: '家庭狀況', title: '經常遲到',
    description: '已經第四日，浩然又遲到咗半個鐘。佢喘住氣跑入課室，頭髮凌亂，校服有啲皺。書包拉鏈無拉好，入面嘅嘢跌晒出嚟。',
    context: '早上上課十五分鐘後，浩然衝入課室',
    options: [
      { id: 'A', text: '「又遲到！罰你企喺度到小息！」', type: 'closed', score: 0, childReaction: '紅住面企咗喺門口，心入面覺得唔公平但唔敢講', childReactionEmoji: '😤', explanation: '懲罰未了解原因，可能加劇家庭壓力', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你要早啲瞓，咁就唔會遲到喇。」', type: 'semi-open', score: 3, childReaction: '小聲說「係」但問題根源可能唔係佢控制到', childReactionEmoji: '😔', explanation: '假設是學生的責任，忽略可能的家庭因素', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「浩然，你呢幾日都趕到氣喘喘，返學路上發生咩事？有咩我可以幫到你？」', type: 'open', score: 10, childReaction: '表情從防備轉為感動，開始講出屋企的情況', childReactionEmoji: '😢', explanation: '關心而非懲罰，了解遲到背後的家庭困難', explanationPoints: ['遲到可能反映家庭問題', '關心學生全人發展', '提供幫助而非懲罰'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 13, role: 'teacher', category: '情緒宣洩', title: '破壞公物',
    description: '午飯後，你聽到美術室傳來「嘭」一聲。入到去見到建明踢翻咗一張凳，桌面嘅顏料打翻晒。佢企喺度喘氣，拳頭握得好緊。',
    context: '美術室，地下一片混亂，建明面紅耳赤',
    options: [
      { id: 'A', text: '「你做咩嘢？即刻執返好！見家長！」', type: 'closed', score: 0, childReaction: '再踢多一腳凳，大喊「唔關我事」，情緒更加失控', childReactionEmoji: '😡', explanation: '懲罰令已經爆發的情緒更加惡化', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「冷靜啲！有咩事可以講，唔好搞爛嘢。」', type: 'semi-open', score: 4, childReaction: '停低但仍然好嬲，未能真正冷靜', childReactionEmoji: '😤', explanation: '叫人冷靜通常無效，但至少無惡化情況', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「建明，我見到你好嬲。你唔需要即刻講，我陪住你，等你準備好。」', type: 'open', score: 10, childReaction: '慢慢放鬆拳頭，坐低，過咗一陣開始講出憤怒的原因', childReactionEmoji: '😮‍💨', explanation: '陪伴而非即時要求解釋，讓情緒有空間消退', explanationPoints: ['情緒高漲時不宜追問', '表達陪伴意願', '讓學生自己決定何時分享'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 14, role: 'teacher', category: '學業壓力', title: '測驗作弊',
    description: '測驗期間，你行過去見到偉明望住隔籬同學嘅卷。佢一見到你就面色變白，用手遮住自己嘅卷。',
    context: '測驗進行中，課室安靜',
    options: [
      { id: 'A', text: '「我見到你偷睇！收卷，零分！」', type: 'closed', score: 1, childReaction: '崩潰大喊「我無偷睇」，感到極度羞辱', childReactionEmoji: '😭', explanation: '公開指責造成羞辱，破壞師生關係', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「專心做自己嘅卷，唔好望人哋。」', type: 'semi-open', score: 5, childReaction: '低頭繼續做，但手震到寫唔到字', childReactionEmoji: '😰', explanation: '提醒但未處理背後的壓力源', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '（測驗後私下）「偉明，我留意到你測驗時好似好緊張，想同我講下你嘅感受嗎？」', type: 'open', score: 10, childReaction: '終於講出父母對成績的極高期望和壓力', childReactionEmoji: '😢', explanation: '私下處理避免羞辱，探問壓力根源', explanationPoints: ['測驗後私下處理', '作弊通常反映壓力', '理解後才能有效支援'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 15, role: 'teacher', category: '社交技巧', title: '排斥新同學',
    description: '你見到幾個同學圍埋一齊，新來嘅阿明行過去想加入，但佢哋用身體擋住佢話「呢度滿咗」。阿明企咗喺度好尷尬。',
    context: '小息時間，操場一角',
    options: [
      { id: 'A', text: '「你哋點可以咁對新同學！即刻俾佢加入！」', type: 'closed', score: 2, childReaction: '勉強讓阿明加入但繼續冷落佢，氣氛更差', childReactionEmoji: '😤', explanation: '強迫接納令雙方都不自在', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「大家要友善啲，新同學需要時間適應。」', type: 'semi-open', score: 4, childReaction: '表面同意但行為無改變', childReactionEmoji: '😐', explanation: '道德教育有限效果', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「我見到你哋話呢度滿咗，你哋可以講下你哋嘅想法嗎？阿明你嘅感受又係點？」', type: 'open', score: 10, childReaction: '雙方開始表達，原來舊同學怕位置被取代，阿明感到被拒絕', childReactionEmoji: '😌', explanation: '讓雙方表達需要，找出排斥的真正原因', explanationPoints: ['了解排斥背後的不安', '給雙方表達機會', '引導互相理解'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 16, role: 'teacher', category: '身心狀態', title: '上堂睡覺',
    description: '下午第一堂，你見到家俊趴喺枱面訓著咗，已經唔係第一次。佢嘅黑眼圈好明顯，桌面有未食完嘅麵包。',
    context: '下午課堂，其他學生都仲算精神',
    options: [
      { id: 'A', text: '「家俊！訓覺？出去洗面先返嚟！」', type: 'closed', score: 1, childReaction: '朦朧起身，行出去但好快又訓返', childReactionEmoji: '😴', explanation: '處理表面行為，未了解睡眠不足原因', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你昨晚係咪好夜瞓？要早啲休息啦。」', type: 'semi-open', score: 3, childReaction: '嗯咗一聲，但可能唔係自願夜瞓', childReactionEmoji: '😔', explanation: '假設原因可能錯誤', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「家俊，我留意到你呢排成日好攰，你最近嘅生活作息點？有冇啲咩令你瞓唔好？」', type: 'open', score: 10, childReaction: '嘆氣後講出屋企嘅情況，可能是照顧弟妹或父母嘈交', childReactionEmoji: '😢', explanation: '關心全人狀態，了解生活背景', explanationPoints: ['持續疲累可能反映家庭問題', '不急於判斷', '全面了解學生生活'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 17, role: 'teacher', category: '權威挑戰', title: '頂撞老師',
    description: '你提醒全班交功課嘅限期，阿傑突然大聲話「做咁多功課有咩用？反正老師都唔會睇！」全班靜晒望住你。',
    context: '課室，氣氛突然緊張',
    options: [
      { id: 'A', text: '「你講咩？出去走廊企！」', type: 'closed', score: 0, childReaction: '摔門而出，師生關係嚴重受損', childReactionEmoji: '😡', explanation: '以權威壓制只會引發更大反抗', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「我有認真睇你哋嘅功課，你咁講唔公平。」', type: 'semi-open', score: 3, childReaction: '「哼」一聲坐低，但心結未解', childReactionEmoji: '😤', explanation: '辯解反而示弱，未處理學生情緒', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「阿傑，我聽到你好似對功課有好強烈嘅感受，放學後我想聽下你嘅想法，可以嗎？」', type: 'open', score: 10, childReaction: '愣咗一下，然後點頭坐低，放學後真的來傾', childReactionEmoji: '😮', explanation: '不當場對抗，延遲到私下處理，尊重雙方面子', explanationPoints: ['不當眾對質', '承認情緒的合理性', '預約私下對話'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 18, role: 'teacher', category: '心理壓力', title: '完美主義焦慮',
    description: '美術堂，你見到曉琳畫咗一幅好靚嘅畫，但佢一直用橡皮擦擦咗重畫，擦到紙都起毛。佢咬住嘴唇，眼眶紅紅。',
    context: '美術堂，其他學生開心畫畫，曉琳反覆修改',
    options: [
      { id: 'A', text: '「你畫得好好喇，唔好再擦啦，交卷！」', type: 'closed', score: 2, childReaction: '更加焦慮，覺得被催促但仍不滿意自己嘅作品', childReactionEmoji: '😰', explanation: '催促令完美主義學生更加焦慮', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「唔使咁完美㗎，差唔多就得啦。」', type: 'semi-open', score: 3, childReaction: '邏輯上知道但情緒上做唔到放手', childReactionEmoji: '😣', explanation: '合理但無法處理深層焦慮', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「曉琳，我見到你對呢幅畫好認真。你心目中想畫到咩樣？而家嘅感覺係點？」', type: 'open', score: 10, childReaction: '停低手，深呼吸，開始講出自己「點畫都唔夠好」嘅感受', childReactionEmoji: '😌', explanation: '理解完美主義背後的壓力和恐懼', explanationPoints: ['肯定認真態度', '探問內心標準', '幫助學生與壓力共處'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 19, role: 'teacher', category: '社交退縮', title: '小息獨自看書',
    description: '連續幾日你都見到子軒小息時坐喺課室角落睇書，唔去操場玩。其他同學邀請佢都搖頭拒絕。佢本來好活潑嘅。',
    context: '小息時間，空蕩蕩嘅課室，只有子軒一個人',
    options: [
      { id: 'A', text: '「去操場玩啦！成日坐喺度對身體唔好！」', type: 'closed', score: 1, childReaction: '話「我鍾意睇書」就唔理你', childReactionEmoji: '😐', explanation: '忽略行為改變背後的信號', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你近排好鍾意睇書喎，睇緊咩書呀？」', type: 'semi-open', score: 5, childReaction: '簡短回答，無透露更多', childReactionEmoji: '😶', explanation: '輕鬆切入但未觸及核心問題', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「子軒，我留意到你最近都無去操場，同之前唔太一樣。你而家嘅感覺係點？」', type: 'open', score: 10, childReaction: '放低本書，猶豫咗一陣，開始講出同朋友嘅矛盾', childReactionEmoji: '🥺', explanation: '觀察到行為變化並溫和提出，讓學生感到被關注', explanationPoints: ['注意行為變化', '不急於歸因', '讓學生自己揭示原因'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 20, role: 'teacher', category: '學業疑慮', title: '成績突然進步',
    description: '英文默書，嘉儀由平時嘅四五十分突然攞到九十五分。你留意到佢嘅答案同隔籬同學一模一樣，包括同一個串錯嘅字。',
    context: '改卷後，嘉儀興奮地等住派卷',
    options: [
      { id: 'A', text: '「你係咪抄人？唔好以為我唔知！」', type: 'closed', score: 0, childReaction: '面色即刻變白，大叫「我無抄」，委屈到喊', childReactionEmoji: '😭', explanation: '未經調查直接指控，若判斷錯誤將嚴重傷害學生', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「嘉儀，你今次進步咗好多喎！係咪有特別溫習方法？」', type: 'semi-open', score: 5, childReaction: '開心回答但可能編造原因', childReactionEmoji: '😊', explanation: '正面但未處理疑慮，需要更多了解', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「嘉儀，我見到你今次成績好大進步，我好想了解你嘅學習過程。可以同我分享下你點樣溫習嗎？」', type: 'open', score: 10, childReaction: '如果真的努力會開心分享；如果作弊會有機會承認並感受到老師的關心', childReactionEmoji: '😌', explanation: '不預設結論，讓學生有機會自己解釋，無論真假都能適當跟進', explanationPoints: ['不預設判斷', '給予解釋機會', '真誠進步也需被肯定'], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default teacherScenarios;
