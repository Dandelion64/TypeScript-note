// Day 08: 明文型別 X 格式為王 - Literal Types

export {};

// 其實我們早就看過明文型別了

// 只要是表達廣義物件的格式或是任意型別的複合組合 就隸屬於明文型別
// TypeScript 會將任何廣義物件推論為明文型別

// REVIEW: 先讓我們明確定義型別化名 (Type Alias)
type A = T;
// 使用 type 關鍵字
// 可以簡化程式碼以及進行型別的抽象化 (Type Abstraction)

// 1. 簡化程式碼
// 考慮如下範例
const addOp = (n1: number, n2: number) => n1 + n2;
const substractOp = (n1: number, n2: number) => n1 - n2;
const multiplyOp = (n1: number, n2: number) => n1 * n2;
const divideOp = (n1: number, n2: number) => n1 / n2;
// 假設今天我們想要實作數學次方的運算子並對其做型別註記
const powerOpTry: (n1: number, n2: number) => number = (
    n1: number,
    n2: number
): number => n1 ** n2;
// 這既長又雜亂 且明顯違反了 DRY (Don't Repeat Yourself!) 所以...
type MathOperator = (n1: number, n2: number) => number;
const powerOp: MathOperator = (n1, n2) => n1 ** n2;
// 是不是變得很簡潔呢 我們同時來測試看看 TS 是不是真的有幫我們做型別檢查
const wrongPowerOp_01: MathOperator = (n1: string, n2: string) => n1 ** n2;
const wrongPowerOp_02: MathOperator = (n1: number, n2: number) =>
    (n1 ** n2).toString();

// 接下來讓我們再做一些嘗試
type PersonInfo = {
    name: string;
    age: number;
    hasPet: boolean;
};
// ASK: 請考慮以下的狀況
const printInfo = (info: PersonInfo) => {
    console.log(`Name: ${info.name}`);
    console.log(`Age: ${info.age}`);
    console.log(`Has Pet?: ${info.hasPet}`);
};
// 狀況一：物件的形式沒有被積極註記為 PersonInfo 並直接代入值作為形式參數
printInfo({
    name: 'Martin',
    age: 28,
    hasPet: true,

    hello: 'world',
    nothingSpecial: null,
});
// 狀況二：物件的形式存入變數但不積極註記為 PersonInfo 然後代入值作為形式參數
const infoAboutMartin = {
    name: 'Martin',
    age: 28,
    hasPet: true,

    hello: 'world',
    nothingSpecial: null,
};
printInfo(infoAboutMartin);
// WARNING: 狀況二竟然不會跳出 error
// 這是超級雷區請一定要注意 畢竟是非常常發生的狀況吧...
// 解決方法也很單純 就是對這個變數積極做型別註記後才傳入
const infoAboutMarvin: PersonInfo = {
    name: 'Marvin',
    age: 82,
    hasPet: false,

    hello: 'dlrow',
    nothingSpecial: null, // null 依然沒問題
};
printInfo(infoAboutMarvin); // 此處依然不會跳出 error

// ============================================================
// 參數對於未被註記的變數檢測
// 是只要變數符合參數"對應"之型別格式就通過的 (其他 key 不檢查)
// 這是屬於 Duck-Typing 的技巧

// 這部分會在之後利用 TypeScript Interface 來實作
// REVIEW: 請耐心等待 Day 13

// 這是一個很特別的狀況 這麼彈性的擴充性應該要限定在某條件下
// 例如 TypeScript Interface
// 這樣才會滿足嚴謹的初衷吧
// type 的意義不正應該是 "靜態的資料型別格式" 嗎...
// 但 TypeScript 目前沒有想要更動這個設定
// ============================================================
