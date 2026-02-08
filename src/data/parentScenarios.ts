import type { Scenario } from '@/types/game';

const parentScenarios: Scenario[] = [
  {
    id: 21, role: 'parent', category: '放學情緒', title: '放學返屋企情緒低落',
    description: '小朋友放學返到屋企，一開門就放低書包，連招呼都無打就直接行入房間。平時佢會興高采烈同你分享學校趣事。',
    context: '溫馨客廳，你啱啱準備好小食',
    options: [
      { id: 'A', text: '「返咗嚟都唔叫人？好無禮貌！」', type: 'closed', score: 0, childReaction: '頭也不回衝入房間，大力關門，親子距離拉遠', childReactionEmoji: '😠', explanation: '責備禮貌問題而忽略情緒狀態', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「今日學校點呀？開唔開心？」', type: 'semi-open', score: 4, childReaction: '敷衍回應「OK 啦」，繼續行入房', childReactionEmoji: '😑', explanation: '問題太廣泛，情緒低落時難以回應', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「返嚟喇！我見你好似好攰咁，今日辛唔辛苦呀？」', type: 'open', score: 10, childReaction: '停步，轉身行返埋嚟，靠喺家長身邊，開始慢慢講述困難', childReactionEmoji: '🥺', explanation: '描述觀察加關心感受，令小朋友感到被接納', explanationPoints: ['先接住情緒', '描述觀察而非質問', '讓小朋友決定分享多少'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 22, role: 'parent', category: '手足衝突', title: '兄弟姊妹爭玩具',
    description: '客廳傳來激烈嘈吵聲，你行出去見到哥哥同妹妹扯住同一架玩具車，兩個都大聲嗌「係我先攞嘅！」玩具散滿一地。',
    context: '客廳玩具區，兩個小朋友面紅耳赤拉扯',
    options: [
      { id: 'A', text: '「又嗌！玩具收晒，全部冇得玩！」', type: 'closed', score: 0, childReaction: '兩個小朋友都喊，玩具車掉地上，感到不公平', childReactionEmoji: '😭', explanation: '懲罰式回應令兩個都覺得受害', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「大嘅要讓細嘅，你將玩具俾妹妹！」', type: 'judgmental', score: 2, childReaction: '哥哥不忿放手，妹妹得意笑，但哥哥累積怨恨', childReactionEmoji: '😤', explanation: '偏頗決定令一方感到不公，未教導協商', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「我見到你哋兩個都好想玩呢架車，可以講下你哋點諗？我哋一齊諗辦法。」', type: 'open', score: 10, childReaction: '兩個小朋友放鬆拉扯，開始輪流講想法', childReactionEmoji: '😌', explanation: '引導表達加共同解決，培養衝突解決能力', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 23, role: 'parent', category: '飲食習慣', title: '晚飯時間拒絕進食',
    description: '你精心準備咗營養晚餐，但小朋友一見到餸菜就推開碗碟，交叉雙手，扭頭唔望。佢話「我唔食！」',
    context: '飯桌上有西蘭花、魚、飯，小朋友表情抗拒',
    options: [
      { id: 'A', text: '「煮咗咁耐你唔食？唔食就餓死你！出去！」', type: 'closed', score: 0, childReaction: '小朋友哭住離開，親子關係受損，飲食問題無解決', childReactionEmoji: '😭', explanation: '威脅式回應令用餐成為權力鬥爭', explanationPoints: [], color: 'red', responsePattern: '封閉式/威脅式' },
      { id: 'B', text: '「食咗先有甜品，快啲食！三口就得！」', type: 'semi-open', score: 3, childReaction: '勉強食三口，表情痛苦，無建立內在動機', childReactionEmoji: '😖', explanation: '交換條件短期有效但無助長遠健康飲食', explanationPoints: [], color: 'orange', responsePattern: '半開放式/條件式' },
      { id: 'C', text: '「我見你推開個碗，係咪唔鍾意食呢啲餸？可以話俾媽媽知點解嗎？」', type: 'open', score: 10, childReaction: '小朋友放鬆，講出真實原因：肚痛、味道唔鍾意、或者其他情緒', childReactionEmoji: '😌', explanation: '理解拒食背後原因，才能適切處理', explanationPoints: ['拒食可能有多種原因', '了解再處理', '維持正面用餐體驗'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 24, role: 'parent', category: '功課壓力', title: '做功課拖拉發脾氣',
    description: '放學後過咗一個鐘，小朋友嘅功課簿仍然空白。佢坐喺書枱前，將筆掟喺地下，大叫「我唔做！好煩！」',
    context: '書房，功課攤開但一個字都無寫',
    options: [
      { id: 'A', text: '「唔做功課就唔好食飯！坐好做！」', type: 'closed', score: 0, childReaction: '大喊大叫，推跌書本，情緒完全失控', childReactionEmoji: '😡', explanation: '威脅加劇對立，功課變成戰場', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你快啲做完就可以去玩㗎喇。」', type: 'semi-open', score: 3, childReaction: '「我唔識做嘛！」更加沮喪', childReactionEmoji: '😤', explanation: '利誘但未理解困難所在', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「我見你好嬲，做功課好似令你好唔開心。係咪有啲地方覺得好難？」', type: 'open', score: 10, childReaction: '情緒慢慢緩和，開始指住功課話「呢度我唔識」', childReactionEmoji: '😌', explanation: '先接住情緒，再了解困難，建立合作模式', explanationPoints: ['情緒先於學習', '了解具體困難', '從對立變合作'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 25, role: 'parent', category: '睡前情緒', title: '睡前情緒崩潰唔肯瞓',
    description: '已經過咗就寢時間半個鐘，小朋友仲係唔肯上床。佢突然開始喊，攬住你唔放手，話「我唔想瞓」。',
    context: '睡房，燈已經調暗，但小朋友坐喺地下喊',
    options: [
      { id: 'A', text: '「已經好夜喇！聽日要返學！快啲瞓！」', type: 'closed', score: 0, childReaction: '喊得更大聲，攬得更緊，完全無法入睡', childReactionEmoji: '😭', explanation: '催促令焦慮加劇', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「唔好喊啦，我陪你瞓到你訓著，好唔好？」', type: 'semi-open', score: 5, childReaction: '稍為安靜但仍然唔瞓，根本問題未解', childReactionEmoji: '😢', explanation: '提供安撫但未了解恐懼源頭', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「BB，我見你好唔想瞓，你嘅身體同心入面而家有咩感覺？」', type: 'open', score: 10, childReaction: '開始講出怕黑、發惡夢、或者擔心明天的事', childReactionEmoji: '🥺', explanation: '探問感受讓恐懼被看見，才能針對處理', explanationPoints: ['睡前崩潰常反映焦慮', '身體感覺幫助表達', '讓恐懼被說出來'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 26, role: 'parent', category: '社交受挫', title: '生日會無被邀請',
    description: '小朋友返到屋企話同班同學都收到小美嘅生日會邀請函，只有佢無。佢坐喺梳化上，低住頭，手指不停扯住校服衫角。',
    context: '客廳，小朋友獨自坐喺梳化',
    options: [
      { id: 'A', text: '「唔使理佢哋，你有其他朋友㗎嘛。」', type: 'closed', score: 2, childReaction: '「但係我以為佢係我好朋友...」更加傷心', childReactionEmoji: '😢', explanation: '否定感受令小朋友覺得傷心係唔啱', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「可能佢唔夠位，唔使咁唔開心。」', type: 'semi-open', score: 3, childReaction: '「全班都有...」合理化無法安慰', childReactionEmoji: '😔', explanation: '嘗試合理化但小朋友的感受是真實的', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「全班都有邀請但你無，聽落好失望。你而家心入面係咩感覺？」', type: 'open', score: 10, childReaction: '靠過來，開始講出被排斥的感受和對友誼的困惑', childReactionEmoji: '🥺', explanation: '承認失望是合理的，陪伴經歷情緒', explanationPoints: ['承認情緒合理性', '不急於修補', '陪伴經歷失望'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 27, role: 'parent', category: '電子產品', title: '唔肯停玩電話',
    description: '已經叫咗三次「放低電話」，小朋友仍然全神貫注玩緊手機遊戲，連望都無望你一眼。約定嘅時間早就過咗。',
    context: '客廳，小朋友躺喺梳化上玩手機',
    options: [
      { id: 'A', text: '「即刻放低！再唔聽話永遠唔俾你玩！」（搶走手機）', type: 'closed', score: 0, childReaction: '尖叫撲去搶電話，大喊「我恨你」，爆發激烈衝突', childReactionEmoji: '😡', explanation: '強行搶走引發權力鬥爭', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「仲有五分鐘就要停喇，你自己識數。」', type: 'semi-open', score: 5, childReaction: '五分鐘後又話「就嚟過關」又拖', childReactionEmoji: '😑', explanation: '設限有用但未處理沉迷問題', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「我見你玩得好投入，呢個遊戲有咩咁吸引你？不過我哋約定嘅時間到咗，你覺得點做好？」', type: 'open', score: 10, childReaction: '「我想過埋呢關...」開始講出需求，一齊商量方案', childReactionEmoji: '😌', explanation: '承認興趣加提醒約定，引導自我管理', explanationPoints: ['肯定興趣而非否定', '提醒共同約定', '引導自主決定'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 28, role: 'parent', category: '返學抗拒', title: '早上賴床唔肯返學',
    description: '鬧鐘響咗三次，小朋友用被蓋住頭，話「我唔返學！肚痛！」但你摸佢額頭無發燒，佢嘅身體語言顯示係唔想去。',
    context: '早上，睡房，時間越來越趕',
    options: [
      { id: 'A', text: '「邊有肚痛？快啲起身！再唔起身我數三聲！」', type: 'closed', score: 1, childReaction: '開始大喊「真係痛呀」，早晨變成戰場', childReactionEmoji: '😭', explanation: '否定感受和強迫上學，未了解抗拒原因', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「真係肚痛？食完早餐再睇下好唔好？」', type: 'semi-open', score: 4, childReaction: '慢慢起身但一直話唔舒服，可能在學校有困擾', childReactionEmoji: '😣', explanation: '暫時處理但未觸及可能的學校問題', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「我見你好唔想返學，你嘅肚仔係咪緊張到唔舒服？學校有啲咩令你擔心？」', type: 'open', score: 10, childReaction: '慢慢拉低被，開始講出學校令佢害怕嘅事', childReactionEmoji: '🥺', explanation: '將身體症狀同情緒連結，探問學校經歷', explanationPoints: ['身體症狀可能是焦慮表現', '連結身心感受', '了解學校處境'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 29, role: 'parent', category: '誠實問題', title: '講大話隱瞞事實',
    description: '你發現小朋友嘅簿冊上有老師嘅投訴信，但小朋友之前問佢話「無嘢」。你攞住封信，小朋友面色即刻變白。',
    context: '客廳，小朋友見到你手上嘅信封',
    options: [
      { id: 'A', text: '「你講大話！我最憎講大話嘅細路！」', type: 'closed', score: 0, childReaction: '大喊「我無講大話」然後跑入房，以後更加識得隱瞞', childReactionEmoji: '😡', explanation: '標籤「講大話嘅細路」傷害自尊，令隱瞞行為加深', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「點解你唔話俾我知？你應該要坦白。」', type: 'judgmental', score: 2, childReaction: '低頭無回應，已經建起防衛牆', childReactionEmoji: '😔', explanation: '「應該」式教育無助理解隱瞞原因', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「我見到老師嘅信，你之前唔想講，你嗰陣係咪好驚我會嬲？可以話俾我知發生咩事嗎？」', type: 'open', score: 10, childReaction: '遲疑後點頭，開始講出事情經過和自己的害怕', childReactionEmoji: '🥺', explanation: '理解隱瞞出於恐懼，建立安全表達空間', explanationPoints: ['理解隱瞞動機', '降低恐懼感', '建立坦誠的安全基礎'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 30, role: 'parent', category: '朋友衝突', title: '同朋友仔嗌交',
    description: '小朋友氣沖沖返到屋企，掟低書包大聲話「我以後都唔同佢玩！佢好衰！」你問佢咩事佢就更加嬲。',
    context: '門口，小朋友面紅耳赤',
    options: [
      { id: 'A', text: '「咁你做咗啲咩先？一個巴掌拍唔響！」', type: 'judgmental', score: 1, childReaction: '「你成日幫人唔幫我！」衝入房間摔門', childReactionEmoji: '😡', explanation: '暗示小朋友有份，令佢覺得唔被撐', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'B', text: '「咁唔好同佢玩囉，搵其他朋友。」', type: 'semi-open', score: 3, childReaction: '「但係我好鍾意同佢玩㗎...」更加矛盾', childReactionEmoji: '😢', explanation: '簡化處理未幫到小朋友處理複雜情感', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你好嬲，一定發生咗好令你唔開心嘅事。想坐低慢慢同我講嗎？」', type: 'open', score: 10, childReaction: '嬲到喊住開始講成件事嘅經過', childReactionEmoji: '😭', explanation: '接納憤怒，給予空間表達完整故事', explanationPoints: ['先接住情緒', '不急於評判', '讓小朋友完整敘述'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 31, role: 'parent', category: '消費教育', title: '想買貴價玩具',
    description: '喺玩具店，小朋友企喺一個大型樂高盒前面唔肯走，不停話「我好想要呀！求求你！」標價 $899。',
    context: '玩具店，小朋友企定望住個盒',
    options: [
      { id: 'A', text: '「咁貴！你知唔知爸媽賺錢幾辛苦？走啦！」', type: 'closed', score: 2, childReaction: '嗌住喊，賴喺地下唔肯走，更加堅持', childReactionEmoji: '😭', explanation: '內疚式教育令小朋友覺得想要嘢係錯', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你生日先買俾你，而家忍住先。」', type: 'semi-open', score: 5, childReaction: '猶豫，暫時接受但隨時變卦', childReactionEmoji: '😐', explanation: '延遲滿足有用但可以做得更好', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你好鍾意呢個樂高，佢有啲咩吸引你？我哋可以傾下點先可以得到佢。」', type: 'open', score: 10, childReaction: '開始興奮咁介紹想要嘅原因，一齊討論儲錢計劃', childReactionEmoji: '😊', explanation: '肯定願望同時引導財務觀念', explanationPoints: ['肯定而非否定願望', '一齊想辦法', '教導延遲滿足和計劃'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 32, role: 'parent', category: '情緒管理', title: '輸咗遊戲發脾氣',
    description: '同小朋友玩棋盤遊戲，佢輸咗就大力掃晒棋子落地，掟骰仔，大嗌「唔玩喇！你出千！」',
    context: '客廳地下，棋子散晒一地',
    options: [
      { id: 'A', text: '「你咁都發脾氣？以後唔同你玩！」', type: 'closed', score: 0, childReaction: '更加崩潰，失去一個學習情緒管理嘅機會', childReactionEmoji: '😡', explanation: '拒絕令小朋友覺得情緒是壞事', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「輸贏好正常㗎，唔使咁嬲。」', type: 'semi-open', score: 3, childReaction: '「但係我唔鍾意輸」情緒未被處理', childReactionEmoji: '😤', explanation: '道理無法在情緒中被接受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「輸咗令你好嬲好失望，你而家身體邊度最唔舒服？」', type: 'open', score: 10, childReaction: '指住心口話「呢度好痛」，開始學習辨識和表達情緒', childReactionEmoji: '😢', explanation: '幫助小朋友連結情緒和身體感受', explanationPoints: ['將情緒具體化', '教導情緒覺察', '不否定感受'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 33, role: 'parent', category: '自理能力', title: '唔肯沖涼',
    description: '已經到咗沖涼時間，小朋友堅決企喺浴室門口唔肯入去，兩隻手捉住門框，不停搖頭話「唔要！」',
    context: '浴室門口，小朋友全身緊繃',
    options: [
      { id: 'A', text: '「你再唔入去我就打你屁股！」', type: 'closed', score: 0, childReaction: '大喊大叫掙扎，沖涼成為每日戰爭', childReactionEmoji: '😭', explanation: '威脅令沖涼同恐懼連結', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「沖完涼就俾你睇一集卡通。」', type: 'semi-open', score: 3, childReaction: '勉強入去但全程喊，為獎勵而非自願', childReactionEmoji: '😖', explanation: '利誘短期有效但未解決根本問題', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「你企咗喺度好耐都唔想入去，你係咪怕水或者有啲唔鍾意嘅嘢？』', type: 'open', score: 10, childReaction: '慢慢鬆開門框，話「水好凍」或「洗頭會入眼」', childReactionEmoji: '😌', explanation: '了解具體恐懼才能針對處理', explanationPoints: ['拒絕背後有原因', '具體了解恐懼', '一齊找解決方法'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 34, role: 'parent', category: '恐懼處理', title: '怕黑要陪瞓',
    description: '熄咗燈之後，小朋友每晚都走出嚟你房間，話「我怕有怪獸」。今晚已經係第四次。',
    context: '深夜，小朋友站在你床邊',
    options: [
      { id: 'A', text: '「邊有怪獸？大個仔/女喇唔好怕！返入去瞓！」', type: 'closed', score: 1, childReaction: '哭住行返入去但好快又出嚟，恐懼無減少', childReactionEmoji: '😭', explanation: '否定恐懼令小朋友覺得害怕係唔啱', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「好啦好啦，上嚟一齊瞓。」', type: 'semi-open', score: 3, childReaction: '安心瞓著但無學到面對恐懼', childReactionEmoji: '😊', explanation: '即時安撫但長遠未建立獨立入睡能力', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你又怕怕啦？你覺得怪獸喺邊度？佢嘅樣係點㗎？我哋一齊去睇下。」', type: 'open', score: 10, childReaction: '拖住你隻手一齊去「巡視」，慢慢放鬆，感到被保護', childReactionEmoji: '🥺', explanation: '認真對待恐懼，一齊面對建立安全感', explanationPoints: ['恐懼對小朋友是真實的', '一齊面對建立勇氣', '不否定不縱容'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 35, role: 'parent', category: '失去與哀傷', title: '寵物死咗傷心',
    description: '養咗三年嘅小倉鼠死咗，小朋友發現後坐喺籠邊，不停撫摸冰冷嘅身體，無聲流眼淚。',
    context: '睡房，小倉鼠躺喺籠入面',
    options: [
      { id: 'A', text: '「唔好喊啦，不如我哋買返隻新嘅？」', type: 'closed', score: 1, childReaction: '大喊「我唔要新嘅！我要毛毛！」更加崩潰', childReactionEmoji: '😭', explanation: '用替代品否定哀傷，令小朋友覺得感受不被重視', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「毛毛去咗天堂做天使，佢好開心㗎。」', type: 'semi-open', score: 4, childReaction: '稍為安慰但仍然好傷心，未完全處理哀傷', childReactionEmoji: '😢', explanation: '美化死亡有安慰但可能阻止真實哀傷', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「毛毛走咗，你一定好掛住佢。你記得同佢最開心嘅事係咩？」', type: 'open', score: 10, childReaction: '邊喊邊笑住講同倉鼠嘅回憶，慢慢接受離別', childReactionEmoji: '🥺', explanation: '陪伴哀傷，透過回憶紀念，學習面對失去', explanationPoints: ['允許哀傷', '回憶帶來療癒', '學習面對死亡'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 36, role: 'parent', category: '學業成績', title: '測驗成績差',
    description: '小朋友遞一張測驗卷俾你，只有 35 分。佢低住頭，成張卷都皺晒，好似揉過又攤返開。',
    context: '飯桌上，小朋友緊張地等待你的反應',
    options: [
      { id: 'A', text: '「35 分？你平時喺度做咩？你有冇溫書？」', type: 'closed', score: 1, childReaction: '哭出來，話「溫咗好耐都唔識」', childReactionEmoji: '😭', explanation: '責問加劇挫敗感和恐懼', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「分數唔代表一切，下次加油。」', type: 'semi-open', score: 4, childReaction: '點頭但無被真正看到自己嘅努力和困難', childReactionEmoji: '😐', explanation: '鼓勵但未了解學習困難', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「多謝你將張卷俾我睇。你拎到呢個分數嘅時候感覺點？溫習嗰陣邊度最難？」', type: 'open', score: 10, childReaction: '驚訝你無鬧佢，開始講出邊啲唔識同自己嘅沮喪', childReactionEmoji: '😌', explanation: '先肯定誠實分享，再了解學習困難', explanationPoints: ['肯定勇氣', '了解學習障礙', '一齊制定改善計劃'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 37, role: 'parent', category: '外表焦慮', title: '被人笑樣衰',
    description: '小朋友返到屋企一直照鏡，突然話「我係咪好醜？同學話我個鼻好大。」佢嘅眼睛望住鏡中嘅自己充滿懷疑。',
    context: '浴室，小朋友對住鏡子',
    options: [
      { id: 'A', text: '「你靚/靚仔啦！唔好理佢哋！」', type: 'closed', score: 2, childReaction: '「你一定係咁講㗎啦...」唔信任安慰', childReactionEmoji: '😔', explanation: '直接否定感受令安慰無效', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「外表唔重要，重要嘅係內在美。」', type: 'semi-open', score: 3, childReaction: '道理懂但情緒未被處理', childReactionEmoji: '😐', explanation: '講道理但未接住當下的痛', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「聽到同學咁講你一定好唔開心。你嗰陣嘅感覺係點？」', type: 'open', score: 10, childReaction: '靠過嚟，開始講出被笑後嘅羞恥和傷心', childReactionEmoji: '🥺', explanation: '先接住情緒傷痛，再建立正面自我形象', explanationPoints: ['接納被嘲笑的痛', '不急於修復', '建立內在價值感'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 38, role: 'parent', category: '分享困難', title: '唔肯分享玩具',
    description: '表弟嚟到屋企玩，小朋友將所有玩具攬住唔放，大叫「呢啲全部係我嘅！」表弟喺一邊失望望住。',
    context: '客廳，玩具被小朋友圍住',
    options: [
      { id: 'A', text: '「你好自私！快啲分啲玩具出嚟！」', type: 'closed', score: 0, childReaction: '更加緊攬住，大喊「我唔要」', childReactionEmoji: '😡', explanation: '標籤「自私」傷害自尊', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「揀一兩件唔玩嘅俾表弟玩啦。」', type: 'semi-open', score: 5, childReaction: '猶豫揀咗最舊嗰件出嚟', childReactionEmoji: '😣', explanation: '有妥協但未處理擁有感', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你好想保護你嘅玩具，你係咪擔心啲嘢？可以話俾我知嗎？」', type: 'open', score: 10, childReaction: '慢慢講出「佢上次整爛咗我架車」，真正恐懼被揭示', childReactionEmoji: '😌', explanation: '理解保護行為背後的真實擔憂', explanationPoints: ['不強迫分享', '了解拒絕原因', '一齊找安全方案'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 39, role: 'parent', category: '責任問題', title: '打爛嘢唔認',
    description: '你發現客廳嘅花瓶碎咗一地，小朋友企喺旁邊話「唔係我！佢自己跌落嚟㗎！」但地下有個波喺花瓶碎片旁邊。',
    context: '客廳，花瓶碎片滿地',
    options: [
      { id: 'A', text: '「你仲講大話！個波喺度你仲話唔係你？」', type: 'closed', score: 1, childReaction: '堅持「唔係我」，越追越否認', childReactionEmoji: '😰', explanation: '逼認令小朋友更加否認和說謊', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「我唔嬲你打爛，但講大話我會好失望。」', type: 'semi-open', score: 5, childReaction: '遲疑，想認但仍然害怕', childReactionEmoji: '😔', explanation: '道德壓力有效但仍帶恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「花瓶爛咗，你而家感覺係點？你係咪驚我會好嬲？」', type: 'open', score: 10, childReaction: '眼淚流出來，點頭承認「我踢波唔小心...」', childReactionEmoji: '😢', explanation: '理解否認出於恐懼，建立安全承認空間', explanationPoints: ['理解否認背後是恐懼', '降低承認代價', '教導負責任而非恐懼'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 40, role: 'parent', category: '家庭氣氛', title: '見到父母嗌交',
    description: '你同另一半因為錢嘅問題嗌咗一場大交，轉頭發現小朋友企喺房門口，攬住公仔，面色蒼白地望住你哋。',
    context: '客廳同睡房之間嘅走廊',
    options: [
      { id: 'A', text: '「無嘢，你返入去瞓啦，唔關你事。」', type: 'closed', score: 1, childReaction: '乖乖返入去但一整晚輾轉反側，懷疑係自己嘅錯', childReactionEmoji: '😰', explanation: '否認衝突令小朋友獨自面對恐懼', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「爸爸媽媽有啲唔同意見，唔使擔心。」', type: 'semi-open', score: 5, childReaction: '半信半疑，仍然擔心但唔敢問', childReactionEmoji: '😟', explanation: '簡化解釋但未完全回應恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你聽到爸爸媽媽嘅聲大咗，一定好驚。你而家感覺點？有啲咩想問我哋？」', type: 'open', score: 10, childReaction: '撲埋嚟攬住你，問「你哋係咪唔要我？」終於講出恐懼', childReactionEmoji: '😭', explanation: '承認小朋友嘅恐懼是合理的，讓佢表達擔心', explanationPoints: ['承認衝突存在', '允許提問', '提供安全感和確認'], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default parentScenarios;
