export const initialBrandSettings = {
  brandName: "HERETHERE COFFEE",
  slogan: "從此刻（HERE）到遠方（THERE）",
  description: "我們相信，每一杯咖啡都承載著一段故事。",
  logoUrl: "https://media.base44.com/images/public/6a3f70ba209d80a3a393940c/103ec3a95_305489404_477253074411738_8800617206110825943_n.jpg",
  facebookUrl: "https://www.facebook.com/profile.php?id=100063811492369",
  instagramUrl: "https://www.instagram.com/herethere_coffee",
  youtubeUrl: "https://www.youtube.com/@easytime3451",
  lineInstructions: "在 LINE APP → 點選首頁 → 上方搜尋處輸入 HERETHERE 即加入 LINE 官方。",
  heroBgUrl: "https://media.base44.com/images/public/6a353f04563d31405a513f1e/0199a8207_generated_11e240c9.png",
  storyBgUrl: "https://media.base44.com/images/public/6a353f04563d31405a513f1e/1a2a686a6_generated_89b624c9.png",
}

export const initialBlogPosts = [
  {
    id: "post-1",
    title: "衣索比亞 耶加雪菲：花香與柑橘的純粹對話",
    category: "咖啡豆介紹",
    summary: "走訪海拔 2,000 公尺的高山小農莊園，探尋那一抹宛如初春茉莉花開的純淨風味與明亮甜感。",
    cover_image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    content: `
      <p>在東非大裂谷的崇山峻嶺間，衣索比亞的耶加雪菲（Yirgacheffe）始終是精品咖啡愛好者心中的純淨聖地。這裡的高海拔、日夜顯著溫差以及富含有機質的紅土壤，孕育出全世界辨識度最鮮明的風味輪廓。</p>
      <h3>產區與微型氣候的秘密</h3>
      <p>我們的生豆尋訪夥伴深入海拔 2,100 公尺的歌迪貝（Gedeb）微產區。這裡的小農以世代傳承的林下遮蔭方式種植咖啡樹，手工採摘完全熟成的深紅咖啡櫻桃。透過細緻的日曬乾燥處理，讓果肉的自然糖分在非洲棚架上緩慢滲透進豆心。</p>
      <h3>感官風味記實</h3>
      <p>研磨時，乾香散發出馥郁的白色茉莉花香、水蜜桃果乾與微醺的杏桃甜氣。以 91°C 水溫注入，濕香轉化為飽滿的佛手柑、清甜荔枝與伯爵茶調，尾韻如甘蔗汁般清澈甘甜，持久不散。</p>
    `,
    is_published: true,
    created_at: "2026-10-18T09:00:00Z",
  },
  {
    id: "post-2",
    title: "手沖咖啡三段注水法：掌握萃取的黃金節奏",
    category: "手沖知識",
    summary: "從悶蒸排氣到中心點均勻繞圈，拆解水粉比例與水流控制，在家也能穩定萃取一杯層次豐富的精品咖啡。",
    cover_image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    content: `
      <p>手沖咖啡是一場關於物理與感官的冥想。透過水流的速度、高度與溫度，我們引導出咖啡豆深藏在細胞壁裡的芳香化合物。今天，HERETHERE 首席咖啡師為大家公開店內日常沖煮的核心三段式萃取邏輯。</p>
      <h3>基本參數設定</h3>
      <ul>
        <li><strong>咖啡粉量：</strong>15 克（研磨度：小富士 #4 / 砂糖粗細）</li>
        <li><strong>水溫：</strong>淺焙 91°C–93°C / 中焙 88°C–90°C</li>
        <li><strong>總注水量：</strong>225 毫升（粉水比 1:15）</li>
        <li><strong>目標時間：</strong>2 分 10 秒至 2 分 25 秒</li>
      </ul>
      <h3>第一段：悶蒸釋放香氣（0:00 - 0:35）</h3>
      <p>注入 35ml 沸水，由中心向外柔和潤濕所有咖啡粉，觀察粉層膨脹的漢堡狀鼓起，讓二氧化碳充分排出，為後續的均勻萃取打開通道。</p>
      <h3>第二段：主力萃取香甜風味（0:35 - 1:15）</h3>
      <p>以中等水流穩定自中心畫圓注入至 140ml，重點萃取咖啡豆最優雅的水果酸質與焦糖甜感。</p>
      <h3>第三段：收尾修飾醇厚度（1:15 - 2:10）</h3>
      <p>柔和注水至 225ml，待液面緩緩濾落至粉層平整，即可移開濾杯。搖晃均勻後品嚐，體會溫度的層次變化。</p>
    `,
    is_published: true,
    created_at: "2026-10-10T14:30:00Z",
  },
  {
    id: "post-3",
    title: "HERETHERE 快閃咖啡概念店正式啟程",
    category: "品牌公告",
    summary: "我們把烘焙工坊的器皿、香氣與音樂打包成箱，即將在台北靜巷與大家相遇。帶著你的咖啡杯，一起從此刻前往遠方。",
    cover_image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
    content: `
      <p>「如果咖啡館不只是固定的空間，而是一段流動的風景呢？」這是 HERETHERE 創立之初常常浮現在團隊腦海裡的一句話。</p>
      <p>今年秋天，我們展開了品牌首場 POP-UP STORE 計畫。選址於充滿人文溫度的老街區紅磚空間，我們搭建了一座極簡的原木手沖吧台。現場將提供限定競標批次的單品手沖，並邀請來訪的朋友盲品測杯，探索屬於自己的感官座標。</p>
      <p>無論你在哪座城市、在生活中的哪一個片刻，我們期待在現場為你遞上一杯溫熱而真誠的咖啡。</p>
    `,
    is_published: true,
    created_at: "2026-10-02T11:00:00Z",
  },
  {
    id: "post-4",
    title: "水洗與日曬：探討不同處理法帶來的風味宇宙",
    category: "手沖知識",
    summary: "同一顆樹上的果實，因為後製處理的不同，走向了如茶般的清亮優雅與如酒般的濃郁發酵。",
    cover_image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
    content: `
      <p>生豆處理法是咖啡風味形成的最關鍵樞紐。從完全剝除果肉的水洗法（Washed），到連皮帶肉在日曬床上慢慢脫水的日曬法（Natural），微生物在其中的代謝與糖分轉換，譜寫了風味的萬千變化。</p>
      <p>水洗法往往能完整展現品種與風土（Terroir）本身的純淨骨架，酸質明亮如柑橘、蘋果；而日曬法則帶來豐盈的熱帶水果果醬、紅酒發酵香氣與滑順油脂感。</p>
    `,
    is_published: true,
    created_at: "2026-09-25T16:00:00Z",
  },
]

export const initialProducts = [
  {
    id: "prod-1",
    name: "衣索比亞 歌迪貝 G1 日曬",
    category: "咖啡豆",
    price: 480,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
    roast_level: "淺焙 Light Roast",
    flavor_notes: ["茉莉花香", "水蜜桃", "佛手柑", "蜂蜜甜感"],
    origin: "衣索比亞 耶加雪菲",
    description: `
      <p>來自海拔 2,050 公尺的非洲高地，以精密棚架日曬工藝熟成。開袋即能聞到濃郁的水蜜桃果乾與野白花香氣，入口質地細膩如絲，果酸活潑明亮，尾韻留有清甜高雅的伯爵茶餘韻。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-2",
    name: "肯亞 涅里產區 雙重水洗 AA",
    category: "咖啡豆",
    price: 520,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    roast_level: "淺中焙 Medium-Light",
    flavor_notes: ["黑醋栗", "烏梅汁", "葡萄柚", "黃糖甜"],
    origin: "肯亞 涅里產區 (Nyeri)",
    description: `
      <p>肯亞著名的經典 SL28/SL34 品種，經過傳統雙重發酵水洗，展現無與倫比的酸質立體度與飽滿多汁口感。如同咬下一口新鮮熟成的黑醋栗，伴隨著酸甜交織的黑莓果醬質地。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-3",
    name: "哥倫比亞 天堂莊園 玫瑰茶 雙重厭氧",
    category: "咖啡豆",
    price: 650,
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80",
    roast_level: "淺焙 Light Roast",
    flavor_notes: ["粉紅玫瑰", "草莓鮮奶油", "荔枝清甜", "薄荷"],
    origin: "哥倫比亞 考卡 (Cauca)",
    description: `
      <p>莊園主 Diego Bermudez 的特殊厭氧發酵工藝名作。在密閉控溫罐中加入專屬酵母進行兩階段發酵，創造出令人驚豔的玫瑰花茶與草莓優格芬芳，宛如香水般的層次展演。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-4",
    name: "經典日常 綜合產區 濾掛包組（10入）",
    category: "濾掛包",
    price: 390,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    roast_level: "中深焙 Medium-Dark",
    flavor_notes: ["黑巧克力", "烤杏仁", "焦糖", "醇厚奶油"],
    origin: "中南美洲精選綜合配方",
    description: `
      <p>為了忙碌清晨與辦公室時光特別調配的日常良伴。採用充氮保鮮技術鎖住新鮮研磨香氣，注入熱水即可享受濃郁黑巧克力與烤核桃的香甜厚實感，加奶調配成拿鐵亦非常出彩。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-5",
    name: "衣索比亞 單品嚴選 濾掛禮盒（12入）",
    category: "濾掛包",
    price: 490,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    roast_level: "淺焙 Light Roast",
    flavor_notes: ["茉莉花", "柑橘", "檸檬紅茶", "白葡萄"],
    origin: "衣索比亞 希達馬 & 耶加雪菲",
    description: `
      <p>集合兩款極富盛名的衣索比亞經典微產區單品濾掛，精裝燙金牛皮紙禮盒包裝，無論是致贈好友或犒賞自己的午茶時光，都是最具品味的優雅之選。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-6",
    name: "極簡霧黑 溫控細口手沖壺 600ml",
    category: "器具",
    price: 2880,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    roast_level: "沖煮專用器具",
    flavor_notes: ["精準控溫 ±1°C", "90度垂直注水", "防乾燒安全防護"],
    origin: "日本設計監製",
    description: `
      <p>專為手沖愛好者量身訂製。鵝頸流線壺嘴經過精細計算，點滴注水或大水流切換自如；內建英國 Strix 溫控晶片，直覺旋鈕可設定 40°C–100°C 任意溫度並恆溫保溫長達 60 分鐘。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-7",
    name: "琥珀煙燻 手工吹製耐熱咖啡下壺",
    category: "器具",
    price: 980,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
    roast_level: "日常分享器具",
    flavor_notes: ["耐熱高硼矽玻璃", "450ml 容量", "鷹嘴俐落斷水"],
    origin: "工藝師吹製",
    description: `
      <p>每一只下壺皆由資深玻璃工匠手工吹製，透出低調沉穩的琥珀光澤。壺身的圓弧幾何線條不僅便於搖勻萃取液釋放香氣，置於桌面更是一件迷人的生活雕塑。</p>
    `,
    is_available: true,
  },
  {
    id: "prod-8",
    name: "巴拿馬 翡翠莊園 綠標 藝伎 水洗",
    category: "咖啡豆",
    price: 980,
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
    roast_level: "極淺焙 Ultra-Light",
    flavor_notes: ["橙花香氣", "白桃汁", "佛手柑", "清澈茶韻"],
    origin: "巴拿馬 波奎特 (Boquete)",
    description: `
      <p>全球咖啡評鑑的傳奇代表。翡翠莊園（Hacienda La Esmeralda）綠標微批次，以無懈可擊的純淨度綻放極致的野橙花與高山白桃風韻，酸甜如水蜜桃冰茶，餘韻悠長細緻。</p>
    `,
    is_available: true,
  },
]

export const initialFlashEvents = [
  {
    id: "event-1",
    title: "HERETHERE 城市快閃 ｜ 靜巷裡的咖啡感官旅程",
    description: "我們將整座工坊的烘焙香氣、黑膠唱片與手沖吧台帶到台北華山藝文特區旁的老紅磚街區。現場將由杯測師現場帶領盲品品鑑，並提供兩款限定未公開競標批次單品試飲！",
    event_start: "2026-11-12T10:00:00",
    event_end: "2026-11-22T19:00:00",
    location_name: "華山紅磚六合院 概念快閃館",
    address: "台北市中正區八德路一段 1 號（忠孝新生站 1 號出口步行 3 分鐘）",
    map_link: "https://maps.google.com/?q=華山1914文化創意產業園區",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80"
    ],
    is_active: true,
  },
  {
    id: "event-2",
    title: "台中綠園道 ｜ 秋日微風 手沖與器物巡迴展",
    description: "攜手在地陶藝創作者，展示專為手沖設計的柴燒濾杯與分享下壺。現場購買任意咖啡豆即贈手沖體驗杯乙次。",
    event_start: "2026-12-05T11:00:00",
    event_end: "2026-12-07T18:00:00",
    location_name: "勤美綠園道 露天聚落",
    address: "台中市西區公益路 68 號草悟道旁",
    map_link: "https://maps.google.com/?q=勤美誠品綠園道",
    images: [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80"
    ],
    is_active: false,
  }
]

export const initialTestimonials = [
  {
    id: "test-1",
    name: "林庭宇",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "衣索比亞 歌迪貝 G1 日曬",
    content: "乾香氣一磨開就是非常純淨的白花與水蜜桃甜感，手沖注水時整個工作室都是花果香，尾韻甜感綿延非常久，是今年喝過最平衡的衣索比亞！",
    is_visible: true,
    sort_order: 1,
  },
  {
    id: "test-2",
    name: "陳思婷",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "經典日常 濾掛組（10入）",
    content: "包裝設計極具美感，濾袋的流速控制得很棒，即便在辦公室隨手沖泡也能萃取出極為細緻的堅果與焦糖香氣，每天早晨不可或缺的儀式。",
    is_visible: true,
    sort_order: 2,
  },
  {
    id: "test-3",
    name: "張凱文",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "極簡霧黑 溫控細口手沖壺 600ml",
    content: "水流極為穩定柔和，鵝頸壺嘴的角度經過精密校準，點滴或大水流都能精準控制，加上穩定的控溫表現，整體質感超越同價位所有品牌。",
    is_visible: true,
    sort_order: 3,
  },
  {
    id: "test-4",
    name: "吳孟軒",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "肯亞 涅里產區 雙重水洗 AA",
    content: "非常驚豔的黑醋栗與多汁口感！酸度明亮卻完全不咬舌，尾韻帶有焦糖蔗糖的甘甜，冰鎮後風味更加立體，絕對會持續回購。",
    is_visible: true,
    sort_order: 4,
  }
]

export const initialSubscribers = [
  {
    id: "sub-1",
    email: "coffee.lover@example.com",
    subscribed_at: "2026-10-15T08:30:00Z",
    subscribed: true,
  },
  {
    id: "sub-2",
    email: "barista.artisan@studio.tw",
    subscribed_at: "2026-10-20T11:15:00Z",
    subscribed: true,
  }
]
