// Day 07: 列舉型別 X 主觀列舉 - Enumerated Types

export {};

// Enum: enumerated type 列舉型別

// 列舉的使用非常常見 能夠適當地判斷什麼時候使用列舉
// 會對專案的便利性以及可維護性大有幫助

// 既然叫做列舉型別 也就是說
// 他是一連串主觀上具有共通性 (Similarity) 及獨有性 (Uniqueness) 的東西的集合

// 假設有一系列的資料集合 S
// 數學意義上必須具有無序性、互異性以及確定性
// 無序性：元素沒有排列順序
// 互異性：元素互不重複
// 確定性：比方說 家庭可以用集合表示為生兒子 生女兒 都有 或頂客族 不會有其他狀況

// 列舉 v.s 陣列和元組
// 陣列和元組重視順序 且子元素可能重複

// 那究竟哪些資料適合使用 Enum 型別呢？
// 例如交通方式、星期幾、檔案管理權限...

enum WeekDay {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

// 定義元組的時候 不使用關鍵字 直接宣告
// const tuple_01: [number, string, number];
// const tuple_02: [string, string ,number] = ['hu', 'ha', 1];
// 定義列舉的時候 使用 enum 關鍵字 不需要等號
// enum Enum_01 { ... }

// 使用列舉時 可以用物件呼叫屬性的方式來表達

const weekDayOfBirthday = WeekDay.Monday;
const TGIF: WeekDay = WeekDay.Friday;

// TypeScript 列舉的反射性
// f(g(x)) = g(f(x)) = x;
// 也就是說知道是禮拜日就知道是當週第一天 知道是當週第五天就知道是禮拜四

const valueOfTGIF = WeekDay[TGIF];
// 請注意 TGIF 看起來是 number 其實是 enum
// valueOfTGIF 是 string

// POINT: 請查看 enum 編譯後的結果 會被編譯成一個 IIFE

// 列舉型別另外還有一些潛規則
// 1. 列舉可以被當成 JSON 物件處理 但是型別依然有別
// 2. 列舉裡的元素對應值從 0 開始
// 3. 列舉裡的元素可以自訂對應的值 後續會遞增上去
// 4. 列舉裡的元素可以自訂對應的字串 但必須定義對應的字串或返回定義對應值為數字型別
// 5. 可以使用列舉裡定義過後的值進行後續自訂對應值的運算
