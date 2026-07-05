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

  // ── GrandLine (Philippines) ──────────────────────────────
  grandline: {
    name: "GrandLine (フィリピン留学)",
    currency: "JPY",
    campuses: {
      "philippines": {
        name: "フィリピン", country: "Philippines", regFee: 30000, peakSupp: 0,
        // GrandLineは円建て一括価格（コース+宿泊+空港送迎+テスト等込み）
        // typeは"grandline-fixed"で週数→価格テーブル参照
        courses: {
          // ライトプラン Breaks
          "light-breaks": {
            name:"ライトプラン Breaks（コース+宿泊等込み）", type:"grandline-fixed",
            priceTable: [0,57500,115000,172500,230000,287500,345000,402500,460000,517500,575000,632500,690000,747500,805000,862500,920000,977500,1035000,1092500,1150000,1207500,1265000,1322500,1380000],
            commission:0.25
          },
          // スタンダード Breaks
          "standard-breaks": {
            name:"スタンダード Breaks（コース+宿泊等込み）", type:"grandline-fixed",
            priceTable: [0,80000,160000,240000,320000,400000,480000,560000,640000,720000,800000,880000,960000,1040000,1120000,1200000,1280000,1360000,1440000,1520000,1600000,1680000,1760000,1840000,1920000],
            commission:0.25
          },
          // スタンダード Breaks Air
          "standard-breaks-air": {
            name:"スタンダード Breaks Air（コース+宿泊+航空券等込み）", type:"grandline-fixed",
            priceTable: [0,94000,188000,282000,376000,470000,564000,658000,752000,846000,940000,1034000,1128000,1222000,1316000,1410000,1504000,1598000,1692000,1786000,1880000,1974000,2068000,2162000,2256000],
            commission:0.25
          },
          // フルカスタマイズ Breaks
          "full-breaks": {
            name:"フルカスタマイズ Breaks（コース+宿泊等込み）", type:"grandline-fixed",
            priceTable: [0,125000,250000,375000,500000,625000,750000,875000,1000000,1125000,1250000,1375000,1500000,1625000,1750000,1875000,2000000,2125000,2250000,2375000,2500000,2625000,2750000,2875000,3000000],
            commission:0.25
          },
          // フルカスタマイズ Breaks Air
          "full-breaks-air": {
            name:"フルカスタマイズ Breaks Air（コース+宿泊+航空券等込み）", type:"grandline-fixed",
            priceTable: [0,139000,278000,417000,556000,695000,834000,973000,1112000,1251000,1390000,1529000,1668000,1807000,1946000,2085000,2224000,2363000,2502000,2641000,2780000,2919000,3058000,3197000,3336000],
            commission:0.25
          },
        },
        accom: { "none": { name:"宿泊込み（上記価格に含む）", low:0, peak:0 } },
        airports: {}
      }
    }
  },

  // ── IH Bangkok ──────────────────────────────────────────
  ih_bangkok: {
    name: "International House Bangkok",
    currency: "THB",
    campuses: {
      "bangkok": {
        name: "Bangkok", country: "Thailand", regFee: 3000, peakSupp: 0,
        courses: {
          // Study Holiday Courses（週単価・週数ブラケット）
          "ge15":    { name:"GE15 General English 15h/週",          type:"group", prices:[7750,6750,6750,6300,6000,5700], brackets:[1,2,4,7,13,25], extraPerWeek:5700, commission:0.20 },
          "ge25":    { name:"GE25 General English 25h/週",          type:"group", prices:[12250,11250,11250,10500,10000,9500], brackets:[1,2,4,7,13,25], extraPerWeek:9500, commission:0.20 },
          "be25":    { name:"BE25 Business English 25h/週",         type:"group", prices:[12250,11250,11250,10500,10000,9500], brackets:[1,2,4,7,13,25], extraPerWeek:9500, commission:0.20 },
          "ibe25":   { name:"IBE25 Intensive Business Eng 25h/週",  type:"group", prices:[28000,26250,25500,25200,25000,24800], brackets:[1,2,4,7,13,25], extraPerWeek:24800, commission:0.20 },
          "ibe20":   { name:"IBE20 Intensive Business Eng 20h/週",  type:"group", prices:[20500,19000,18500,18200,18000,17800], brackets:[1,2,4,7,13,25], extraPerWeek:17800, commission:0.20 },
          "ex25":    { name:"EX25 Exam Prep 25h/週",                type:"group", prices:[22750,21250,20750,20300,20000,19700], brackets:[1,2,4,7,13,25], extraPerWeek:19700, commission:0.20 },
          "ex10":    { name:"EX10 Exam Prep 1:1 10h/週",           type:"group", prices:[15000,14500,14500,14000,14000,14000], brackets:[1,2,4,7,13,25], extraPerWeek:14000, commission:0.20 },
          "mix25":   { name:"MIX25 Mixed Course 25h/週",            type:"group", prices:[21250,19750,19250,18800,18500,18200], brackets:[1,2,4,7,13,25], extraPerWeek:18200, commission:0.20 },
          "small15": { name:"Small Group 15 (1-6名) 15h/週",        type:"group", prices:[12000,12000,11250,10500,9750], brackets:[1,7,13,25], extraPerWeek:9750, commission:0.20 },
          // Private English (hour-based packages: price = total for hours, use fixedWeeks=null with 1to1)
          "private-ge-1to1": { name:"Private General English 1:1", type:"1to1", pricePerHour:1350, commission:0.20 },
          "private-be-1to1": { name:"Private Business English 1:1", type:"1to1", pricePerHour:1500, commission:0.20 },
          // IELTS Victory
          "ielts-victory": { name:"IELTS Victory Course 18,000THB/週", type:"group", prices:[18000], brackets:[1], extraPerWeek:18000, commission:0.20 },
        },
        accom: {
          "none": { name:"なし（別途手配）", low:0, peak:0 },
          "mona-studio-27": { name:"Mona Suite Studio 27㎡（週）",           low:9100,  peak:9100,  placementFee:3000 },
          "mona-studio-32": { name:"Mona Suite Studio 32㎡（週）",           low:9100,  peak:9100,  placementFee:3000 },
          "mona-studio-38": { name:"Mona Suite Studio 38㎡（週）",           low:9100,  peak:9100,  placementFee:3000 },
          "mona-1br":       { name:"Mona Suite 1BR Deluxe 44-55㎡（週）",    low:10500, peak:10500, placementFee:3000 },
          "mona-2br":       { name:"Mona Suite 2BR Deluxe 74-81㎡（週）",    low:21000, peak:21000, placementFee:3000 },
          "vp-deluxe-dbl":  { name:"VP Tower Deluxe Double 32㎡（月）",      low:15500, peak:15500, placementFee:3000, perMonth:true },
          "furama-dbl":     { name:"FuramaXclusive Asoke Deluxe Dbl（月）",  low:48000, peak:48000, placementFee:3000, perMonth:true },
        },
        airports: { "スワンナプーム空港（要確認）": 0 }
      }
    }
  },

  // ── LSI Portsmouth (IH Portsmouth) ──────────────────────
  lsi_portsmouth: {
    name: "LSI Portsmouth (IH Portsmouth)",
    currency: "GBP",
    campuses: {
      "portsmouth": {
        name: "Portsmouth", country: "UK", regFee: 80, peakSupp: 20,
        // peakSupp: Summer supplement (1 Jun – 28 Aug)
        // peakStart/End for calcCustomSummerWeeks
        peakStart: "06-01", peakEnd: "08-29",
        courses: {
          // General English & Exam
          "ge-ft":         { name:"Full-time General English",                       type:"group", prices:[335,325,315,305], brackets:[1,5,12,22], extraPerWeek:305, commission:0.20 },
          "ielts":         { name:"IELTS Preparation",                               type:"group", prices:[335,325,315,305], brackets:[1,5,12,22], extraPerWeek:305, commission:0.20 },
          "ge-summer":     { name:"Summer GE / IELTS (6/1〜8/28)",                   type:"group", prices:[355,345,335,325], brackets:[1,5,12,22], extraPerWeek:325, commission:0.20 },
          "cae-summer":    { name:"CAE Cambridge Prep・Summer (7/6〜8/28のみ)",       type:"group", prices:[355,345], brackets:[1,5], fixedWeeks:null, commission:0.20 },
          "ge-5h-1to1":    { name:"General English + 5h 1:1 Exam Prep",              type:"group", prices:[565], brackets:[1], extraPerWeek:565, commission:0.20 },
          "ge-10h-1to1":   { name:"General English + 10h 1:1 Exam Prep",             type:"group", prices:[955], brackets:[1], extraPerWeek:955, commission:0.20 },
          "ge-light":      { name:"General English Light (AM only)",                 type:"group", prices:[185], brackets:[1], extraPerWeek:185, commission:0.20 },
          "ge-light-sum":  { name:"General English Light Summer (AM only)",          type:"group", prices:[195], brackets:[1], extraPerWeek:195, commission:0.20 },
          "ge-business":   { name:"General English + Business Communication",        type:"group", prices:[695], brackets:[1], extraPerWeek:695, commission:0.20 },
          "oet":           { name:"OET (1 week closed group)",                       type:"group", prices:[420], brackets:[1], fixedWeeks:1, commission:0.20 },
          // 30+ Courses
          "30plus-core":       { name:"30+ General English Core",                    type:"group", prices:[430], brackets:[1], extraPerWeek:430, commission:0.20 },
          "30plus-intensive":  { name:"30+ GE Core + Intensive",                     type:"group", prices:[795], brackets:[1], extraPerWeek:795, commission:0.20 },
          "30plus-business":   { name:"30+ GE Core + Business Communication",        type:"group", prices:[995], brackets:[1], extraPerWeek:995, commission:0.20 },
          "30plus-5h1to1":     { name:"30+ GE Core + 5h 1:1",                        type:"group", prices:[795], brackets:[1], extraPerWeek:795, commission:0.20 },
          "30plus-10h1to1":    { name:"30+ GE Core + 10h 1:1",                       type:"group", prices:[1200], brackets:[1], extraPerWeek:1200, commission:0.20 },
          "30plus-culture":    { name:"30+ GE Core + Culture (3/30〜10/23)",         type:"group", prices:[1350], brackets:[1], extraPerWeek:1350, commission:0.20 },
          // Professional
          "exec-combo-25":     { name:"Executive Combination 25h/週",                type:"group", prices:[1450], brackets:[1], extraPerWeek:1450, commission:0.20 },
          "exec-combo-30":     { name:"Executive Combination Plus 30h/週",           type:"group", prices:[1950], brackets:[1], extraPerWeek:1950, commission:0.20 },
          "allday-1to1-30":    { name:"All-day 1:1 Intensive Plus 30h/週",           type:"group", prices:[2300], brackets:[1], extraPerWeek:2300, commission:0.20 },
          "allday-1to1-25":    { name:"All-day 1:1 Intensive 25h/週",               type:"group", prices:[1950], brackets:[1], extraPerWeek:1950, commission:0.20 },
          "allday-1to1-20":    { name:"All-day 1:1 20h/週",                          type:"group", prices:[1550], brackets:[1], extraPerWeek:1550, commission:0.20 },
          "exec-1to1-light":   { name:"Exec 1:1 Light 15h/週",                      type:"group", prices:[1170], brackets:[1], extraPerWeek:1170, commission:0.20 },
          "golf-g1":           { name:"English + Golf G1 (4/13〜9/25)",              type:"group", prices:[2630], brackets:[1], extraPerWeek:2630, commission:0.20 },
          "golf-g2":           { name:"English + Golf G2 (4/13〜9/25)",              type:"group", prices:[2100], brackets:[1], extraPerWeek:2100, commission:0.20 },
          "golf-g3":           { name:"English + Golf G3 (4/13〜9/25)",              type:"group", prices:[2130], brackets:[1], extraPerWeek:2130, commission:0.20 },
          // CELTA
          "celta":             { name:"CELTA (Course fee £1550 + Cambridge fee £170)", type:"group", prices:[1720], brackets:[1], fixedWeeks:4, commission:0.20 },
          // 1:1 per hour
          "1to1":              { name:"One-to-one lesson (£78/h)", type:"1to1", pricePerHour:78, commission:0.20 },
        },
        accom: {
          "none":           { name:"なし", low:0, peak:0 },
          "homestay-std":   { name:"Homestay Standard（非夏期）", low:190, peak:200, placementFee:0 },
          "homestay-exec":  { name:"Homestay Executive",          low:300, peak:300, placementFee:0 },
          "self-catering":  { name:"Self-catering Residence（Single studio）", low:295, peak:295, placementFee:100 },
        },
        airports: {
          "Heathrow / Gatwick（Arrival）":  170,
          "Heathrow / Gatwick（Departure）": 140,
          "Luton / Stansted（Arrival）":     250,
          "Luton / Stansted（Departure）":   230,
          "Southampton（Arrival）":          100,
          "Southampton（Departure）":         90,
        }
      }
    }
  },
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
  "grandline":      { "philippines": null },
  "ih_bangkok":     { "bangkok": 1350 },   // THB/h (General 1:1)
  "lsi_portsmouth": { "portsmouth": 78 },  // GBP/h
};

// ここに新しい学校を追加してください ↓
// 追加方法の例：
// mynewschool: {
//   name: "My New School",
//   currency: "GBP",
//   campuses: {
//     "london": {
//       name: "London", country: "UK", regFee: 85, peakSupp: 30,
//       courses: {
//         "ge": { name:"General English", type:"group", prices:[400,370,350], brackets:[1,4,12], commission:0.25 },
//       },
//       accom: { "none": { name:"なし", low:0, peak:0 } },
//       airports: { "Heathrow":150 }
//     }
//   }
// },
