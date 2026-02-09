import type { Scenario } from '@/types/game';

const teacherScenarios: Scenario[] = [
  {
    id: 1, role: 'teacher', category: '課堂專注', title: '學生望窗外發呆',
    description: '數學課進行到一半，你發現志明望住窗外已經好幾分鐘，手指不停玩筆，完全無留意你的講解。其他同學都專心聽書。',
    context: '課室環境，黑板寫滿數學算式，其他學生做筆記',
    options: [
      { id: 'A', text: '「志明！你係咪無聽書？坐好啦！」', type: 'closed', score: 0, childReaction: '身體坐直但眼神呆滯，表面服從內心抗拒', childReactionEmoji: '😰', explanation: '指令式回應只針對表面行為', explanationPoints: ['無了解背後原因', '產生防衛心理'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「點解你又唔專心？尋日都係咁！」', type: 'judgmental', score: 2, childReaction: '低頭避開眼神，感到被針對和羞愧', childReactionEmoji: '😔', explanation: '質問式回應翻舊賬令學生更封閉', explanationPoints: ['帶有質問語氣', '學生難以表達困難'], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「志明，你好似有啲攰，要唔要休息下？」', type: 'semi-open', score: 5, childReaction: '搖頭說無事，但問題根源未被探索', childReactionEmoji: '😐', explanation: '關心但假設原因，未開放探問', explanationPoints: ['有善意但方向單一', '未讓學生主導表達'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「志明，我留意到你望咗窗外好幾次，而家心入面有啲咩？」', type: 'open', score: 10, childReaction: '抬頭望老師，表情放鬆，開始說出真相', childReactionEmoji: '😌', explanation: '描述觀察邀請真誠表達', explanationPoints: ['開放式提問', '建立信任關係'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 2, role: 'teacher', category: '小組合作', title: '小組活動爆發衝突',
    description: '小組專題習作時間，你聽到激烈爭執聲。走近一看，見到家豪同美玲互相推開對方的工作紙，志強企喺一邊唔敢出聲。',
    context: '小組桌面散落文具、工作紙，兩個學生面紅耳赤',
    options: [
      { id: 'A', text: '「邊個開始嘅？講！」', type: 'closed', score: 1, childReaction: '兩個學生互相指責，音量越來越大', childReactionEmoji: '😠', explanation: '追究責任令衝突升級', explanationPoints: ['學生集中辯解', '無解決問題'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你哋兩個都唔啱，返座位冷靜！」', type: 'judgmental', score: 0, childReaction: '學生憤怒行開，衝突未解決更加深', childReactionEmoji: '😤', explanation: '懲罰式處理無助學習解決衝突', explanationPoints: ['無分辨情況', '增加不公平感'], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「你哋冷靜下，等陣再傾，好唔好？」', type: 'semi-open', score: 4, childReaction: '暫停但情緒仍在，問題擱置未處理', childReactionEmoji: '😣', explanation: '緩和氣氛但錯過處理時機', explanationPoints: ['延遲但未真正介入'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「我見到你哋有唔同意見，可以分別講下發生咩事嗎？」', type: 'open', score: 10, childReaction: '兩人深呼吸，輪流表達觀點和感受', childReactionEmoji: '😮‍💨', explanation: '開放式邀請表達需要', explanationPoints: ['協助學習衝突解決'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 3, role: 'teacher', category: '學業表現', title: '測驗成績明顯退步',
    description: '派發數學測驗卷，你見到雅文收到卷後，眼眶紅紅，快速將卷摺埋塞入書包。上次測驗佢攞 85 分，今次只有 52 分。',
    context: '課室派卷時段，有啲學生興奮，有啲失落',
    options: [
      { id: 'A', text: '「係咪無溫書？下次要加油啦！」', type: 'judgmental', score: 2, childReaction: '更加低頭，感到羞愧和壓力', childReactionEmoji: '😞', explanation: '假設式判斷未了解真實原因', explanationPoints: ['忽略可能的家庭因素'], color: 'orange', responsePattern: '判斷式' },
      { id: 'B', text: '「今次唔理想，下次一定會進步㗎！」', type: 'semi-open', score: 5, childReaction: '勉強點頭，但困難未被表達', childReactionEmoji: '😐', explanation: '鼓勵有善意但缺乏情緒接納', explanationPoints: ['壓力依然存在'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「收好張卷先，有問題搵我。」', type: 'closed', score: 1, childReaction: '收埋卷但無求助，問題被掩蓋', childReactionEmoji: '😔', explanation: '迴避情緒，學生不會主動求助', explanationPoints: ['錯過支援時機'], color: 'red', responsePattern: '封閉式' },
      { id: 'D', text: '「雅文，我見你收到成績後好似好失落，想傾下嗎？」', type: 'open', score: 10, childReaction: '眼淚流出，開始講出困難或家中變故', childReactionEmoji: '😢', explanation: '情緒接納讓學生感到被理解', explanationPoints: ['先接納再處理', '讓學生主導分享'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 4, role: 'teacher', category: '社交孤立', title: '午飯時間獨處',
    description: '午飯時間，你注意到小敏一個人坐喺課室角落食飯，其他同學都三五成群去飯堂。佢望住桌面，用筷子慢慢撥弄飯盒。',
    context: '午飯時間課室，大部分座位空置',
    options: [
      { id: 'A', text: '「小敏，快啲去飯堂搵同學一齊食！」', type: 'closed', score: 2, childReaction: '搖頭說「唔想去」，更加縮埋自己', childReactionEmoji: '😣', explanation: '指令式社交忽略真實需要', explanationPoints: ['感到被迫社交'], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「點解唔同其他同學食？要主動啲啊！」', type: 'judgmental', score: 1, childReaction: '低聲說「佢哋唔鍾意我」，更沉默', childReactionEmoji: '😔', explanation: '質問令學生覺得係自己嘅錯', explanationPoints: ['責備式建議'], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「你鍾意自己一個食飯？」', type: 'semi-open', score: 4, childReaction: '點頭但眼神透露唔係真心想', childReactionEmoji: '😐', explanation: '封閉式問題限制表達空間', explanationPoints: ['未能深入了解'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「小敏，你呢排都一個人食飯，你而家感覺點？」', type: 'open', score: 10, childReaction: '眼眶泛紅，開始講出被排擠嘅經歷', childReactionEmoji: '🥺', explanation: '溫柔觀察加情感探問', explanationPoints: ['不急於解決', '給予表達空間'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 5, role: 'teacher', category: '時間管理', title: '功課持續拖延',
    description: '已經連續三日，俊賢都無交功課。你見到佢書包打開，入面嘅功課冊都係空白嘅。佢避開你嘅目光。',
    context: '早上收功課時段，其他同學排隊交功課',
    options: [
      { id: 'A', text: '「又無做？再唔交就打電話俾屋企人！」', type: 'closed', score: 0, childReaction: '表情恐懼但依然無法表達困難', childReactionEmoji: '😰', explanation: '威脅式回應增加恐懼未解決原因', explanationPoints: ['問題持續'], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你係咪唔識做？要唔要補習？」', type: 'semi-open', score: 5, childReaction: '猶豫點頭，但真正原因可能唔係學業', childReactionEmoji: '😐', explanation: '假設原因為學業困難', explanationPoints: ['可能忽略家庭因素'], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「無做功課要留堂做完先走得。」', type: 'judgmental', score: 1, childReaction: '無奈接受但內心抗拒，問題未解', childReactionEmoji: '😔', explanation: '懲罰未處理根本原因', explanationPoints: ['增加壓力'], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「俊賢，你呢幾日無交功課，可以講下發生咩事嗎？」', type: 'open', score: 10, childReaction: '深呼吸後透露屋企變故或其他困難', childReactionEmoji: '😌', explanation: '無判斷地邀請分享', explanationPoints: ['開放空間讓學生表達'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 6, role: 'teacher', category: '情緒爆發', title: '課堂突然哭泣',
    description: '上緊常識課，你講到「家庭」課題時，坐喺中間嘅嘉欣突然低頭，肩膀不停震動，開始細聲喊。全班同學都望住佢。',
    context: '課室正在上課，投影片顯示「我的家庭」主題',
    options: [
      { id: 'A', text: '「嘉欣，唔好喊啦，我哋繼續上堂。」', type: 'closed', score: 0, childReaction: '努力忍住但情緒更崩潰，感到被忽視', childReactionEmoji: '😭', explanation: '壓抑情緒令學生不被允許表達', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你係咪唔舒服？要唔要去醫療室？」', type: 'semi-open', score: 4, childReaction: '搖頭但繼續哭，問題未被理解', childReactionEmoji: '😢', explanation: '轉移注意力迴避情緒處理', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你自己去洗個面冷靜下。」', type: 'judgmental', score: 2, childReaction: '獨自離開但感到被遺棄', childReactionEmoji: '😔', explanation: '隔離處理無陪伴支持', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「嘉欣，我見到你好傷心，想講嘅話我喺度聽。」', type: 'open', score: 10, childReaction: '慢慢抬頭，感到接納，點頭表示想傾', childReactionEmoji: '🥺', explanation: '接納情緒表達，提供安全空間', explanationPoints: ['不急於停止哭泣', '表達陪伴意願'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 7, role: 'teacher', category: '參與度低', title: '唔舉手發言',
    description: '你發問咗好幾條問題，班上大部分同學都舉手，但你留意到文軒從頭到尾都低住頭，雙手放喺枱底。其實佢嘅作業顯示佢都識答。',
    context: '課堂問答環節，氣氛活躍',
    options: [
      { id: 'A', text: '「文軒，你答呢條！企起身！」', type: 'closed', score: 1, childReaction: '驚慌企起身，口窒答唔到，全班笑', childReactionEmoji: '😰', explanation: '突然被叫令害羞學生更恐懼', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「文軒好叻㗎，你都試下舉手？」', type: 'semi-open', score: 4, childReaction: '勉強舉手但聲音好細，壓力大', childReactionEmoji: '😣', explanation: '公開讚美令內向學生壓力更大', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「無舉手就代表唔識啦。」', type: 'judgmental', score: 0, childReaction: '更加退縮，以後更唔敢參與', childReactionEmoji: '😔', explanation: '錯誤假設傷害自信', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「文軒，我見你作業做得好好，有冇想分享但又猶豫緊？」', type: 'open', score: 10, childReaction: '抬頭微笑，細聲說「我驚答錯」', childReactionEmoji: '😊', explanation: '私下肯定加開放提問建立安全感', explanationPoints: ['理解沉默背後原因'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 8, role: 'teacher', category: '校園欺凌', title: '疑似被欺凌',
    description: '小息後，你見到明仔返到課室，校服膊頭有腳印，眼眶紅紅。佢話「跌親啫」就坐低，但你留意到佢手臂有瘀痕。',
    context: '小息後課室，明仔神情閃縮',
    options: [
      { id: 'A', text: '「邊個打你？同我講佢哋嘅名！」', type: 'closed', score: 2, childReaction: '搖頭否認，更加封閉，怕被報復', childReactionEmoji: '😰', explanation: '追問令受害者更恐懼', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你要堅強啲，唔好俾人蝦！」', type: 'judgmental', score: 0, childReaction: '更自責，覺得被欺負係自己嘅錯', childReactionEmoji: '😞', explanation: '歸咎受害者強化無力感', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「有事可以搵我，我會幫你。」', type: 'semi-open', score: 4, childReaction: '點頭但唔會主動搵，未建立足夠信任', childReactionEmoji: '😐', explanation: '提供支援但太被動', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「明仔，我見到你身上有啲痕跡，你而家感覺安唔安全？」', type: 'open', score: 10, childReaction: '停頓後開始細聲講出被欺負嘅經過', childReactionEmoji: '🥺', explanation: '關注安全感而非追究', explanationPoints: ['先確保安全', '讓學生按節奏分享'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 9, role: 'teacher', category: '特殊需要', title: '學習障礙表現',
    description: '抄寫練習時，你走到曉晴枱頭，見到佢寫咗好耐但只得兩行字，而且好多字左右倒轉。佢好畀力咁握住支筆，手指震緊。',
    context: '抄寫堂，其他同學已經寫咗大半頁',
    options: [
      { id: 'A', text: '「你要快啲寫！其他人都寫完喇！」', type: 'closed', score: 0, childReaction: '更緊張，字越寫越差，開始流眼淚', childReactionEmoji: '😭', explanation: '催促令學習困難學生壓力倍增', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你嘅字寫得唔靚，擦咗重寫。」', type: 'judgmental', score: 1, childReaction: '用力擦到紙都爛，自信心受損', childReactionEmoji: '😔', explanation: '否定努力令學生恐懼學習', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'C', text: '「慢慢寫，唔使急，寫到幾多得幾多。」', type: 'semi-open', score: 5, childReaction: '壓力減少但問題未被識別', childReactionEmoji: '😐', explanation: '降低要求但未了解困難', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「曉晴，我見你好努力，寫字嘅時候有冇邊度覺得困難？」', type: 'open', score: 10, childReaction: '放鬆握筆，解釋「啲字會跳嚟跳去」', childReactionEmoji: '😌', explanation: '肯定努力加探問有助識別學習需要', explanationPoints: ['肯定過程而非結果'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 10, role: 'teacher', category: '環境轉變', title: '轉校適應困難',
    description: '新來嘅轉校生思琪已經返咗學兩個禮拜，但佢仲係一個人坐，落堂唔同人傾，上堂面無表情。你留意到佢成日望住舊學校嘅水壺。',
    context: '課室，其他同學已經熟絡，思琪仍然格格不入',
    options: [
      { id: 'A', text: '「思琪，你要主動啲同同學傾偈！」', type: 'closed', score: 2, childReaction: '點頭但無行動，覺得係自己問題', childReactionEmoji: '😐', explanation: '忽略適應困難將責任推畀新生', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「大家歡迎思琪！邊個做佢buddy？」', type: 'semi-open', score: 5, childReaction: '有人被指定但互動生硬，感到被安排', childReactionEmoji: '😣', explanation: '有善意但未了解個人感受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「習慣咗就會好㗎喇，唔使擔心。」', type: 'judgmental', score: 3, childReaction: '點頭但依然孤單，情緒被忽略', childReactionEmoji: '😔', explanation: '輕描淡寫未承認轉變困難', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「思琪，嚟咗新學校兩個禮拜喇，你而家感覺係點？」', type: 'open', score: 10, childReaction: '眼神亮起，開始講舊學校嘅朋友和生活', childReactionEmoji: '😌', explanation: '承認轉變帶來的情緒', explanationPoints: ['讓學生主導話題'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 11, role: 'teacher', category: '身體形象', title: '體育課唔肯參與',
    description: '體育堂換好運動服後，你發現小美一直躲喺更衣室門口，雙手攬住自己，唔肯出去操場。其他女同學已經開始熱身。',
    context: '操場旁更衣室門口，小美穿住運動短褲顯得唔自在',
    options: [
      { id: 'A', text: '「快啲出嚟！全班等緊你！」', type: 'closed', score: 0, childReaction: '勉強行出但雙手攬住自己，完全無參與', childReactionEmoji: '😰', explanation: '忽略身體形象焦慮', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「運動對身體好㗎，唔好唔肯出嚟。」', type: 'semi-open', score: 3, childReaction: '慢慢行出但全程不自在', childReactionEmoji: '😣', explanation: '講道理未理解身體形象壓力', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你可以著住件外套，無人會留意。」', type: 'judgmental', score: 4, childReaction: '稍為安心但問題被掩蓋', childReactionEmoji: '😐', explanation: '提供解決方案但未處理根本', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「小美，我見你企咗喺度好耐，有咩令你唔想出去？」', type: 'open', score: 10, childReaction: '細聲說出對身材嘅不安或曾被取笑', childReactionEmoji: '🥺', explanation: '安全探問讓學生表達焦慮', explanationPoints: ['不公開討論敏感話題'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 12, role: 'teacher', category: '家庭狀況', title: '經常遲到',
    description: '已經第四日，浩然又遲到咗半個鐘。佢喘住氣跑入課室，頭髮凌亂，校服有啲皺。書包拉鏈無拉好，入面嘅嘢跌晒出嚟。',
    context: '早上上課十五分鐘後，浩然衝入課室',
    options: [
      { id: 'A', text: '「又遲到！罰你企喺度到小息！」', type: 'closed', score: 0, childReaction: '紅住面企門口，覺得唔公平但唔敢講', childReactionEmoji: '😤', explanation: '懲罰未了解原因', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你要早啲瞓，咁就唔會遲到。」', type: 'semi-open', score: 3, childReaction: '小聲說「係」但問題唔係佢控制到', childReactionEmoji: '😔', explanation: '假設是學生責任忽略家庭因素', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「遲到要記缺點，你知唔知？」', type: 'judgmental', score: 1, childReaction: '低頭無回應，更加壓力', childReactionEmoji: '😢', explanation: '威脅無助解決根本問題', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「浩然，你呢幾日都趕到氣喘喘，返學路上發生咩事？」', type: 'open', score: 10, childReaction: '表情從防備轉為感動，開始講屋企情況', childReactionEmoji: '😢', explanation: '關心而非懲罰，了解家庭困難', explanationPoints: ['遲到可能反映家庭問題'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 13, role: 'teacher', category: '情緒宣洩', title: '破壞公物',
    description: '午飯後，你聽到美術室傳來「嘭」一聲。入到去見到建明踢翻咗一張凳，桌面嘅顏料打翻晒。佢企喺度喘氣，拳頭握得好緊。',
    context: '美術室，地下一片混亂，建明面紅耳赤',
    options: [
      { id: 'A', text: '「你做咩踢凳？賠錢！」', type: 'closed', score: 0, childReaction: '更加憤怒，開始掟其他嘢', childReactionEmoji: '😡', explanation: '追究責任令情緒升級', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你要控制下自己嘅脾氣！」', type: 'judgmental', score: 2, childReaction: '「我控制唔到！」更加崩潰', childReactionEmoji: '😤', explanation: '要求控制但未教導方法', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「冷靜下先，我哋傾下。」', type: 'semi-open', score: 5, childReaction: '呼吸開始平復但仍然繃緊', childReactionEmoji: '😣', explanation: '緩和但未深入探問', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「建明，我見你好嬲，嬲到踢凳。發生咗咩事令你咁嬲？」', type: 'open', score: 10, childReaction: '喘氣慢咗，開始講被人笑佢嘅畫', childReactionEmoji: '😢', explanation: '接納情緒同時了解觸發點', explanationPoints: ['破壞背後有原因'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 14, role: 'teacher', category: '學業壓力', title: '測驗作弊',
    description: '測驗期間，你見到俊傑偷望隔離同學嘅答案。你行近時佢即刻低頭，手震住咁揸筆，面色發白。',
    context: '測驗中，課室安靜',
    options: [
      { id: 'A', text: '「你出貓！零分！企出嚟！」', type: 'closed', score: 0, childReaction: '全身發抖，喊住走出去，被標籤為壞學生', childReactionEmoji: '😭', explanation: '公開羞辱造成長期心理傷害', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「我睇到㗎，測驗後留低。」', type: 'semi-open', score: 5, childReaction: '成個測驗都好驚，完全無法專注', childReactionEmoji: '😰', explanation: '私下處理較好但產生焦慮', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你再咁做就通知家長！」', type: 'judgmental', score: 2, childReaction: '更加恐懼，對學校產生負面感覺', childReactionEmoji: '😨', explanation: '威脅增加壓力未解決問題', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '（測驗後私下）「我留意到你今日測驗時好緊張，發生咩事？」', type: 'open', score: 10, childReaction: '開始講出對成績嘅恐懼和家庭壓力', childReactionEmoji: '😢', explanation: '私下探問了解作弊背後嘅壓力', explanationPoints: ['了解學業壓力來源'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 15, role: 'teacher', category: '社交技巧', title: '排斥新同學',
    description: '你留意到有幾個同學圍埋一齊，對住新轉嚟嘅小朋友指指點點，仲發出笑聲。新同學企喺一邊，表情好尷尬。',
    context: '小息時間，課室角落',
    options: [
      { id: 'A', text: '「你哋做咩？唔好講人壞話！」', type: 'closed', score: 2, childReaction: '停止但暗地裡繼續，更加隱蔽', childReactionEmoji: '😏', explanation: '制止行為但未改變態度', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你哋要對新同學友善啲！」', type: 'judgmental', score: 3, childReaction: '表面答應但無真正改變', childReactionEmoji: '😐', explanation: '說教式要求缺乏內在動機', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「大家認識下新同學啦！」', type: 'semi-open', score: 4, childReaction: '敷衍介紹但無真正接納', childReactionEmoji: '😐', explanation: '表面破冰但未處理排斥心態', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「我見到你哋喺度傾偈，係咪對新同學有啲好奇？想唔想聽佢介紹下自己？」', type: 'open', score: 10, childReaction: '好奇心被引導，開始真正同新同學交流', childReactionEmoji: '😊', explanation: '將好奇轉化為正面互動', explanationPoints: ['引導而非批評'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 16, role: 'teacher', category: '身心狀態', title: '上堂睡覺',
    description: '上緊課，你見到俊熙趴喺枱面瞓著咗，其他同學開始笑。你走近睇到佢眼底有黑眼圈，面色好蒼白。',
    context: '課室上課中',
    options: [
      { id: 'A', text: '「俊熙！瞓覺？企起身！」', type: 'closed', score: 0, childReaction: '驚醒，好攰咁企起身，全班笑更大聲', childReactionEmoji: '😰', explanation: '公開叫醒造成羞恥', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '（輕拍）「唔舒服就去休息室瞓。」', type: 'semi-open', score: 5, childReaction: '感激但問題原因未被了解', childReactionEmoji: '😌', explanation: '善意但錯過了解機會', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「尋晚打機打到幾點？」', type: 'judgmental', score: 2, childReaction: '搖頭但無力解釋', childReactionEmoji: '😔', explanation: '假設原因可能與事實不符', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '（下課後）「俊熙，你今日好攰，最近瞓得好唔好？有咩事嗎？」', type: 'open', score: 10, childReaction: '開始講出屋企嘅狀況或睡眠問題', childReactionEmoji: '😢', explanation: '私下關心了解睡眠問題根源', explanationPoints: ['可能有家庭因素'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 17, role: 'teacher', category: '權威挑戰', title: '頂撞老師',
    description: '你叫全班同學收起手機，但嘉明繼續低頭玩。你行到佢枱前，佢抬頭話「關你咩事？」全班靜晒。',
    context: '課室，其他學生都望住',
    options: [
      { id: 'A', text: '「你講咩話？即刻交出電話！見訓導！」', type: 'closed', score: 0, childReaction: '「我唔交！」公開對峙升級', childReactionEmoji: '😡', explanation: '權力鬥爭無贏家', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你咁樣講嘢好無禮貌！」', type: 'judgmental', score: 2, childReaction: '「你先無禮貌！」更加反抗', childReactionEmoji: '😤', explanation: '互相指責無助解決', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「我哋下課傾下。」', type: 'semi-open', score: 5, childReaction: '不情願收起電話但依然嬲', childReactionEmoji: '😒', explanation: '暫時緩和但未處理情緒', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '（平靜）「我感覺到你好嬲，下課我想聽下你嘅想法。」', type: 'open', score: 10, childReaction: '意外地冷靜咗，收起電話', childReactionEmoji: '😐', explanation: '接納情緒避免對峙升級', explanationPoints: ['尊重同時維持界線'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 18, role: 'teacher', category: '心理壓力', title: '完美主義焦慮',
    description: '你見到品學兼優嘅曉琳做練習時不停擦咗重寫，擦到紙都起毛。佢嘅眉頭緊鎖，咬住嘴唇，手都震緊。',
    context: '課室做練習時間',
    options: [
      { id: 'A', text: '「你寫得好好啦，唔使擦㗎！」', type: 'closed', score: 3, childReaction: '勉強停但依然覺得唔夠好', childReactionEmoji: '😣', explanation: '表面安撫未觸及焦慮根源', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你太追求完美喇，放鬆啲。」', type: 'judgmental', score: 2, childReaction: '覺得連追求完美都係錯', childReactionEmoji: '😔', explanation: '批評完美主義但無提供替代', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「寫錯可以改㗎，唔使擦晒佢。」', type: 'semi-open', score: 4, childReaction: '點頭但依然無法放鬆標準', childReactionEmoji: '😐', explanation: '提供方法但未處理壓力來源', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「曉琳，我見你不停擦咗重寫，你而家心入面感覺係點？」', type: 'open', score: 10, childReaction: '「我驚寫得唔夠好...」開始表達內在壓力', childReactionEmoji: '😢', explanation: '探問情緒了解完美主義背後嘅恐懼', explanationPoints: ['可能有外在期望壓力'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 19, role: 'teacher', category: '社交退縮', title: '小息獨自看書',
    description: '每次小息，你都見到穎詩獨自坐喺課室睇書。今日你行過，見到佢望住操場嘅同學，本書其實揭咗好耐都無郁過。',
    context: '小息，課室只有穎詩一人',
    options: [
      { id: 'A', text: '「出去玩下啦，成日留喺課室唔好！」', type: 'closed', score: 2, childReaction: '「我鍾意睇書」用藉口迴避', childReactionEmoji: '😐', explanation: '強迫社交忽略真正需要', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你個個小息都睇書，悶唔悶？」', type: 'semi-open', score: 4, childReaction: '「唔悶」但眼神透露渴望', childReactionEmoji: '😔', explanation: '問題太簡單未能深入', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「睇咩書呀？好睇嗎？」', type: 'judgmental', score: 3, childReaction: '簡單回應但對話無法延續', childReactionEmoji: '😐', explanation: '表面交流未觸及核心', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「穎詩，我見你望住操場，你有冇諗過出去玩？」', type: 'open', score: 10, childReaction: '「我...唔知點加入佢哋」終於表達困難', childReactionEmoji: '🥺', explanation: '描述觀察引導真實表達', explanationPoints: ['了解社交困難'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 20, role: 'teacher', category: '學業進步', title: '成績突然進步',
    description: '一向成績中下嘅阿偉今次測驗攞到全班第三名，差啲滿分。有同學話佢「一定係出貓」，阿偉表情複雜。',
    context: '派測驗卷後，課室氣氛微妙',
    options: [
      { id: 'A', text: '「阿偉，你係咪真係識做？」', type: 'closed', score: 0, childReaction: '表情受傷，「老師都唔信我」', childReactionEmoji: '😢', explanation: '質疑打擊自信和努力', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「做得好！繼續努力！」', type: 'semi-open', score: 5, childReaction: '勉強笑但對同學嘅懷疑仍然介意', childReactionEmoji: '😐', explanation: '讚美但未處理被質疑嘅感受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你進步咗好多，下次都要保持！」', type: 'judgmental', score: 4, childReaction: '壓力增加，怕下次做唔到', childReactionEmoji: '😣', explanation: '期望壓力未肯定過程', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「阿偉，你今次進步好大，呢個成績背後你付出咗咩努力？」', type: 'open', score: 10, childReaction: '開心咁講出溫習嘅方法和努力過程', childReactionEmoji: '😊', explanation: '肯定努力過程讓學生表達', explanationPoints: ['強化成長心態'], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default teacherScenarios;
