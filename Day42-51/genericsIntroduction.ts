// Day 42: 泛用型別 X 型別參數化 - TypeScript Generics Introduction

export {};

// 本篇重點如下：
// 1. Generics 基礎觀念
// 2. Utility Types

/**
 * 泛用的概念
 */

// 考慮以下宣告：

type Identity<T> = T;

// 其中角括號中的 T 我們稱之為型別參數 (Type Parameter)
// 可以把泛用型別想像成一個型別函式 會代入型別參數的型別 (參數化)

// const shouldBeNumber: Identity<number>;
// 則 Identity<number> 的結果就等同於 number

// POINT:
// 泛用型別就是將型別化名參數化以取得更大的彈性和變化性
//           ^^^^^^^^^^^^^
// 也就是說 type, class, interface 都可以轉換為 Generics
// 此外泛用型別接受多個參數 只要以逗號隔開就可以了

type Dictionary<T> = {
    [prop: string]: T;
};

interface LinkedList<T> {
    head: LinkedListNode<T> | null;
    length: number;
    at(index: number): LinkedListNode<T> | null;
}

interface LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
}

class TypedArray<T> {
    constructor(public value: T[]) {}
}

// 我們實際運用 Dictionary 這個 Type Alias 並帶入 boolean 試試看

const correctDict: Dictionary<boolean> = {
    wentToClub: true,
    playedMahjong: true,
    isEvadingMayor: true,
    hasPoliticalAchievement: false,
};

const incorrectDict: Dictionary<boolean> = {
    koreaNumberOne: true,
    whyKoreaNumberOne: 'No Mayor Evaded...',
};

// POINT: 函式本身也可以轉換為泛用函式
// 常見的有兩種使用方式：

// 1. 函式型別的泛用函式
type operator<T> = (p1: T, p2: T) => T;

const addition: operator<number> = (p1, p2) => p1 + p2;
const concatenation: operator<string> = (p1, p2) => p1 + p2;

// 2. 函式本身是泛用型式 (宣告為泛用函式)
// Function Declaration
function IdentityFuncF<T>(something: T): T {
    return something;
}
// Arrow Function
const IdentityFuncA = <T>(something: T) => something;

// 來看看多有個泛用型別參數的範例

type TypeConversion<T, U> = (input: T) => U;

const isPositive: TypeConversion<number, boolean> = function (input) {
    return input > 0;
};

const anythingToString: TypeConversion<any, string> = (input) =>
    input.toString();

// 其實 TypeScript 本身就有內建一些泛用型別
// 只是撰寫方式不同

type MyArray<T> = T[];

// 內建的是 Array<T> = T[]
// 我們是為了不覆蓋原功能改名

const numericArray: number[] = [1, 2, 3];
const anotherNumericArray: Array<number> = numericArray;
const stringArray: Array<string> = ['Hello', 'World'];
const anotherStringArray: string[] = stringArray;

/**
 * POINT: 條件型別 (Conditional Types)
 * Ref: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 * REVIEW: Day 43 會看到實際撰寫方法
 *
 * POINT: Utility Types
 * Ref: https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

// Utility Type 其實相當便利
// 比方說 Required

// 以前再討論 Optional Property 的時候提過可以用 ? 關鍵字
// 其他非選用的介面屬性只要被綁定 就一定得全部實作
// 而 Require<T> 會強迫所有 T 中的選用屬性轉變為必要屬性

interface PersonalInfo {
    name: string;
    age?: number;
    hasPet?: boolean;
}

const incorrectPersonalInfo: PersonalInfo = {
    name: 'Maxwell',
    age: 20,
    hasMotorcycle: true,
}

const incompletePersonalInfo: Required<PersonalInfo> = {
    name: 'Dandelion',
    age: 92,
}
