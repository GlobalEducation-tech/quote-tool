// =====================================================================
// GETC 見積計算ツール - 学校データファイル
// =====================================================================
// 新しい学校を追加する場合：
//   1. このファイルをGitHubからダウンロード
//   2. 下のSCHOOLSオブジェクトに学校データを追加
//   3. PRIVATE_LESSON_PRICESにも追加
//   4. GitHubにアップロード（school_data.jsを上書き）
//
// 翌年のPrice Listが出たら：
//   1. 新年度のデータをSCHOOLSに追加
//   2. PRICE_YEARS_OVERRIDEに年度を追記
//   3. 3年分たまったら最古の年度を削除
// =====================================================================

// 年度オーバーライド（翌年版追加時にここを編集）
// 例: { "stgiles": { "london-central": [2026, 2027] } }
const PRICE_YEARS_OVERRIDE = {};

const CURRENCIES = { stgiles: "GBP", lse: "GBP" };

const SCHOOLS = {
  stgiles: {
    name: "St Giles International",
    currency: "GBP",
    campuses: {
      "london-central": {
        name: "London Central", country: "UK", regFee: 85, peakSupp: 30,
        courses: {
          "ge-intensive":       { name:"General English Intensive (28 L/W)",            type:"group",    prices:[537,484,455,428,365], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-morning":         { name:"General English Peak Morning (20 L/W)",          type:"group",    prices:[424,384,362,340,299], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-afternoon":       { name:"General English Off-Peak Afternoon (20 L/W)",    type:"group",    prices:[339,307,290,272,239], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-business":        { name:"General English + Business (28 L/W)",            type:"group",    prices:[537,484,455,428,365], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-university":      { name:"General English + University Studies (28 L/W)",  type:"group",    prices:[537,484,455,428,365], brackets:[1,4,8,12,24], commission:0.25 },
          "cambridge-intensive":{ name:"Cambridge Exam Prep (28 L/W)",                   type:"group",    prices:[557,523,492],         brackets:[1,4,8],       commission:0.25 },
          "cambridge-morning":  { name:"Cambridge Exam Prep (20 L/W)",                   type:"group",    prices:[442,416,391],         brackets:[1,4,8],       commission:0.25 },
          "ielts-intensive":    { name:"IELTS Preparation (28 L/W)",                     type:"group",    prices:[537,484,455,428,365], brackets:[1,4,8,12,24], commission:0.25 },
          "ielts-morning":      { name:"IELTS Preparation (20 L/W)",                     type:"group",    prices:[424,384,362,340,299], brackets:[1,4,8,12,24], commission:0.25 },
          "platinum-1to1-30":   { name:"Platinum One-to-One (30 L/W)",                   type:"platinum", prices:[2245,2155,2065,1984], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-1to1-25":   { name:"Platinum One-to-One (25 L/W)",                   type:"platinum", prices:[1875,1822,1766,1709], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-1to1-20":   { name:"Platinum One-to-One (20 L/W)",                   type:"platinum", prices:[1617,1569,1523,1476], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-group-20":  { name:"Platinum Group Course (20 L/W)",                 type:"platinum", prices:[762,747,736,722],     brackets:[1,2,3,4],     commission:0.25 },
          "platinum-group-30":  { name:"Platinum Group Course (30 L/W)",                 type:"platinum", prices:[1132,1103,1073,1046], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-combo-20-5":{ name:"Platinum Combination (20 L/W + 5 One-to-One)",  type:"platinum", prices:[1087,1072,1061,1047], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-combo-20-10":{ name:"Platinum Combination (20 L/W + 10 One-to-One)",type:"platinum", prices:[1412,1397,1386,1372], brackets:[1,2,3,4],     commission:0.25 },
        },
        accom: {
          "none":                  { name:"なし", low:0, peak:0 },
          "homestay-std-hb":       { name:"Homestay Standard・Half board (18+)",          low:274, peak:310, placementFee:50, halfBoard:true },
          "homestay-std-bo":       { name:"Homestay Standard・Breakfast only (18+)",      low:217, peak:251, placementFee:50 },
          "homestay-sup-hb":       { name:"Homestay Superior (private bath)・Half board", low:473, peak:473, placementFee:50, halfBoard:true },
          "residence-onsite-sh":   { name:"St Giles On-Site Residence (shared bath)",    low:439, peak:460, placementFee:50 },
          "residence-onsite-pr":   { name:"St Giles On-Site Residence (private bath)",   low:489, peak:503, placementFee:50 },
          "residence-chapter":     { name:"Chapter Highbury (en suite)",                 low:443, peak:465, placementFee:50 },
        },
        airports: { "Heathrow/City":112, "Gatwick":150, "Stansted/Luton":140 }
      },
      "brighton": {
        name: "Brighton", country: "UK", regFee: 85, peakSupp: 30,
        courses: {
          "ge-intensive":        { name:"General English Intensive (28 L/W)",            type:"group",    prices:[520,470,442,416,353], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-morning":          { name:"General English Peak Morning (20 L/W)",          type:"group",    prices:[412,373,350,330,290], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-afternoon":        { name:"General English Off-Peak Afternoon (20 L/W)",    type:"group",    prices:[330,298,280,264,232], brackets:[1,4,8,12,24], commission:0.25 },
          "cambridge-intensive": { name:"Cambridge Exam Prep (28 L/W)",                   type:"group",    prices:[541,508,478],         brackets:[1,4,8],       commission:0.25 },
          "ielts-intensive":     { name:"IELTS Preparation (28 L/W)",                     type:"group",    prices:[520,470,442,416,353], brackets:[1,4,8,12,24], commission:0.25 },
          "platinum-1to1-20":    { name:"Platinum One-to-One (20 L/W)",                   type:"platinum", prices:[1569,1521,1478,1432], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-1to1-15":    { name:"Platinum One-to-One (15 L/W)",                   type:"platinum", prices:[1007,977,946,918],    brackets:[1,2,3,4],     commission:0.25 },
          "platinum-group-20":   { name:"Platinum Group Course (20 L/W)",                 type:"platinum", prices:[724,710,700,686],     brackets:[1,2,3,4],     commission:0.25 },
          "platinum-combo-20-5": { name:"Platinum Combination (20 L/W + 5 One-to-One)",  type:"platinum", prices:[1039,1025,1015,1001], brackets:[1,2,3,4],     commission:0.25 },
          "platinum-combo-20-10":{ name:"Platinum Combination (20 L/W + 10 One-to-One)", type:"platinum", prices:[1354,1340,1330,1316], brackets:[1,2,3,4],     commission:0.25 },
        },
        accom: {
          "none":            { name:"なし", low:0, peak:0 },
          "homestay-std-hb": { name:"Homestay Standard・Half board (18+)",  low:235, peak:269, placementFee:50, halfBoard:true },
          "homestay-std-bo": { name:"Homestay Standard・Breakfast only (18+)", low:185, peak:216, placementFee:50 },
          "residence-george":{ name:"George Street Residence",              low:360, peak:395, placementFee:50 },
        },
        airports: { "Heathrow":199, "Gatwick":115, "Stansted/Luton/City":269 }
      },
      "cambridge": {
        name: "Cambridge", country: "UK", regFee: 85, peakSupp: 30,
        courses: {
          "ge-intensive":        { name:"General English Intensive (28 L/W)",          type:"group", prices:[483,436,410,385,329], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-morning":          { name:"General English Peak Morning (20 L/W)",        type:"group", prices:[382,346,325,306,269], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-afternoon":        { name:"General English Off-Peak Afternoon (20 L/W)",  type:"group", prices:[306,277,260,245,215], brackets:[1,4,8,12,24], commission:0.25 },
          "cambridge-intensive": { name:"Cambridge Exam Prep (28 L/W)",                 type:"group", prices:[501,472,443],         brackets:[1,4,8],       commission:0.25 },
          "ielts-intensive":     { name:"IELTS Preparation (28 L/W)",                   type:"group", prices:[483,436,410,385,329], brackets:[1,4,8,12,24], commission:0.25 },
        },
        accom: {
          "none":            { name:"なし", low:0, peak:0 },
          "homestay-std-hb": { name:"Homestay Standard (shared)・Half board (18+)",    low:258, peak:283, placementFee:50, halfBoard:true },
          "homestay-pvt-hb": { name:"Homestay Standard (private bath)・Half board (18+)", low:310, peak:335, placementFee:50, halfBoard:true },
          "homestay-std-bo": { name:"Homestay・Breakfast only (18+)",                  low:205, peak:229, placementFee:50 },
          "studio":          { name:"Private Studio",                                  low:341, peak:385, placementFee:50 },
        },
        airports: { "Heathrow/St Pancras":214, "Gatwick":225, "Stansted":127, "Luton":150, "City":173 }
      },
      "eastbourne": {
        name: "Eastbourne", country: "UK", regFee: 85, peakSupp: 30,
        courses: {
          "ge-intensive":        { name:"General English Intensive (28 L/W)",          type:"group", prices:[478,431,406,381,325], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-morning":          { name:"General English Peak Morning (20 L/W)",        type:"group", prices:[378,343,322,303,266], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-afternoon":        { name:"General English Off-Peak Afternoon (20 L/W)",  type:"group", prices:[303,274,258,242,213], brackets:[1,4,8,12,24], commission:0.25 },
          "cambridge-intensive": { name:"Cambridge Exam Prep (28 L/W)",                 type:"group", prices:[496,467,439],         brackets:[1,4,8],       commission:0.25 },
          "ielts-intensive":     { name:"IELTS Preparation (28 L/W)",                   type:"group", prices:[478,431,406,381,325], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-business":         { name:"General English + Business (28 L/W)",           type:"group", prices:[478,431,406,381,325], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-university":       { name:"General English + University Studies (28 L/W)", type:"group", prices:[478,431,406,381,325], brackets:[1,4,8,12,24], commission:0.25 },
        },
        accom: {
          "none":            { name:"なし", low:0, peak:0 },
          "homestay-hb-18":  { name:"Homestay・Half board (18+)",       low:189, peak:221, placementFee:50, halfBoard:true },
          "homestay-bo-18":  { name:"Homestay・Breakfast only (18+)",   low:146, peak:176, placementFee:50 },
        },
        airports: { "Heathrow":185, "Gatwick":150, "Stansted/Luton":250, "City":190 }
      },
      "london-highgate": {
        name: "London Highgate", country: "UK", regFee: 85, peakSupp: 30,
        courses: {
          "ge-intensive":  { name:"General English Intensive (28 L/W)",          type:"group", prices:[493,445,419,394,336], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-morning":    { name:"General English Peak Morning (20 L/W)",        type:"group", prices:[390,353,333,313,275], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-afternoon":  { name:"General English Off-Peak Afternoon (20 L/W)",  type:"group", prices:[312,282,266,250,220], brackets:[1,4,8,12,24], commission:0.25 },
          "ielts-intensive":{ name:"IELTS Preparation (28 L/W)",                  type:"group", prices:[493,445,419,394,336], brackets:[1,4,8,12,24], commission:0.25 },
          "ge-business":   { name:"General English + Business (28 L/W)",           type:"group", prices:[493,445,419,394,336], brackets:[1,4,8,12,24], commission:0.25 },
        },
        accom: {
          "none":              { name:"なし", low:0, peak:0 },
          "homestay-hb":       { name:"Homestay・Half board (18+)",       low:268, peak:304, placementFee:50, halfBoard:true },
          "homestay-bo":       { name:"Homestay・Breakfast only (18+)",   low:215, peak:248, placementFee:50 },
          "residence-chapter": { name:"Chapter Highbury (en suite)",      low:443, peak:465, placementFee:50 },
        },
        airports: { "Heathrow/City/St Pancras":109, "Gatwick":146, "Stansted/Luton":137 }
      }
    }
  },
  lse: {
    name: "London School of English",
    currency: "GBP",
    campuses: {
      "holland-park": {
        name: "Holland Park", country: "UK", regFee: 95, peakSupp: 0,
        courses: {
          "ge-fulltime":       { name:"General English Full-time (24h/week)",                    type:"group", prices:[695,650,620],  brackets:[1,5,13], commission:0.25 },
          "ge-pt-am":          { name:"General English Part-time AM (12h/week)",                 type:"group", prices:[460,420,390],  brackets:[1,5,13], commission:0.25 },
          "ge-pt-pm":          { name:"General English Part-time PM (12h/week)",                 type:"group", prices:[355,325,310],  brackets:[1,5,13], commission:0.25 },
          "biz-fulltime":      { name:"Business & Professional English Full-time (30h/week)",    type:"group", prices:[1430],         brackets:[1],      commission:0.25 },
          "biz-pt-am":         { name:"Business & Professional English Part-time AM (15h/week)", type:"group", prices:[885],          brackets:[1],      commission:0.25 },
          "biz-pt-pm":         { name:"Business & Professional English Part-time PM (15h/week)", type:"group", prices:[780],          brackets:[1],      commission:0.25 },
          "legal-commercial":  { name:"Legal English Commercial Lawyers (30h/week)",             type:"group", prices:[1510],         brackets:[1],      commission:0.25 },
          "english-hr":        { name:"English for HR Professionals (30h/week)",                 type:"group", prices:[1510],         brackets:[1],      commission:0.25 },
          "english-banking":   { name:"English for Banking & Finance (30h/week)",                type:"group", prices:[1510],         brackets:[1],      commission:0.25 },
          "ielts-4wk":         { name:"IELTS Academic Exam Prep (4週固定)",                      type:"group", prices:[2860],         brackets:[1], fixedWeeks:4, commission:0.25 },
          "1to1-faceto":       { name:"1:1 Face to Face (Holland Park Gardens)",                 type:"1to1",  pricePerHour:105,                        commission:0.25 },
          "2to1-faceto":       { name:"2:1 Face to Face (Holland Park Gardens)",                 type:"1to1",  pricePerHour:115,                        commission:0.25 },
          "1to1-online":       { name:"1:1 Online Lessons",                                      type:"1to1",  pricePerHour:75,                         commission:0.25 },
          "voice-online":      { name:"Voice & Accent Training (Online)",                        type:"1to1",  pricePerHour:100,                        commission:0.25 },
          "voice-faceto":      { name:"Voice & Accent Training (Face to Face)",                  type:"1to1",  pricePerHour:130,                        commission:0.25 },
        },
        accom: {
          "none":                { name:"なし", low:0, peak:0 },
          "homestay-silver-bb":  { name:"Homestay Silver・Bed & breakfast",          low:250, peak:250, placementFee:80 },
          "homestay-silver-bb3d":{ name:"Homestay Silver・B&B + 3 evening meals",   low:305, peak:305, placementFee:80 },
          "homestay-gold-bb":    { name:"Homestay Gold (private bath)・B&B",         low:320, peak:320, placementFee:80 },
          "homestay-gold-bb3d":  { name:"Homestay Gold・B&B + 3 evening meals",     low:375, peak:375, placementFee:80 },
          "vincent-std":         { name:"Vincent House Standard single",             low:448, peak:448, placementFee:80 },
          "prince-consort":      { name:"Prince Consort Village Bronze studio",      low:455, peak:455, placementFee:80 },
        },
        airports: { "Heathrow (arrival)":145, "Heathrow (departure)":135, "Gatwick (arrival)":210, "Gatwick (departure)":200, "Stansted (arrival)":225, "City (arrival)":150 }
      }
    }
  },
  wse: {
    name: "Wimbledon School of English",
    currency: "GBP",
    campuses: {
      "wimbledon": {
        name: "Wimbledon", country: "UK", regFee: 60, peakSupp: 0,
        courses: {
          "standard":  { name:"General English Standard (21h/week)",   type:"wse", wseType:"standard",  commission:0.25, weeklyPrices:{1:439,2:439,3:439,4:439,5:415,6:415,7:415,8:415,9:415,10:415,11:415,12:364,13:364,14:364,15:364,16:364,17:364,18:364,19:364,20:364,21:364,22:364,23:364,24:315,25:315,26:315,27:315,28:315,29:315,30:315,31:315,32:315,33:315,34:315,35:315,36:315} },
          "intensive": { name:"General English Intensive (24.5h/week)",type:"wse", wseType:"intensive", commission:0.25, weeklyPrices:{1:495,2:495,3:495,4:495,5:469,6:469,7:469,8:469,9:469,10:469,11:469,12:394,13:394,14:394,15:394,16:394,17:394,18:394,19:394,20:394,21:394,22:394,23:394,24:345,25:345,26:345,27:345,28:345,29:345,30:345,31:345,32:345,33:345,34:345,35:345,36:345} },
          "essential": { name:"General English Essential (17.5h/week)",type:"wse", wseType:"essential", commission:0.25, weeklyPrices:{1:383,2:383,3:383,4:383,5:361,6:361,7:361,8:361,9:361,10:361,11:361,12:334,13:334,14:334,15:334,16:334,17:334,18:334,19:334,20:334,21:334,22:334,23:334,24:285,25:285,26:285,27:285,28:285,29:285,30:285,31:285,32:285,33:285,34:285,35:285,36:285} },
          "business":  { name:"Business English & Professional Skills (21h/week)", type:"wse", wseType:"standard", commission:0.25, weeklyPrices:{1:439,2:439,3:439,4:439,5:415,6:415,7:415,8:415,9:415,10:415,11:415,12:364,13:364,14:364,15:364,16:364,17:364,18:364,19:364,20:364,21:364,22:364,23:364,24:315,25:315,26:315,27:315,28:315,29:315,30:315,31:315,32:315,33:315,34:315,35:315,36:315} },
          "ielts-standard": { name:"IELTS Preparation Standard (21h/week)", type:"wse", wseType:"standard", commission:0.25, weeklyPrices:{1:439,2:439,3:439,4:439,5:415,6:415,7:415,8:415,9:415,10:415,11:415,12:364,13:364,14:364,15:364,16:364,17:364,18:364,19:364,20:364,21:364,22:364,23:364,24:315,25:315,26:315,27:315,28:315,29:315,30:315,31:315,32:315,33:315,34:315,35:315,36:315} },
          "1to1": { name:"One-to-One (per lesson £90)", type:"wse-1to1", pricePerLesson:90, commission:0.25 },
        },
        accom: {
          "none":                    { name:"なし", low:0, peak:0 },
          "homestay-std-bd":         { name:"Homestay Standard・Breakfast & dinner full week", low:275, peak:275, halfBoard:true },
          "homestay-std-bo":         { name:"Homestay Standard・Breakfast only",               low:225, peak:225 },
          "homestay-stdplus-bd":     { name:"Homestay Standard Plus・Breakfast & dinner",      low:325, peak:325, halfBoard:true },
          "homestay-superior-bd":    { name:"Homestay Superior・Breakfast & dinner",           low:365, peak:365, halfBoard:true },
          "queens-lodge-ensuite":    { name:"Queens Lodge・Single ensuite",                    low:425, peak:425 },
          "kings-lodge-ensuite":     { name:"Kings Lodge・Single ensuite",                     low:400, peak:400 },
          "beverley-lodge-ensuite":  { name:"Beverley Lodge・Single ensuite",                  low:330, peak:330 },
          "justin-james-ensuite":    { name:"Justin James Serviced・Single ensuite",           low:430, peak:430 },
        },
        airports: { "Heathrow (single)":180, "Heathrow (return)":325, "Gatwick (single)":210, "Gatwick (return)":380, "Stansted (single)":300, "Stansted (return)":540, "City (single)":190, "City (return)":340, "Luton (single)":250, "Luton (return)":450, "St Pancras (single)":175, "St Pancras (return)":315 }
      }
    }
  },
  ih: {
    name: "International House London",
    currency: "GBP",
    campuses: {
      "covent-garden": {
        name: "Covent Garden", country: "UK", regFee: 98, peakSupp: 15,
        peakStart: "06-15", peakEnd: "08-29",
        courses: {
          "le25":        { name:"Learn English 25 (25レッスン/週)",           type:"group", prices:[555,534,503,472], brackets:[1,6,12,20], commission:0.25 },
          "le20":        { name:"Learn English 20 (20レッスン/週)",           type:"group", prices:[445,427,402,378], brackets:[1,6,12,20], commission:0.25 },
          "le15":        { name:"Learn English 15 (15レッスン/週 AM)",        type:"group", prices:[381,362,341,324], brackets:[1,6,12,20], commission:0.25 },
          "biz15":       { name:"Business English 15 (AM)",                  type:"group", prices:[756],            brackets:[1],         commission:0.25 },
          "biz25":       { name:"Business English 25",                       type:"group", prices:[1104],           brackets:[1],         commission:0.25 },
          "ielts20":     { name:"IELTS Preparation 20（固定価格）",            type:"ih-fixed", fixedPrices:{4:3416,8:4824,12:6432,16:7560,20:9072}, commission:0.25 },
          "ielts15":     { name:"IELTS Preparation 15（固定価格）",            type:"ih-fixed", fixedPrices:{4:2896,8:4092,12:5456,16:6480,20:7776}, commission:0.25 },
          "1to1":        { name:"One-to-One (対面 £108/h〜)",                 type:"1to1",  pricePerHour:108,        commission:0.25 },
          "1to1-online": { name:"One-to-One (オンライン £94/h)",              type:"1to1",  pricePerHour:94,         commission:0.25 },
        },
        accom: {
          "none":                    { name:"なし", low:0, peak:0 },
          "chapter-kings-cross":     { name:"Chapter Kings Cross (studio)",              low:618, peak:618, bookingFee:59, ihSummerSupp:51 },
          "tufnell-park":            { name:"Tufnell Park (en suite)",                   low:434, peak:434, bookingFee:59, ihSummerSupp:51 },
          "chapter-islington-2wk":   { name:"Chapter Islington (2週 £536/週)",           low:536, peak:536, bookingFee:59, ihSummerSupp:51 },
          "chapter-islington-3wk":   { name:"Chapter Islington (3週以上 £489/週)",        low:489, peak:489, bookingFee:59, ihSummerSupp:51 },
          "homestay-std-sc":         { name:"Homestay Standard・Self-catered",           low:260, peak:260, bookingFee:59, ihSummerSupp:37 },
          "homestay-std-b":          { name:"Homestay Standard・Breakfast only",         low:250, peak:250, bookingFee:59, ihSummerSupp:37 },
          "homestay-std-b4d":        { name:"Homestay Standard・Breakfast + 4 dinners",  low:298, peak:298, bookingFee:59, ihSummerSupp:37, halfBoard:true },
          "homestay-std-b7d":        { name:"Homestay Standard・Breakfast + 7 dinners",  low:327, peak:327, bookingFee:59, ihSummerSupp:37, halfBoard:true },
          "homestay-sup-b":          { name:"Homestay Superior・Breakfast only",         low:309, peak:309, bookingFee:59, ihSummerSupp:37 },
          "homestay-sup-b4d":        { name:"Homestay Superior・Breakfast + 4 dinners",  low:354, peak:354, bookingFee:59, ihSummerSupp:37, halfBoard:true },
          "homestay-sup-b7d":        { name:"Homestay Superior・Breakfast + 7 dinners",  low:386, peak:386, bookingFee:59, ihSummerSupp:37, halfBoard:true },
          "homestay-exec-b":         { name:"Homestay Executive・Breakfast only",        low:365, peak:365, bookingFee:59, ihSummerSupp:37 },
          "homestay-exec-b7d":       { name:"Homestay Executive・Breakfast + 7 dinners", low:441, peak:441, bookingFee:59, ihSummerSupp:37, halfBoard:true },
        },
        airports: { "Heathrow (private)":199, "Gatwick (private)":243, "Stansted (private)":243, "Luton (private)":243, "City (private)":199, "Heathrow/City (shared)":112, "St Pancras":112 }
      }
    }
  },
  elc_brighton: {
    name: "ELC Brighton",
    currency: "GBP",
    campuses: {
      "brighton": {
        name: "Brighton", country: "UK", regFee: 99, peakSupp: 30,
        peakStart: "06-07", peakEnd: "08-16",
        courses: {
          "ge25": { name:"General English GE25 (25L/週)", type:"elc", prices:[390,380,365,355,320], brackets:[2,5,8,12,20], extraPerWeek:320, commission:0.25 },
          "ge30": { name:"General English GE30 (30L/週)", type:"elc", prices:[475,465,440,430,385], brackets:[2,5,8,12,20], extraPerWeek:385, commission:0.25 },
          "cambridge-25": { name:"Cambridge Exam Prep CC25 (25L/週)", type:"group", prices:[365,355,355], brackets:[1,5,12], commission:0.25 },
          "cambridge-30": { name:"Cambridge Exam Prep CC30 (30L/週)", type:"group", prices:[440,440,430], brackets:[1,5,12], commission:0.25 },
          "ielts-25": { name:"IELTS Preparation IELTS25 (4週固定)", type:"wse-fixed", fixedPrice:1560, fixedWeeks:4, commission:0.25 },
          "ielts-30": { name:"IELTS Preparation IELTS30 (4週固定)", type:"wse-fixed", fixedPrice:1900, fixedWeeks:4, commission:0.25 },
          "ot20": { name:"One-to-One OT20 (20L/週)", type:"group", prices:[1440], brackets:[1], commission:0.25 },
          "ot30": { name:"One-to-One OT30 (30L/週)", type:"group", prices:[2160], brackets:[1], commission:0.25 },
          "emg20": { name:"Business English Mini-Group EMG20 (20L/週)", type:"group", prices:[690], brackets:[1], commission:0.25 },
          "emg30": { name:"Business English Mini-Group EMG30 (30L/週)", type:"group", prices:[1035], brackets:[1], commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "homestay-hb-single": { name:"Homestay・Half board Single (shared bath)", low:205, peak:205, halfBoard:true },
          "homestay-bo-single": { name:"Homestay・Breakfast only Single", low:160, peak:160 },
          "promenade-ensuite": { name:"Promenade Student Living (ensuite)", low:325, peak:325 },
        },
        airports: { "Gatwick":115, "Heathrow":190, "City":210, "St Pancras":220, "Luton":255, "Stansted":255 }
      }
    }
  },
  elc_chester: {
    name: "ELC Chester",
    currency: "GBP",
    campuses: {
      "chester": {
        name: "Chester", country: "UK", regFee: 99, peakSupp: 30,
        peakStart: "06-14", peakEnd: "08-09",
        courses: {
          "ge28": { name:"General English GE28 (28L/週)", type:"elc", prices:[370,360,340,325,310], brackets:[2,5,8,12,20], extraPerWeek:310, commission:0.25 },
          "ielts-28": { name:"IELTS with GE GEI28 (28L/週)", type:"elc", prices:[370,360,340,325,310], brackets:[2,5,8,12,20], extraPerWeek:310, commission:0.25 },
          "tfp20": { name:"30+ Mini Group TFP20 (20L/週)", type:"group", prices:[480], brackets:[1], commission:0.25 },
          "tfp30": { name:"30+ Mini Group TFP30 (30L/週)", type:"group", prices:[720], brackets:[1], commission:0.25 },
          "ot20": { name:"One-to-One OT20 (20L/週)", type:"group", prices:[1440], brackets:[1], commission:0.25 },
          "ot30": { name:"One-to-One OT30 (30L/週)", type:"group", prices:[2160], brackets:[1], commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "homestay-hb-single": { name:"Homestay・Half board Single (shared bath)", low:185, peak:185, halfBoard:true },
          "homestay-bo-single": { name:"Homestay・Breakfast only Single", low:140, peak:140 },
          "residence-shared": { name:"Residence Single ensuite (shared kitchen)", low:250, peak:250 },
        },
        airports: { "Manchester":105, "Liverpool":105 }
      }
    }
  },
  elc_eastbourne: {
    name: "ELC Eastbourne",
    currency: "GBP",
    campuses: {
      "eastbourne": {
        name: "Eastbourne", country: "UK", regFee: 99, peakSupp: 30,
        peakStart: "06-14", peakEnd: "08-09",
        courses: {
          "ge25": { name:"General English GE25 (25L/週)", type:"elc", prices:[335,330,325,315,305], brackets:[2,5,8,12,20], extraPerWeek:305, commission:0.25 },
          "ge30": { name:"General English GE30 (30L/週)", type:"elc", prices:[380,370,350,340,330], brackets:[2,5,8,12,20], extraPerWeek:330, commission:0.25 },
          "ielts-25": { name:"IELTS Preparation IELTS25 (4週固定)", type:"wse-fixed", fixedPrice:1340, fixedWeeks:4, commission:0.25 },
          "ielts-30": { name:"IELTS Preparation IELTS30 (4週固定)", type:"wse-fixed", fixedPrice:1520, fixedWeeks:4, commission:0.25 },
          "ot20": { name:"One-to-One OT20 (20L/週)", type:"group", prices:[1340], brackets:[1], commission:0.25 },
          "ot30": { name:"One-to-One OT30 (30L/週)", type:"group", prices:[2010], brackets:[1], commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "homestay-hb-single": { name:"Homestay・Half board Single (shared bath)", low:180, peak:180, halfBoard:true },
          "homestay-bo-single": { name:"Homestay・Breakfast only Single", low:150, peak:150 },
          "student-house-ensuite": { name:"Student House Single ensuite", low:220, peak:220 },
        },
        airports: { "Gatwick":130, "Heathrow":190, "City":260, "St Pancras":260, "Luton":260, "Stansted":260 }
      }
    }
  },
  manhattan: {
    name: "Manhattan Language",
    currency: "USD",
    campuses: {
      "new-york": {
        name: "New York", country: "USA", regFee: 195, peakSupp: 0,
        courses: {
          "tourists":  { name:"American English for Tourists (20L/週)", type:"group", prices:[400,270,230,210], brackets:[1,3,12,24], commission:0.25 },
          "standard":  { name:"American English Standard (22L/週)",     type:"group", prices:[400,275,240,210], brackets:[1,3,12,24], commission:0.25 },
          "intensive": { name:"American English Intensive (30L/週)",    type:"group", prices:[450,350,330,310], brackets:[1,3,12,24], commission:0.25 },
          "toefl":     { name:"TOEFL Test Preparation (22L/週)",        type:"group", prices:[350,275],         brackets:[3,12],      commission:0.25 },
          "1to1-5":    { name:"One-to-One 5レッスン/週",                type:"group", prices:[425],             brackets:[1],         commission:0.25 },
          "1to1-10":   { name:"One-to-One 10レッスン/週",               type:"group", prices:[800],             brackets:[1],         commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "homestay-brooklyn-bb":      { name:"Homestay Brooklyn/Queens・B&B",           low:435, peak:435, placementFee:150 },
          "homestay-brooklyn-hb":      { name:"Homestay Brooklyn/Queens・Half-Board",    low:525, peak:525, placementFee:150, halfBoard:true },
          "homestay-manhattan-bb":     { name:"Homestay Manhattan・B&B",                 low:590, peak:590, placementFee:150 },
          "homestay-manhattan-premium":{ name:"Homestay Manhattan・Premium (private bath)",low:740,peak:740, placementFee:150 },
          "residence-manhattan":       { name:"Student Residence Manhattan (single)",    low:675, peak:675, placementFee:150 },
        },
        airports: { "Regular pickup (outside terminal)":210, "Premium pickup (inside terminal)":310, "Drop off":150 }
      }
    }
  },
  nese: {
    name: "NESE (New England School of English)",
    currency: "USD",
    campuses: {
      "boston": {
        name: "Boston (Harvard Square)", country: "USA", regFee: 185, peakSupp: 0,
        courses: {
          "intensive": { name:"Intensive (9:00-3:15, 4週/session)", type:"nese", nesePrices:{1:1995,2:3990,3:5985,4:7980,5:9975,6:11970,7:13965,8:15960,9:17955,10:19950,11:21945,12:23940}, commission:0.25 },
          "semi":      { name:"Semi-Intensive (9:00-12:30, 4週/session)", type:"nese", nesePrices:{1:1460,2:2920,3:4380,4:5840,5:7300,6:8760,7:10220,8:11680,9:13140,10:14600,11:16060,12:17520}, commission:0.25 },
        },
        accom: {
          "none":          { name:"なし", low:0, peak:0 },
          "homestay":      { name:"Homestay Single Room (16meals/week)", nesePrices:{1:1490,2:2980,3:4470,4:5960,5:7450,6:8940,7:10430,8:11920,9:13410,10:14900,11:16390,12:17880}, useNese:true },
          "dorm-shared":   { name:"Dormitory Shared Room (14meals/week)", nesePrices:{1:1950,2:3900,3:5850,4:7800,5:9750,6:11700,7:13650,8:15600,9:17550,10:19500,11:21450,12:23400}, useNese:true },
          "dorm-single":   { name:"Dormitory Single Room", nesePrices:{1:2910,2:5820,3:8730,4:11640,5:14550,6:17460,7:20370,8:23280,9:26190,10:29100,11:32010,12:34920}, useNese:true },
        },
        airports: { "Airport Transfer (one way, inside terminal)":252 }
      }
    }
  },
  rennert: {
    name: "Rennert New York",
    currency: "USD",
    campuses: {
      "new-york": {
        name: "New York (Midtown)", country: "USA", regFee: 155, peakSupp: 0,
        courses: {
          "semi-16":      { name:"Semi-Intensive English (16L/週)",         type:"group", prices:[425,400,375,350],     brackets:[1,4,12,24], commission:0.25 },
          "intensive-20": { name:"Intensive English (20L/週, Tourist visa)", type:"group", prices:[475,450,425,400],     brackets:[1,4,12,24], commission:0.25 },
          "intensive-22": { name:"Intensive English (22L/週, Student visa)", type:"group", prices:[500,475,450,425,375], brackets:[1,4,12,24,36], commission:0.25 },
          "intensive-30": { name:"Intensive English (30L/週, Student visa)", type:"group", prices:[575,550,525,500,450], brackets:[1,4,12,24,36], commission:0.25 },
          "business-20":  { name:"Business English (20L/週)",               type:"group", prices:[475,450,425,400],     brackets:[1,4,12,24], commission:0.25 },
          "business-22":  { name:"Business English (22L/週)",               type:"group", prices:[500,475,450,425,375], brackets:[1,4,12,24,36], commission:0.25 },
          "eap-22":       { name:"English for Academic Purposes (22L/週)",   type:"group", prices:[500,475,450,425,375], brackets:[1,4,12,24,36], commission:0.25 },
          "pro-group-15": { name:"Professional Group (15h/週)",              type:"group", prices:[775,695,650,630],     brackets:[1,2,3,6], commission:0.25 },
          "1to1-10h":     { name:"Private Lessons 10h package",              type:"rennert-fixed", fixedPrice:1050, commission:0.25 },
          "1to1-20h":     { name:"Private Lessons 20h package",              type:"rennert-fixed", fixedPrice:1900, commission:0.25 },
        },
        accom: {
          "none":                    { name:"なし", low:0, peak:0 },
          "homestay-bk-bb":          { name:"Homestay Brooklyn/Queens・Breakfast 7days", low:420, peak:420, placementFee:125, rennertSummer:true },
          "homestay-bk-b7d":         { name:"Homestay Brooklyn/Queens・B+Dinner 7days",  low:550, peak:550, placementFee:125, rennertSummer:true, halfBoard:true },
          "homestay-mh-bb":          { name:"Homestay Manhattan・Breakfast 7days",       low:595, peak:595, placementFee:125, rennertSummer:true },
          "homestay-mh-b5d":         { name:"Homestay Manhattan・B+Dinner 5days",        low:755, peak:755, placementFee:125, rennertSummer:true, halfBoard:true },
          "residence-single":        { name:"Student Residence・Single shared bath",     low:630, peak:630, placementFee:125 },
          "residence-ensuite":       { name:"Student Residence・Single ensuite",         low:750, peak:750, placementFee:125 },
          "residence-studio":        { name:"Student Residence・Deluxe Studio ensuite",  low:850, peak:850, placementFee:125 },
        },
        airports: { "LaGuardia / JFK (one way)":225, "Newark NJ (one way)":275 }
      }
    }
  },

// ──────────────────────────────────────────────────────────
// ELC Malaysia
// 通貨: USD / 授業料にSST 6%別途（2025年9月以降）
// bracketsは4週単位。extraPerWeekは最終ブラケット以降の週単価。
// ──────────────────────────────────────────────────────────
  elc_malaysia: {
    name: "ELC (English Language Company) Malaysia",
    currency: "USD",
    campuses: {
      "kuala-lumpur": {
        name: "Kuala Lumpur", country: "Malaysia", regFee: 106, peakSupp: 0,
        courses: {
          // 授業料（税抜き）。SSTは別途。
          // 4週=720.80, 8週=1441.60 → 週180.20
          // 13週目以降は単価が低下するため段階ブラケットで近似
          "ge": {
            name: "General English (グループ)",
            type: "group",
            prices:   [180.20, 174.90, 162.45],
            brackets: [1,      13,     25],
            extraPerWeek: 162.45,
            commission: 0.20,
            note: "授業料にSST 6%が別途加算されます（2025年9月〜）。"
          },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
        },
        airports: { "KLIA/KLIA2 (片道・ビザ申請者必須)": 100 }
      }
    }
  },

// ──────────────────────────────────────────────────────────
// Languages International — Auckland, New Zealand
// 通貨: NZD / peakSupp なし（全週同一価格）
// ──────────────────────────────────────────────────────────
  languages_international: {
    name: "Languages International",
    currency: "NZD",
    campuses: {
      "auckland": {
        name: "Auckland", country: "New Zealand", regFee: 275, peakSupp: 0,
        courses: {
          "ge-ft":        { name:"General English Full-time (23h/週)",          type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "ge-pt":        { name:"General English Part-time (13h/週)",          type:"group", prices:[395], brackets:[1], extraPerWeek:395, commission:0.20 },
          "eb-ft":        { name:"English for Business Full-time (23h/週)",     type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "eb-pt":        { name:"English for Business Part-time (13h/週)",     type:"group", prices:[395], brackets:[1], extraPerWeek:395, commission:0.20 },
          "eu-ft":        { name:"English for University Full-time (23h/週)",   type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "ielts-ft":     { name:"IELTS Preparation Full-time (23h/週)",        type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "ielts-pt":     { name:"IELTS Preparation Part-time (13h/週)",        type:"group", prices:[395], brackets:[1], extraPerWeek:395, commission:0.20 },
          "cambridge-ft": { name:"Cambridge English Qualifications Full-time",  type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "executive-ft": { name:"Executive Course Full-time (午前G＋午後個人)", type:"group", prices:[1750], brackets:[1], extraPerWeek:1750, commission:0.20 },
          "celta":        { name:"Cambridge CELTA (4週固定)",                   type:"group", prices:[3900], brackets:[1], fixedWeeks:4, commission:0.20 },
        },
        accom: {
          "none":                  { name:"なし",                                            low:0,    peak:0 },
          "homestay-std":          { name:"Homestay Standard（朝夕食付）",                  low:400,  peak:400,  placementFee:385 },
          "homestay-pvt":          { name:"Homestay Private Bathroom（朝夕食付）",           low:425,  peak:425,  placementFee:385 },
          "homestay-u18":          { name:"Homestay 18歳未満",                              low:440,  peak:440,  placementFee:485 },
          "serviced-apt":          { name:"Serviced Apartment（目安・要確認）",              low:1200, peak:1200, placementFee:385 },
        },
        airports: { "Auckland Airport (片道)": 145 }
      }
    }
  },

// ──────────────────────────────────────────────────────────
// CISL (Converse International School of Languages) San Diego
// 通貨: USD / 平均7名クラス（最大10名）、プレミア最大4名
// ──────────────────────────────────────────────────────────
  cisl: {
    name: "CISL (Converse International School of Languages)",
    currency: "USD",
    campuses: {
      "san-diego": {
        name: "San Diego", country: "USA", regFee: 160, peakSupp: 0,
        courses: {
          // 価格帯: 1-2週/3週/4-7週/8-12週/13-24週/25週+
          "standard":        { name:"Standard English (20L/週)",              type:"group", prices:[390,380,375,370,350,335], brackets:[1,3,4,8,13,25], extraPerWeek:335, commission:0.20 },
          "business":        { name:"Business English (20L/週)",              type:"group", prices:[390,380,375,370,350,335], brackets:[1,3,4,8,13,25], extraPerWeek:335, commission:0.20 },
          "standard-f1":     { name:"Standard/Business Plus F-1 (22L/週)",   type:"group", prices:[380,375,355,340],         brackets:[4,8,13,25],     extraPerWeek:340, commission:0.20 },
          "intensive-f1":    { name:"Intensive English F-1 (28L/週)",        type:"group", prices:[450,445,425,410],         brackets:[4,8,13,25],     extraPerWeek:410, commission:0.20 },
          "afternoon-only":  { name:"Afternoon Elective Only (8L/週)",       type:"group", prices:[190],                    brackets:[1],             extraPerWeek:190, commission:0.20 },
          "executive":       { name:"Executive English Premier (20L/週)",    type:"group", prices:[875,870,865,860,855,840], brackets:[1,3,4,8,13,25], extraPerWeek:840, commission:0.20 },
          "executive-f1":    { name:"Executive Intensive F-1 Premier (28L/週)",type:"group",prices:[940,935,910,895],       brackets:[4,8,13,25],     extraPerWeek:895, commission:0.20 },
          "ielts-4wk":       { name:"IELTS Preparation (4週固定)",            type:"group", prices:[1500], brackets:[1], fixedWeeks:4, commission:0.20 },
          "ielts-8wk":       { name:"IELTS Preparation (8週固定)",            type:"group", prices:[2960], brackets:[1], fixedWeeks:8, commission:0.20 },
          "ielts-12wk":      { name:"IELTS Preparation (12週固定)",           type:"group", prices:[4440], brackets:[1], fixedWeeks:12, commission:0.20 },
          "ge-golf":         { name:"General English + Golf (22L/週)",       type:"group", prices:[475,465,460,455,435,420], brackets:[1,3,4,8,13,25], extraPerWeek:420, commission:0.20 },
          "ge-tennis":       { name:"General English + Tennis (22L/週)",     type:"group", prices:[465,455,450,445,425,410], brackets:[1,3,4,8,13,25], extraPerWeek:410, commission:0.20 },
          "ge-surfing":      { name:"General English + Surfing (22L/週)",    type:"group", prices:[665,655,650,645,625,610], brackets:[1,3,4,8,13,25], extraPerWeek:610, commission:0.20 },
          "1to1":            { name:"One-to-One Private Lessons",             type:"1to1",  pricePerHour:95, commission:0.20 },
        },
        accom: {
          "none":                       { name:"なし",                                                      low:0,   peak:0 },
          "homestay-hb":                { name:"Homestay Standard・朝夕食付 (shared bath)",                 low:410, peak:435, placementFee:160, halfBoard:true },
          "homestay-bo":                { name:"Homestay Standard・朝食のみ (shared bath)",                 low:350, peak:375, placementFee:160 },
          "homestay-exec":              { name:"Homestay Executive・朝夕食付 (private bath, Premier専用)",  low:440, peak:465, placementFee:160, halfBoard:true },
          "state-street-single":        { name:"State Street Residence・Single private bath (4週〜)",      low:499, peak:499, placementFee:160 },
          "state-street-double":        { name:"State Street Residence・Double private bath (2名同時)",    low:299, peak:299, placementFee:160 },
          "usd-summer-single":          { name:"USD Summer Residence・Single (6/28〜8/9限定)",             low:585, peak:585, placementFee:160 },
          "usd-summer-double":          { name:"USD Summer Residence・Double (6/28〜8/9限定, 2名同時)",    low:440, peak:440, placementFee:160 },
        },
        airports: { "San Diego SAN (片道)":160, "LAX (片道)":495, "ホームステイ送迎 (片道)":120 }
      }
    }
  },

// ──────────────────────────────────────────────────────────
// inlingua Singapore
// 通貨: SGD（GST込み）/ 登録料 SGD 30 別途
// ──────────────────────────────────────────────────────────
  inlingua_sg: {
    name: "inlingua School of Languages Singapore",
    currency: "SGD",
    campuses: {
      "singapore": {
        name: "Singapore", country: "Singapore", regFee: 30, peakSupp: 0,
        courses: {
          // ── 非SSG登録コース（グループ・週2/4/6/10コマ）────
          "gen-beginner":    { name:"General Skills Beginner A0 (20時間)",              type:"group", prices:[380], brackets:[1], fixedWeeks:null, commission:0.20, note:"教材費SGD20〜85別途。" },
          "gen-standard":    { name:"General Skills Elementary〜Mastery (20時間)",      type:"group", prices:[420], brackets:[1], fixedWeeks:null, commission:0.20, note:"教材費SGD20〜85別途。" },
          "exam-20h":        { name:"Exam Skills IELTS/Goethe/HSK (20時間)",            type:"group", prices:[600], brackets:[1], fixedWeeks:null, commission:0.20, note:"教材費SGD70〜120別途。" },
          "exam-40h":        { name:"Exam Skills IELTS/Goethe/HSK (40時間)",            type:"group", prices:[1200], brackets:[1], fixedWeeks:null, commission:0.20 },
          "jlpt-n4":         { name:"JLPT N4 Japanese (12時間・教材費込み)",             type:"group", prices:[280], brackets:[1], fixedWeeks:null, commission:0.20 },
          "korean-holiday":  { name:"Korean Step into Korean Holiday Programme (20時間)", type:"group", prices:[670], brackets:[1], fixedWeeks:null, commission:0.20, note:"教材費・Visang Master K込み。" },
          // ── 個人レッスン（1:1）────────────────────────────
          "1to1":            { name:"Private Lessons Individual 1:1", type:"1to1", pricePerHour:108, commission:0.20, note:"最低2コマ/セッション。予約から6ヶ月以内に消化。" },
          // ── SSGコース・集中25（週25コマ・グループ20＋自習5）
          "intensive25-1wk": { name:"Intensive 25 General/Business 1週",  type:"group", prices:[830],   brackets:[1], fixedWeeks:1,  commission:0.20 },
          "intensive25-2wk": { name:"Intensive 25 General/Business 2週",  type:"group", prices:[1500],  brackets:[1], fixedWeeks:2,  commission:0.20 },
          "intensive25-4wk": { name:"Intensive 25 General/Business 4週",  type:"group", prices:[2500],  brackets:[1], fixedWeeks:4,  commission:0.20 },
          "intensive25-8wk": { name:"Intensive 25 General/Business 8週",  type:"group", prices:[4899],  brackets:[1], fixedWeeks:8,  commission:0.20 },
          "intensive25-12wk":{ name:"Intensive 25 General/Business 12週", type:"group", prices:[7329],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "intensive25-16wk":{ name:"Intensive 25 General/Business 16週", type:"group", prices:[9738],  brackets:[1], fixedWeeks:16, commission:0.20 },
          "intensive25-20wk":{ name:"Intensive 25 General/Business 20週", type:"group", prices:[12157], brackets:[1], fixedWeeks:20, commission:0.20 },
          "intensive25-24wk":{ name:"Intensive 25 General/Business 24週", type:"group", prices:[14555], brackets:[1], fixedWeeks:24, commission:0.20 },
          "intensive25-26wk":{ name:"Intensive 25 General/Business 26週", type:"group", prices:[15734], brackets:[1], fixedWeeks:26, commission:0.20 },
          // ── SSGコース・IELTS準備────────────────────────────
          "ielts-prep-4wk":  { name:"IELTS Preparatory Course 4週",       type:"group", prices:[2600],  brackets:[1], fixedWeeks:4,  commission:0.20 },
          "ielts-prep-8wk":  { name:"IELTS Preparatory Course 8週",       type:"group", prices:[5228],  brackets:[1], fixedWeeks:8,  commission:0.20 },
          "ielts-prep-12wk": { name:"IELTS Preparatory Course 12週",      type:"group", prices:[7688],  brackets:[1], fixedWeeks:12, commission:0.20 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
        },
        airports: {}
      }
    }
  }
};

// 個人レッスン単価（1レッスンあたり、現地通貨）
const PRIVATE_LESSON_PRICES = {
  "stgiles": { "london-central":84, "brighton":63, "cambridge":76, "eastbourne":76, "london-highgate":77 },
  "lse":     { "holland-park":105 },
  "wse":     { "wimbledon":90 },
  "ih":      { "covent-garden":108 },
  "elc_brighton":   { "brighton":77 },
  "elc_chester":    { "chester":77 },
  "elc_eastbourne": { "eastbourne":72 },
  "manhattan":      { "new-york":90 },
  "nese":           { "boston":null },
  "rennert":        { "new-york":85 },
  // 2026年追加
  "elc_malaysia":            { "kuala-lumpur": null },        // 個人レッスン料金はPDFに記載なし
  "languages_international": { "auckland": null },            // 個人レッスン料金はPDFに記載なし（Executive内に含む）
  "cisl":                    { "san-diego": 95 },             // USD/1レッスン(50分)
  "inlingua_sg":             { "singapore": 108 },            // SGD/1時間(50分)・1:1
};