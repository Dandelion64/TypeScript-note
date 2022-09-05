// Day 05: 陣列型別 X 型別陣列 - Array Types

export {};

// 皆為數字
const numbers = [1, 2, 3, 4, 5];
// 皆為字串
const strings = ['ha', 'hi', 'hu', 'he', 'ho'];
// 請 hover 看看型別推論的結果
// TypeScript 會將 Element 皆為 T 型別的陣列以 T[] 表示
// TypeScript 會檢查 push() 方法推入的元素是否型別與之一致

// POINT:
// 像這種由相同型別的元素所組成的陣列 一般稱之為 Typed Array
// 或者可以更精準地稱為 Homogeneous Typed Array
// 與之相對的自然就是 Array / Heterogeneous Array

// 讓我們做以下嘗試
const numbersAndStrings = ['ya', 2, 'yu', 4, 'yo'];
// hover 可以看到推論結果為 (string | number)[];
// REVIEW: 關於 union 的細節將會在 Day 17 揭曉

// 接下來我們改為測試元素為物件的陣列試試看 一樣用 hover 觀測推論結果
const objectsArray_01 = [
    { message: 'Ba' },
    { message: 'Bi' },
    { message: 'Bo' },
];
const objectsArray_02 = [
    { message: 'Pa' },
    { message: 'Pi', isMutated: true }, // 突變啦!
    { message: 'Po' },
];
const objectsArray_03 = [
    { message: 'La' },
    { message: 11 }, // 這怎麼看都不是 'Li' 吧...
    { message: 'Lo' },
];
// 其中 objectsArray_02 的型別推論結果長得像這樣
/*
{
    message: string,
    isMutated?: undefined
} | {
    message: string,
    isMutated: boolean
}
*/
// 他其實可以簡寫成這樣
/*
{
    message: string,
    isMutated?: boolean
}
*/
// REVIEW: 原因將會在 Day 08 揭曉

// 如果元素是函式呢
const objectsArray_04 = [
    function addition(num1: number, num2: number) {
        return num1 + num2;
    },
    function substraction(num1: number, num2: number) {
        return num1 - num2;
    },
    function multiplication(num1: number, num2: number) {
        return num1 * num2;
    },
    function division(num1: number, num2: number) {
        return num1 / num2;
    },
];

// 如果是多維異質性陣列 ( nested heterogeneous array ) 呢
const arraysArray = [
    [1, 2],
    ['Aaaaa', 'Iiiii', 'Uuuuu', 'Eeeee', 'Ooooo'],
    [true, false],
    [null, undefined],
];

// 接下來看看陷阱題吧
// WARNING: Question 1. 試猜想其型別推論為何？
const miscellaneousArraysArray = [
    [1, 2, 3],
    ['Ka...', 'Ki...', 'Ku...', 'Ke...', 'Ko...'],
    [true, false, 0, 1, null],
    ['String', undefined],
];
// WARNING: Question 2. 請對照前面的 objectArray_02 來做猜想。
const objectArray_02Revised: { message: string; isMutatd?: boolean } = [
    //                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    { message: 'Pa' },
    { message: 'Pi', isMutated: undefined },
    { message: 'Po', isMutated: true },
];
// REVIEW: 原因將會在 Day 08 揭曉

// 如果將對空陣列 push() 進元素這件事與宣告變數卻延遲賦值做聯想的話 難道...會被推論成 any[]?
const emptyArray = []; // 還真的是...
// POINT: 請對空陣列這種狀況積極做型別註記

// POINT: 此外還有一種狀況是 目前的型別沒有我們需要的型別時 也要積極註記
const canBeEitherNullOrNumbers = [1, 2, 4];
canBeEitherNullOrNumbers.splice(2, 0, null); // warning
const canBeEitherNullOrNumbersRevised: (number | null)[] = [1, 2, 4];
canBeEitherNullOrNumbersRevised.splice(2, 0, null); // pass
