// Day 11: 特殊型別 X 無法無天 - Any & Unknown Type

export {};

// POINT: any 會造成 TypeScript 跳過檢測 使變數容易引發非預期行為的機率大幅上升

// 首先讓我們簡單統整 any 出現的時機
// 1. 遲滯性指派 (Delayed Initialization) 簡單來說就是延遲賦值
// 2. 一般宣告下的函式形式參數 (implicit any)
// 3. 有些函式回傳的值實務上是無法確定型別的 例如 JSON.parse()
// 4. 未註記型別的空陣列 (any[])
// 5. 與 I/O 行為有關
//    例如從外部 CSV 或資料庫中查詢的時候常為陣列或元組 未註記就會是 any[]
//    (REVIEW: 可參考 Day 06)

// unknown 是 TypeScript 3.0 時推出的
// Ref: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type
// 1. TypeScript 3.0 introduces a new top type unknown.
//                                    ^^^^^^^^
// 2. unknown is the type-safe counterpart of any.
//    Anything is assignable to unknown,
//             ^^^^^^^^^^^^^^^^^^^^^^^^
//    but unknown isn’t assignable to anything but itself and any
//    without a type assertion or a control flow based narrowing.
// 3. Likewise, no operations are permitted on an unknown
//    without first asserting or narrowing to a more specific type.

// 結合前兩點 也就是說 unknown 和 any 的共通之處在於
// 只要變數被註記為 unknown 或 any 就可以接受任何型別的值

let anyType: any;
let unknownType: unknown;

anyType = 123;
anyType = 'Any string';
anyType = true;
anyType = null;
anyType = undefined;
anyType = { hello: 'world' };
anyType = [1, true, null, 'Any string in array'];
anyType = () => {
    console.log('?');
};
anyType = new Object();

unknownType = 123;
unknownType = 'Unknown string';
unknownType = true;
unknownType = null;
unknownType = undefined;
unknownType = { hello: 'world' };
unknownType = [1, true, null, 'Unknown string in array'];
unknownType = () => {
    console.log('?');
};
unknownType = new Object();

// 而官方又提到 unknown 是一種 top type 而且是 "較安全的 any"
// 原因在於 unknown 不能被指派給 unknown 和 any 以外的變數
// 考慮以下範例：

let isAny: any;
let isUnknown: unknown;

let isNumber: number;
let isString: string;
let isBoolean: boolean;
let isNull: null;
let isUndefined: undefined;
let isAKindOfObjectLiteral: { name: string; age: number };
let isAKindOfArray: number[];
let isAKindOfFunction: () => void;
let isAKindOfObject: Object;

// 任何型別的變數都可以被 any 型別所指派
isNumber = isAny;
isString = isAny;
isBoolean = isAny;
isNull = isAny;
isUndefined = isAny;
isAKindOfObjectLiteral = isAny;
isAKindOfArray = isAny;
isAKindOfFunction = isAny;
isAKindOfObject = isAny;

// 只有 unknown 以及 any 型別的變數可以被 unknown 型別所指派
isNumber = isUnknown; // error
isString = isUnknown; // error
isBoolean = isUnknown; // error
isNull = isUnknown; // error
isUndefined = isUnknown; // error
isAKindOfObjectLiteral = isUnknown; // error
isAKindOfArray = isUnknown; // error
isAKindOfFunction = isUnknown; // error
isAKindOfObject = isUnknown; // error
isAny = isUnknown;
isUnknown = isUnknown;

// 也就是說考慮最初統整的 any 出現時機第五點
// 當遇到 I/O 行為時 開發者可以用不安全的 any 也可以選擇用較安全的 unknown
// 當被註記為 unknown 時使用者必須強行註記該 CSV 回傳值之格式
//                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// 另一個可以使用 unknown 的時機
// 就是寫一個安全的函式把不安全的函式包起來
const safelyParseJSON = (jsonString: string): unknown => {
    return JSON.parse(jsonString);
};

// 官方文件關於 unknown 的第二點最後還提到在兩種狀況下可以進行自由指派
// 1. type assertion
// 也就是進行顯性型別註記
// 不過開發者必須很確定自己在做什麼 才會跟 TS 說這個 unknown 型別的變數其實是某型別
//         ^^^^^^^^^^^^^^^^^^
isString = <string>isUnknown;
isAKindOfArray = isUnknown as number[];

// 2. control flow based narrowing
// 意思是如果根據流程或判斷式的話 可以把 unknown 型別指派到任意型別上
// 直接參考範例吧：

// 如同先前嘗試的一樣 直接指派會跳出 error
isNumber = isUnknown;
// 經過所謂的 Type Guard 縮小型別推論的範疇後就可以進行指派
if (typeof isUnknown === 'number') {
    isNumber = isUnknown;
}
// REVIEW: Type Guard 這個概念會在 Day 17 繼續討論

// 至於官方文件的第三點：
// no operations are permitted on an unknown
// without first asserting or narrowing to a more specific type.
// 則是在說 如果不經由第二點的兩種方法便不可以對 unknown 型別的變數做操作
// (Read-Only 但連呼叫屬性也不行)
// 考慮以下範例：

isAny.KnockKnock;
isUnknown.Hello;

isAny.greets('He..He..He-Hey~Charlie~~~');
isUnknown.response('No~~~Get outta my way!!!');

// 接下來讓我們分別驗證兩種使之可以操作的方式
// 1. asserting
const unknownObj: unknown = {
    hello: 'Charlie The Unicorn',
    response: (content: string) => {
        console.log(content);
    },
};

type Unicorn = {
    hello: string,
    response: (content: string) => void,
};

unknownObj.Hello;
unknownObj.response('No more candy mountain!');

(<Unicorn>unknownObj).hello;
(unknownObj as Unicorn).response('No more candy mountain!');

// 2. narrowing
const unknownPrimitive: unknown = '123';
parseInt(unknownPrimitive, 10);

if (typeof unknownPrimitive === 'string') {
    parseInt(unknownPrimitive, 10);
}

// 讓我們總結一下 unknown 型別的特性
// 假設變數 A 被註記為 unknown 型別
// 1. A 不能呼叫任何方法或屬性 亦不得作為函式或方法之形式參數
// 2. A 不能指派到型別不為 unknown 或 any 的型別 T
// 3. 若 A 被顯性註記為不為 unknown 的任意型別 T
//    則可以進行型別 T 之合理操作
// 4. 若 A 被流程控制限縮為不為 unknown 的任意型別 T
//    則可以在語彙作用域進行型別 T 之合理操作

// ============================================================
// 附錄：
// 官方文件中關於 unknown type 的一些示例
// REVIEW: 後半段可能要學到更後面才看得懂 可以先跳過

// In an intersection everything absorbs unknown
type Ti_01 = unknown & null; // null
type Ti_02 = unknown & undefined; // undefined
type Ti_03 = unknown & null & undefined; // null & undefined (which becomes never)
type Ti_04 = unknown & string; // string
type Ti_05 = unknown & string[]; // string[]
type Ti_06 = unknown & unknown; // unknown
type Ti_07 = unknown & any; // any

// In a union an unknown absorbs everything
type Tu_01 = unknown | null; // unknown
type Tu_02 = unknown | undefined; // unknown
type Tu_03 = unknown | null | undefined; // unknown
type Tu_04 = unknown | string; // unknown
type Tu_05 = unknown | string[]; // unknown
type Tu_06 = unknown | unknown; // unknown
type Tu_07 = unknown | any; // any

// Type variable and unknown in union and intersection
type Tui_01<T> = T & {}; // T & {}
type Tui_02<T> = T | {}; // T | {}
type Tui_03<T> = T & unknown; // T
type Tui_04<T> = T | unknown; // unknown

// unknown in conditional types
type Tuc_01<T> = unknown extends T ? true : false; // Deferred
type Tuc_02<T> = T extends unknown ? true : false; // Deferred (so it distributes)
type Tuc_03<T> = never extends T ? true : false; // true
type Tuc_04<T> = T extends never ? true : false; // Deferred

// keyof unknown
type Tku_01 = keyof any; // string | number | symbol
type Tku_02 = keyof unknown; // never

// Only equality operators are allowed with unknown
function unknownF_01(x: unknown) {
    x == 5;
    x !== 10;
    x >= 0; // Error
    x + 1; // Error
    x * 2; // Error
    -x; // Error
    +x; // Error
}

// No property accesses, element accesses, or function calls
function unknownF_02(x: unknown) {
    x.foo; // Error
    x[5]; // Error
    x(); // Error
    new x(); // Error
}

// typeof, instanceof, and user defined type predicates
declare function isFunction(x: unknown): x is Function;
function unknownF_03(x: unknown) {
    if (typeof x === 'string' || typeof x === 'number') {
        x; // string | number
    }
    if (x instanceof Error) {
        x; // Error
    }
    if (isFunction(x)) {
        x; // Function
    }
}

// Homomorphic mapped type over unknown
type Thmu_01<T> = { [P in keyof T]: number };
type Thmu_02 = Thmu_01<any>; // { [x: string]: number }
type Thmu_03 = Thmu_01<unknown>; // {}

// Anything is assignable to unknown
function unknownF_04<T>(pAny: any, pNever: never, pT: T) {
    let x: unknown;
    x = 123;
    x = 'hello';
    x = [1, 2, 3];
    x = new Error();
    x = x;
    x = pAny;
    x = pNever;
    x = pT;
}

// unknown assignable only to itself and any
function unknownF_05(x: unknown) {
    const v1: any = x;
    const v2: unknown = x;
    const v3: object = x; // Error
    const v4: string = x; // Error
    const v5: string[] = x; // Error
    const v6: {} = x; // Error
    const v7: {} | null | undefined = x; // Error
}

// Type parameter 'T extends unknown' not related to object
function unknownF_06<T extends unknown>(x: T) {
    const y: object = x; // Error
}

// Anything but primitive assignable to { [x: string]: unknown }
function unknownF_07(x: { [x: string]: unknown }) {
    x = {};
    x = { a: 5 };
    x = [1, 2, 3]; // Error
    x = 123; // Error
}

// Locals of type unknown always considered initialized
function unknownF_08() {
    let x: unknown;
    const y = x;
}

// Spread of unknown causes result to be unknown
function unknownF_09(x: {}, y: unknown, z: any) {
    const o1 = { a: 42, ...x }; // { a: number }
    const o2 = { a: 42, ...x, ...y }; // unknown
    const o3 = { a: 42, ...x, ...y, ...z }; // any
}

// Functions with unknown return type don't need return expressions
function unknownF_10(): unknown {}

// Rest type cannot be created from unknown
function unknownF_11(x: unknown) {
    const { ...a } = x; // Error
}

// Class properties of type unknown don't need definite assignment
class C1 {
    a: string; // Error
    b: unknown;
    c: any;
}
// ============================================================
