import type { Scenario } from '@/types/game';

const parentScenarios: Scenario[] = [
  {
    id: 21, role: 'parent', category: '放學情緒', title: '放學返屋企情緒低落',
    description: '小朋友放學返到屋企，一開門就放低書包，連招呼都無打就直接行入房間。平時佢會興高采烈同你分享學校趣事。',
    context: '溫馨客廳，你啱啱準備好小食',
    options: [
      { id: 'A', text: '「返咗嚟都唔叫人？無禮貌！」', type: 'closed', score: 0, childReaction: '頭也不回衝入房間，大力關門', childReactionEmoji: '😠', explanation: '責備禮貌忽略情緒狀態', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「今日學校點呀？開唔開心？」', type: 'semi-open', score: 4, childReaction: '敷衍回應「OK 啦」繼續行入房', childReactionEmoji: '😑', explanation: '問題太廣泛難以回應', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「入房休息下先，等陣再傾。」', type: 'judgmental', score: 3, childReaction: '入咗房但覺得被忽略', childReactionEmoji: '😔', explanation: '給予空間但錯過連結機會', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「返嚟喇！我見你好似好攰，今日辛唔辛苦？」', type: 'open', score: 10, childReaction: '停步轉身靠喺家長身邊，開始講困難', childReactionEmoji: '🥺', explanation: '描述觀察加關心感受', explanationPoints: ['先接住情緒'], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 22, role: 'parent', category: '手足衝突', title: '兄弟姊妹爭玩具',
    description: '客廳傳來激烈嘈吵聲，你行出去見到哥哥同妹妹扯住同一架玩具車，兩個都大聲嗌「係我先攞嘅！」玩具散滿一地。',
    context: '客廳玩具區，兩個小朋友面紅耳赤拉扯',
    options: [
      { id: 'A', text: '「又嗌！玩具收晒，全部冇得玩！」', type: 'closed', score: 0, childReaction: '兩個都喊，感到不公平', childReactionEmoji: '😭', explanation: '懲罰式回應無助學習分享', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「大嘅要讓細嘅，俾妹妹先！」', type: 'judgmental', score: 2, childReaction: '哥哥不忿，妹妹得意，累積怨恨', childReactionEmoji: '😤', explanation: '偏頗決定未教導協商', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「計時玩，一人五分鐘，好唔好？」', type: 'semi-open', score: 5, childReaction: '暫時接受但仍有爭執', childReactionEmoji: '😐', explanation: '提供方案但未處理情緒', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「我見你哋都好想玩，可以講下你哋點諗？」', type: 'open', score: 10, childReaction: '兩個放鬆拉扯，開始輪流講想法', childReactionEmoji: '😌', explanation: '引導表達培養衝突解決能力', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 23, role: 'parent', category: '飲食習慣', title: '晚飯時間拒絕進食',
    description: '你精心準備咗營養晚餐，但小朋友一見到餸菜就推開碗碟，交叉雙手，扭頭唔望。佢話「我唔食！」',
    context: '飯桌上有西蘭花、魚、飯，小朋友表情抗拒',
    options: [
      { id: 'A', text: '「煮咗咁耐你唔食？出去！」', type: 'closed', score: 0, childReaction: '哭住離開，親子關係受損', childReactionEmoji: '😭', explanation: '威脅令用餐成為權力鬥爭', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「食咗先有甜品，食三口就得！」', type: 'semi-open', score: 3, childReaction: '勉強食三口，表情痛苦', childReactionEmoji: '😖', explanation: '交換條件無助長遠健康飲食', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「唔食就餓住，一陣肚餓唔好嗌。」', type: 'judgmental', score: 2, childReaction: '更加抗拒，用餐變負面體驗', childReactionEmoji: '😤', explanation: '威脅無法建立正面關係', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「我見你推開個碗，係咪唔鍾意呢啲餸？可以話俾我知點解嗎？」', type: 'open', score: 10, childReaction: '放鬆講出真實原因：肚痛或味道', childReactionEmoji: '😌', explanation: '理解拒食背後原因才能處理', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 24, role: 'parent', category: '功課壓力', title: '做功課拖拉發脾氣',
    description: '放學後過咗一個鐘，小朋友嘅功課簿仍然空白。佢坐喺書枱前，將筆掟喺地下，大叫「我唔做！好煩！」',
    context: '書房，功課攤開但一個字都無寫',
    options: [
      { id: 'A', text: '「唔做功課就唔好食飯！坐好！」', type: 'closed', score: 0, childReaction: '大喊大叫，推跌書本，情緒失控', childReactionEmoji: '😡', explanation: '威脅加劇對立功課變戰場', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「做完就可以玩㗎喇。」', type: 'semi-open', score: 3, childReaction: '「我唔識做嘛！」更加沮喪', childReactionEmoji: '😤', explanation: '利誘但未理解困難', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「你自己諗下要點做，我行開先。」', type: 'judgmental', score: 2, childReaction: '更加崩潰，覺得被遺棄', childReactionEmoji: '😭', explanation: '撤離令情緒無法被接住', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「我見你好嬲，做功課令你好唔開心。係咪有啲地方覺得好難？」', type: 'open', score: 10, childReaction: '情緒緩和，開始指住「呢度我唔識」', childReactionEmoji: '😌', explanation: '先接住情緒再了解困難', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 25, role: 'parent', category: '睡前情緒', title: '睡前情緒崩潰唔肯瞓',
    description: '已經過咗就寢時間半個鐘，小朋友仲係唔肯上床。佢突然開始喊，攬住你唔放手，話「我唔想瞓」。',
    context: '睡房，燈已經調暗，小朋友坐喺地下喊',
    options: [
      { id: 'A', text: '「已經好夜喇！聽日要返學！快瞓！」', type: 'closed', score: 0, childReaction: '喊得更大聲，攬得更緊', childReactionEmoji: '😭', explanation: '催促令焦慮加劇', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「唔好喊啦，我陪你瞓到你訓著。」', type: 'semi-open', score: 5, childReaction: '稍為安靜但根本問題未解', childReactionEmoji: '😢', explanation: '安撫但未了解恐懼源頭', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「再喊就唔抱你喇！」', type: 'judgmental', score: 1, childReaction: '更加驚恐，黐得更緊', childReactionEmoji: '😰', explanation: '威脅加劇分離焦慮', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「BB，我見你好唔想瞓，你嘅身體同心入面有咩感覺？」', type: 'open', score: 10, childReaction: '講出怕黑、發惡夢或擔心明天', childReactionEmoji: '🥺', explanation: '探問感受讓恐懼被看見', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 26, role: 'parent', category: '社交受挫', title: '生日會無被邀請',
    description: '小朋友返到屋企話同班同學都收到小美嘅生日會邀請函，只有佢無。佢坐喺梳化上，低住頭，手指不停扯住校服衫角。',
    context: '客廳，小朋友獨自坐喺梳化',
    options: [
      { id: 'A', text: '「唔使理佢哋，你有其他朋友！」', type: 'closed', score: 2, childReaction: '「但佢係我好朋友...」更傷心', childReactionEmoji: '😢', explanation: '否定感受令傷心被壓抑', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「可能佢唔夠位，唔使咁唔開心。」', type: 'semi-open', score: 3, childReaction: '「全班都有...」合理化無法安慰', childReactionEmoji: '😔', explanation: '合理化但感受是真實的', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「我打俾佢媽媽問下？」', type: 'judgmental', score: 4, childReaction: '「唔好！好醜」更加難堪', childReactionEmoji: '😰', explanation: '代勞介入但令小朋友尷尬', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「全班都有但你無，聽落好失望。你心入面係咩感覺？」', type: 'open', score: 10, childReaction: '靠過來，講出被排斥嘅感受', childReactionEmoji: '🥺', explanation: '承認失望陪伴經歷情緒', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 27, role: 'parent', category: '電子產品', title: '唔肯停玩電話',
    description: '已經叫咗三次「放低電話」，小朋友仍然全神貫注玩緊手機遊戲，連望都無望你一眼。約定嘅時間早就過咗。',
    context: '客廳，小朋友躺喺梳化上玩手機',
    options: [
      { id: 'A', text: '「即刻放低！再唔聽話永遠唔俾玩！」', type: 'closed', score: 0, childReaction: '尖叫撲去搶電話，「我恨你」', childReactionEmoji: '😡', explanation: '強行搶走引發權力鬥爭', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「仲有五分鐘就要停喇。」', type: 'semi-open', score: 5, childReaction: '五分鐘後又話「就嚟過關」', childReactionEmoji: '😑', explanation: '設限有用但未處理沉迷', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你成日掛住打機，功課做完未？」', type: 'judgmental', score: 2, childReaction: '「做完喇！」防衛反駁', childReactionEmoji: '😤', explanation: '質問引發防衛', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「我見你玩得好投入，呢個遊戲有咩咁吸引？不過約定時間到喇。」', type: 'open', score: 10, childReaction: '「我想過埋呢關...」開始講出需求', childReactionEmoji: '😌', explanation: '承認興趣同時提醒約定', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 28, role: 'parent', category: '返學抗拒', title: '早上賴床唔肯返學',
    description: '鬧鐘響咗三次，小朋友用被蓋住頭，話「我唔返學！肚痛！」但你摸佢額頭無發燒，佢嘅身體語言顯示係唔想去。',
    context: '早上，睡房，時間越來越趕',
    options: [
      { id: 'A', text: '「邊有肚痛？快起身！數三聲！」', type: 'closed', score: 1, childReaction: '「真係痛呀」大喊，早晨變戰場', childReactionEmoji: '😭', explanation: '否定感受強迫上學', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「真係肚痛？食完早餐再睇下。」', type: 'semi-open', score: 4, childReaction: '慢慢起身但一直話唔舒服', childReactionEmoji: '😣', explanation: '處理但未觸及學校問題', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「唔返學就無得去週末活動！」', type: 'judgmental', score: 2, childReaction: '更加抗拒，威脅無效', childReactionEmoji: '😤', explanation: '威脅增加對立', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「我見你好唔想返學，你嘅肚仔係咪緊張到唔舒服？學校有咩令你擔心？」', type: 'open', score: 10, childReaction: '慢慢拉低被，講出害怕嘅事', childReactionEmoji: '🥺', explanation: '連結身心感受探問學校經歷', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 29, role: 'parent', category: '誠實問題', title: '講大話隱瞞事實',
    description: '你發現小朋友嘅簿冊上有老師嘅投訴信，但小朋友之前問佢話「無嘢」。你攞住封信，小朋友面色即刻變白。',
    context: '客廳，小朋友見到你手上嘅信封',
    options: [
      { id: 'A', text: '「你講大話！我最憎講大話！」', type: 'closed', score: 0, childReaction: '大喊「我無」然後跑入房', childReactionEmoji: '😡', explanation: '標籤傷害自尊隱瞞加深', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「點解唔話俾我知？要坦白。」', type: 'judgmental', score: 2, childReaction: '低頭無回應，建起防衛牆', childReactionEmoji: '😔', explanation: '「應該」式教育無助了解', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「我唔嬲你，但你要講實話。」', type: 'semi-open', score: 5, childReaction: '猶豫，唔知信唔信', childReactionEmoji: '😐', explanation: '降低恐懼但仍有壓力', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「我見到老師嘅信，你之前唔想講，係咪好驚我會嬲？」', type: 'open', score: 10, childReaction: '遲疑後點頭，開始講出害怕', childReactionEmoji: '🥺', explanation: '理解隱瞞出於恐懼', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 30, role: 'parent', category: '朋友衝突', title: '同朋友仔嗌交',
    description: '小朋友氣沖沖返到屋企，掟低書包大聲話「我以後都唔同佢玩！佢好衰！」你問佢咩事佢就更加嬲。',
    context: '門口，小朋友面紅耳赤',
    options: [
      { id: 'A', text: '「你做咗啲咩先？一巴掌拍唔響！」', type: 'judgmental', score: 1, childReaction: '「你成日幫人唔幫我！」摔門', childReactionEmoji: '😡', explanation: '暗示有份令佢唔被撐', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'B', text: '「咁唔同佢玩囉，搵其他朋友。」', type: 'semi-open', score: 3, childReaction: '「但我好鍾意同佢玩」更矛盾', childReactionEmoji: '😢', explanation: '簡化處理未幫到', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「冷靜咗先再講。」', type: 'closed', score: 2, childReaction: '入房繼續嬲，無人接住情緒', childReactionEmoji: '😤', explanation: '撤離錯過連結時機', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'D', text: '「你好嬲，一定發生咗好令你唔開心嘅事。想坐低慢慢講嗎？」', type: 'open', score: 10, childReaction: '嬲到喊住開始講成件事', childReactionEmoji: '😭', explanation: '接納憤怒給予空間表達', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 31, role: 'parent', category: '消費教育', title: '想買貴價玩具',
    description: '喺玩具店，小朋友企喺一個大型樂高盒前面唔肯走，不停話「我好想要呀！求求你！」標價 $899。',
    context: '玩具店，小朋友企定望住個盒',
    options: [
      { id: 'A', text: '「咁貴！你知唔知賺錢幾辛苦？走！」', type: 'closed', score: 2, childReaction: '嗌住喊，賴喺地下', childReactionEmoji: '😭', explanation: '內疚式教育令想要嘢係錯', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「你生日先買俾你，而家忍住。」', type: 'semi-open', score: 5, childReaction: '猶豫暫時接受', childReactionEmoji: '😐', explanation: '延遲滿足有用可以更好', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「唔買就唔買，唔好煩！」', type: 'judgmental', score: 1, childReaction: '更加堅持或崩潰', childReactionEmoji: '😡', explanation: '拒絕未安撫情緒', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「你好鍾意呢個樂高，佢有咩吸引你？我哋可以傾下點得到佢。」', type: 'open', score: 10, childReaction: '開始介紹原因，一齊討論儲錢計劃', childReactionEmoji: '😊', explanation: '肯定願望引導財務觀念', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 32, role: 'parent', category: '情緒管理', title: '輸咗遊戲發脾氣',
    description: '同小朋友玩棋盤遊戲，佢輸咗就大力掃晒棋子落地，掟骰仔，大嗌「唔玩喇！你出千！」',
    context: '客廳地下，棋子散晒一地',
    options: [
      { id: 'A', text: '「你咁都發脾氣？以後唔同你玩！」', type: 'closed', score: 0, childReaction: '更加崩潰，失去學習機會', childReactionEmoji: '😡', explanation: '拒絕令情緒被否定', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「輸贏好正常，唔使咁嬲。」', type: 'semi-open', score: 3, childReaction: '「我唔鍾意輸」情緒未處理', childReactionEmoji: '😤', explanation: '道理無法在情緒中接受', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「你再咁我唔同你玩任何嘢！」', type: 'judgmental', score: 1, childReaction: '更加暴怒或哭泣', childReactionEmoji: '😭', explanation: '威脅令情緒升級', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「輸咗令你好嬲好失望，你身體邊度最唔舒服？」', type: 'open', score: 10, childReaction: '指住心口話「呢度好痛」', childReactionEmoji: '😢', explanation: '幫助連結情緒和身體感受', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 33, role: 'parent', category: '自理能力', title: '唔肯沖涼',
    description: '已經到咗沖涼時間，小朋友堅決企喺浴室門口唔肯入去，兩隻手捉住門框，不停搖頭話「唔要！」',
    context: '浴室門口，小朋友全身緊繃',
    options: [
      { id: 'A', text: '「再唔入去我就打你屁股！」', type: 'closed', score: 0, childReaction: '大喊大叫掙扎，沖涼成每日戰爭', childReactionEmoji: '😭', explanation: '威脅令沖涼同恐懼連結', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「沖完涼就俾你睇一集卡通。」', type: 'semi-open', score: 3, childReaction: '勉強入去但全程喊', childReactionEmoji: '😖', explanation: '利誘未解決根本問題', explanationPoints: [], color: 'orange', responsePattern: '半開放式' },
      { id: 'C', text: '「咁你自己話幾時沖！」', type: 'judgmental', score: 2, childReaction: '「永遠都唔沖」問題拖延', childReactionEmoji: '😤', explanation: '放棄界線但問題仍在', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「你企咗喺度好耐唔想入去，係咪怕水或有啲唔鍾意嘅嘢？」', type: 'open', score: 10, childReaction: '慢慢鬆開門框，話「水好凍」', childReactionEmoji: '😌', explanation: '了解具體恐懼才能處理', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 34, role: 'parent', category: '恐懼處理', title: '怕黑要陪瞓',
    description: '熄咗燈之後，小朋友每晚都走出嚟你房間，話「我怕有怪獸」。今晚已經係第四次。',
    context: '深夜，小朋友企喺房門口',
    options: [
      { id: 'A', text: '「邊有怪獸？快返去瞓！」', type: 'closed', score: 1, childReaction: '返去房但更加驚，瞓唔著', childReactionEmoji: '😰', explanation: '否定恐懼無法消除', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「好啦好啦，瞓我隔離。」', type: 'semi-open', score: 4, childReaction: '暫時安心但依賴加深', childReactionEmoji: '😌', explanation: '即時滿足但未處理恐懼', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「再出嚟就鎖門！」', type: 'judgmental', score: 0, childReaction: '驚到喊，創傷加深', childReactionEmoji: '😭', explanation: '威脅令恐懼惡化', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「你又嚟喇，怪獸令你好驚。你覺得怪獸喺邊度？」', type: 'open', score: 10, childReaction: '開始描述恐懼，讓恐懼被說出來', childReactionEmoji: '🥺', explanation: '接納恐懼引導表達', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 35, role: 'parent', category: '寵物離世', title: '寵物死咗傷心',
    description: '養咗三年嘅倉鼠今朝死咗，小朋友一直攬住個籠喊，唔肯食嘢唔肯做功課，問「點解佢會死」。',
    context: '房間，小朋友坐喺地下攬住倉鼠籠',
    options: [
      { id: 'A', text: '「唔好喊喇，我哋買過隻新嘅。」', type: 'closed', score: 1, childReaction: '「我唔要新嘅！」更加傷心', childReactionEmoji: '😭', explanation: '否定感受企圖取代', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「所有生命都會死㗎，係正常嘅。」', type: 'semi-open', score: 3, childReaction: '「但我唔想佢死」道理無用', childReactionEmoji: '😢', explanation: '解釋但未接住情緒', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「佢去咗天堂，你要開心啲。」', type: 'judgmental', score: 2, childReaction: '「我唔開心」被要求壓抑', childReactionEmoji: '😔', explanation: '要求開心否定悲傷', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「你好掛住佢，你哋一齊咗三年。想同我講下你哋嘅故事嗎？」', type: 'open', score: 10, childReaction: '開始講倉鼠嘅趣事，笑住喊', childReactionEmoji: '🥺', explanation: '陪伴經歷悲傷不否定', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 36, role: 'parent', category: '學業壓力', title: '測驗成績差',
    description: '小朋友默默將測驗卷遞俾你睇，只有 42 分。佢企喺度低住頭，手指不停搓衫角，好明顯驚你嬲。',
    context: '客廳，小朋友遞上測驗卷',
    options: [
      { id: 'A', text: '「42 分？你有冇溫書㗎？」', type: 'closed', score: 1, childReaction: '「我有溫㗎...」更加自責', childReactionEmoji: '😢', explanation: '質問增加羞愧', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「唔緊要，下次努力啲。」', type: 'semi-open', score: 4, childReaction: '鬆一口氣但問題未被理解', childReactionEmoji: '😐', explanation: '安慰但未深入了解', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「係咪要補習？唔得喎咁嘅成績。」', type: 'judgmental', score: 2, childReaction: '更加壓力，覺得自己好差', childReactionEmoji: '😔', explanation: '標籤問題增加焦慮', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「你主動攞俾我睇，我見你好擔心。呢次測驗你覺得邊度最困難？」', type: 'open', score: 10, childReaction: '開始講邊啲題目唔識', childReactionEmoji: '😌', explanation: '肯定勇氣了解困難', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 37, role: 'parent', category: '身體形象', title: '被人笑樣衰',
    description: '小朋友返到屋企情緒好低落，終於講出「同學話我好肥好醜」。佢望住鏡，眼濕濕。',
    context: '小朋友房間，望住鏡',
    options: [
      { id: 'A', text: '「唔好理佢哋！你好靚㗎！」', type: 'closed', score: 2, childReaction: '「但佢哋咁講...」否定無效', childReactionEmoji: '😔', explanation: '快速反駁未接納感受', explanationPoints: [], color: 'orange', responsePattern: '封閉式' },
      { id: 'B', text: '「咁我哋做多啲運動？」', type: 'semi-open', score: 3, childReaction: '覺得真係有問題要改', childReactionEmoji: '😢', explanation: '暗示需要改變', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「邊個講？我去同佢哋講！」', type: 'judgmental', score: 4, childReaction: '「唔好！」怕事情變大', childReactionEmoji: '😰', explanation: '代勞但未問小朋友想法', explanationPoints: [], color: 'yellow', responsePattern: '判斷式' },
      { id: 'D', text: '「有人咁話你，令你好唔開心。你而家對自己嘅感覺係點？」', type: 'open', score: 10, childReaction: '開始講出對自己外表嘅擔憂', childReactionEmoji: '🥺', explanation: '接納感受探問自我形象', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 38, role: 'parent', category: '分享困難', title: '唔肯分享玩具',
    description: '表弟嚟屋企玩，但小朋友將所有玩具收埋，唔俾表弟掂，仲大嗌「呢啲係我嘅！」',
    context: '客廳，表弟企喺一邊好失望',
    options: [
      { id: 'A', text: '「你咁自私㗎？快啲攞出嚟分享！」', type: 'closed', score: 0, childReaction: '更加攬實玩具，「我唔」', childReactionEmoji: '😡', explanation: '標籤自私增加抗拒', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「你係哥哥/家姐，要讓細佬。」', type: 'judgmental', score: 2, childReaction: '不忿但被迫服從', childReactionEmoji: '😤', explanation: '用身份道德綁架', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'C', text: '「揀一兩件出嚟分享，其他可以收埋。」', type: 'semi-open', score: 5, childReaction: '猶豫揀咗一件唔鍾意嘅', childReactionEmoji: '😐', explanation: '提供折衷但未處理情緒', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'D', text: '「你好想保護你嘅玩具，有冇啲玩具你特別唔想俾人掂？點解呢？」', type: 'open', score: 10, childReaction: '開始解釋邊啲最重要', childReactionEmoji: '😌', explanation: '理解保護動機再引導', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 39, role: 'parent', category: '責任承擔', title: '打爛嘢唔認',
    description: '你聽到「嘭」一聲，入到廳見到花瓶碎晒。小朋友企喺度話「唔係我」，但佢手上有花瓣。',
    context: '客廳，花瓶碎片散落地下',
    options: [
      { id: 'A', text: '「一定係你！你講大話！」', type: 'closed', score: 0, childReaction: '「唔係！」更加否認', childReactionEmoji: '😡', explanation: '指控令防衛加強', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「打爛嘢唔緊要，但唔可以講大話。」', type: 'semi-open', score: 4, childReaction: '猶豫，仍然唔敢承認', childReactionEmoji: '😰', explanation: '降低恐懼但壓力仍在', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「唔係你仲可以係邊個？」', type: 'judgmental', score: 1, childReaction: '「我唔知！」更加驚', childReactionEmoji: '😨', explanation: '質問增加恐懼', explanationPoints: [], color: 'red', responsePattern: '判斷式' },
      { id: 'D', text: '「花瓶打爛咗，我見你手上有花瓣。嗰陣發生咗咩事？你驚緊咩？」', type: 'open', score: 10, childReaction: '「我...我驚你嬲」開始承認', childReactionEmoji: '🥺', explanation: '描述觀察探問恐懼', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
  {
    id: 40, role: 'parent', category: '家庭關係', title: '見到父母嗌交',
    description: '你同配偶吵完架，發現小朋友一直企喺房門口望住。佢眼濕濕，細聲問「你哋係咪唔要我喇？」',
    context: '客廳，小朋友企喺房門口',
    options: [
      { id: 'A', text: '「大人嘅事唔關你事，返房瞓！」', type: 'closed', score: 0, childReaction: '驚恐返房，更加不安', childReactionEmoji: '😭', explanation: '拒絕解釋增加恐懼', explanationPoints: [], color: 'red', responsePattern: '封閉式' },
      { id: 'B', text: '「無事㗎，爸媽傾緊嘢啫。」', type: 'semi-open', score: 3, childReaction: '半信半疑，仍然擔心', childReactionEmoji: '😰', explanation: '輕描淡寫但唔符合觀察', explanationPoints: [], color: 'yellow', responsePattern: '半開放式' },
      { id: 'C', text: '「乖啦唔好驚，食粒糖。」', type: 'judgmental', score: 2, childReaction: '接過糖但情緒未被處理', childReactionEmoji: '😐', explanation: '轉移注意力迴避問題', explanationPoints: [], color: 'orange', responsePattern: '判斷式' },
      { id: 'D', text: '「你聽到爸媽嗌交，好驚。你擔心緊咩？」', type: 'open', score: 10, childReaction: '撲過來攬住，「我驚你哋分開」', childReactionEmoji: '😢', explanation: '接納恐懼讓小朋友表達', explanationPoints: [], color: 'green', responsePattern: '開放式' },
    ],
  },
];

export default parentScenarios;
