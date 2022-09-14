// Day 43: 泛型註記 X 推論未來 - TypeScript Generics Declaration & Annotation

export {};

// 本篇重點如下：
// 1. Default Type Parameter
// 2. Type Constraint (keyword: 'extends')
// 3. Conditional Types

// ASK: 有沒有想過 Type Alias 套用在 Generics 上的狀況呢？
// 或者 有沒有想過不指定型別參數會發生什麼事？

const numbersArr: Array<number> = [1, 2, 3];
const unspecifiedTypeParamArr: Array = [1, 2, 3]; // error

// 除非型別參數有預設值 (Default Type Parameter)
// 否則缺少任一參數都會跳出 error

// 預設值的語法也和函式相同
// 以 = 給定即可

type DefaultStringDictionary<T = string> = {
    [prop: string]: T;
};

const stringDict: DefaultStringDictionary = {
    message: 'Hello World',
    language: 'TypeScript',
};

const booleanDict: DefaultStringDictionary<boolean> = {
    hasPet: true,
    hasMotorcycle: false,
};

// ASK: 寫到這裡讀者應該也都會有一個疑惑
// T 可以允許各種型別過於自由 能不能加上限制？

/**
 * POINT: Type Constraint
 * 型別參數的限制可以使用 extends 關鍵字配合 Type Alias 處理
 * WARNING:           ^^^^^^^
 */

type Primitives = number | string | boolean | null | undefined;
type PrimitiveArray<T extends Primitives> = Array<T>;

// 實際測試看看

const numberPrimitiveArr: PrimitiveArray<number> = [1, 2, 3];
const stringPrimitiveArr: PrimitiveArray<string> = ['Ya', 'Yu', 'Yo'];

const numberOrStringPrimitiveArr: PrimitiveArray<number | string> = [1, '2'];

const invalidObjectArr: PrimitiveArray<PersonInfo> = [
    {
        name: 'Maxwell',
        hasPet: true,
    },
    {
        name: 'Dandelion',
        age: 92,
    },
];

/**
 * Syntax:  Type Constraint in Generic Type Alias
 * type GT<Tparam extends Tconstraint> = { prop: Tparam}
 */

// TRY: 如果用 intersection 做 Type Constraint？

interface UserInfo {
    name: string;
    age: number;
    hasPet: boolean;
}

interface UserAccount {
    email: string;
    password: string;
    subscribed: boolean;
}

type UserI<T extends UserInfo & UserAccount> = T; // never?
type UserU<T extends UserInfo | UserAccount> = T;

// ASK: 如果想單純限制為單一種型別 又想使用 Type Constraint 呢？

/**
 * POINT: 使用 Conditional Types
 * Ref: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 */

type TypedPrimitiveArray<T extends Primitives> =
    T extends number ? T[] :
    T extends string ? T[] :
    T extends boolean ? T[] :
    T extends null ? T[] :
    T extends undefined ? T[] :never;

const numberOnlyArr: TypedPrimitiveArray<number> = [1, 2, 3];
const stringOnlyArr: TypedPrimitiveArray<string> = ['ba', 'bi', 'bo'];
const invalidPrimitiveUnionArr: TypedPrimitiveArray<number | string> = [1, '2'];

// 可以注意 invalidPrimitiveUnionArr 被推論為 number[] | string[]
// Ref: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

// Generic Function Revisit
// 泛用的函式型別之函式的參數可以註記為泛用函式所宣告的型別參數

function traverseElements<T>(
    values: Array<T>,
    callback: (el: T, index: number) => void,
) {
    for (let i = 0; i < values.length; i += 1) {
        callback(values[i], i);
    }
}

// 以上的範例會遍歷一個陣列
// 我們可以實際使用看看

const numberArrInput = [2, 3, 5, 7, 11];

const traverseCallback = function(el: number, index: number) {
    console.log(`Index ${index} - Value ${el}`);
};

traverseElements<number>(numberArrInput, traverseCallback);

traverseElements<number>([2, 3, 5, 7, 11], function (el, index) {
    console.log(`Index ${index} - Value ${el}`);
});

// REVIEW: 在 Day 04 時我們就提過某狀況下不用對函示積極註記型別
// 這個某狀況就是泛用型別的參數被指定時 可以不用對函示積極註記型別
// 這也是為什麼 Array.prototype 的方法會自動推論輸出型別
// 因為 TypeScript 內建有 Array<T> 這個隱藏泛用型別
