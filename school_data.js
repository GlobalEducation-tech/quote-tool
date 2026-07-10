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
        materialsFee: { type:"bracket", brackets:[{maxWeeks:6, fee:40},{maxWeeks:999, fee:60}] },
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
        materialsFee: { type:"bracket", brackets:[{maxWeeks:6, fee:40},{maxWeeks:999, fee:60}] },
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
        materialsFee: { type:"bracket", brackets:[{maxWeeks:6, fee:40},{maxWeeks:999, fee:60}] },
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
        materialsFee: { type:"bracket", brackets:[{maxWeeks:6, fee:40},{maxWeeks:999, fee:60}] },
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
        materialsFee: { type:"bracket", brackets:[{maxWeeks:6, fee:40},{maxWeeks:999, fee:60}] },
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
          "tourists":  { name:"American English for Tourists (20L/週)", type:"group", prices:[400,270,230,210], brackets:[1,3,12,24], commission:0.25, note:"Business English for Professionals Signature Elective（月〜木 14:15〜16:15）をこのコース費用内で受講可能。" },
          "standard":  { name:"American English Standard (22L/週)",     type:"group", prices:[400,275,240,210], brackets:[1,3,12,24], commission:0.25 },
          "intensive": { name:"American English Intensive (30L/週)",    type:"group", prices:[450,350,330,310], brackets:[1,3,12,24], commission:0.25, note:"Business English for Professionals Signature Elective（月〜木 14:15〜16:15）をこのコース費用内で受講可能。" },
          "toefl":     { name:"TOEFL Test Preparation (22L/週)",        type:"group", prices:[350,275],         brackets:[3,12],      commission:0.25 },
          "business-english": { name:"Business English for Professionals (Signature Elective)", type:"group", prices:[0], brackets:[1], extraPerWeek:0, commission:0.25, note:"月〜木14:15〜16:15。価格は要問い合わせ（単独またはIntensive/Touristと組み合わせ可）。price欄に手入力してください。" },
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

  // ── ELC Malaysia ────────────────────────────────────────
  elc_malaysia: {
    name: "ELC (English Language Company) Malaysia",
    currency: "USD",
    campuses: {
      "kuala-lumpur": {
        name: "Kuala Lumpur (KL City Campus)", country: "Malaysia", regFee: 106, peakSupp: 0,
        // 教材費はコースごとに異なるため各コースに設定
        courses: {
          // ── Intensive General / Academic English ──────────
          "ige": {
            name:"Intensive General English", type:"elc",
            prices:[180.20, 174.90, 169.60, 164.30], brackets:[1, 13, 25, 37],
            extraPerWeek:164.30, commission:0.20,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:4,fee:50},{maxWeeks:8,fee:100},{maxWeeks:12,fee:150},{maxWeeks:16,fee:200},{maxWeeks:20,fee:250},{maxWeeks:999,fee:270}] },
            note:"授業料にSST 6%別途（2025年9月〜）"
          },
          "iae": {
            name:"Intensive Academic English", type:"elc",
            prices:[180.20, 174.90, 169.60, 164.30], brackets:[1, 13, 25, 37],
            extraPerWeek:164.30, commission:0.20,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:4,fee:50},{maxWeeks:8,fee:100},{maxWeeks:12,fee:150},{maxWeeks:16,fee:200},{maxWeeks:20,fee:250},{maxWeeks:999,fee:270}] },
            note:"授業料にSST 6%別途（2025年9月〜）"
          },
          // ── Semi-Intensive General English ────────────────
          "sige": {
            name:"Semi-Intensive General English (2〜12週)", type:"elc",
            prices:[159], brackets:[1], extraPerWeek:159, commission:0.20,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:4,fee:50},{maxWeeks:8,fee:100},{maxWeeks:12,fee:150},{maxWeeks:999,fee:150}] },
            note:"学生パス非対象。最大12週まで。授業料にSST 6%別途。"
          },
          // ── Premium Courses（4h Group + 1h 1-2-1）─────────
          "premium": {
            name:"Premium Course (4h Group + 1h 1-2-1)", type:"elc",
            prices:[424, 413.40, 402.80, 392.20], brackets:[1, 13, 25, 37],
            extraPerWeek:392.20, commission:0.20,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:4,fee:50},{maxWeeks:8,fee:100},{maxWeeks:12,fee:150},{maxWeeks:16,fee:200},{maxWeeks:20,fee:250},{maxWeeks:999,fee:270}] },
            note:"授業料にSST 6%別途（2025年9月〜）"
          },
          // ── Executive English（Standard）──────────────────
          // 登録費は$212（通常の$106とは別）
          "exec-standard": {
            name:"Standard Executive English (3h Group + 1h BE Small Group)", type:"elc",
            prices:[212, 201.40, 190.80], brackets:[1, 13, 25],
            extraPerWeek:190.80, commission:0.20, regFeeOverride:212,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:6,fee:130},{maxWeeks:12,fee:160},{maxWeeks:24,fee:200},{maxWeeks:35,fee:230},{maxWeeks:999,fee:260}] },
            note:"登録費$212（ELC Executive Centre利用込み）。SST 6%別途。"
          },
          // ── Executive English（Premium）───────────────────
          "exec-premium": {
            name:"Premium Executive English (3h G + 1h BE SG + 1h 1-2-1)", type:"elc",
            prices:[424, 413.40, 402.80], brackets:[1, 13, 25],
            extraPerWeek:402.80, commission:0.20, regFeeOverride:212,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:6,fee:130},{maxWeeks:12,fee:160},{maxWeeks:24,fee:200},{maxWeeks:35,fee:230},{maxWeeks:999,fee:260}] },
            note:"登録費$212。SST 6%別途。"
          },
          // ── Executive English（Premium Plus）─────────────
          "exec-premium-plus": {
            name:"Premium Plus Executive English (3h G + 1h BE SG + 2h 1-2-1)", type:"elc",
            prices:[636, 614.60, 583], brackets:[1, 13, 25],
            extraPerWeek:583, commission:0.20, regFeeOverride:212,
            materialsFee:{ type:"bracket", brackets:[{maxWeeks:6,fee:130},{maxWeeks:12,fee:160},{maxWeeks:24,fee:200},{maxWeeks:35,fee:230},{maxWeeks:999,fee:260}] },
            note:"登録費$212。SST 6%別途。"
          },
        },
        accom: { "none": { name:"なし", low:0, peak:0 } },
        airports: { "KLIA/KLIA2 片道（ビザ必須）": 100 }
      }
    }
  },

  // ── Languages International ──────────────────────────────
  languages_international: {
    name: "Languages International",
    currency: "NZD",
    campuses: {
      "auckland": {
        name: "Auckland", country: "New Zealand", regFee: 275, peakSupp: 0,
        materialsFee: { type:"fixed", fee:140 },
        courses: {
          "ge-ft":        { name:"General English Full-time (23h/週)",         type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "ge-pt":        { name:"General English Part-time (13h/週)",         type:"group", prices:[395], brackets:[1], extraPerWeek:395, commission:0.20 },
          "eb-ft":        { name:"English for Business Full-time",             type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "eu-ft":        { name:"English for University Full-time",           type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "ielts-ft":     { name:"IELTS Preparation Full-time",                type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "cambridge-ft": { name:"Cambridge English Qualifications Full-time", type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.20 },
          "executive-ft": { name:"Executive Course Full-time (午前G＋午後個人)", type:"group", prices:[1750], brackets:[1], extraPerWeek:1750, commission:0.20 },
          "celta":        { name:"Cambridge CELTA (4週固定)",                  type:"group", prices:[3900], brackets:[1], fixedWeeks:4, commission:0.20 },
        },
        accom: {
          "none":             { name:"なし", low:0, peak:0 },
          "homestay-std":     { name:"Homestay Standard（週）",          low:400, peak:400, placementFee:385 },
          "homestay-pvt":     { name:"Homestay Private Bathroom（週）",   low:425, peak:425, placementFee:385 },
          "homestay-u18":     { name:"Homestay 18歳未満（週）",           low:440, peak:440, placementFee:485 },
          "serviced-apt":     { name:"Serviced Apartment（週・目安）",    low:1200, peak:1200, placementFee:385 },
        },
        airports: { "Auckland Airport 片道": 145 }
      }
    }
  },

  // ── CISL San Diego ───────────────────────────────────────
  cisl: {
    name: "CISL (Converse International School of Languages)",
    currency: "USD",
    campuses: {
      "san-diego": {
        name: "San Diego", country: "USA", regFee: 160, peakSupp: 0,
        courses: {
          "standard":       { name:"Standard English (20L/週)",            type:"group", prices:[390,380,375,370,350,335], brackets:[1,3,4,8,13,25], extraPerWeek:335, commission:0.20 },
          "business":       { name:"Business English (20L/週)",            type:"group", prices:[390,380,375,370,350,335], brackets:[1,3,4,8,13,25], extraPerWeek:335, commission:0.20 },
          "standard-f1":    { name:"Standard/Business Plus F-1 (22L/週)", type:"group", prices:[380,375,355,340],         brackets:[4,8,13,25],     extraPerWeek:340, commission:0.20 },
          "intensive-f1":   { name:"Intensive English F-1 (28L/週)",      type:"group", prices:[450,445,425,410],         brackets:[4,8,13,25],     extraPerWeek:410, commission:0.20 },
          "afternoon-only": { name:"Afternoon Elective Only (8L/週)",     type:"group", prices:[190],                    brackets:[1],             extraPerWeek:190, commission:0.20 },
          "executive":      { name:"Executive English Premier (20L/週)",  type:"group", prices:[875,870,865,860,855,840], brackets:[1,3,4,8,13,25], extraPerWeek:840, commission:0.20 },
          "executive-f1":   { name:"Executive Intensive F-1 (28L/週)",    type:"group", prices:[940,935,910,895],         brackets:[4,8,13,25],     extraPerWeek:895, commission:0.20 },
          "ielts-4wk":      { name:"IELTS Preparation (4週固定)",          type:"group", prices:[1500], brackets:[1], fixedWeeks:4, commission:0.20 },
          "ielts-8wk":      { name:"IELTS Preparation (8週固定)",          type:"group", prices:[2960], brackets:[1], fixedWeeks:8, commission:0.20 },
          "ielts-12wk":     { name:"IELTS Preparation (12週固定)",         type:"group", prices:[4440], brackets:[1], fixedWeeks:12, commission:0.20 },
          "1to1":           { name:"One-to-One Private Lessons",           type:"1to1",  pricePerHour:95, commission:0.20 },
        },
        accom: {
          "none":                { name:"なし", low:0, peak:0 },
          "homestay-hb":         { name:"Homestay Standard 朝夕食付",          low:410, peak:435, placementFee:160, halfBoard:true },
          "homestay-bo":         { name:"Homestay Standard 朝食のみ",          low:350, peak:375, placementFee:160 },
          "state-street-single": { name:"State Street Residence Single (4週〜)", low:499, peak:499, placementFee:160 },
          "state-street-double": { name:"State Street Residence Double (2名同時)", low:299, peak:299, placementFee:160 },
        },
        airports: { "San Diego SAN 片道":160, "LAX 片道":495 }
      }
    }
  },

  // ── inlingua Singapore ───────────────────────────────────
  inlingua_sg: {
    name: "inlingua School of Languages Singapore",
    currency: "SGD",
    campuses: {
      "singapore": {
        name: "Singapore", country: "Singapore", regFee: 30, peakSupp: 0,
        courses: {
          "gen-beginner":    { name:"General Skills Beginner A0 (20時間)",         type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.20 },
          "gen-standard":    { name:"General Skills Elementary〜Mastery (20時間)", type:"group", prices:[420], brackets:[1], extraPerWeek:420, commission:0.20 },
          "exam-20h":        { name:"Exam Skills IELTS/Goethe/HSK (20時間)",       type:"group", prices:[600], brackets:[1], extraPerWeek:600, commission:0.20 },
          "exam-40h":        { name:"Exam Skills IELTS/Goethe/HSK (40時間)",       type:"group", prices:[1200], brackets:[1], extraPerWeek:1200, commission:0.20 },
          "intensive25-4wk": { name:"Intensive 25 General/Business 4週",           type:"group", prices:[2500],  brackets:[1], fixedWeeks:4,  commission:0.20 },
          "intensive25-8wk": { name:"Intensive 25 General/Business 8週",           type:"group", prices:[4900],  brackets:[1], fixedWeeks:8,  commission:0.20 },
          "intensive25-12wk":{ name:"Intensive 25 General/Business 12週",          type:"group", prices:[7329],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "ielts-prep-4wk":  { name:"IELTS Preparatory Course 4週",               type:"group", prices:[2600],  brackets:[1], fixedWeeks:4,  commission:0.20 },
          "ielts-prep-8wk":  { name:"IELTS Preparatory Course 8週",               type:"group", prices:[5228],  brackets:[1], fixedWeeks:8,  commission:0.20 },
          "ielts-prep-12wk": { name:"IELTS Preparatory Course 12週",              type:"group", prices:[7688],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "1to1":            { name:"Private Lessons Individual 1:1",              type:"1to1",  pricePerHour:108, commission:0.20 },
        },
        accom: { "none": { name:"なし", low:0, peak:0 } },
        airports: {}
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
        courses: {
          "light-breaks":      { name:"ライトプラン Breaks",              type:"grandline-fixed", priceTable:[0,57500,115000,172500,230000,287500,345000,402500,460000,517500,575000,632500,690000,747500,805000,862500,920000,977500,1035000,1092500,1150000,1207500,1265000,1322500,1380000], commission:0.25 },
          "standard-breaks":   { name:"スタンダード Breaks",             type:"grandline-fixed", priceTable:[0,80000,160000,240000,320000,400000,480000,560000,640000,720000,800000,880000,960000,1040000,1120000,1200000,1280000,1360000,1440000,1520000,1600000,1680000,1760000,1840000,1920000], commission:0.25 },
          "standard-breaks-air":{ name:"スタンダード Breaks Air",        type:"grandline-fixed", priceTable:[0,94000,188000,282000,376000,470000,564000,658000,752000,846000,940000,1034000,1128000,1222000,1316000,1410000,1504000,1598000,1692000,1786000,1880000,1974000,2068000,2162000,2256000], commission:0.25 },
          "full-breaks":       { name:"フルカスタマイズ Breaks",          type:"grandline-fixed", priceTable:[0,125000,250000,375000,500000,625000,750000,875000,1000000,1125000,1250000,1375000,1500000,1625000,1750000,1875000,2000000,2125000,2250000,2375000,2500000,2625000,2750000,2875000,3000000], commission:0.25 },
          "full-breaks-air":   { name:"フルカスタマイズ Breaks Air",     type:"grandline-fixed", priceTable:[0,139000,278000,417000,556000,695000,834000,973000,1112000,1251000,1390000,1529000,1668000,1807000,1946000,2085000,2224000,2363000,2502000,2641000,2780000,2919000,3058000,3197000,3336000], commission:0.25 },
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
          "ge15":    { name:"GE15 General English 15h/週",         type:"group", prices:[7750,6750,6750,6300,6000,5700], brackets:[1,2,4,7,13,25], extraPerWeek:5700, commission:0.20 },
          "ge25":    { name:"GE25 General English 25h/週",         type:"group", prices:[12250,11250,11250,10500,10000,9500], brackets:[1,2,4,7,13,25], extraPerWeek:9500, commission:0.20 },
          "be25":    { name:"BE25 Business English 25h/週",        type:"group", prices:[12250,11250,11250,10500,10000,9500], brackets:[1,2,4,7,13,25], extraPerWeek:9500, commission:0.20 },
          "ibe25":   { name:"IBE25 Intensive Business 25h/週",     type:"group", prices:[28000,26250,25500,25200,25000,24800], brackets:[1,2,4,7,13,25], extraPerWeek:24800, commission:0.20 },
          "ex25":    { name:"EX25 Exam Prep 25h/週",               type:"group", prices:[22750,21250,20750,20300,20000,19700], brackets:[1,2,4,7,13,25], extraPerWeek:19700, commission:0.20 },
          "mix25":   { name:"MIX25 Mixed Course 25h/週",           type:"group", prices:[21250,19750,19250,18800,18500,18200], brackets:[1,2,4,7,13,25], extraPerWeek:18200, commission:0.20 },
          "ielts-victory": { name:"IELTS Victory 18,000THB/週",   type:"group", prices:[18000], brackets:[1], extraPerWeek:18000, commission:0.20 },
          "1to1":    { name:"Private General English 1:1",         type:"1to1",  pricePerHour:1350, commission:0.20 },
        },
        accom: {
          "none":           { name:"なし（別途手配）", low:0, peak:0 },
          "mona-studio":    { name:"Mona Suite Studio（週）",         low:9100,  peak:9100,  placementFee:3000 },
          "mona-1br":       { name:"Mona Suite 1BR Deluxe（週）",     low:10500, peak:10500, placementFee:3000 },
          "mona-2br":       { name:"Mona Suite 2BR Deluxe（週）",     low:21000, peak:21000, placementFee:3000 },
        },
        airports: {}
      }
    }
  },

  // ── LSI Portsmouth ──────────────────────────────────────
  lsi_portsmouth: {
    name: "LSI Portsmouth (IH Portsmouth)",
    currency: "GBP",
    campuses: {
      "portsmouth": {
        name: "Portsmouth", country: "UK", regFee: 80, peakSupp: 20,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:6, fee:40},{maxWeeks:999, fee:60}] },
        peakStart: "06-01", peakEnd: "08-29",
        courses: {
          "ge-ft":        { name:"Full-time General English",                    type:"group", prices:[335,325,315,305], brackets:[1,5,12,22], extraPerWeek:305, commission:0.20 },
          "ielts":        { name:"IELTS Preparation",                            type:"group", prices:[335,325,315,305], brackets:[1,5,12,22], extraPerWeek:305, commission:0.20 },
          "ge-summer":    { name:"Summer GE / IELTS (6/1〜8/28)",               type:"group", prices:[355,345,335,325], brackets:[1,5,12,22], extraPerWeek:325, commission:0.20 },
          "ge-business":  { name:"GE + Business Communication",                 type:"group", prices:[695], brackets:[1], extraPerWeek:695, commission:0.20 },
          "ge-light":     { name:"General English Light (AM only)",             type:"group", prices:[185], brackets:[1], extraPerWeek:185, commission:0.20 },
          "30plus-core":  { name:"30+ General English Core",                    type:"group", prices:[430], brackets:[1], extraPerWeek:430, commission:0.20 },
          "30plus-int":   { name:"30+ GE Core + Intensive",                     type:"group", prices:[795], brackets:[1], extraPerWeek:795, commission:0.20 },
          "30plus-biz":   { name:"30+ GE Core + Business Communication",        type:"group", prices:[995], brackets:[1], extraPerWeek:995, commission:0.20 },
          "exec-combo-25":{ name:"Executive Combination 25h/週",                type:"group", prices:[1450], brackets:[1], extraPerWeek:1450, commission:0.20 },
          "exec-combo-30":{ name:"Executive Combination Plus 30h/週",           type:"group", prices:[1950], brackets:[1], extraPerWeek:1950, commission:0.20 },
          "allday-1to1-25":{ name:"All-day 1:1 Intensive 25h/週",              type:"group", prices:[1950], brackets:[1], extraPerWeek:1950, commission:0.20 },
          "golf-g1":      { name:"English + Golf G1 (4/13〜9/25)",             type:"group", prices:[2630], brackets:[1], extraPerWeek:2630, commission:0.20 },
          "celta":        { name:"CELTA (4週固定)",                             type:"group", prices:[1720], brackets:[1], fixedWeeks:4, commission:0.20 },
          "1to1":         { name:"One-to-one lesson (£78/h)",                  type:"1to1",  pricePerHour:78, commission:0.20 },
        },
        accom: {
          "none":          { name:"なし", low:0, peak:0 },
          "homestay-std":  { name:"Homestay Standard（非夏期£190・夏期£200）", low:190, peak:200 },
          "homestay-exec": { name:"Homestay Executive £300",                   low:300, peak:300 },
          "self-catering": { name:"Self-catering Residence £295",              low:295, peak:295, placementFee:100 },
        },
        airports: {
          "Heathrow / Gatwick Arrival £170":   170,
          "Heathrow / Gatwick Departure £140":  140,
          "Southampton Arrival £100":           100,
          "Southampton Departure £90":           90,
        }
      }
    }
  },

  // ── UCI Division of Continuing Education ────────────────
  uci_dce: {
    name: "UCI Division of Continuing Education",
    currency: "USD",
    campuses: {
      "irvine": {
        name: "Irvine", country: "USA", regFee: 200, peakSupp: 0,
        courses: {
          // ACP（Accelerated Certificate Programs）12週間固定
          "acp-business":    { name:"ACP Business Administration",                  type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-creativity":  { name:"ACP Creativity & Product Development",         type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-data-biz":    { name:"ACP Data Analytics for Business",              type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-data-sci":    { name:"ACP Data Science",                             type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-digital-mkt": { name:"ACP Digital Marketing & Communications",       type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-innovation":  { name:"ACP Innovation Management & Entrepreneurship", type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-intl-biz":    { name:"ACP International Business Operations",        type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-intl-finance":{ name:"ACP International Finance",                    type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-pm":          { name:"ACP Project Management",                       type:"group", prices:[7900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          "acp-internship":  { name:"ACP Internship Experience",                    type:"group", prices:[2900],  brackets:[1], fixedWeeks:12, commission:0.20 },
          // ASAP（Academic Study Abroad Program）
          "asap-gen-3m":     { name:"ASAP General Track 3ヶ月",                     type:"group", prices:[8200],  brackets:[1], fixedWeeks:13, commission:0.20 },
          "asap-gen-6m":     { name:"ASAP General Track 6ヶ月",                     type:"group", prices:[16400], brackets:[1], fixedWeeks:26, commission:0.20 },
          "asap-gen-9m":     { name:"ASAP General Track 9ヶ月",                     type:"group", prices:[24600], brackets:[1], fixedWeeks:39, commission:0.20 },
          "asap-csl-6m":     { name:"ASAP CSL Track 6ヶ月",                         type:"group", prices:[15500], brackets:[1], fixedWeeks:26, commission:0.20 },
          "asap-csl-9m":     { name:"ASAP CSL Track 9ヶ月",                         type:"group", prices:[22500], brackets:[1], fixedWeeks:39, commission:0.20 },
          "asap-spec-3m":    { name:"ASAP Specialized Track 3ヶ月",                 type:"group", prices:[11000], brackets:[1], fixedWeeks:13, commission:0.20 },
          "asap-spec-6m":    { name:"ASAP Specialized Track 6ヶ月",                 type:"group", prices:[22000], brackets:[1], fixedWeeks:26, commission:0.20 },
          "asap-spec-9m":    { name:"ASAP Specialized Track 9ヶ月",                 type:"group", prices:[33000], brackets:[1], fixedWeeks:39, commission:0.20 },
          // STAR Programs
          "star-ug-9m":      { name:"Undergrad STAR Program 9ヶ月",                 type:"group", prices:[35000], brackets:[1], fixedWeeks:39, commission:0.20 },
          "star-grad-6m":    { name:"Grad STAR General Track 6ヶ月",                type:"group", prices:[24000], brackets:[1], fixedWeeks:26, commission:0.20 },
          "star-grad-9m":    { name:"Grad STAR General Track 9ヶ月",                type:"group", prices:[29800], brackets:[1], fixedWeeks:39, commission:0.20 },
          "star-grad-31-9m": { name:"Grad STAR 3+1 Access Track 9ヶ月",             type:"group", prices:[32050], brackets:[1], fixedWeeks:39, commission:0.20 },
          // ISP（Individualized Study Program）
          "isp-2wk":         { name:"ISP 2週間セッション",                          type:"group", prices:[1095],  brackets:[1], fixedWeeks:2,  commission:0.20 },
          "isp-4wk":         { name:"ISP 4週間セッション",                          type:"group", prices:[2190],  brackets:[1], fixedWeeks:4,  commission:0.20 },
          "isp-6wk":         { name:"ISP 6週間セッション",                          type:"group", prices:[3285],  brackets:[1], fixedWeeks:6,  commission:0.20 },
        },
        accom: {
          "none":     { name:"なし",                                               low:0,   peak:0 },
          // USH Homestay（$57/日×7日）
          "ush-bd":   { name:"USH Homestay 朝夕食付 ($57/日)",                     low:399, peak:399, placementFee:300 },
          "ush-cb":   { name:"USH Homestay 朝食のみ ($47/日)",                     low:329, peak:329, placementFee:300 },
          "ush-room": { name:"USH Homestay Room Only ($43/日)",                   low:301, peak:301, placementFee:300 },
        },
        airports: {
          "LAX（片道）": 75,
          "John Wayne SNA（片道）": 45,
        }
      }
    }
  },

  // ── USH (Universal Student Housing) ─────────────────────
  // 宿泊専用エントリ（コースなし・地域ごとにキャンパスを設定）
  // 日額×7日で週単価に換算
  ush: {
    name: "USH (Universal Student Housing)",
    currency: "USD",
    campuses: {
      "socal-la": {
        name: "Southern CA - LA/Irvine/Orange County", country: "USA",
        regFee: 300, peakSupp: 0,
        courses: {},
        accom: {
          "none":      { name:"なし", low:0, peak:0 },
          "2meals":    { name:"2 Meals/Day 朝夕食付 ($57/日 = $399/週)", low:399, peak:399 },
          "breakfast": { name:"Continental Breakfast 朝食付 ($47/日 = $329/週)", low:329, peak:329 },
          "room":      { name:"Room Only ($43/日 = $301/週)", low:301, peak:301 },
        },
        airports: {}
      },
      "socal-sd": {
        name: "Southern CA - San Diego", country: "USA",
        regFee: 300, peakSupp: 0,
        courses: {},
        accom: {
          "none":      { name:"なし", low:0, peak:0 },
          "2meals":    { name:"2 Meals/Day 朝夕食付 ($48/日 = $336/週)", low:336, peak:336 },
          "breakfast": { name:"Continental Breakfast 朝食付 ($43/日 = $301/週)", low:301, peak:301 },
          "room":      { name:"Room Only ($41/日 = $287/週)", low:287, peak:287 },
        },
        airports: {}
      },
      "norcal": {
        name: "Northern CA - SF/San Jose/Bay Area", country: "USA",
        regFee: 300, peakSupp: 0,
        courses: {},
        accom: {
          "none":      { name:"なし", low:0, peak:0 },
          "2meals":    { name:"2 Meals/Day 朝夕食付 ($56/日 = $392/週)", low:392, peak:392 },
          "breakfast": { name:"Continental Breakfast 朝食付 ($50/日 = $350/週)", low:350, peak:350 },
          "room":      { name:"Room Only ($45/日 = $315/週)", low:315, peak:315 },
        },
        airports: {}
      },
      "arizona": {
        name: "Arizona - Phoenix/Tempe (ASU周辺)", country: "USA",
        regFee: 230, peakSupp: 0,
        courses: {},
        accom: {
          "none":      { name:"なし", low:0, peak:0 },
          "2meals":    { name:"2 Meals/Day 朝夕食付 ($37/日 = $259/週)", low:259, peak:259 },
          "breakfast": { name:"Continental Breakfast 朝食付 ($33/日 = $231/週)", low:231, peak:231 },
          "room":      { name:"Room Only ($29/日 = $203/週)", low:203, peak:203 },
        },
        airports: {}
      },
      "florida": {
        name: "Florida - Miami/Coral Gables", country: "USA",
        regFee: 300, peakSupp: 0,
        courses: {},
        accom: {
          "none":      { name:"なし", low:0, peak:0 },
          "2meals":    { name:"2 Meals/Day 朝夕食付 ($46/日 = $322/週)", low:322, peak:322 },
          "breakfast": { name:"Continental Breakfast 朝食付 ($42/日 = $294/週)", low:294, peak:294 },
          "room":      { name:"Room Only ($36/日 = $252/週)", low:252, peak:252 },
        },
        airports: {}
      },
      "new-york": {
        name: "New York - NYC Metro Area", country: "USA",
        regFee: 300, peakSupp: 0,
        courses: {},
        accom: {
          "none":      { name:"なし", low:0, peak:0 },
          "2meals":    { name:"2 Meals/Day 朝夕食付 ($68/日 = $476/週)", low:476, peak:476 },
          "breakfast": { name:"Continental Breakfast 朝食付 ($61/日 = $427/週)", low:427, peak:427 },
          "room":      { name:"Room Only ($58/日 = $406/週)", low:406, peak:406 },
        },
        airports: {}
      },
    }
  },

  // ── ILSC Australia（2026年 全料金AUD・登録受付 Jan 1 – Dec 31, 2026）──
  ilsc_australia: {
    name: "ILSC Australia",
    currency: "AUD",
    campuses: {
      "adelaide": {
        name: "Adelaide", country: "Australia", regFee: 250, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "ft-am":   { name:"Full-Time Morning FT AM (24L・20h/週) GE/EAP/IELTS/Business等", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"登録費$250(非返金)。General English/EAP/IELTS/Cambridge Open/UPP/Business English/Café Work Skills/English Through AI等はこのFT AM授業料を適用。18歳未満はUnderage Service Fee $175別途。COE管理・再発行$30/COE。" },
          "ft-pm":   { name:"Full-Time Evening FT PM (24L・20h/週 17:30-21:30)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "pt-am":   { name:"Part-Time Morning PT AM (14.5L・12h/週 月-水)", type:"group", prices:[400], brackets:[1], extraPerWeek:400, commission:0.25 },
          "pt-pm":   { name:"Part-Time Evening PT PM (14.5L・12h/週 月-水)", type:"group", prices:[370], brackets:[1], extraPerWeek:370, commission:0.25 },
          "cambridge-mastery": { name:"Cambridge B2 First / C1 Advanced Mastery (FT AM・10-12週)", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"試験料$400別途（B2 First / C1 Advanced各$400）。他プログラムからの切替はCambridge Transfer Materials Fee $120。授業料は到着後支払い・非返金。" },
          "tutoring-private": { name:"Tutoring Private (個人レッスン・2週〜)", type:"1to1", pricePerHour:120, commission:0.25 },
          "tutoring-semi":    { name:"Tutoring Semi-Private (1人あたり・2週〜)", type:"1to1", pricePerHour:70, commission:0.25 },
        },
        accom: {
          "none":         { name:"なし", low:0, peak:0 },
          "homestay-18":  { name:"Homestay Half board・昼食なし (18+) ※4週(28日)〜", low:385, peak:385, placementFee:370, halfBoard:true },
          "homestay-u18": { name:"Homestay Half board・昼食なし (U18) ※4週〜・特別食+$70/週", low:410, peak:410, placementFee:370, halfBoard:true },
        },
        airports: { "空港送迎（片道）":200 }
      },
      "brisbane": {
        name: "Brisbane", country: "Australia", regFee: 250, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "ft-am":   { name:"Full-Time Morning FT AM (24L・20h/週) GE/EAP/IELTS/Business等", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"登録費$250(非返金)。General English/EAP/IELTS/Cambridge Open/UPP/Business English/Café Work Skills/English Through AI等はこのFT AM授業料を適用。18歳未満はUnderage Service Fee $175別途。COE管理・再発行$30/COE。" },
          "ft-aft":  { name:"Full-Time Afternoon FT AFT (24L・20h/週 13:15-17:15)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "ft-pm":   { name:"Full-Time Evening FT PM (24L・20h/週 17:30-21:30)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "pt-am":   { name:"Part-Time Morning PT AM (14.5L・12h/週 月-水)", type:"group", prices:[400], brackets:[1], extraPerWeek:400, commission:0.25 },
          "pt-pm":   { name:"Part-Time Evening PT PM (14.5L・12h/週 月-水)", type:"group", prices:[370], brackets:[1], extraPerWeek:370, commission:0.25 },
          "cambridge-mastery": { name:"Cambridge B2 First / C1 Advanced Mastery (FT AM・10-12週)", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"試験料$400別途（B2 First / C1 Advanced各$400）。他プログラムからの切替はCambridge Transfer Materials Fee $120。授業料は到着後支払い・非返金。" },
          "tutoring-private": { name:"Tutoring Private (個人レッスン・2週〜)", type:"1to1", pricePerHour:120, commission:0.25 },
          "tutoring-semi":    { name:"Tutoring Semi-Private (1人あたり・2週〜)", type:"1to1", pricePerHour:70, commission:0.25 },
        },
        accom: {
          "none":         { name:"なし", low:0, peak:0 },
          "homestay-18":  { name:"Homestay Half board・昼食なし (18+) ※4週(28日)〜", low:395, peak:395, placementFee:370, halfBoard:true },
          "homestay-u18": { name:"Homestay Half board・昼食なし (U18) ※4週〜・特別食+$70/週", low:420, peak:420, placementFee:370, halfBoard:true },
          "res-cbd-single": { name:"5-Bedroom CBD Single 相部屋バス By Student One（24-51週$470/52週$430）", low:550, peak:550, placementFee:370 },
          "res-twin": { name:"Twin Shared Apartment 相部屋バス By Student One（24-51週$375/52週$340）", low:405, peak:405, placementFee:370 },
        },
        airports: { "空港送迎（片道）":200 }
      },
      "melbourne": {
        name: "Melbourne", country: "Australia", regFee: 250, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "ft-am":   { name:"Full-Time Morning FT AM (24L・20h/週) GE/EAP/IELTS/Business等", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"登録費$250(非返金)。General English/EAP/IELTS/Cambridge Open/UPP/Business English/Café Work Skills/English Through AI等はこのFT AM授業料を適用。18歳未満はUnderage Service Fee $175別途。COE管理・再発行$30/COE。" },
          "ft-aft":  { name:"Full-Time Afternoon FT AFT (24L・20h/週 13:15-17:15)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "ft-pm":   { name:"Full-Time Evening FT PM (24L・20h/週 17:30-21:30)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "pt-am":   { name:"Part-Time Morning PT AM (14.5L・12h/週 月-水)", type:"group", prices:[400], brackets:[1], extraPerWeek:400, commission:0.25 },
          "pt-pm":   { name:"Part-Time Evening PT PM (14.5L・12h/週 月-水)", type:"group", prices:[370], brackets:[1], extraPerWeek:370, commission:0.25 },
          "cambridge-mastery": { name:"Cambridge B2 First / C1 Advanced Mastery (FT AM・10-12週)", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"試験料$400別途（B2 First / C1 Advanced各$400）。他プログラムからの切替はCambridge Transfer Materials Fee $120。授業料は到着後支払い・非返金。" },
          "tutoring-private": { name:"Tutoring Private (個人レッスン・2週〜)", type:"1to1", pricePerHour:120, commission:0.25 },
          "tutoring-semi":    { name:"Tutoring Semi-Private (1人あたり・2週〜)", type:"1to1", pricePerHour:70, commission:0.25 },
        },
        accom: {
          "none":         { name:"なし", low:0, peak:0 },
          "homestay-18":  { name:"Homestay Half board・昼食なし (18+) ※4週(28日)〜", low:395, peak:395, placementFee:370, halfBoard:true },
          "homestay-u18": { name:"Homestay Half board・昼食なし (U18) ※4週〜・特別食+$70/週", low:420, peak:420, placementFee:370, halfBoard:true },
          "res-studio": { name:"Studio Single ensuite By Campus Melbourne（24-51週$460/52週$385）", low:495, peak:495, placementFee:370 },
          "res-iglu-cbd": { name:"6-Bedroom CBD Single ensuite By Iglu（24-51週$570/52週$540）", low:615, peak:615, placementFee:370 },
          "res-carlton-en": { name:"6-Bedroom Carlton Single ensuite By Scape（24-51週$560/52週$535）", low:610, peak:610, placementFee:370 },
          "res-carlton-sh": { name:"6-Bedroom Carlton Single 相部屋バス By Scape（24-51週$520/52週$480）", low:570, peak:570, placementFee:370 },
        },
        airports: { "空港送迎（片道）":200 }
      },
      "perth": {
        name: "Perth", country: "Australia", regFee: 250, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "ft-am":   { name:"Full-Time Morning FT AM (24L・20h/週) GE/EAP/IELTS/Business等", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"登録費$250(非返金)。General English/EAP/IELTS/Cambridge Open/UPP/Business English/Café Work Skills/English Through AI等はこのFT AM授業料を適用。18歳未満はUnderage Service Fee $175別途。COE管理・再発行$30/COE。" },
          "ft-pm":   { name:"Full-Time Evening FT PM (24L・20h/週 17:30-21:30)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "pt-am":   { name:"Part-Time Morning PT AM (14.5L・12h/週 月-水)", type:"group", prices:[400], brackets:[1], extraPerWeek:400, commission:0.25 },
          "pt-pm":   { name:"Part-Time Evening PT PM (14.5L・12h/週 月-水)", type:"group", prices:[370], brackets:[1], extraPerWeek:370, commission:0.25 },
          "cambridge-mastery": { name:"Cambridge B2 First / C1 Advanced Mastery (FT AM・10-12週)", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"試験料$400別途（B2 First / C1 Advanced各$400）。他プログラムからの切替はCambridge Transfer Materials Fee $120。授業料は到着後支払い・非返金。" },
          "tutoring-private": { name:"Tutoring Private (個人レッスン・2週〜)", type:"1to1", pricePerHour:120, commission:0.25 },
          "tutoring-semi":    { name:"Tutoring Semi-Private (1人あたり・2週〜)", type:"1to1", pricePerHour:70, commission:0.25 },
        },
        accom: {
          "none":         { name:"なし", low:0, peak:0 },
          "homestay-18":  { name:"Homestay Half board・昼食なし (18+) ※4週(28日)〜", low:385, peak:385, placementFee:370, halfBoard:true },
          "homestay-u18": { name:"Homestay Half board・昼食なし (U18) ※4週〜・特別食+$70/週", low:410, peak:410, placementFee:370, halfBoard:true },
          "res-4bed": { name:"4-Bed Shared Apartment 相部屋バス By Campus Perth（24-51週$300/52週$295）", low:330, peak:330, placementFee:370 },
        },
        airports: { "空港送迎（片道）":200 }
      },
      "sydney": {
        name: "Sydney", country: "Australia", regFee: 250, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "ft-am":   { name:"Full-Time Morning FT AM (24L・20h/週) GE/EAP/IELTS/Business等", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"登録費$250(非返金)。General English/EAP/IELTS/Cambridge Open/UPP/Business English/Café Work Skills/English Through AI等はこのFT AM授業料を適用。18歳未満はUnderage Service Fee $175別途。COE管理・再発行$30/COE。" },
          "ft-aft":  { name:"Full-Time Afternoon FT AFT (24L・20h/週 13:15-17:15)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "ft-pm":   { name:"Full-Time Evening FT PM (24L・20h/週 17:30-21:30)", type:"group", prices:[380], brackets:[1], extraPerWeek:380, commission:0.25 },
          "pt-am":   { name:"Part-Time Morning PT AM (14.5L・12h/週 月-水)", type:"group", prices:[400], brackets:[1], extraPerWeek:400, commission:0.25 },
          "pt-pm":   { name:"Part-Time Evening PT PM (14.5L・12h/週 月-水)", type:"group", prices:[370], brackets:[1], extraPerWeek:370, commission:0.25 },
          "cambridge-mastery": { name:"Cambridge B2 First / C1 Advanced Mastery (FT AM・10-12週)", type:"group", prices:[460,440,420], brackets:[1,12,24], extraPerWeek:420, commission:0.25, note:"試験料$400別途（B2 First / C1 Advanced各$400）。他プログラムからの切替はCambridge Transfer Materials Fee $120。授業料は到着後支払い・非返金。" },
          "tutoring-private": { name:"Tutoring Private (個人レッスン・2週〜)", type:"1to1", pricePerHour:120, commission:0.25 },
          "tutoring-semi":    { name:"Tutoring Semi-Private (1人あたり・2週〜)", type:"1to1", pricePerHour:70, commission:0.25 },
        },
        accom: {
          "none":         { name:"なし", low:0, peak:0 },
          "homestay-18":  { name:"Homestay Half board・昼食なし (18+) ※4週(28日)〜", low:415, peak:415, placementFee:370, halfBoard:true },
          "homestay-u18": { name:"Homestay Half board・昼食なし (U18) ※4週〜・特別食+$70/週", low:440, peak:440, placementFee:370, halfBoard:true },
          "res-chatswood": { name:"5-Bedroom Chatswood Single ensuite By Iglu（24-51週$670/52週$605）", low:690, peak:690, placementFee:370 },
          "res-twin-scape": { name:"Large Twin Shared Apartment Sydney Central 相部屋バス By Scape（24-51週$535/52週$495）", low:570, peak:570, placementFee:370 },
        },
        airports: { "空港送迎（片道）":200 }
      },
    }
  },

  // ── ILSC Canada（2026年 全料金CAD）──
  // 宿泊ハイシーズン: 5/16夜〜9/6夜（レジデンスは夏期+$40/週をpeakに反映）
  // ホームステイの表ヘッダはMay 31-Aug 31表記だが脚注はMay 16-Sep 6（要確認）
  ilsc_canada: {
    name: "ILSC Canada",
    currency: "CAD",
    campuses: {
      "montreal": {
        name: "Montréal", country: "Canada", regFee: 220, peakSupp: 0,
        peakStart: "05-16", peakEnd: "09-06",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "fti":   { name:"Full-Time Intensive FTI (30L/週)（Montréalは英語/フランス語選択可）", type:"group", prices:[470,450,440,430], brackets:[1,12,24,36], extraPerWeek:430, commission:0.25, note:"登録費$220(非返金)。GE/EAP/IELTS Open/UPP/Business English Mastery/Volunteer Experience(+サービス料$825)/Medical English等はこの週額授業料を適用。" },
          "ft-am": { name:"Full-Time Morning FT AM (24L/週)", type:"group", prices:[420,400,390,380], brackets:[1,12,24,36], extraPerWeek:380, commission:0.25 },
          "ft-aft":{ name:"Full-Time Afternoon FT AFT (24L/週)", type:"group", prices:[350], brackets:[1], extraPerWeek:350, commission:0.25 },
          "pt-am": { name:"Part-Time Morning PT AM (17L/週)", type:"group", prices:[315], brackets:[1], extraPerWeek:315, commission:0.25 },
          "pt-aft":{ name:"Part-Time Afternoon PT AFT (15L/週 月-水)", type:"group", prices:[200], brackets:[1], extraPerWeek:200, commission:0.25 },
          "hs-fasttrack":  { name:"ILSC High School: Fast Track to Higher Education (32週固定)", type:"group", prices:[14190], brackets:[1], fixedWeeks:32, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450（通常教材費と別体系・アプリ側の適用要確認）" },
          "hs-foundation": { name:"ILSC High School: Foundation Year (40週固定)", type:"group", prices:[18500], brackets:[1], fixedWeeks:40, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450" },
        },
        accom: {
          "none":            { name:"なし", low:0, peak:0 },
          "homestay-fb-18":  { name:"Homestay Full board 3食 (18+) ※13歳〜", low:350, peak:390, placementFee:250, halfBoard:true },
          "homestay-hb-18":  { name:"Homestay Half board 2食・昼食なし (18+)", low:325, peak:365, placementFee:250, halfBoard:true },
          "homestay-fb-u18": { name:"Homestay Full board 3食 (U18)", low:370, peak:410, placementFee:250, halfBoard:true },
          "homestay-hb-u18": { name:"Homestay Half board 2食 (U18)", low:340, peak:385, placementFee:250, halfBoard:true },
          "res-lamarq": { name:"La Marq Single room・相部屋バス（25週〜$440）", low:460, peak:500, placementFee:250 },
        },
        airports: { "空港送迎（片道）":135, "空港送迎（往復）":270 }
      },
      "toronto": {
        name: "Toronto", country: "Canada", regFee: 220, peakSupp: 0,
        peakStart: "05-16", peakEnd: "09-06",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "fti":   { name:"Full-Time Intensive FTI (30L/週)", type:"group", prices:[480,460,450,440], brackets:[1,12,24,36], extraPerWeek:440, commission:0.25, note:"登録費$220(非返金)。GE/EAP/IELTS Open/UPP/Business English Mastery/Volunteer Experience(+サービス料$825)/Medical English等はこの週額授業料を適用。" },
          "ft-am": { name:"Full-Time Morning FT AM (24L/週)", type:"group", prices:[430,410,400,390], brackets:[1,12,24,36], extraPerWeek:390, commission:0.25 },
          "ft-aft":{ name:"Full-Time Afternoon FT AFT (24L/週)", type:"group", prices:[360], brackets:[1], extraPerWeek:360, commission:0.25 },
          "pt-am": { name:"Part-Time Morning PT AM (17L/週)", type:"group", prices:[325], brackets:[1], extraPerWeek:325, commission:0.25 },
          "pt-aft":{ name:"Part-Time Afternoon PT AFT (15L/週 月-水)", type:"group", prices:[210], brackets:[1], extraPerWeek:210, commission:0.25 },
          "hs-fasttrack":  { name:"ILSC High School: Fast Track to Higher Education (32週固定)", type:"group", prices:[14190], brackets:[1], fixedWeeks:32, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450。学生ビザ申請者はPAL発行前に$750（Allocation $550＋登録費$200・非返金）が必要。" },
          "hs-foundation": { name:"ILSC High School: Foundation Year (40週固定)", type:"group", prices:[18500], brackets:[1], fixedWeeks:40, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450" },
        },
        accom: {
          "none":            { name:"なし", low:0, peak:0 },
          "homestay-fb-18":  { name:"Homestay Full board 3食 (18+) ※13歳〜", low:350, peak:390, placementFee:250, halfBoard:true },
          "homestay-hb-18":  { name:"Homestay Half board 2食・昼食なし (18+)", low:325, peak:365, placementFee:250, halfBoard:true },
          "homestay-fb-u18": { name:"Homestay Full board 3食 (U18)", low:370, peak:410, placementFee:250, halfBoard:true },
          "homestay-hb-u18": { name:"Homestay Half board 2食 (U18)", low:340, peak:385, placementFee:250, halfBoard:true },
          "res-harrington": { name:"Harrington Housing Single・相部屋バス（25週〜$430）", low:450, peak:490, placementFee:250 },
          "res-maddox": { name:"Maddox Sherbourne Single・相部屋バス（25週〜$445）", low:465, peak:505, placementFee:250 },
          "res-replin-sh": { name:"Replin Co-Living 女性専用 Single 相部屋バス（25週〜$385）", low:405, peak:445, placementFee:250 },
          "res-replin-lower": { name:"Replin Co-Living 女性専用 Single Lower ensuite（25週〜$435）", low:455, peak:495, placementFee:250 },
          "res-replin-upper": { name:"Replin Co-Living 女性専用 Single Upper ensuite（25週〜$480）", low:500, peak:540, placementFee:250 },
          "res-elm-shared": { name:"The Elm & The Ledbury Shared Room 相部屋バス（25週〜$380）", low:400, peak:440, placementFee:250 },
          "res-elm-flex": { name:"The Elm & The Ledbury Premium Single Flex 相部屋バス（25週〜$475）", low:495, peak:535, placementFee:250 },
          "res-elm-single": { name:"The Elm & The Ledbury Single 相部屋バス（25週〜$520）", low:540, peak:580, placementFee:250 },
          "res-elm-private": { name:"The Elm & The Ledbury Single 専用バス（25週〜$595）", low:615, peak:655, placementFee:250 },
          "res-parker-shared": { name:"The Parker Shared Room 相部屋バス（25週〜$365）", low:385, peak:425, placementFee:250 },
          "res-parker-flex": { name:"The Parker Premium Single Flex 相部屋バス（25週〜$460）", low:480, peak:520, placementFee:250 },
          "res-parker-single": { name:"The Parker Single 相部屋バス（25週〜$505）", low:525, peak:565, placementFee:250 },
          "res-parker-private": { name:"The Parker Single 専用バス（25週〜$575）", low:595, peak:635, placementFee:250 },
        },
        airports: { "空港送迎（片道）":135, "空港送迎（往復）":270 }
      },
      "vancouver": {
        name: "Vancouver", country: "Canada", regFee: 220, peakSupp: 0,
        peakStart: "05-16", peakEnd: "09-06",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:999, fee:450}] },
        courses: {
          "fti":   { name:"Full-Time Intensive FTI (30L/週)", type:"group", prices:[480,460,450,440], brackets:[1,12,24,36], extraPerWeek:440, commission:0.25, note:"登録費$220(非返金)。GE/EAP/IELTS Open/UPP/Business English Mastery/Volunteer Experience(+サービス料$825)/Medical English等はこの週額授業料を適用。" },
          "ft-am": { name:"Full-Time Morning FT AM (24L/週)", type:"group", prices:[430,410,400,390], brackets:[1,12,24,36], extraPerWeek:390, commission:0.25 },
          "ft-aft":{ name:"Full-Time Afternoon FT AFT (24L/週)", type:"group", prices:[360], brackets:[1], extraPerWeek:360, commission:0.25 },
          "pt-am": { name:"Part-Time Morning PT AM (17L/週)", type:"group", prices:[325], brackets:[1], extraPerWeek:325, commission:0.25 },
          "pt-aft":{ name:"Part-Time Afternoon PT AFT (15L/週 月-水)", type:"group", prices:[210], brackets:[1], extraPerWeek:210, commission:0.25 },
          "hs-fasttrack":  { name:"ILSC High School: Fast Track to Higher Education (32週固定)", type:"group", prices:[14190], brackets:[1], fixedWeeks:32, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450。学生ビザ申請者はPAL発行前に$750（Allocation $550＋登録費$200・非返金）が必要。" },
          "hs-foundation": { name:"ILSC High School: Foundation Year (40週固定)", type:"group", prices:[18500], brackets:[1], fixedWeeks:40, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450" },
        },
        accom: {
          "none":            { name:"なし", low:0, peak:0 },
          "homestay-fb-18":  { name:"Homestay Full board 3食 (18+) ※13歳〜", low:350, peak:390, placementFee:250, halfBoard:true },
          "homestay-hb-18":  { name:"Homestay Half board 2食・昼食なし (18+)", low:325, peak:365, placementFee:250, halfBoard:true },
          "homestay-fb-u18": { name:"Homestay Full board 3食 (U18)", low:370, peak:410, placementFee:250, halfBoard:true },
          "homestay-hb-u18": { name:"Homestay Half board 2食 (U18)", low:340, peak:385, placementFee:250, halfBoard:true },
          "res-apt-studio": { name:"APT Living Private Studio 専用バス（25週〜$550）", low:570, peak:610, placementFee:250 },
          "res-marzena-shared": { name:"Marzena Co-Living Shared room 相部屋バス（25週〜$280）", low:300, peak:340, placementFee:250 },
          "res-marzena-single": { name:"Marzena Co-Living Single room 相部屋バス（25週〜$435）", low:455, peak:495, placementFee:250 },
          "res-meadown-shared": { name:"Meadown Co-Living 女性専用 Shared room（25週〜$280）", low:300, peak:340, placementFee:250 },
          "res-meadown-single": { name:"Meadown Co-Living 女性専用 Single room（25週〜$435）", low:455, peak:495, placementFee:250 },
          "res-meadown-ensuite": { name:"Meadown Co-Living 女性専用 Single ensuite（25週〜$485）", low:505, peak:545, placementFee:250 },
          "res-grand-shared": { name:"Grand House Co-Living Shared room（25週〜$280）", low:300, peak:340, placementFee:250 },
          "res-grand-single": { name:"Grand House Co-Living Single room（25週〜$435）", low:455, peak:495, placementFee:250 },
          "res-grand-ensuite": { name:"Grand House Co-Living Single ensuite（25週〜$485）", low:505, peak:545, placementFee:250 },
          "res-gateway-shared": { name:"Gateway Shared room・相部屋バス（25週〜$415）", low:435, peak:475, placementFee:250 },
          "res-gateway-single": { name:"Gateway Single room・相部屋バス（25週〜$615）", low:635, peak:675, placementFee:250 },
        },
        airports: { "空港送迎（片道）":135, "空港送迎（往復）":270 }
      }
    }
  },

  // ── ILSC Dublin（2026年 全料金EUR）──
  ilsc_dublin: {
    name: "ILSC Dublin",
    currency: "EUR",
    campuses: {
      "dublin": {
        name: "Dublin", country: "Ireland", regFee: 75, peakSupp: 0,
        peakStart: "06-15", peakEnd: "08-31",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:4, fee:20},{maxWeeks:5, fee:25},{maxWeeks:6, fee:30},{maxWeeks:7, fee:35},{maxWeeks:8, fee:40},{maxWeeks:9, fee:45},{maxWeeks:10, fee:50},{maxWeeks:11, fee:55},{maxWeeks:12, fee:60},{maxWeeks:13, fee:65},{maxWeeks:14, fee:70},{maxWeeks:15, fee:75},{maxWeeks:16, fee:80},{maxWeeks:17, fee:85},{maxWeeks:18, fee:90},{maxWeeks:19, fee:95},{maxWeeks:20, fee:100},{maxWeeks:21, fee:105},{maxWeeks:22, fee:110},{maxWeeks:23, fee:115},{maxWeeks:999, fee:120}] },
        courses: {
          "ft-am": { name:"General English Full-Time Morning FT AM (22.5L・19h/週)", type:"group", prices:[360,330,300], brackets:[1,12,24], extraPerWeek:300, commission:0.25, note:"登録費€75(非返金)。GE開始は2026/1/26以降。Learner Protection €30・TIE試験€120・非EU保険€125等別途の場合あり。" },
          "st-am": { name:"General English Standard Morning ST AM (18L・15h/週 月-木)", type:"group", prices:[300,270,240], brackets:[1,12,24], extraPerWeek:240, commission:0.25 },
          "st-aft":{ name:"General English Standard Afternoon ST AFT (18L・15h/週 月-木)", type:"group", prices:[230], brackets:[1], extraPerWeek:230, commission:0.25 },
          "sw-am": { name:"Study & Work 25週 Standard Morning + 8週休暇（パッケージ）", type:"group", prices:[6000], brackets:[1], fixedWeeks:33, commission:0.25, note:"授業料+TIE試験料込。非EU/EEA・25週以上対象。学期中週20h・休暇中週40h就労可。保険€125別途。" },
          "sw-aft":{ name:"Study & Work 25週 Standard Afternoon + 8週休暇（パッケージ）", type:"group", prices:[5750], brackets:[1], fixedWeeks:33, commission:0.25, note:"授業料+TIE試験料込。保険€125別途。" },
        },
        accom: {
          "none":          { name:"なし", low:0, peak:0 },
          "homestay-std":  { name:"Homestay Standard (18+) Single・相部屋バス Half board", low:300, peak:355, placementFee:75, halfBoard:true },
          "homestay-twin": { name:"Homestay Twin Room Half board（2人部屋）", low:250, peak:285, placementFee:75, halfBoard:true },
          "homestay-exec": { name:"Homestay Executive Single ensuite Half board", low:395, peak:430, placementFee:75, halfBoard:true },
          "res-point":     { name:"Point Campus Private Bedroom ensuite（夏期+€35/週）", low:350, peak:385, placementFee:75 },
        },
        airports: { "空港送迎（片道）":100, "Express Courier Service":70 }
      }
    }
  },

  // ── ILSC New Delhi（2026年 全料金USD）──
  ilsc_delhi: {
    name: "ILSC New Delhi",
    currency: "USD",
    campuses: {
      "new-delhi": {
        name: "New Delhi", country: "India", regFee: 75, peakSupp: 0,
        materialsFee: { type:"fixed", fee:35 },
        courses: {
          "fti":   { name:"Full-Time Intensive FTI (30L/週)", type:"group", prices:[235], brackets:[1], extraPerWeek:235, commission:0.25, note:"登録・アセスメント費$75(非返金)。Speed Post $65別途の場合あり。" },
          "ft":    { name:"Full-Time FT (24L/週)", type:"group", prices:[205], brackets:[1], extraPerWeek:205, commission:0.25 },
          "pt-am": { name:"Part-Time AM PT AM (17L/週) 英/仏/ヒンディー", type:"group", prices:[170], brackets:[1], extraPerWeek:170, commission:0.25 },
          "pt-pm": { name:"Part-Time PM PT PM (13L/週)", type:"group", prices:[145], brackets:[1], extraPerWeek:145, commission:0.25, note:"IELTS/Cambridge Open ClassはPT PM授業料+教材費$35" },
          "pt-hindi": { name:"Part-Time Hindi AM/PM+ (13L/週)", type:"group", prices:[170], brackets:[1], extraPerWeek:170, commission:0.25 },
          "yoga-2wk": { name:"Yoga Package 2週（週4日・5h）", type:"group", prices:[250], brackets:[1], fixedWeeks:2, commission:0.25 },
          "yoga-4wk": { name:"Yoga Package 4週（週4日・5h）", type:"group", prices:[400], brackets:[1], fixedWeeks:4, commission:0.25 },
          "tutor-em-2wk": { name:"Early Morning Tutoring Package 2週（週4日・5h）", type:"group", prices:[200], brackets:[1], fixedWeeks:2, commission:0.25 },
          "tutor-em-4wk": { name:"Early Morning Tutoring Package 4週（週4日・5h）", type:"group", prices:[355], brackets:[1], fixedWeeks:4, commission:0.25 },
          "tutor-private": { name:"Tutoring Private（英/仏/西/ヒンディー・最低8h/週）", type:"1to1", pricePerHour:35, commission:0.25 },
          "tutor-mini":    { name:"Tutoring Mini-group 2-3名（1人あたり）", type:"1to1", pricePerHour:25, commission:0.25 },
        },
        accom: {
          "none":        { name:"なし", low:0, peak:0 },
          "homestay-hb": { name:"Homestay Half board (2食)", low:350, peak:350, placementFee:100, halfBoard:true },
          "apt-single":  { name:"Student Apartment Single（デポジットUSD50/INR3000返金可）", low:280, peak:280, placementFee:100 },
          "apt-shared":  { name:"Student Apartment Shared（男女別室）", low:205, peak:205, placementFee:100 },
          "bnb":         { name:"Bed & Breakfast", low:300, peak:300, placementFee:100 },
        },
        airports: { "空港送迎（片道）":40, "空港送迎（往復）":75 }
      }
    }
  },

  // ── ILSC Online: Hello(英語)/Allo(仏語)。CAD建て（AUD価格はnote参照・通貨は生徒の通学プログラムに合わせ選択可）──
  ilsc_online: {
    name: "ILSC Online (Hello / Allo)",
    currency: "CAD",
    campuses: {
      "hello-english": {
        name: "ILSC Hello オンライン英語", country: "Online", regFee: 130, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:15},{maxWeeks:2, fee:30},{maxWeeks:3, fee:45},{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:30, fee:450},{maxWeeks:31, fee:465},{maxWeeks:32, fee:480},{maxWeeks:33, fee:495},{maxWeeks:34, fee:510},{maxWeeks:35, fee:525},{maxWeeks:36, fee:540},{maxWeeks:37, fee:555},{maxWeeks:38, fee:570},{maxWeeks:39, fee:585},{maxWeeks:40, fee:600},{maxWeeks:41, fee:615},{maxWeeks:42, fee:630},{maxWeeks:43, fee:645},{maxWeeks:44, fee:660},{maxWeeks:45, fee:675},{maxWeeks:46, fee:690},{maxWeeks:47, fee:705},{maxWeeks:48, fee:720},{maxWeeks:49, fee:735},{maxWeeks:50, fee:750},{maxWeeks:51, fee:765},{maxWeeks:52, fee:780},{maxWeeks:999, fee:780}] },
        courses: {
          "io":  { name:"Intensive Online IO (24L・20h/週)", type:"group", prices:[145], brackets:[1], extraPerWeek:145, commission:0.25, note:"AUD建ての場合$155/週。登録費$130(非返金)・教材費$15/週。UPP/Greystone Pathway/GE Foundation/EAP対応。" },
          "sio": { name:"Semi-Intensive Online SIO (18L・15h/週)", type:"group", prices:[115], brackets:[1], extraPerWeek:115, commission:0.25, note:"AUD建ての場合$125/週" },
          "eo":  { name:"Elective Online EO (6L・5h/週)", type:"group", prices:[90], brackets:[1], extraPerWeek:90, commission:0.25, note:"AUD建ての場合$95/週" },
          "hs-fasttrack":  { name:"ILSC High School Online: Fast Track (32週固定)", type:"group", prices:[13390], brackets:[1], fixedWeeks:32, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450" },
          "hs-foundation": { name:"ILSC High School Online: Foundation Year (40週固定)", type:"group", prices:[17000], brackets:[1], fixedWeeks:40, commission:0.25, materialsFee:{ type:"fixed", fee:450 }, note:"教材費$450" },
          "hs-credit-tvo": { name:"ILSC HS Online: TVO ILC Credit 1単位 (8週固定)", type:"group", prices:[1750], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:80 }, note:"教材費$80/単位。IO授業料併用型($1,250/単位+IO)もあり。" },
        },
        accom: { "none": { name:"なし（オンライン）", low:0, peak:0 } },
        airports: {}
      },
      "allo-french": {
        name: "ILSC Allo オンライン仏語", country: "Online", regFee: 130, peakSupp: 0,
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:15},{maxWeeks:2, fee:30},{maxWeeks:3, fee:45},{maxWeeks:4, fee:60},{maxWeeks:5, fee:75},{maxWeeks:6, fee:90},{maxWeeks:7, fee:105},{maxWeeks:8, fee:120},{maxWeeks:9, fee:135},{maxWeeks:10, fee:150},{maxWeeks:11, fee:165},{maxWeeks:12, fee:180},{maxWeeks:13, fee:195},{maxWeeks:14, fee:210},{maxWeeks:15, fee:225},{maxWeeks:16, fee:240},{maxWeeks:17, fee:255},{maxWeeks:18, fee:270},{maxWeeks:19, fee:285},{maxWeeks:20, fee:300},{maxWeeks:21, fee:315},{maxWeeks:22, fee:330},{maxWeeks:23, fee:345},{maxWeeks:24, fee:360},{maxWeeks:25, fee:375},{maxWeeks:26, fee:390},{maxWeeks:27, fee:405},{maxWeeks:28, fee:420},{maxWeeks:29, fee:435},{maxWeeks:30, fee:450},{maxWeeks:31, fee:465},{maxWeeks:32, fee:480},{maxWeeks:33, fee:495},{maxWeeks:34, fee:510},{maxWeeks:35, fee:525},{maxWeeks:36, fee:540},{maxWeeks:37, fee:555},{maxWeeks:38, fee:570},{maxWeeks:39, fee:585},{maxWeeks:40, fee:600},{maxWeeks:41, fee:615},{maxWeeks:42, fee:630},{maxWeeks:43, fee:645},{maxWeeks:44, fee:660},{maxWeeks:45, fee:675},{maxWeeks:46, fee:690},{maxWeeks:47, fee:705},{maxWeeks:48, fee:720},{maxWeeks:49, fee:735},{maxWeeks:50, fee:750},{maxWeeks:51, fee:765},{maxWeeks:52, fee:780},{maxWeeks:999, fee:780}] },
        courses: {
          "io":  { name:"Intensive Online IO (24L・20h/週) General French/TEF", type:"group", prices:[145], brackets:[1], extraPerWeek:145, commission:0.25, note:"AUD建ての場合$155/週" },
          "sio": { name:"Semi-Intensive Online SIO (18L・15h/週) General French", type:"group", prices:[115], brackets:[1], extraPerWeek:115, commission:0.25, note:"AUD建ての場合$125/週" },
          "eo":  { name:"Elective Online EO (6L・5h/週) TEF Preparation", type:"group", prices:[90], brackets:[1], extraPerWeek:90, commission:0.25, note:"AUD建ての場合$95/週" },
        },
        accom: { "none": { name:"なし（オンライン）", low:0, peak:0 } },
        airports: {}
      }
    }
  },

  // ── Greystone College Australia（2026年 AUD・5キャンパス共通料金）──
  greystone_australia: {
    name: "Greystone College Australia",
    currency: "AUD",
    campuses: {
      "all-campuses": {
        name: "Adelaide/Brisbane/Melbourne/Perth/Sydney（共通料金）", country: "Australia", regFee: 250, peakSupp: 0,
        materialsFee: { type:"fixed", fee:280 },
        courses: {
          "cert2-workplace": { name:"BSB20120 Certificate II in Workplace Skills（52-54週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:52, commission:0.25, note:"登録費$250+リソース費$280。12週タームごと4週休暇含む。" },
          "cert3-business": { name:"BSB30120 Certificate III in Business（60-64週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "cert4-business": { name:"BSB40120 Certificate IV in Business（60-64週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-business": { name:"BSB50120 Diploma of Business（60-64週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-business-od": { name:"BSB50120 Diploma of Business (Organisational Development)（60-64週）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-business-dt": { name:"BSB50120 Diploma of Business (Digital Transformation)（60-64週）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-digital-marketing": { name:"10931NAT Diploma of Digital Marketing（60-64週・平日）NEW", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "cert4-marketing": { name:"BSB40820 Certificate IV in Marketing and Communication（60-64週・平日）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-marketing": { name:"BSB50620 Diploma of Marketing and Communication（60-64週・平日）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25, note:"前提ユニットあり" },
          "advdip-marketing": { name:"BSB60520 Advanced Diploma of Marketing and Communication（60-64週・平日）", type:"group", prices:[18000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-ai": { name:"11287NAT Diploma of Artificial Intelligence（60-64週・平日）NEW", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "cert4-leadership": { name:"BSB40120 Certificate IV in Business (Leadership)（60-64週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-leadership": { name:"BSB50420 Diploma of Leadership and Management（60-66週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "advdip-leadership": { name:"BSB60420 Advanced Diploma of Leadership and Management（52-54週）", type:"group", prices:[18000], brackets:[1], fixedWeeks:52, commission:0.25, note:"前提ユニットあり" },
          "cert4-sustainability": { name:"BSB40120 Certificate IV in Business (Sustainability)（60-64週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "dip-project-mgmt": { name:"BSB50820 Diploma of Project Management（60-66週・平日/週末）", type:"group", prices:[12000], brackets:[1], fixedWeeks:60, commission:0.25 },
          "cert3-entrepreneurship": { name:"BSB30220 Certificate III in Entrepreneurship & New Business（52-54週）", type:"group", prices:[12000], brackets:[1], fixedWeeks:52, commission:0.25 },
          "spec-workplace": { name:"Specialization in Workplace Fundamentals（28-34週）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-business-basics": { name:"Specialization in Business Basics（28-34週）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-business-essentials": { name:"Specialization in Business Essentials（28-34週）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-managers": { name:"Specialization for Managers and Supervisors（28-34週・平日）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-cert4-mkt-skillset": { name:"BSB40820 Cert IV Marketing Skill Set: Pre-requisite units（28-34週・平日）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-leadership-essentials": { name:"Specialization in Leadership Essentials（28-32週）NEW", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-leadership-mastery": { name:"Specialization in Leadership Mastery（28-32週）NEW", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-hr-pm": { name:"Specialization in Human Resources for Project Managers（28-34週）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
          "spec-pm-mastery": { name:"Specialization in Project Management Mastery（28-34週）", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25, note:"開始日限定: 2026/4/20, 11/30・2027/7/19" },
          "spec-startup": { name:"Specialization in Start-Up Basic（28-32週）NEW", type:"group", prices:[5800], brackets:[1], fixedWeeks:28, commission:0.25 },
        },
        accom: { "none": { name:"なし（宿泊はILSC Australia各キャンパスの宿泊/USH等を参照）", low:0, peak:0 } },
        airports: { "空港送迎（片道）":200 }
      }
    }
  },

  // ── Greystone College Canada（2026年 CAD）──
  greystone_canada: {
    name: "Greystone College Canada",
    currency: "CAD",
    campuses: {
      "montreal": {
        name: "Montréal", country: "Canada", regFee: 220, peakSupp: 0,
        courses: {
          "aec-ibm-en": { name:"AEC International Business Management with Practicum 英語（80週=60週+実習20週・夜間）", type:"group", prices:[14325], brackets:[1], fixedWeeks:80, commission:0.25, materialsFee:{ type:"fixed", fee:750 }, note:"登録費$220(非返金)。3回目LOA申請は+$75。" },
          "aec-ibm-fr": { name:"AEC Gestion du commerce international avec stage 仏語（80週・夜間）", type:"group", prices:[14325], brackets:[1], fixedWeeks:80, commission:0.25, materialsFee:{ type:"fixed", fee:750 } },
          "aec-digital-mkt": { name:"AEC Digital Marketing Specialist with Practicum 英語（92週=72週+実習20週・夜間）", type:"group", prices:[13350], brackets:[1], fixedWeeks:92, commission:0.25, materialsFee:{ type:"fixed", fee:1450 } },
          "dvs-it-support": { name:"DVS 5385 Information Technology Support 仏語（108週=84週+実習24週・夜間）", type:"group", prices:[22000], brackets:[1], fixedWeeks:108, commission:0.25, materialsFee:{ type:"fixed", fee:1950 } },
        },
        accom: { "none": { name:"なし（宿泊はILSC Canada Montréalの宿泊を参照）", low:0, peak:0 } },
        airports: { "空港送迎（片道）":135, "空港送迎（往復）":270 }
      },
      "toronto": {
        name: "Toronto", country: "Canada", regFee: 220, peakSupp: 0,
        courses: {
          "cert-bm-clerk": { name:"Certificate in Business Management Clerk（8-9週・午前）", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:180 }, note:"登録費$220(非返金)" },
          "cert-global-bm": { name:"Certificate in Global Business Management（8-9週・午前）NEW", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:180 } },
          "cert-ibt-clerk": { name:"Certificate in International Business and Trade Clerk（8-9週・午前）", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:185 } },
          "cert-mgr-mkt": { name:"Certificate in Managerial Marketing and Behaviour（8-9週・午前）NEW", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:180 } },
          "cert-org-comm": { name:"Certificate in Organizational Communication Skills（8-9週・午前）", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:180 } },
          "dip-ibm": { name:"Diploma in International Business Management（24-25週・午前）", type:"group", prices:[10500], brackets:[1], fixedWeeks:24, commission:0.25, materialsFee:{ type:"fixed", fee:810 } },
          "dip-ibm-coop": { name:"Diploma in International Business Management Co-op（48-49週=24-25週+Co-op24週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:48, commission:0.25, materialsFee:{ type:"fixed", fee:810 } },
          "mc-intl-business": { name:"Micro-credential: International Business（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:85 } },
          "mc-marketing": { name:"Micro-credential: Marketing（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:100 } },
          "mc-org-behaviour": { name:"Micro-credential: Organizational Behaviour（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:100 } },
          "mc-managerial-comm": { name:"Micro-credential: Managerial Communications（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:80 } },
          "mc-intro-mgmt": { name:"Micro-credential: Introduction to Management（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:100 } },
          "dip-customer-service": { name:"Diploma in Customer Service（24-25週・午前）", type:"group", prices:[10500], brackets:[1], fixedWeeks:24, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "dip-cs-coop": { name:"Diploma in Customer Service Co-op（48-49週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:48, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "cert-hospitality-coop": { name:"Certificate in Hospitality Skills Co-op（32-33週=16-17週+Co-op16週）", type:"group", prices:[6285], brackets:[1], fixedWeeks:32, commission:0.25, materialsFee:{ type:"fixed", fee:375 } },
          "mc-customer-interaction": { name:"Micro-credential: Customer Interaction（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-hosp-tourism": { name:"Micro-credential: Hospitality, Tourism & Travel Industry Info（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-restaurant": { name:"Micro-credential: Restaurant Service（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:75 } },
          "mc-working-others": { name:"Micro-credential: Working Effectively with Others（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-workplace-comm": { name:"Micro-credential: Workplace Communication（4週・午前）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "healthcare-comm": { name:"Communication in Healthcare（3週・午前）※登録費/教材費込パッケージ", type:"group", prices:[2490], brackets:[1], fixedWeeks:3, commission:0.25, materialsFee:{ type:"fixed", fee:0 }, note:"パッケージ価格$2,490に登録費・授業料・教材費込（アプリ側で登録費が二重加算されないよう注意）" },
          "healthcare-observership": { name:"Communication in Healthcare with Observership（4週・午前）※込み価格", type:"group", prices:[3965], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:0 }, note:"パッケージ価格$3,965に登録費・授業料・教材費込" },
        },
        accom: { "none": { name:"なし（宿泊はILSC Canada Torontoの宿泊を参照）", low:0, peak:0 } },
        airports: { "空港送迎（片道）":135, "空港送迎（往復）":270 }
      },
      "vancouver": {
        name: "Vancouver", country: "Canada", regFee: 220, peakSupp: 0,
        courses: {
          "cert-org-comm-m": { name:"Certificate in Organizational Communication Skills 午前（8-16週）", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:180 }, note:"登録費$220。学生ビザ申請者はPAL発行前に$750（Allocation $550＋登録費$200）必要。" },
          "cert-org-comm-e": { name:"Certificate in Organizational Communication Skills 夜間（15-16週）", type:"group", prices:[3320], brackets:[1], fixedWeeks:15, commission:0.25, materialsFee:{ type:"fixed", fee:180 } },
          "cert-ibt-m": { name:"Certificate in International Business and Trade 午前（8-16週）", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:185 } },
          "cert-ibt-e": { name:"Certificate in International Business and Trade 夜間（15-16週）", type:"group", prices:[3320], brackets:[1], fixedWeeks:15, commission:0.25, materialsFee:{ type:"fixed", fee:185 } },
          "cert-bus-comm-m": { name:"Certificate in Business Communication 午前（8-16週）", type:"group", prices:[3320], brackets:[1], fixedWeeks:8, commission:0.25, materialsFee:{ type:"fixed", fee:180 } },
          "cert-bus-comm-e": { name:"Certificate in Business Communication 夜間（15-16週）", type:"group", prices:[3320], brackets:[1], fixedWeeks:15, commission:0.25, materialsFee:{ type:"fixed", fee:180 } },
          "cert-bus-comms-m": { name:"Certificate in Business Communications (旧Diploma) 午前（26-32週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:26, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "cert-bus-comms-e": { name:"Certificate in Business Communications (旧Diploma) 夜間（46-48週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:46, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "dip-ibm-m": { name:"Diploma in International Business Management 午前（26-32週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:26, commission:0.25, materialsFee:{ type:"fixed", fee:810 } },
          "dip-ibm-e": { name:"Diploma in International Business Management 夜間（46-48週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:46, commission:0.25, materialsFee:{ type:"fixed", fee:810 } },
          "coop-bus-comm-m": { name:"Certificate in Business Communications Co-op 午前（48-56週=24-32+有給Co-op24週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:48, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "coop-bus-comm-e": { name:"Certificate in Business Communications Co-op 夜間（86-88週=46-48+有給Co-op40週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:86, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "coop-ibm-m": { name:"Certificate in International Business Management Co-op 午前（48-56週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:48, commission:0.25, materialsFee:{ type:"fixed", fee:810 } },
          "coop-ibm-e": { name:"Certificate in International Business Management Co-op 夜間（86-88週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:86, commission:0.25, materialsFee:{ type:"fixed", fee:810 } },
          "coop-dip-pm": { name:"Diploma in Project Management Co-op 夜間（114-116週=64-66+有給Co-op50週）", type:"group", prices:[17000], brackets:[1], fixedWeeks:114, commission:0.25, materialsFee:{ type:"fixed", fee:1350 } },
          "mc-intl-business": { name:"Micro-credential: International Business（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:85 }, note:"夜間スケジュールは6週" },
          "mc-marketing": { name:"Micro-credential: Marketing（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:100 } },
          "mc-org-behaviour": { name:"Micro-credential: Organizational Behaviour（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:100 } },
          "mc-managerial-comm": { name:"Micro-credential: Managerial Communications（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:80 } },
          "mc-intro-mgmt": { name:"Micro-credential: Introduction to Management（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:100 } },
          "mc-team-mgmt": { name:"Micro-credential: Business Excellence in Team Management（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:255 } },
          "mc-comm-workplace": { name:"Micro-credential: Communication for the Workplace（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:255 } },
          "mc-crm": { name:"Micro-credential: Customer Relationship Management（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:0 } },
          "mc-personal-dev": { name:"Micro-credential: Personal Development Strategies（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:255 } },
          "mc-professionalism": { name:"Micro-credential: Professionalism in a Diverse Workplace（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:255 } },
          "mc-pm-essentials": { name:"Micro-credential: Project Management Essentials（夜間6週）", type:"group", prices:[2500], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:155 } },
          "cert-data-analytics": { name:"Certificate in Data Analytics 午前（20-28週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:20, commission:0.25, materialsFee:{ type:"fixed", fee:1350 } },
          "mc-intro-data": { name:"Tech Micro-credential: Introduction to Data Analytics（午前4週）", type:"group", prices:[2500], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:255 } },
          "mc-frontend-basics": { name:"Tech Micro-credential: Front End Basics HTML/CSS（夜間6週）", type:"group", prices:[2500], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:255 } },
          "coop-data-analytics": { name:"Diploma in Data Analytics Co-op 午前（40-48週=20-28+有給Co-op20週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:40, commission:0.25, materialsFee:{ type:"fixed", fee:1350 } },
          "coop-frontend": { name:"Diploma in Front End Development Co-op 夜間（68-70週=38-40+有給Co-op30週）", type:"group", prices:[12600], brackets:[1], fixedWeeks:68, commission:0.25, materialsFee:{ type:"fixed", fee:1350 } },
          "coop-fullstack": { name:"Diploma in Full Stack Development Co-op 夜間（110-112週=62-64+有給Co-op48週）", type:"group", prices:[20160], brackets:[1], fixedWeeks:110, commission:0.25, materialsFee:{ type:"fixed", fee:1850 } },
          "workplace-skills": { name:"Workplace Skills and Tools（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:345 } },
          "cert-dm-social-m": { name:"Certificate in Digital Marketing: Social Media Professional 午前（26-32週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:26, commission:0.25, materialsFee:{ type:"fixed", fee:950 } },
          "cert-dm-social-e": { name:"Certificate in Digital Marketing: Social Media Professional 夜間（46-48週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:46, commission:0.25, materialsFee:{ type:"fixed", fee:950 } },
          "cert-dm-website-e": { name:"Certificate in Digital Marketing: Website Management and Design 夜間（46-48週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:46, commission:0.25, materialsFee:{ type:"fixed", fee:950 } },
          "dip-dm-professional": { name:"Diploma in Digital Marketing Professional 夜間（70-72週）", type:"group", prices:[13350], brackets:[1], fixedWeeks:70, commission:0.25, materialsFee:{ type:"fixed", fee:1450 } },
          "mc-advertising": { name:"DM Micro-credential: Advertising（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:185 } },
          "mc-branding": { name:"DM Micro-credential: Fundamentals - Branding（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:140 } },
          "mc-domain-email": { name:"DM Micro-credential: Fundamentals - Domain, Online, Email Marketing（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:140 } },
          "mc-seo": { name:"DM Micro-credential: Search Engine Optimization（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:155 } },
          "mc-social-strategies": { name:"DM Micro-credential: Social Media Marketing Strategies（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:140 } },
          "mc-webdesign-analytics": { name:"DM Micro-credential: Strategic Web Design - Analytics and Beyond（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:155 } },
          "mc-webdesign-creative": { name:"DM Micro-credential: Strategic Web Design - The Creative Effort（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:155 } },
          "mc-writing-web": { name:"DM Micro-credential: Writing for the Web（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:140 } },
          "coop-dm-social-m": { name:"Cert in Digital Marketing: Social Media Professional Co-op 午前（48-56週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:48, commission:0.25, materialsFee:{ type:"fixed", fee:950 } },
          "coop-dm-social-e": { name:"Cert in Digital Marketing: Social Media Professional Co-op 夜間（86-88週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:86, commission:0.25, materialsFee:{ type:"fixed", fee:950 } },
          "coop-dm-website-e": { name:"Cert in Digital Marketing: Website Mgmt and Design Co-op 夜間（86-88週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:86, commission:0.25, materialsFee:{ type:"fixed", fee:950 } },
          "coop-dm-professional": { name:"Diploma in Digital Marketing Professional Co-op 夜間（128-130週）", type:"group", prices:[13350], brackets:[1], fixedWeeks:128, commission:0.25, materialsFee:{ type:"fixed", fee:1450 } },
          "cert-customer-service-m": { name:"Certificate in Customer Service 午前（26-32週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:26, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "cert-customer-service-e": { name:"Certificate in Customer Service 夜間（46-48週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:46, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "mc-customer-interaction": { name:"Hospitality MC: Customer Interaction（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-hosp-tourism": { name:"Hospitality MC: Hospitality, Tourism & Travel Industry Info（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-restaurant": { name:"Hospitality MC: Restaurant Service（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:75 } },
          "mc-working-others": { name:"Hospitality MC: Working Effectively with Others（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-workplace-comm": { name:"Hospitality MC: Workplace Communication（午前4週/夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:4, commission:0.25, materialsFee:{ type:"fixed", fee:45 } },
          "mc-food-beverage": { name:"Hospitality MC: Food and Beverage Service（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:65 } },
          "mc-front-office": { name:"Hospitality MC: Front Office Operations（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:70 } },
          "mc-housekeeping": { name:"Hospitality MC: Housekeeping Operations（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:60 } },
          "mc-supervision": { name:"Hospitality MC: Supervision in the Hospitality Industry（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:70 } },
          "mc-lodging": { name:"Hospitality MC: The Lodging and Food Service Industry（夜間6週）", type:"group", prices:[1575], brackets:[1], fixedWeeks:6, commission:0.25, materialsFee:{ type:"fixed", fee:60 } },
          "coop-customer-service-m": { name:"Certificate in Customer Service Co-op 午前（48-56週）", type:"group", prices:[10500], brackets:[1], fixedWeeks:48, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "coop-customer-service-e": { name:"Certificate in Customer Service Co-op 夜間（86-88週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:86, commission:0.25, materialsFee:{ type:"fixed", fee:600 } },
          "coop-hospitality-ops": { name:"Diploma in Hospitality Operations Co-op 夜間（86-88週）", type:"group", prices:[13500], brackets:[1], fixedWeeks:86, commission:0.25, materialsFee:{ type:"fixed", fee:720 } },
        },
        accom: { "none": { name:"なし（宿泊はILSC Canada Vancouverの宿泊を参照）", low:0, peak:0 } },
        airports: { "空港送迎（片道）":135, "空港送迎（往復）":270 }
      }
    }
  },

  // ── ILSC ジュニアキャンプ Canada（2026/2027・CAD・パッケージ価格＝週数別固定額）──
  // 登録時に非返金デポジットC$350必要（パッケージ価格に登録費・教材費等は含まれる）
  ilsc_junior_canada: {
    name: "ILSC Junior Camp Canada",
    currency: "CAD",
    campuses: {
      "junior-canada": {
        name: "Montréal / Toronto / Vancouver", country: "Canada", regFee: 0, peakSupp: 0,
        courses: {
          "summer-homestay": { name:"Summer 2026 MTL/TOR/VAN ホームステイ付 (13-17歳・1-6週)", type:"grandline-fixed", priceTable:[0,1995,3190,4385,5580,6775,7970], commission:0.25, note:"開始日6/28〜8/2（週数により異なる）。UM Fee $75/片道・特別食$50/週別途。" },
          "summer-dayonly": { name:"Summer 2026 MTL/TOR/VAN 宿泊なしDay Only (13-17歳・1-6週)", type:"grandline-fixed", priceTable:[0,980,1660,2340,3020,3700,4380], commission:0.25 },
          "leadership-mtl-homestay": { name:"Leadership Camp Montréal ホームステイ付 (13-17歳・英語I2+・1-3週)", type:"grandline-fixed", priceTable:[0,1995,3190,4385], commission:0.25, note:"開始日7/5, 7/12, 7/19" },
          "leadership-mtl-dayonly": { name:"Leadership Camp Montréal Day Only (13-17歳・1-3週)", type:"grandline-fixed", priceTable:[0,980,1160,2340], commission:0.25, note:"※2週$1,160は原本PDF記載値（Summer版は$1,660のため要確認）" },
          "ubc-residence": { name:"Summer 2026 Vancouver UBC 大学寮 (9-17歳・1-6週)", type:"grandline-fixed", priceTable:[0,3115,5580,7745,9910,12075,14240], commission:0.25, note:"到着時に返金可デポジットCAD$100(現金)必要" },
          "ubc-dayonly": { name:"Summer 2026 Vancouver UBC Day Only (9-17歳・1-6週)", type:"grandline-fixed", priceTable:[0,1570,2705,3840,4975,6110,7245], commission:0.25 },
          "mcgill-residence": { name:"Summer 2026 Montréal McGill 大学寮 (13-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,3115,5280,7445,9610], commission:0.25, note:"Day Onlyなし。デポジット$100(現金)必要" },
          "leadership-mcgill-residence": { name:"Leadership Camp McGill 大学寮 (13-17歳・英語I2+・1-3週)", type:"grandline-fixed", priceTable:[0,3115,5280,7445], commission:0.25 },
          "ciss-toronto-general": { name:"Toronto CISS運営 General English 大学寮 (12-16歳・2-6週)", type:"grandline-fixed", priceTable:[0,0,5100,7075,9050,11313,13575], commission:0.25, note:"追加費用: Extra Night $250/Extra Transfer $125/Late Arrival $125/Custodianship $150" },
          "ciss-toronto-leadership": { name:"Toronto CISS運営 Global Leadership 大学寮 (12-16歳・3週固定)", type:"grandline-fixed", priceTable:[0,0,0,7325], commission:0.25, note:"開始日6/28, 7/19。ESL授業なし" },
          "winter2026-homestay": { name:"Winter Camp 2026 Vancouver ホームステイ付 (9-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,1945,3090,4235,5380], commission:0.25, note:"開始日1/4〜1/25。9-12歳は保護者等の現地滞在必須" },
          "winter2026-dayonly": { name:"Winter Camp 2026 Vancouver Day Only (9-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,1000,1700,2400,3100], commission:0.25 },
          "winter2026-family-1p1c-hs": { name:"Winter 2026 Family: 親1+子1 ホームステイ (1-4週)", type:"grandline-fixed", priceTable:[0,3675,6050,8345,10680], commission:0.25 },
          "winter2026-family-addparent-hs": { name:"Winter 2026 Family: 追加親1名 ホームステイ (1-4週)", type:"grandline-fixed", priceTable:[0,1730,2960,4110,5300], commission:0.25 },
          "winter2026-family-addchild-hs": { name:"Winter 2026 Family: 追加子1名 ホームステイ (1-4週)", type:"grandline-fixed", priceTable:[0,1945,3090,4235,5380], commission:0.25 },
          "winter2026-family-1p1c-day": { name:"Winter 2026 Family: 親1+子1 Day Only (1-4週)", type:"grandline-fixed", priceTable:[0,2055,3560,4985,6450], commission:0.25 },
          "winter2026-family-addparent-day": { name:"Winter 2026 Family: 追加親1名 Day Only (1-4週)", type:"grandline-fixed", priceTable:[0,1055,1860,2585,3350], commission:0.25 },
          "winter2026-family-addchild-day": { name:"Winter 2026 Family: 追加子1名 Day Only (1-4週)", type:"grandline-fixed", priceTable:[0,1000,1700,2400,3100], commission:0.25 },
          "winter2027-homestay": { name:"Winter Camp 2027 Vancouver ホームステイ付 (9-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,1995,3190,4385,5580], commission:0.25, note:"開始日2027/1/3〜1/24" },
          "winter2027-dayonly": { name:"Winter Camp 2027 Vancouver Day Only (9-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,1035,1770,2505,3240], commission:0.25 },
          "winter2027-family-1p1c-hs": { name:"Winter 2027 Family: 親1+子1 ホームステイ (1-4週)", type:"grandline-fixed", priceTable:[0,3750,6160,8570,10980], commission:0.25 },
          "winter2027-family-addparent-hs": { name:"Winter 2027 Family: 追加親1名 ホームステイ (1-4週)", type:"grandline-fixed", priceTable:[0,1755,2970,4185,5400], commission:0.25 },
          "winter2027-family-addchild-hs": { name:"Winter 2027 Family: 追加子1名 ホームステイ (1-4週)", type:"grandline-fixed", priceTable:[0,1995,3190,4385,5580], commission:0.25 },
          "winter2027-family-1p1c-day": { name:"Winter 2027 Family: 親1+子1 Day Only (1-4週)", type:"grandline-fixed", priceTable:[0,2100,3610,5120,6630], commission:0.25 },
          "winter2027-family-addparent-day": { name:"Winter 2027 Family: 追加親1名 Day Only (1-4週)", type:"grandline-fixed", priceTable:[0,1065,1840,2615,3390], commission:0.25 },
          "winter2027-family-addchild-day": { name:"Winter 2027 Family: 追加子1名 Day Only (1-4週)", type:"grandline-fixed", priceTable:[0,1035,1770,2505,3240], commission:0.25 },
          "summer-family-1p1c-hs": { name:"Summer Family Camp 2026 Vancouver: 親1+子1 ホームステイ (子8歳+・1-6週)", type:"grandline-fixed", priceTable:[0,2440,4130,5820,7510,9200,10890], commission:0.25, note:"デポジットは親・子それぞれC$350" },
          "summer-family-addparent-hs": { name:"Summer Family 2026: 追加親1名 ホームステイ (1-6週)", type:"grandline-fixed", priceTable:[0,995,1765,2535,3305,4075,4845], commission:0.25 },
          "summer-family-addchild-hs": { name:"Summer Family 2026: 追加子1名 ホームステイ (1-6週)", type:"grandline-fixed", priceTable:[0,1075,1925,2775,3625,4475,5325], commission:0.25 },
          "summer-family-1p1c-day": { name:"Summer Family 2026: 親1+子1 Day Only (1-6週)", type:"grandline-fixed", priceTable:[0,1305,2160,3015,3870,4725,5580], commission:0.25 },
          "summer-family-addparent-day": { name:"Summer Family 2026: 追加親1名 Day Only (1-6週)", type:"grandline-fixed", priceTable:[0,620,1015,1410,1805,2200,2595], commission:0.25 },
          "summer-family-addchild-day": { name:"Summer Family 2026: 追加子1名 Day Only (1-6週)", type:"grandline-fixed", priceTable:[0,686,1147,1608,2069,2530,2991], commission:0.25 },
        },
        accom: { "none": { name:"パッケージに含む", low:0, peak:0 } },
        airports: { "Unaccompanied Minor Fee（片道）":75 }
      }
    }
  },

  // ── ILSC ジュニアキャンプ Australia（2026・AUD）──
  ilsc_junior_australia: {
    name: "ILSC Junior Camp Australia (Brisbane)",
    currency: "AUD",
    campuses: {
      "brisbane": {
        name: "Brisbane", country: "Australia", regFee: 0, peakSupp: 0,
        courses: {
          "junior-homestay": { name:"Junior Camp 2026 Brisbane ホームステイ付 (12-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,2550,3900,5250,6600], commission:0.25, note:"開始日6/29〜8/17。非返金デポジットAU$350。特別食AU$70/週。" },
          "junior-dayonly": { name:"Junior Camp 2026 Brisbane Day Only (12-17歳・1-4週)", type:"grandline-fixed", priceTable:[0,1350,2200,3050,3900], commission:0.25 },
        },
        accom: { "none": { name:"パッケージに含む", low:0, peak:0 } },
        airports: { "Unaccompanied Minor Fee（片道）":170 }
      }
    }
  },

  // ══ EC USA 2026（USD）══ ハイシーズン割増は12週未満のコースのみ対象（notes参照）
  ec_usa: {
    name: "EC English (USA)",
    currency: "USD",
    campuses: {
      "boston": {
        name: "Boston", country: "USA", regFee: 170, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"Vacation English GE20 (20L・15h/週)", type:"group", prices:[505, 485], brackets:[1, 12], extraPerWeek:485, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$170。" },
          "ge24": { name:"General English 24 (24L・18h/週)", type:"group", prices:[570, 510, 480], brackets:[1, 12, 24], extraPerWeek:480, commission:0.25 },
          "ge26": { name:"General English 26 (26L・19.5h/週)", type:"group", prices:[585, 535, 505], brackets:[1, 12, 24], extraPerWeek:505, commission:0.25 },
          "ge30": { name:"General English 30 (30L・22.5h/週)", type:"group", prices:[650, 595, 525], brackets:[1, 12, 24], extraPerWeek:525, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[570, 510], brackets:[1, 12], extraPerWeek:510, commission:0.25 },
          "eitc": { name:"English in the City (GE20+4・最大8週・ハイシーズンのみ)", type:"group", prices:[570], brackets:[1], extraPerWeek:570, commission:0.25 },
          "exam30": { name:"English & Exam Preparation IELTS (GE20+10・30L)", type:"group", prices:[650, 595], brackets:[1, 12], extraPerWeek:595, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (オンライン+週次レビュー・最低4週)", type:"group", prices:[40], brackets:[1], extraPerWeek:40, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-bb": { name:"Homestay Twin B&B（2名同時申込のみ）U18+$25/週", low:325, peak:365, placementFee:95 },
          "hs-single-bb": { name:"Homestay Single B&B", low:370, peak:410, placementFee:95 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:370, peak:410, placementFee:95 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:440, peak:480, placementFee:95 },
          "res-overlook": { name:"The Overlook Shared Apartments Single 相部屋バス 自炊", low:785, peak:825, placementFee:95 },
        },
        airports: { "Boston Logan空港送迎（片道）":180 }
      },
      "newyork": {
        name: "New York", country: "USA", regFee: 170, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"Vacation English GE20 (20L)", type:"group", prices:[500, 480], brackets:[1, 12], extraPerWeek:480, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$170+Landmark Fee $10。" },
          "ge24": { name:"General English 24", type:"group", prices:[565, 505, 465], brackets:[1, 12, 24], extraPerWeek:465, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[580, 530, 495], brackets:[1, 12, 24], extraPerWeek:495, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[645, 590, 515], brackets:[1, 12, 24], extraPerWeek:515, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[565, 505], brackets:[1, 12], extraPerWeek:505, commission:0.25 },
          "eitc": { name:"English in the City (GE20+4・最大4週・ハイシーズンのみ)", type:"group", prices:[565], brackets:[1], extraPerWeek:565, commission:0.25 },
          "toefl20": { name:"Exam Preparation TOEFL 20 (6/1-9/4のみ・最低2週)", type:"group", prices:[500, 480], brackets:[1, 12], extraPerWeek:480, commission:0.25 },
          "toefl30": { name:"Exam Preparation TOEFL 30 (TOEFL20+10・6/1-9/4のみ)", type:"group", prices:[645, 590], brackets:[1, 12], extraPerWeek:590, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25, note:"Dance: $175/5レッスンもあり" },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[40], brackets:[1], extraPerWeek:40, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-bb": { name:"Homestay Twin B&B（2名同時申込のみ）U18+$25/週", low:385, peak:425, placementFee:95 },
          "hs-single-bb": { name:"Homestay Single B&B", low:460, peak:500, placementFee:95 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:500, peak:535, placementFee:95 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:535, peak:575, placementFee:95 },
          "hs-manhattan-bb": { name:"Homestay Manhattan Single B&B", low:655, peak:695, placementFee:95 },
          "hs-manhattan-hb": { name:"Homestay Manhattan Single Half Board（最低2週）", low:785, peak:895, placementFee:95 },
          "res-midtown-twin": { name:"Midtown Student Residence Twin 相部屋バス 自炊", low:500, peak:575, placementFee:95 },
          "res-midtown-single": { name:"Midtown Student Residence Single ensuite 自炊", low:850, peak:925, placementFee:95 },
          "res-mansfield-semi": { name:"Mansfield Semi-Private 相部屋バス 自炊", low:550, peak:600, placementFee:95 },
          "res-mansfield-single": { name:"Mansfield Single ensuite 自炊", low:785, peak:835, placementFee:95 },
          "res-uws": { name:"Upper West Side Shared Apartments Single 相部屋バス 自炊", low:745, peak:795, placementFee:95 },
        },
        airports: { "JFK/LGA/EWR空港送迎（片道）":195 }
      },
      "newyork30": {
        name: "New York 30+", country: "USA", regFee: 170, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"Vacation English GE20 (20L)", type:"group", prices:[500, 480], brackets:[1, 12], extraPerWeek:480, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 最低年齢30歳。登録費$170+Landmark Fee $10。" },
          "ge24": { name:"General English 24", type:"group", prices:[565, 505, 475], brackets:[1, 12, 24], extraPerWeek:475, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[580, 530, 500], brackets:[1, 12, 24], extraPerWeek:500, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[645, 590, 520], brackets:[1, 12, 24], extraPerWeek:520, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[565, 505], brackets:[1, 12], extraPerWeek:505, commission:0.25 },
          "eitc": { name:"English in the City (GE20+4・最大4週・ハイシーズンのみ)", type:"group", prices:[565], brackets:[1], extraPerWeek:565, commission:0.25 },
          "escapes": { name:"EC Escapes 50+ (GE20+週4アクティビティ等込・1-2週)", type:"grandline-fixed", priceTable:[0,905,1650], commission:0.25, note:"開催: 4/20-5/1, 9/14-9/25。2週目は$825/週。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25, note:"Dancing: $175/5レッスン" },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[40], brackets:[1], extraPerWeek:40, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-bb": { name:"Homestay Twin B&B（2名同時申込のみ）U18+$25/週", low:385, peak:425, placementFee:95 },
          "hs-single-bb": { name:"Homestay Single B&B", low:460, peak:500, placementFee:95 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:500, peak:535, placementFee:95 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:535, peak:575, placementFee:95 },
          "hs-manhattan-bb": { name:"Homestay Manhattan Single B&B", low:655, peak:695, placementFee:95 },
          "hs-manhattan-hb": { name:"Homestay Manhattan Single Half Board（最低2週）", low:785, peak:895, placementFee:95 },
          "res-midtown-twin": { name:"Midtown Student Residence Twin 相部屋バス 自炊", low:500, peak:575, placementFee:95 },
          "res-midtown-single": { name:"Midtown Student Residence Single ensuite 自炊", low:850, peak:925, placementFee:95 },
          "res-mansfield-semi": { name:"Mansfield Semi-Private 相部屋バス 自炊", low:550, peak:600, placementFee:95 },
          "res-mansfield-single": { name:"Mansfield Single ensuite 自炊", low:785, peak:835, placementFee:95 },
          "res-uws": { name:"Upper West Side Shared Apartments Single 相部屋バス 自炊", low:745, peak:795, placementFee:95 },
        },
        airports: { "JFK/LGA/EWR空港送迎（片道）":195 }
      },
      "sanfrancisco": {
        name: "San Francisco", country: "USA", regFee: 170, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"Vacation English GE20 (20L)", type:"group", prices:[455, 435], brackets:[1, 12], extraPerWeek:435, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$170。" },
          "ge24": { name:"General English 24", type:"group", prices:[515, 460, 425], brackets:[1, 12, 24], extraPerWeek:425, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[525, 485, 455], brackets:[1, 12, 24], extraPerWeek:455, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[580, 530, 465], brackets:[1, 12, 24], extraPerWeek:465, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[515, 460], brackets:[1, 12], extraPerWeek:460, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[40], brackets:[1], extraPerWeek:40, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-bb": { name:"Homestay Twin B&B（2名同時申込のみ）U18+$25/週", low:325, peak:365, placementFee:95 },
          "hs-single-bb": { name:"Homestay Single B&B", low:370, peak:410, placementFee:95 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:370, peak:410, placementFee:95 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:440, peak:480, placementFee:95 },
          "res-columbus": { name:"Columbus Residence Single 相部屋バス 自炊（最低4週）", low:600, peak:650, placementFee:95 },
          "res-kenmore-twin": { name:"The Kenmore Twin 共用バス Half Board（最低2週・16歳+）", low:550, peak:585, placementFee:95 },
          "res-kenmore-single": { name:"The Kenmore Single 共用バス Half Board（最低2週）", low:680, peak:715, placementFee:95 },
          "res-kenmore-ensuite": { name:"The Kenmore Single ensuite Half Board（最低2週）", low:765, peak:800, placementFee:95 },
        },
        airports: { "SFO空港送迎（片道）":150, "SFO送迎（相乗り/人）":75 }
      },
      "sandiego": {
        name: "San Diego（CEL運営）", country: "USA", regFee: 150, peakSupp: 0,
        peakStart:"05-30", peakEnd:"09-26",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:12, fee:120},{maxWeeks:13, fee:130},{maxWeeks:14, fee:140},{maxWeeks:15, fee:150},{maxWeeks:16, fee:160},{maxWeeks:17, fee:170},{maxWeeks:18, fee:180},{maxWeeks:19, fee:190},{maxWeeks:20, fee:200},{maxWeeks:21, fee:210},{maxWeeks:22, fee:220},{maxWeeks:23, fee:230},{maxWeeks:24, fee:240},{maxWeeks:25, fee:250},{maxWeeks:26, fee:260},{maxWeeks:27, fee:270},{maxWeeks:28, fee:280},{maxWeeks:29, fee:290},{maxWeeks:30, fee:300},{maxWeeks:31, fee:310},{maxWeeks:32, fee:320},{maxWeeks:33, fee:330},{maxWeeks:34, fee:340},{maxWeeks:35, fee:350},{maxWeeks:36, fee:360},{maxWeeks:37, fee:370},{maxWeeks:38, fee:380},{maxWeeks:39, fee:390},{maxWeeks:40, fee:400},{maxWeeks:41, fee:410},{maxWeeks:42, fee:420},{maxWeeks:43, fee:430},{maxWeeks:44, fee:440},{maxWeeks:45, fee:450},{maxWeeks:46, fee:460},{maxWeeks:47, fee:470},{maxWeeks:48, fee:480},{maxWeeks:49, fee:490},{maxWeeks:50, fee:500},{maxWeeks:51, fee:510},{maxWeeks:52, fee:520},{maxWeeks:999, fee:520}] },
        courses: {
          "ge20": { name:"General English 20 (最大12週)", type:"group", prices:[370, 360], brackets:[1, 7], extraPerWeek:360, commission:0.25, note:"CEL運営。登録費$150。ハイシーズン(5/30-9/26)は宿泊のみ割増・授業料割増なし。ホームステイのみ長期割引あり(名称参照)。" },
          "ge23": { name:"GE23/Academic23/Career Dev23/TOEFL23/CAE23 (20+3.75L・最大12週)", type:"group", prices:[410, 400], brackets:[1, 7], extraPerWeek:400, commission:0.25 },
          "ge24": { name:"GE24/Academic24/Career Dev24/TOEFL24/CAE24 (20+4L)", type:"group", prices:[410, 400, 380, 340, 320], brackets:[1, 7, 13, 20, 30], extraPerWeek:320, commission:0.25 },
          "ge28": { name:"GE28/Academic28/Career Dev28/TOEFL28/CAE28 (+8L/24+4L)", type:"group", prices:[460, 450, 430, 390, 370], brackets:[1, 7, 13, 20, 30], extraPerWeek:370, commission:0.25, note:"TOEFL/Cambridge準備は最大8週" },
          "gp16": { name:"Global Pathway 28 (GE20+GP8・16週固定・総額)", type:"group", prices:[6880], brackets:[1], extraPerWeek:6880, commission:0.25, note:"fixedWeeks対象外のため週数16で入力してください" },
          "exp-sequential": { name:"English Plus Experience Sequential (ESTA/観光ビザ・英語4週+実習8週=12週)", type:"grandline-fixed", priceTable:[0,0,0,0,0,0,0,0,0,0,0,0,2570], commission:0.25, note:"総額$2,570(英語$1,620+実習$950)。12週で入力。" },
          "exp-combined-12": { name:"English Plus Experience Combined (学生ビザ・12週)", type:"grandline-fixed", priceTable:[0,0,0,0,0,0,0,0,0,0,0,0,5750], commission:0.25, note:"総額$5,750(英語$4,800+実習$950)" },
          "exp-combined-24": { name:"English Plus Experience Combined (学生ビザ・24週)", type:"grandline-fixed", priceTable:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9110], commission:0.25, note:"総額$9,110(英語$8,160+実習$950)" },
          "one2one": { name:"One-to-One (45分/回)", type:"1to1", pricePerHour:85, commission:0.25, note:"Surfing $200/週(4回)・Volunteering $250もあり" },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-double-bf": { name:"Homestay Double 朝食（5-11週$310/12+週$290・ハイシーズン+$20/週）", low:330, peak:350, placementFee:200 },
          "hs-single-bf": { name:"Homestay Single 朝食（5-11週$340/12+週$320・HS+$30/週）", low:360, peak:390, placementFee:200 },
          "hs-double-bd": { name:"Homestay Double 朝夕（5-11週$340/12+週$320・HS+$20/週）", low:360, peak:380, placementFee:200 },
          "hs-single-bd": { name:"Homestay Single 朝夕（5-11週$370/12+週$350・HS+$30/週）", low:390, peak:420, placementFee:200 },
          "hs-single-priv": { name:"Homestay Single 専用バス 朝夕（5-11週$470/12+週$450・HS+$30/週）", low:490, peak:520, placementFee:200 },
          "hs-premium": { name:"Premium Homestay Single 朝夕（学校まで35分以内・HS+$30/週）", low:490, peak:520, placementFee:200 },
          "apt-std-twin": { name:"CEL Shared Apt Standard Twin 相部屋バス 自炊（12-23週$280/24+$270）", low:290, peak:330, placementFee:100 },
          "apt-std-single": { name:"CEL Shared Apt Standard Single 相部屋バス（12-23週$520/24+$510）", low:530, peak:630, placementFee:100 },
          "apt-prem-twin": { name:"CEL Shared Apt Premium Twin 専用バス（12-23週$350/24+$340）", low:360, peak:410, placementFee:100 },
          "apt-prem-single": { name:"CEL Shared Apt Premium Single 専用バス（12-23週$710/24+$700）", low:720, peak:820, placementFee:100 },
          "apt-sup-twin": { name:"CEL Shared Apt Superior Twin 専用バス（12-23週$400/24+$390）", low:410, peak:460, placementFee:100 },
          "apt-sup-single": { name:"CEL Shared Apt Superior Single 専用バス（12-23週$810/24+$800）", low:820, peak:920, placementFee:100 },
        },
        airports: {  }
      },
      "losangeles": {
        name: "Los Angeles", country: "USA", regFee: 170, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"Vacation English GE20 (20L)", type:"group", prices:[450, 430], brackets:[1, 12], extraPerWeek:430, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$170。" },
          "ge24": { name:"General English 24", type:"group", prices:[510, 455, 425], brackets:[1, 12, 24], extraPerWeek:425, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[520, 480, 485], brackets:[1, 12, 24], extraPerWeek:485, commission:0.25, note:"※24+週の$485は原本PDF記載値（$450前後の誤植の可能性・要確認）" },
          "ge30": { name:"General English 30", type:"group", prices:[575, 525, 475], brackets:[1, 12, 24], extraPerWeek:475, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[510, 455], brackets:[1, 12], extraPerWeek:455, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[40], brackets:[1], extraPerWeek:40, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-bb": { name:"Homestay Twin B&B（2名同時申込のみ）U18+$25/週", low:325, peak:365, placementFee:95 },
          "hs-single-bb": { name:"Homestay Single B&B", low:365, peak:405, placementFee:95 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:365, peak:405, placementFee:95 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:440, peak:480, placementFee:95 },
          "res-sm-twin": { name:"Santa Monica Downtown Shared Apt Twin 相部屋バス（最低4週）", low:520, peak:570, placementFee:95 },
          "res-sm-single": { name:"Santa Monica Downtown Shared Apt Single 専用バス（最低4週）", low:955, peak:995, placementFee:95 },
        },
        airports: { "LAX空港送迎（片道）":165 }
      },
    }
  },

  // ══ EC Canada 2026（CAD）══
  ec_canada: {
    name: "EC English (Canada)",
    currency: "CAD",
    campuses: {
      "montreal": {
        name: "Montréal", country: "Canada", regFee: 140, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "gef20": { name:"General English/French 20 (20L)", type:"group", prices:[420, 405], brackets:[1, 12], extraPerWeek:405, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$140。仏語コース教材費込。" },
          "gef24": { name:"General English/French 24", type:"group", prices:[455, 440], brackets:[1, 12], extraPerWeek:440, commission:0.25 },
          "gef26": { name:"General English/French 26", type:"group", prices:[485, 455], brackets:[1, 12], extraPerWeek:455, commission:0.25 },
          "gef30": { name:"General English/French 30", type:"group", prices:[510, 495], brackets:[1, 12], extraPerWeek:495, commission:0.25 },
          "ya24": { name:"Young Achievers English/French (GE/GF20+4)", type:"group", prices:[455, 440], brackets:[1, 12], extraPerWeek:440, commission:0.25 },
          "bil24": { name:"Bilingual 24", type:"group", prices:[435, 420], brackets:[1, 12], extraPerWeek:420, commission:0.25 },
          "bil26": { name:"Bilingual 26", type:"group", prices:[450, 435], brackets:[1, 12], extraPerWeek:435, commission:0.25 },
          "bil30": { name:"Bilingual 30", type:"group", prices:[480, 465], brackets:[1, 12], extraPerWeek:465, commission:0.25 },
          "one2one": { name:"English/French Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25, note:"Gastronomy $310/週・Bartending $175/週もあり" },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-single-sc": { name:"Homestay Single 自炊 U18+$25/週", low:270, peak:305, placementFee:230 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:300, peak:335, placementFee:230 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:320, peak:355, placementFee:230 },
          "hs-single-fb": { name:"Homestay Single Full Board", low:365, peak:395, placementFee:230 },
          "res-lamarq": { name:"La Marq au 515 Shared Apt Single 相部屋バス（到着時空港送迎込）", low:495, peak:545, placementFee:230 },
        },
        airports: { "YUL空港送迎（片道）":120 }
      },
      "toronto": {
        name: "Toronto", country: "Canada", regFee: 140, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[435, 410, 400], brackets:[1, 12, 24], extraPerWeek:400, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$140。朝クラス保証は+$40/週(1-11週)/+$35(12-23週)/+$30(24+週)。PAL(州証明)費$110+授業料10%デポジット。" },
          "ge24": { name:"General English 24", type:"group", prices:[480, 460, 435], brackets:[1, 12, 24], extraPerWeek:435, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[495, 485, 465], brackets:[1, 12, 24], extraPerWeek:465, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[520, 505, 490], brackets:[1, 12, 24], extraPerWeek:490, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大8週)", type:"group", prices:[480], brackets:[1], extraPerWeek:480, commission:0.25 },
          "eitc": { name:"English in the City (GE20+4・最大4週・ハイシーズンのみ)", type:"group", prices:[480], brackets:[1], extraPerWeek:480, commission:0.25 },
          "exam20": { name:"Exam Preparation IELTS/TOEFL/TOEIC (20L・推奨4週以上)", type:"group", prices:[435, 410], brackets:[1, 12], extraPerWeek:410, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）U18+$25/週", low:325, peak:360, placementFee:230 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:345, peak:380, placementFee:230 },
          "res-parker-eco": { name:"The Parker Economy Single 相部屋バス 自炊", low:575, peak:625, placementFee:230 },
          "res-parker-single": { name:"The Parker Single 相部屋バス 自炊", low:600, peak:650, placementFee:230 },
          "res-parker-priv": { name:"The Parker Single 専用バス 自炊", low:715, peak:765, placementFee:230 },
          "res-ledbury-eco": { name:"The Ledbury Economy Single 相部屋バス 自炊", low:560, peak:610, placementFee:230 },
          "res-ledbury-single": { name:"The Ledbury Single 相部屋バス 自炊", low:580, peak:630, placementFee:230 },
          "res-ledbury-priv": { name:"The Ledbury Single 専用バス 自炊", low:680, peak:730, placementFee:230 },
        },
        airports: { "YYZ空港送迎（片道）":135 }
      },
      "toronto30": {
        name: "Toronto 30+", country: "Canada", regFee: 140, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[435, 410, 400], brackets:[1, 12, 24], extraPerWeek:400, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 最低年齢30歳。登録費$140。" },
          "ge24": { name:"General English 24", type:"group", prices:[480, 460, 435], brackets:[1, 12, 24], extraPerWeek:435, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[495, 485, 465], brackets:[1, 12, 24], extraPerWeek:465, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[520, 505, 490], brackets:[1, 12, 24], extraPerWeek:490, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大8週)", type:"group", prices:[520, 505], brackets:[1, 12], extraPerWeek:505, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）U18+$25/週", low:325, peak:360, placementFee:230 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:345, peak:380, placementFee:230 },
          "res-parker-eco": { name:"The Parker Economy Single 相部屋バス 自炊", low:575, peak:625, placementFee:230 },
          "res-parker-single": { name:"The Parker Single 相部屋バス 自炊", low:600, peak:650, placementFee:230 },
          "res-parker-priv": { name:"The Parker Single 専用バス 自炊", low:715, peak:765, placementFee:230 },
          "res-ledbury-eco": { name:"The Ledbury Economy Single 相部屋バス 自炊", low:560, peak:610, placementFee:230 },
          "res-ledbury-single": { name:"The Ledbury Single 相部屋バス 自炊", low:580, peak:630, placementFee:230 },
          "res-ledbury-priv": { name:"The Ledbury Single 専用バス 自炊", low:680, peak:730, placementFee:230 },
        },
        airports: { "YYZ空港送迎（片道）":135 }
      },
      "vancouver": {
        name: "Vancouver", country: "Canada", regFee: 140, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[435, 410, 400], brackets:[1, 12, 24], extraPerWeek:400, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費$140。PAL費$110+授業料10%デポジット。" },
          "ge24": { name:"General English 24", type:"group", prices:[480, 460, 435], brackets:[1, 12, 24], extraPerWeek:435, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[495, 485, 465], brackets:[1, 12, 24], extraPerWeek:465, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[520, 505, 490], brackets:[1, 12, 24], extraPerWeek:490, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[480, 460], brackets:[1, 12], extraPerWeek:460, commission:0.25 },
          "wwai": { name:"Writing with AI (GE20+10・最大4週)", type:"group", prices:[520], brackets:[1], extraPerWeek:520, commission:0.25 },
          "cambridge30": { name:"Cambridge Exam Preparation 30 (B2 First/C1 Adv・10週コース)", type:"group", prices:[520], brackets:[1], extraPerWeek:520, commission:0.25, note:"開講: 3/23-5/29, 3/30-6/5, 10/5-12/11。試験料別途。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）U18+$25/週", low:325, peak:360, placementFee:230 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:345, peak:380, placementFee:230 },
          "res-richards": { name:"Richards & Pender Shared Apt Single 専用バス 自炊", low:765, peak:800, placementFee:230 },
          "res-vsh-eco": { name:"Vancouver Student House Economy Single 相部屋バス（最低2週）", low:435, peak:485, placementFee:230 },
          "res-vsh-single": { name:"Vancouver Student House Single 相部屋バス（最低2週）", low:500, peak:550, placementFee:230 },
          "res-vsh-ensuite": { name:"Vancouver Student House Single ensuite（最低2週）", low:535, peak:585, placementFee:230 },
          "res-gastown-eco": { name:"Gastown Shared Apt Economy Single 相部屋バス", low:615, peak:665, placementFee:230 },
          "res-gastown-single": { name:"Gastown Shared Apt Single 相部屋バス", low:640, peak:690, placementFee:230 },
          "res-gastown-ensuite": { name:"Gastown Shared Apt Single ensuite", low:720, peak:770, placementFee:230 },
        },
        airports: { "YVR空港送迎（片道）":135 }
      },
      "vancouver30": {
        name: "Vancouver 30+", country: "Canada", regFee: 140, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:10},{maxWeeks:2, fee:20},{maxWeeks:3, fee:30},{maxWeeks:4, fee:40},{maxWeeks:5, fee:50},{maxWeeks:6, fee:60},{maxWeeks:7, fee:70},{maxWeeks:8, fee:80},{maxWeeks:9, fee:90},{maxWeeks:10, fee:100},{maxWeeks:11, fee:110},{maxWeeks:23, fee:120},{maxWeeks:999, fee:140}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[435, 410, 400], brackets:[1, 12, 24], extraPerWeek:400, commission:0.25, note:"ハイシーズン割増$25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 最低年齢30歳。登録費$140。" },
          "ge24": { name:"General English 24", type:"group", prices:[480, 460, 435], brackets:[1, 12, 24], extraPerWeek:435, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[495, 485, 465], brackets:[1, 12, 24], extraPerWeek:465, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[520, 505, 490], brackets:[1, 12, 24], extraPerWeek:490, commission:0.25 },
          "efw": { name:"English for Work (GE20+4・最大12週)", type:"group", prices:[480, 460], brackets:[1, 12], extraPerWeek:460, commission:0.25 },
          "wwai": { name:"Writing with AI (GE20+10・最大4週)", type:"group", prices:[520], brackets:[1], extraPerWeek:520, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:155, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）U18+$25/週", low:325, peak:360, placementFee:230 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:345, peak:380, placementFee:230 },
          "res-richards": { name:"Richards & Pender Shared Apt Single 専用バス 自炊", low:765, peak:800, placementFee:230 },
          "res-vsh-eco": { name:"Vancouver Student House Economy Single 相部屋バス（最低2週）", low:435, peak:485, placementFee:230 },
          "res-vsh-single": { name:"Vancouver Student House Single 相部屋バス（最低2週）", low:500, peak:550, placementFee:230 },
          "res-vsh-ensuite": { name:"Vancouver Student House Single ensuite（最低2週）", low:535, peak:585, placementFee:230 },
          "res-gastown-eco": { name:"Gastown Shared Apt Economy Single 相部屋バス", low:615, peak:665, placementFee:230 },
          "res-gastown-single": { name:"Gastown Shared Apt Single 相部屋バス", low:640, peak:690, placementFee:230 },
          "res-gastown-ensuite": { name:"Gastown Shared Apt Single ensuite", low:720, peak:770, placementFee:230 },
        },
        airports: { "YVR空港送迎（片道）":135 }
      },
    }
  },

  // ══ EC UK 2026（GBP）══
  ec_uk: {
    name: "EC English (UK)",
    currency: "GBP",
    campuses: {
      "london": {
        name: "London", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[405, 365, 330], brackets:[1, 12, 24], extraPerWeek:330, commission:0.25, note:"ハイシーズン割増£20/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費£60。朝クラス保証+£40/35/30/週。" },
          "ge30": { name:"General English 30", type:"group", prices:[495, 450, 390], brackets:[1, 12, 24], extraPerWeek:390, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[495, 450], brackets:[1, 12], extraPerWeek:450, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大4週・ハイシーズンのみ)", type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.25 },
          "wwai": { name:"Writing with AI (GE20+10・最大4週)", type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS (20L・推奨4週以上)", type:"group", prices:[405, 365], brackets:[1, 12], extraPerWeek:365, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:290, peak:340, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:240, peak:290, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:250, peak:300, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:305, peak:355, placementFee:40 },
          "res-iq-highbury": { name:"iQ Highbury Single ensuite 自炊", low:510, peak:560, placementFee:40 },
          "res-iq-shoreditch": { name:"iQ Shoreditch Studio ensuite 自炊", low:625, peak:675, placementFee:40 },
          "res-summer": { name:"Summer Residence Single 専用バス 自炊（夏期のみ・通年同額）", low:550, peak:550, placementFee:40 },
        },
        airports: { "Heathrow LHR（片道）":210, "Gatwick LGW（片道）":240, "Stansted STN（片道）":240, "Luton LTN（片道）":235, "London City LCY（片道）":185, "St Pancras駅（片道）":140 }
      },
      "london30": {
        name: "London 30+", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[405, 365, 330], brackets:[1, 12, 24], extraPerWeek:330, commission:0.25, note:"ハイシーズン割増£20/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 最低年齢30歳。登録費£60。近距離ステイ+£60/週・専用バス+£100/週(手配時)。" },
          "ge24": { name:"General English 24", type:"group", prices:[435, 390, 360], brackets:[1, 12, 24], extraPerWeek:360, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[460, 415, 375], brackets:[1, 12, 24], extraPerWeek:375, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[495, 450, 390], brackets:[1, 12, 24], extraPerWeek:390, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[495, 450], brackets:[1, 12], extraPerWeek:450, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大4週・ハイシーズンのみ)", type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.25 },
          "wwai": { name:"Writing with AI (GE20+10・最大4週)", type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.25 },
          "business20": { name:"Business English (20L・Upper-Int以上)", type:"group", prices:[405, 365], brackets:[1, 12], extraPerWeek:365, commission:0.25 },
          "escapes": { name:"EC Escapes 50+ (GE20+アクティビティ込・1-2週)", type:"grandline-fixed", priceTable:[0,730,1330], commission:0.25, note:"開催: 5/11-5/22, 9/7-9/18。2週目£665/週。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:290, peak:340, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:240, peak:290, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:250, peak:300, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:305, peak:355, placementFee:40 },
          "res-iq-highbury": { name:"iQ Highbury Single ensuite 自炊", low:510, peak:560, placementFee:40 },
          "res-iq-shoreditch": { name:"iQ Shoreditch Studio ensuite 自炊", low:625, peak:675, placementFee:40 },
          "res-summer": { name:"Summer Residence Single 専用バス 自炊（夏期のみ・通年同額）", low:550, peak:550, placementFee:40 },
        },
        airports: { "Heathrow LHR（片道）":210, "Gatwick LGW（片道）":240, "Stansted STN（片道）":240, "Luton LTN（片道）":235, "London City LCY（片道）":185, "St Pancras駅（片道）":140 }
      },
      "cambridge": {
        name: "Cambridge", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[375, 340, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25, note:"ハイシーズン割増£20/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費£60。" },
          "ge30": { name:"General English 30", type:"group", prices:[475, 390, 340], brackets:[1, 12, 24], extraPerWeek:340, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大4週)", type:"group", prices:[475], brackets:[1], extraPerWeek:475, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[475], brackets:[1], extraPerWeek:475, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS (20L・推奨4週以上)", type:"group", prices:[375, 340], brackets:[1, 12], extraPerWeek:340, commission:0.25 },
          "flexi-std": { name:"FlexiTrack Standard (12GE+4 One-to-One・16L)", type:"group", prices:[515, 485], brackets:[1, 12], extraPerWeek:485, commission:0.25, note:"One-to-Oneは45分" },
          "flexi-int": { name:"FlexiTrack Intensive (12GE+10EfW+4 One-to-One・26L)", type:"group", prices:[625, 595], brackets:[1, 12], extraPerWeek:595, commission:0.25 },
          "en-fe-std": { name:"English Now for Further Education Standard (12GE+8AE・20L)", type:"group", prices:[375, 340, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25, note:"開始日限定(月2回程度)・最低2週・少人数(最大8名)" },
          "en-fe-int": { name:"English Now for Further Education Intensive (30L)", type:"group", prices:[475, 390, 340], brackets:[1, 12, 24], extraPerWeek:340, commission:0.25 },
          "en-gs-std": { name:"English Now for Global Success Standard (20L)", type:"group", prices:[375, 340, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25 },
          "en-gs-int": { name:"English Now for Global Success Intensive (30L)", type:"group", prices:[475, 390, 340], brackets:[1, 12, 24], extraPerWeek:340, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:240, peak:265, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:220, peak:245, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:240, peak:265, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:275, peak:300, placementFee:40 },
          "res-castle": { name:"Student Castle Studio ensuite 自炊", low:450, peak:485, placementFee:40 },
          "res-newmarket-sh": { name:"Newmarket Road Shared House Single 相部屋バス 自炊", low:300, peak:335, placementFee:40 },
          "res-newmarket-en": { name:"Newmarket Road Shared House Single ensuite 自炊", low:325, peak:360, placementFee:40 },
          "res-summer": { name:"Summer Residence Single 専用バス（6/28-8/16のみ）", low:430, peak:430, placementFee:40 },
        },
        airports: { "Stansted STN（片道）":150, "Luton LTN（片道）":155, "Southend SEN（片道）":210, "LHR/LCY/St Pancras（片道）":245, "Gatwick LGW（片道）":260 }
      },
      "brighton": {
        name: "Brighton", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[385, 340, 290], brackets:[1, 12, 24], extraPerWeek:290, commission:0.25, note:"ハイシーズン割増£20/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費£60。専用バス+£90/週(手配時)。" },
          "ge30": { name:"General English 30", type:"group", prices:[485, 405, 360], brackets:[1, 12, 24], extraPerWeek:360, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[485, 405], brackets:[1, 12], extraPerWeek:405, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大4週・ハイシーズンのみ)", type:"group", prices:[485], brackets:[1], extraPerWeek:485, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS 20 (推奨4週以上)", type:"group", prices:[385, 340], brackets:[1, 12], extraPerWeek:340, commission:0.25 },
          "ielts30": { name:"Exam Preparation IELTS 30 (推奨4週以上)", type:"group", prices:[485, 405], brackets:[1, 12], extraPerWeek:405, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:240, peak:265, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:220, peak:245, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:240, peak:265, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:275, peak:300, placementFee:40 },
          "res-abacus": { name:"Abacus House Single ensuite 自炊", low:390, peak:425, placementFee:40 },
          "res-pavilion": { name:"Pavilion Point Studio ensuite 自炊", low:430, peak:465, placementFee:40 },
          "res-northlaine-ya": { name:"North Laine Young Adult Residence Single 専用バスHB（16-17歳・6/27-8/19）", low:505, peak:505, placementFee:40 },
          "res-northlaine-single": { name:"North Laine 18+ Single 専用バス 自炊（6/27-8/19）", low:390, peak:390, placementFee:40 },
          "res-northlaine-studio": { name:"North Laine 18+ Studio ensuite 自炊（6/27-8/19）", low:465, peak:465, placementFee:40 },
        },
        airports: { "Gatwick LGW（片道）":130, "Heathrow LHR（片道）":205, "Ashford Intl駅（片道）":200, "St Pancras駅（片道）":235, "LTN/STN/SEN（片道）":310 }
      },
      "brighton30": {
        name: "Brighton 30+（夏期のみ）", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20（夏期のみ 6/28-8/30）", type:"group", prices:[405], brackets:[1], extraPerWeek:405, commission:0.25, note:"最低年齢30歳。登録費£60。夏期のみ開講。" },
          "ge24": { name:"General English 24（夏期のみ）", type:"group", prices:[435], brackets:[1], extraPerWeek:435, commission:0.25 },
          "ge26": { name:"General English 26（夏期のみ）", type:"group", prices:[460], brackets:[1], extraPerWeek:460, commission:0.25 },
          "ge30": { name:"General English 30（夏期のみ）", type:"group", prices:[505], brackets:[1], extraPerWeek:505, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大8週・夏期のみ)", type:"group", prices:[505], brackets:[1], extraPerWeek:505, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:240, peak:265, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:220, peak:245, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:240, peak:265, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:275, peak:300, placementFee:40 },
          "res-abacus": { name:"Abacus House Single ensuite 自炊", low:390, peak:425, placementFee:40 },
          "res-pavilion": { name:"Pavilion Point Studio ensuite 自炊", low:430, peak:465, placementFee:40 },
          "res-northlaine-ya": { name:"North Laine Young Adult Residence Single 専用バスHB（16-17歳・6/27-8/19）", low:505, peak:505, placementFee:40 },
          "res-northlaine-single": { name:"North Laine 18+ Single 専用バス 自炊（6/27-8/19）", low:390, peak:390, placementFee:40 },
          "res-northlaine-studio": { name:"North Laine 18+ Studio ensuite 自炊（6/27-8/19）", low:465, peak:465, placementFee:40 },
        },
        airports: { "Gatwick LGW（片道）":130, "Heathrow LHR（片道）":205, "Ashford Intl駅（片道）":200, "St Pancras駅（片道）":235, "LTN/STN/SEN（片道）":310 }
      },
      "bristol": {
        name: "Bristol", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[365, 295, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25, note:"ハイシーズン割増£20/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費£60。" },
          "ge30": { name:"General English 30", type:"group", prices:[455, 370, 345], brackets:[1, 12, 24], extraPerWeek:345, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[455, 370], brackets:[1, 12], extraPerWeek:370, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS (20L・推奨4週以上)", type:"group", prices:[365, 295], brackets:[1, 12], extraPerWeek:295, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:230, peak:255, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:215, peak:240, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:230, peak:255, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:265, peak:290, placementFee:40 },
          "res-avon": { name:"Unite Avon Point Single ensuite 自炊", low:380, peak:415, placementFee:40 },
          "res-summer": { name:"Summer Residence Single 専用バス 自炊", low:330, peak:330, placementFee:40 },
        },
        airports: { "Bristol BRS（片道）":95, "Heathrow LHR（片道）":335, "Gatwick LGW（片道）":425 }
      },
      "manchester": {
        name: "Manchester", country: "UK", regFee: 60, peakSupp: 20,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[380, 340, 290], brackets:[1, 12, 24], extraPerWeek:290, commission:0.25, note:"ハイシーズン割増£20/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費£60。" },
          "ge30": { name:"General English 30", type:"group", prices:[485, 400, 365], brackets:[1, 12, 24], extraPerWeek:365, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[485, 405], brackets:[1, 12], extraPerWeek:405, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大12週)", type:"group", prices:[485, 405], brackets:[1, 12], extraPerWeek:405, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS 20 (推奨4週以上)", type:"group", prices:[380, 350], brackets:[1, 12], extraPerWeek:350, commission:0.25 },
          "ielts30": { name:"Exam Preparation IELTS 30 (推奨4週以上)", type:"group", prices:[485, 405], brackets:[1, 12], extraPerWeek:405, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:120, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:230, peak:255, placementFee:40 },
          "hs-single-sc": { name:"Homestay Single 自炊", low:215, peak:240, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:230, peak:255, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:265, peak:290, placementFee:40 },
          "res-vita": { name:"Vita Residence Studio ensuite 自炊", low:385, peak:420, placementFee:40 },
          "res-iq-lf": { name:"IQ Lambert & Fairfield Single ensuite 自炊", low:340, peak:375, placementFee:40 },
          "res-summer": { name:"Summer Residence Single 専用バス 自炊", low:355, peak:355, placementFee:40 },
        },
        airports: { "Manchester Piccadilly駅（片道）":115, "Manchester MAN（片道）":135 }
      },
    }
  },

  // ══ EC Dublin 2026（EUR）══
  ec_dublin: {
    name: "EC English (Dublin)",
    currency: "EUR",
    campuses: {
      "dublin": {
        name: "Dublin", country: "Ireland", regFee: 55, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[380, 365, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25, note:"ハイシーズン割増€25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費€55。朝クラス保証+€40/35/30/週。非EEA: Learner Protection £40(12週+)・試験デポジット£225(25週+)。" },
          "ge30": { name:"General English 30", type:"group", prices:[445, 420, 325], brackets:[1, 12, 24], extraPerWeek:325, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[445, 420], brackets:[1, 12], extraPerWeek:420, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS (20L・4-12週)", type:"group", prices:[380, 365], brackets:[1, 12], extraPerWeek:365, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:125, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25, note:"原本PDFは€135/週表記だが他校は€35/週のため誤植の可能性・要確認" },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:275, peak:315, placementFee:55 },
          "hs-single-bb": { name:"Homestay Single B&B", low:275, peak:315, placementFee:55 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:305, peak:345, placementFee:55 },
          "res-heyday": { name:"Heyday Carman's Hall Single ensuite 自炊", low:450, peak:500, placementFee:55 },
        },
        airports: { "Dublin DUB空港送迎（片道）":120 }
      },
      "dublin30": {
        name: "Dublin 30+", country: "Ireland", regFee: 55, peakSupp: 25,
        peakStart:"06-27", peakEnd:"08-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[380, 365, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25, note:"最低年齢30歳。登録費€55。ハイシーズン割増€25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。" },
          "ge24": { name:"General English 24", type:"group", prices:[400, 380, 290], brackets:[1, 12, 24], extraPerWeek:290, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[420, 395, 300], brackets:[1, 12, 24], extraPerWeek:300, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[445, 420, 325], brackets:[1, 12, 24], extraPerWeek:325, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[445, 420], brackets:[1, 12], extraPerWeek:420, commission:0.25 },
          "escapes": { name:"EC Escapes 50+ (GE20+アクティビティ込・1-2週)", type:"grandline-fixed", priceTable:[0,755,1330], commission:0.25, note:"開催: 6/8-6/19, 8/24-9/4。2週目€665/週。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:125, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[35], brackets:[1], extraPerWeek:35, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board（2名同時申込のみ）", low:275, peak:315, placementFee:55 },
          "hs-single-bb": { name:"Homestay Single B&B", low:275, peak:315, placementFee:55 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:305, peak:345, placementFee:55 },
          "res-heyday": { name:"Heyday Carman's Hall Single ensuite 自炊", low:450, peak:500, placementFee:55 },
        },
        airports: { "Dublin DUB空港送迎（片道）":120 }
      },
    }
  },

  // ══ EC Malta 2026（EUR）══
  ec_malta: {
    name: "EC English (Malta)",
    currency: "EUR",
    campuses: {
      "malta": {
        name: "Malta", country: "Malta", regFee: 55, peakSupp: 25,
        peakStart:"06-27", peakEnd:"09-27",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[300, 255, 240], brackets:[1, 12, 24], extraPerWeek:240, commission:0.25, note:"ハイシーズン割増€25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。 登録費€55。宿泊ハイシーズンは9/27まで。18歳+はEco Tax €0.50/泊(最大€5)。コース+宿泊予約で到着時空港送迎込。" },
          "ge30": { name:"General English 30", type:"group", prices:[410, 320, 300], brackets:[1, 12, 24], extraPerWeek:300, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[410, 320], brackets:[1, 12], extraPerWeek:320, commission:0.25 },
          "wwai": { name:"Writing with AI (GE20+10・最大4週)", type:"group", prices:[410], brackets:[1], extraPerWeek:410, commission:0.25 },
          "minigroup20": { name:"Mini Group 20 (最大7名・毎月第1月曜開始・最大2週)", type:"group", prices:[495], brackets:[1], extraPerWeek:495, commission:0.25 },
          "minigroup30": { name:"Intensive Mini Group 30", type:"group", prices:[615], brackets:[1], extraPerWeek:615, commission:0.25 },
          "bizmini20": { name:"Business Mini Group 20 (25歳+)", type:"group", prices:[540], brackets:[1], extraPerWeek:540, commission:0.25 },
          "bizmini30": { name:"Intensive Business Mini Group 30 (25歳+)", type:"group", prices:[670], brackets:[1], extraPerWeek:670, commission:0.25 },
          "cambridge30": { name:"Cambridge Exam Preparation 30 (B2/C1・10週)", type:"group", prices:[410, 320], brackets:[1, 12], extraPerWeek:320, commission:0.25, note:"開講: 3/30-6/5, 9/29-12/11ほか。試験料別途。" },
          "ielts30": { name:"Exam Preparation IELTS 30 (最低4週)", type:"group", prices:[410, 320], brackets:[1, 12], extraPerWeek:320, commission:0.25 },
          "teacher385": { name:"Specialised Teacher Training (25歳+・GE20+10L・固定日程2週)", type:"group", prices:[385], brackets:[1], extraPerWeek:385, commission:0.25, note:"English&Digital Skills / English&Teaching Methodology。年3回開催。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:95, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[30], brackets:[1], extraPerWeek:30, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board", low:250, peak:315, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:340, peak:490, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:360, peak:510, placementFee:40 },
          "apt-twin": { name:"Student Apartment Twin 相部屋バス 自炊", low:220, peak:310, placementFee:40 },
          "apt-single": { name:"Student Apartment Single 相部屋バス 自炊（専用バス+€50/週）", low:345, peak:530, placementFee:40 },
          "apt-studio": { name:"Student Apartment Studio（最大2名・1室あたり）専用バス 自炊", low:495, peak:950, placementFee:40 },
          "res-campushub-twin": { name:"Campus Hub Residence Twin 相部屋バス 自炊（HS 8/29まで）", low:210, peak:300, placementFee:40 },
          "res-campushub-single": { name:"Campus Hub Residence Single 専用バス 自炊（HS 8/29まで）", low:390, peak:575, placementFee:40 },
        },
        airports: { "Malta MLA空港送迎（片道）":25, "Private Premium送迎（片道）":50 }
      },
      "malta30": {
        name: "Malta 30+", country: "Malta", regFee: 55, peakSupp: 25,
        peakStart:"06-27", peakEnd:"09-27",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[300, 255, 240], brackets:[1, 12, 24], extraPerWeek:240, commission:0.25, note:"最低年齢30歳。登録費€55。ハイシーズン割増€25/週(6/29-8/28)は12週未満のコースのみ対象。12週以上の場合は自動加算された割増行を手動削除してください。宿泊は24週以上の予約でハイシーズン料金免除。" },
          "ge24": { name:"General English 24", type:"group", prices:[345, 285, 260], brackets:[1, 12, 24], extraPerWeek:260, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[365, 305, 280], brackets:[1, 12, 24], extraPerWeek:280, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[410, 320, 300], brackets:[1, 12, 24], extraPerWeek:300, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[410, 320], brackets:[1, 12], extraPerWeek:320, commission:0.25 },
          "wwai": { name:"Writing with AI (GE20+10・最大4週)", type:"group", prices:[410], brackets:[1], extraPerWeek:410, commission:0.25 },
          "bizmini20": { name:"Business Mini Group 20 (25歳+)", type:"group", prices:[540], brackets:[1], extraPerWeek:540, commission:0.25 },
          "bizmini30": { name:"Business Mini Group Intensive 30 (25歳+)", type:"group", prices:[670], brackets:[1], extraPerWeek:670, commission:0.25 },
          "escapes": { name:"EC Escapes 50+ (GE20+アクティビティ込・1-2週)", type:"grandline-fixed", priceTable:[0,695,1270], commission:0.25, note:"開催: 5/4, 6/1, 9/28, 10/26開始。2週目€635/週。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:95, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[30], brackets:[1], extraPerWeek:30, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-twin-hb": { name:"Homestay Twin Half Board", low:250, peak:315, placementFee:40 },
          "hs-single-bb": { name:"Homestay Single B&B", low:340, peak:490, placementFee:40 },
          "hs-single-hb": { name:"Homestay Single Half Board", low:360, peak:510, placementFee:40 },
          "apt-twin": { name:"Student Apartment Twin 相部屋バス 自炊", low:220, peak:310, placementFee:40 },
          "apt-single": { name:"Student Apartment Single 相部屋バス 自炊（専用バス+€50/週）", low:345, peak:530, placementFee:40 },
          "apt-studio": { name:"Student Apartment Studio（最大2名・1室あたり）専用バス 自炊", low:495, peak:950, placementFee:40 },
          "res-campushub-twin": { name:"Campus Hub Residence Twin 相部屋バス 自炊（HS 8/29まで）", low:210, peak:300, placementFee:40 },
          "res-campushub-single": { name:"Campus Hub Residence Single 専用バス 自炊（HS 8/29まで）", low:390, peak:575, placementFee:40 },
        },
        airports: { "Malta MLA空港送迎（片道）":25, "Private Premium送迎（片道）":50 }
      },
    }
  },

  // ══ EC Cape Town 2026（EUR）══ ハイシーズンは南半球の夏（1-3月）
  ec_capetown: {
    name: "EC English (Cape Town)",
    currency: "EUR",
    campuses: {
      "capetown": {
        name: "Cape Town", country: "South Africa", regFee: 55, peakSupp: 25,
        peakStart:"01-03", peakEnd:"03-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[345, 270, 240], brackets:[1, 12, 24], extraPerWeek:240, commission:0.25, note:"登録費€55。ハイシーズン割増€25/週は1/5-3/27・12週未満のみ対象。宿泊HSは1/3-3/29。コース+宿泊予約で到着時空港送迎込。" },
          "ge30": { name:"General English 30", type:"group", prices:[450, 380, 325], brackets:[1, 12, 24], extraPerWeek:325, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[450, 380], brackets:[1, 12], extraPerWeek:380, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大4週)", type:"group", prices:[450], brackets:[1], extraPerWeek:450, commission:0.25 },
          "ielts20": { name:"Exam Preparation IELTS (20L・最低4週)", type:"group", prices:[345, 270], brackets:[1, 12], extraPerWeek:270, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:75, commission:0.25, note:"サファリ: 1日€220/3日€395/4日Kruger €1,100。Volunteer デポジット€400・Internship手配料€400。" },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[30], brackets:[1], extraPerWeek:30, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-single-hb": { name:"Homestay Single Half Board（専用バス+€70/週）", low:270, peak:300, placementFee:40 },
          "apt-gp-dorm": { name:"Green Point Student Apt Dormitory（最大8名）相部屋バス 自炊", low:145, peak:175, placementFee:40 },
          "apt-gp-twin": { name:"Green Point Student Apt Twin（2名同時申込のみ）自炊", low:270, peak:300, placementFee:40 },
          "apt-gp-single": { name:"Green Point Student Apt Single ensuite 自炊", low:495, peak:540, placementFee:40 },
          "apt-blackbrick": { name:"BlackBrick Foreshore Studio（最大2名・1室あたり）ensuite 自炊", low:435, peak:520, placementFee:40 },
          "res-dorp": { name:"Dorp Street Residence Single 相部屋バス B&B(平日)", low:270, peak:320, placementFee:40 },
        },
        airports: { "Cape Town CPT空港送迎（片道）":40 }
      },
      "capetown30": {
        name: "Cape Town 30+", country: "South Africa", regFee: 55, peakSupp: 25,
        peakStart:"01-03", peakEnd:"03-29",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20": { name:"General English 20", type:"group", prices:[345, 270, 240], brackets:[1, 12, 24], extraPerWeek:240, commission:0.25, note:"最低年齢30歳。登録費€55。HS割増は1/5-3/27・12週未満のみ。" },
          "ge24": { name:"General English 24", type:"group", prices:[365, 300, 260], brackets:[1, 12, 24], extraPerWeek:260, commission:0.25 },
          "ge26": { name:"General English 26", type:"group", prices:[390, 325, 290], brackets:[1, 12, 24], extraPerWeek:290, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[450, 380, 325], brackets:[1, 12, 24], extraPerWeek:325, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[450, 380], brackets:[1, 12], extraPerWeek:380, commission:0.25 },
          "eitc30": { name:"English in the City (GE20+10・最大4週)", type:"group", prices:[450], brackets:[1], extraPerWeek:450, commission:0.25 },
          "escapes": { name:"EC Escapes 50+ (GE20+アクティビティ込・1-2週)", type:"grandline-fixed", priceTable:[0,695,1270], commission:0.25, note:"開催: 2026/1/5-1/30, 2027/1/11-1/22。2週目€635/週。" },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:75, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[30], brackets:[1], extraPerWeek:30, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "hs-single-hb": { name:"Homestay Single Half Board（専用バス+€70/週）", low:270, peak:300, placementFee:40 },
          "apt-gp-dorm": { name:"Green Point Student Apt Dormitory（最大8名）相部屋バス 自炊", low:145, peak:175, placementFee:40 },
          "apt-gp-twin": { name:"Green Point Student Apt Twin（2名同時申込のみ）自炊", low:270, peak:300, placementFee:40 },
          "apt-gp-single": { name:"Green Point Student Apt Single ensuite 自炊", low:495, peak:540, placementFee:40 },
          "apt-blackbrick": { name:"BlackBrick Foreshore Studio（最大2名・1室あたり）ensuite 自炊", low:435, peak:520, placementFee:40 },
          "res-dorp": { name:"Dorp Street Residence Single 相部屋バス B&B(平日)", low:270, peak:320, placementFee:40 },
        },
        airports: { "Cape Town CPT空港送迎（片道）":40 }
      },
    }
  },

  // ══ EC Dubai 2026（USD）══ ハイシーズンが特殊（notes参照）
  ec_dubai: {
    name: "EC English (Dubai)",
    currency: "USD",
    campuses: {
      "dubai": {
        name: "Dubai", country: "UAE", regFee: 100, peakSupp: 0,
        peakStart:"01-03", peakEnd:"05-16",
        materialsFee: { type:"bracket", brackets:[{maxWeeks:1, fee:7},{maxWeeks:2, fee:14},{maxWeeks:3, fee:21},{maxWeeks:4, fee:28},{maxWeeks:5, fee:35},{maxWeeks:6, fee:42},{maxWeeks:7, fee:49},{maxWeeks:8, fee:56},{maxWeeks:9, fee:63},{maxWeeks:10, fee:70},{maxWeeks:11, fee:77},{maxWeeks:23, fee:84},{maxWeeks:999, fee:105}] },
        courses: {
          "ge20-am": { name:"General English 20 – Morning only", type:"group", prices:[380, 335, 310], brackets:[1, 12, 24], extraPerWeek:310, commission:0.25, note:"登録費$100。ハイシーズン割増$25/週は2026/11/2-2027/2/26・12週未満のみ対象(自動計算されないため手動でAdd-on追加)。宿泊HSは1/3-5/16と10/17-1/2の2期間(データは1-5月期間で設定・秋冬期は手動確認)。180日ビザ申請費$700。" },
          "ge20-pm": { name:"General English 20 – Afternoon only", type:"group", prices:[310, 270, 245], brackets:[1, 12, 24], extraPerWeek:245, commission:0.25 },
          "ge30": { name:"General English 30", type:"group", prices:[520, 480, 440], brackets:[1, 12, 24], extraPerWeek:440, commission:0.25 },
          "efw30": { name:"English for Work (GE20+10・最大12週)", type:"group", prices:[520, 480], brackets:[1, 12], extraPerWeek:480, commission:0.25 },
          "ielts30": { name:"Exam Preparation IELTS (GE20+10・推奨4週以上)", type:"group", prices:[520, 480], brackets:[1, 12], extraPerWeek:480, commission:0.25 },
          "one2one": { name:"English Plus One-to-One (60分/回)", type:"1to1", pricePerHour:75, commission:0.25 },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[30], brackets:[1], extraPerWeek:30, commission:0.25 },
        },
        accom: {
          "none": { name:"なし", low:0, peak:0 },
          "apt-twin": { name:"Student Apartment Twin 相部屋バス 自炊", low:275, peak:350, placementFee:100 },
          "apt-single": { name:"Student Apartment Single 専用バス 自炊", low:450, peak:600, placementFee:100 },
          "apt-deluxe": { name:"Student Apartment Deluxe Single ensuite 自炊", low:750, peak:1200, placementFee:100 },
          "res-twin": { name:"Student Residence Twin 相部屋バス 自炊", low:250, peak:275, placementFee:100 },
          "res-single": { name:"Student Residence Single ensuite 自炊", low:425, peak:450, placementFee:100 },
        },
        airports: { "Dubai空港送迎（片道）":100, "Dubai空港送迎（往復）":175 }
      },
    }
  },

  // ══ EC Live 2026（EUR・オンライン）══
  ec_live: {
    name: "EC Live（オンライン）",
    currency: "EUR",
    campuses: {
      "online": {
        name: "EC Live オンライン英語", country: "Online", regFee: 35, peakSupp: 0,
        materialsFee: { type:"fixed", fee:30 },
        courses: {
          "premium": { name:"EC Live Premium (週5日・7.5h+コラボ2.5h)", type:"group", prices:[115, 100, 85], brackets:[1, 12, 24], extraPerWeek:85, commission:0.25, note:"登録費€35・教材費€30(固定)。" },
          "standard": { name:"EC Live Standard (週2日・3h・最低2週・火曜開始)", type:"group", prices:[55, 45, 35], brackets:[1, 12, 24], extraPerWeek:35, commission:0.25 },
          "efw": { name:"EC Live English for Work (週2日・3h)", type:"group", prices:[80, 70, 60], brackets:[1, 12, 24], extraPerWeek:60, commission:0.25 },
          "one2one": { name:"EC Live One-to-One (60分/回)", type:"1to1", pricePerHour:70, commission:0.25, note:"5回パック€60/h・10回パック€50/h" },
          "futurelearn": { name:"EC x FutureLearn (最低4週)", type:"group", prices:[30], brackets:[1], extraPerWeek:30, commission:0.25 },
        },
        accom: { "none": { name:"なし（オンライン）", low:0, peak:0 } },
        airports: {}
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
  "elc_malaysia":            { "kuala-lumpur": null },
  "languages_international": { "auckland": null },
  "cisl":                    { "san-diego": 95 },
  "inlingua_sg":             { "singapore": 108 },
  "grandline":               { "philippines": null },
  "ih_bangkok":              { "bangkok": 1350 },
  "lsi_portsmouth":          { "portsmouth": 78 },
  "uci_dce":                 { "irvine": null },
  "ush":                     { "socal-la": null, "socal-sd": null, "norcal": null, "arizona": null, "florida": null, "new-york": null },
  // ── ILSC / Greystone / Junior ──
  "ilsc_australia":   { "adelaide":120, "brisbane":120, "melbourne":120, "perth":120, "sydney":120 },
  "ilsc_canada":      { "montreal":85, "toronto":90, "vancouver":90 },
  "ilsc_dublin":      { "dublin": null },
  "ilsc_delhi":       { "new-delhi": 35 },
  "ilsc_online":      { "hello-english": null, "allo-french": null },
  "greystone_australia": { "all-campuses": null },
  "greystone_canada": { "montreal": null, "toronto": null, "vancouver": null },
  "ilsc_junior_canada":    { "junior-canada": null },
  "ilsc_junior_australia": { "brisbane": null },
  // ── EC English ──
  "ec_usa":      { "boston":155, "newyork":155, "newyork30":155, "sanfrancisco":155, "sandiego":85, "losangeles":155 },
  "ec_canada":   { "montreal":155, "toronto":155, "toronto30":155, "vancouver":155, "vancouver30":155 },
  "ec_uk":       { "london":120, "london30":120, "cambridge":120, "brighton":120, "brighton30":120, "bristol":120, "manchester":120 },
  "ec_dublin":   { "dublin":125, "dublin30":125 },
  "ec_malta":    { "malta":95, "malta30":95 },
  "ec_capetown": { "capetown":75, "capetown30":75 },
  "ec_dubai":    { "dubai":75 },
  "ec_live":     { "online":70 },
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
