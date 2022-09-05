// Day 06: 陣列與函式 X 陣列與元組 - Array & Functions & Tuples

export {};

// REVIEW: 還記得 Day 04 時曾經提過
// 部分狀況下不需要積極對函式 output 註記型別嗎？

// 今天就是要討論這個狀況：
// 比方說：Callback Functions (大部分狀況下)
const numbers = [1, 2, 3];
const mappedNumbers = numbers.map((num) => num * 2);

// ============================================================
// POINT: map, filter, reduce 都是很常見處理陣列這類串列型資料的好方法
// ASK: 原因為何？

// 假設想要讓陣列中的每個值變為原先的兩倍
// 最簡單效能也最好的辦法 是使用 for loop
// 但是在可讀性上 這些方法可以讓形式變得更簡單

// 以上處理數值的過程稱之為 Mapping (映射)
// 也可以稱之為 Transformation (轉換)

// 這部分的討論 可以搜尋以下關鍵字深入了解
// Functional Programming v.s. Imperative Programming
// ============================================================

// 回到主題 那什麼時候該對回呼函式積極做型別註記呢？
// POINT: 部分回呼函式之所以不需要對參數作註記
// 是因為有牽扯到後續會講到的 Generics 泛用型別的機制與實作
// REVIEW: 這部分要到 Day 42 才會進行討論

// POINT: 但是我們一樣可以先有個大概的觀念
// 我們可以設計出讓 TypeScript 能夠藉由泛用型別參數所獲取的外部型別資訊
// 提前預知到未來的程式碼執行的狀況下
// 對於各種變數、函式的輸入輸出、類別屬性與方法的型別等等 ... 的型別推論
// 型別化名（Type Alias）的運用在大部分的狀況下也可以取代積極註記的必要性
// REVIEW: Type Alias 在 Day 08 就會討論到囉

// ============================================================
// POINT: 接下來討論 TypeScript 新增的型別
// 元組 (Tuples) 與 列舉 (Enums)
// 其中的元組長得和陣列很像喔

// 先記下一個重點：
// 當元組值被直接指派到變數時，必需進行積極型別註記
// 而被指派元組型別的變數也必需進行積極註記
// 綜合以上觀點，只要遇到元組必須要進行註記行為

// 假設今天我們有如下資料 紀錄汽車廠牌 車型 顏色與出廠日期
const BMWMotor = [
    'BMW',
    'motorcycle',
    'silver-pink', // pink????
    new Date(2019, 2, 17),
];
const JaguarOffRoad = [
    'Jaguar',
    'off-road',
    'royal-blue',
    new Date(2019, 1, 9),
];
const ToyotaRV = [
    'Toyota',
    'recreational',
    'ivory-white',
    new Date(2019, 3, 15),
];
// 顯然這些資料會被推論為 (String | Date)[]
// 但明明只有最後一個會是 Date 呀...

// 為了解決這種情形 TypeScript 新增了元組型別
// let A: [T1, T2, T3] = [V1, V2, V3];
// 前述的狀況便可以這樣宣告
const car: [string, string, string, Date] = [
    'Car',
    'Type',
    'Color',
    new Date(2022, 9, 1),
];

// 我們可以將其宣告為自定義型別 這就是型別化名 (Type Alias)
// Syntax: type <custom-type-name> = <your-type>
type Vehicle = [string, string, string, Date];
const motor: Vehicle = ['Lala', 'Lulu', 'Lele', new Date(1970, 1, 1)];

// WARNING: 元組的缺點是 只比對型別而不比對實際內容
// POINT: 建議以 JSON 物件格式來配合元組使用
// 除了更具有描述性 也不會有元組裡型別相同但資料意義順序有差的問題
// 考慮以下兩種型別推論結果
// 1.
/*
    [string, string, string, Date]
*/
// 2.
/*
    {
        brand: string,
        type: string,
        color: string,
        manufactureDate: Date,
    }
*/
// 一定是後者更為明確對吧！

// 因此元組雖然並不困難 卻不常用
// 大概只會在以下兩種狀況下使用
// （一）人類可以直接認知的規則
// 例如點座標: type Point = [number, number];
// （二）從 CSV (或資料庫／陣列型資料) 讀取的結果
// 由於 TS 不可能知道該資料被解析後的型別 會自動推論為 any (也可能找到空陣列)
// ============================================================
