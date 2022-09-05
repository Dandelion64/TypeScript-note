// Day 04: 函式型別 X 積極註記 - Function Types

export {};

// 這部分接續物件型別：
// 讓我們跳過 Enum 和 Tuple 而先討論
// （三）函式型別 (Function Type)

// 請 hover 以查看函式型別的推論結果
const aSimpleFunction = () => {
    console.log('Hi~');
};
const addition = (num1, num2) => {
    return num1 + num2;
};
// Implicit any: TypeScript 對於形式參數的隱性推論是 any
// 由於不知道 input 的型別 TS 自然就也無法推論出 output 的型別
// REVIEW: 然而在某些狀況下 TypeScript 會認得 這部分就之後再討論囉～
const newAddition = (param1: number, param2: number) => {
    //                     ^^^^^^^^        ^^^^^^^^
    return param1 + param2;
};
const shouldBeString: string = newAddition(123, 456);
const shouldBeNumber: number = newAddition(123, 456);

const newNewAddition = (param1: number, param2: number): number => {
    //                                                 ^^^^^^^^
    return param1 + param2;
};

// WARNING: 有些設計出來的函式會需要其輸出值為 any
// 比方說 JSON.parse() 這個方法
const aJSONString = '"{"Hello": "World", "luckyNumber": 777}"';

const parsedJSON = JSON.parse(aJSONString);
// 使用 TS 型別系統進一步明確定義
const parsedJSON_01 = JSON.parse(aJSONString) as {
    Hello: string;
    luckyNumber: number;
};
const parsedJSON_02 = <{ Hello: string; luckyNumber: number }>(
    JSON.parse(aJSONString)
);
const parsedJSON_03: { Hello: string; luckyNumber: number } =
    JSON.parse(aJSONString);
// POINT: 遇到回傳值為 any 的函式應該主動對其做型別註記

// 當瞭解到一個程度之後 可以嘗試完全覆寫函式型別 只要 I/O 型別都一致就不會有警示
let additionRevise = (param1: number, param2: number): number => {
    return param1 + param2;
};
additionRevise = (param1: number, param2: number): number => {
    return param2 + param1 + 5;
};
additionRevise = (param1: string, param2: string): string => {
    return param1 + param2;
};
// 注意若宣告的函示不回傳值 無論是否註記輸出值都會被推論為 void
additionRevise = (param1: number, param2: number): void => {
    console.log(param1 + param2);
};

// 最後做一些小練習吧
const doesItWork_01 = () => undefined;
const doesItWork_02 = (): undefined => undefined;
const doesItWork_03 = (): undefined => {
    console.log('wololo');
};
const doesItWork_04 = (): void => undefined; // WARNING: 不會報錯
