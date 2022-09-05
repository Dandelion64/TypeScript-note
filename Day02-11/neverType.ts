// Day 10: 特殊型別 X 永無止盡 - Never Type

export {};

// never 型別被 Maxwell Alexius 歸類為特殊型別 (never, unknown, any)
// never 型別其實是在 TypeScript 2.0 就有的東西
// 精確來說 其實是一種函式 (方法) 回傳值的情況
// 和 void 有點相似

// never 型別的概念是程序在函式或方法執行時：
// 1. 無法跳脫出該函式或方法
// 2. 出現例外結果中斷執行

// 讓我們依序討論
// 一般來說讀者看到無法跳脫出函式 想到的就是無窮迴圈 讓我們看個例子
const executesForever = () => {
    while (true) {
        // Stuck in here forever...
    }
};
// hover 會看到其被推論為 () => never

// ASK: 那如果是以下的狀況呢？
const randomNumber = Math.random() * 10;

const probablyExecutesForever = (num: number) => {
    while (num > 5) {
        // Probably stuck in here forever...
    }
};

probablyExecutesForever(4); // (num: number) => void
probablyExecutesForever(6); // (num: number) => void ???
probablyExecutesForever(randomNumber); // (num: number) => void ??????
// ASK: 是不是很奇怪啊？

// POINT: 閱讀一下 TypeScript 2.0 更新 never type 時的文件吧
// Ref: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type
// 整理一下重點如下：
// 1. 官方認為 never 是 primitive type
//    代表 the type of values that never occur.
//    Specifically, never is the return type for functions that never return
//    and never is the type of variables under type guards that are never true.
// 2. never is a subtype of and assignable to every type.
//               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 3. No type is a subtype of or assignable to never
//    (except never itself).
// 4. In a function expression or arrow function with no return type annotation,
//    if the function has no return statements,
//    or only return statements with expressions of type never,
//    and if the end point of the function is not reachable
//    (as determined by control flow analysis),
//    the inferred return type for the function is never.
// 5. In a function with an explicit never return type annotation,
//    all return statements (if any) must have expressions of type
//    never and the end point of the function must not be reachable.

// 其中的前兩點說明 never 是所有型別的子型別且 never 沒有自身之外的子型別
// 而我們開門見山時就提過 never 是用在無法跳脫或出現錯誤中斷的函式中
// 也就是說：任何函式或方法回傳值都包含回傳不了值或例外狀況的情況
// 考慮以下範例：
const probablyThrowsError = (num: number): number | never => {
    if (num <= 0) {
        throw new Error('Not a positive number!');
    }
    return num;
};
// 如果每個函式都要這樣用 union 宣告回傳值也太累了吧...
// 也就是說以下兩種寫法等價
type EitherNumberOrNever_01 = number | never;
type EitherNumberOrNever_02 = number;
// 再讓我們考慮更多狀況吧：
type T_01 = void | never;
type T_02 = void; // 等價
type T_03 = any | never;
type T_04 = any; // 等價

// 改成 intersection 看看
type MustBeNever = number & never;
// REVIEW: Day 17 會再回來討論 never 的擴展形式喔！

// 接下來讓我們再讀一次官方文件：
// never is a subtype of and assignable to every type.
//                           ^^^^^^^^^^^^^
// 也就是說當我們定義一個函式回傳 number 卻發生錯誤的時候
// 其實就是 never 型別被指派去 number 型別 (只是前半句的繞口令)
// 用一個更直白的範例來表達吧：
const mustThrowError = () => {
    throw new Error('Throw new error QQ...');
};
const mustAcceptsNever: never = mustThrowError();
const canAlsoAcceptsNever: number = mustThrowError();

// No type is a subtype of or assignable to never (except itself).
//                            ^^^^^^^^^^^^^
// 也就是說白了 當一個變數被型別註記為 never 對於該變數來說
// 不是這個函式或方法的程序會卡住就是說這部分程式碼有錯誤 (需要 try/catch)
// 舉例來說：
const wontThrowError = () => {
    return 38;
};
const mustBeWrong: never = wontThrowError(); // 邏輯錯誤

// 最後兩點則是在討論函數型別中回傳值的型別推論機制
// 根據 Control-Flow Analysis 此函數不可被執行到結束才能宣告回傳 never
// (也就是說不是無窮就是必定跳出錯誤中斷的函式)
// 範例如下：
const possiblyNotToThrowError = (): never => {
    const possibility = Math.random();
    if (possibility > 0.5) {
        throw new Error('Error thrown...');
    }
};
// hover: A function returning 'never' cannot have a reachable end point.

// POINT: 關於 never 型別的重點總結
// 1. 如果函式可以執行完畢 則會根據 return 值做型別推論 (不 return 就是 void)
// 2. 如果函式永遠無法到達終止點 無條件將輸出值型別推論為 never
// 3. 如果函式回傳值被積極註記為 never 則此函式永遠不能到達終止點
// 4. never 是所有型別的子型別且僅有自身是自身的子型別

// ============================================================
// 附錄：
// 官方文件中關於 never type 的一些示例
const error = (message: string): never => {
    throw new Error(message);
};
const fail = () => {
    return error('Something failed');
};
const infiniteLoop = (): never => {
    while (true) {}
};

// 因為 never 是所有型別的子型別 所以他總是從 union type 中省略
// 並且只要有其他型別被返回 它就會在函數返回型別推論中被忽略
const move_01 = (direction: 'up' | 'down') => {
    switch (direction) {
        case 'up':
            return 1;
        case 'down':
            return -1;
    }
    return error('Should never get here.');
};
// 上述函式的梳理版本
const move_02 = (direction: 'up' | 'down') => {
    return direction === 'up'
        ? 1
        : direction === 'down'
        ? -1
        : error('Should never get here.');
};
const check = <T>(x: T | undefined) => {
    return x || error('Undefined value');
};

// 因為 never 可以被指派給任何型別
// 所以在回呼函式必須回傳明確型別的時候也可以使用回傳 never 的函式;
const test = (cb: () => string) => {
    const s = cb();
    return s;
};
test(() => 'hello');
test(() => fail());
test(() => {
    throw new Error();
});
// ============================================================
