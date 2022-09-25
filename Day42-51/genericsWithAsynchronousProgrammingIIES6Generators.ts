// Day 49: 非同步迭代 X 無窮地惰性求值 - TypeScript Generics with Asynchronous Programming II. ES6 Generators

export {};

// REVIEW: 延續前一天的內容討論非同步編程的演進

// 3. Generator Functions

// Generators 可以看作是 JavaScript 版本的產生迭代器的 Factory Method
//                                     ^^^^^^^^^^^^^^^^^^^^^^^^^

// ============================================================
// 若想要追求名詞的精確性
// Generator Functions 並不是用 OOP 來達成
// 而是單純的一個函式作為 Factory Method
// 因此 Generator Functions 應該要看作 Factory Function (而非 Method)

// 但是 Design Pattern 這本書中並沒有所謂的 Factory Function 這種說法
// 總之該怎麼用自己的話語來理解 這部分應該是自由的吧
// 讀者也可以嘗試內化
// ============================================================

// 如果有 Python 經驗的人 應該對 Generators 並不陌生
// 差別僅在於如果迭代器已經到尾端 繼續呼叫 next() 時
// Python 會拋出 Out of Bound 之類的 Exception
// 而 JavaScript 不會
// 這有點啞巴型錯誤處理的味道 像是 jQuery 選取 DOM 中不存在的元素不報錯

// 以下是一個陽春的 Generator Function
// 注意語法中要多加一個 * 並改用 yield 關鍵字做輸出

function* numbersIteratorGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

// 以上的 numbersIteratorGenerator 為產生某種迭代器的函式
// 使用如下：

const numbersIter = numbersIteratorGenerator();

console.log(numbersIter.next());
console.log(numbersIter.next());
console.log(numbersIter.next());
console.log(numbersIter.next());
console.log(numbersIter.next());
console.log(numbersIter.next());
console.log(numbersIter.next());

/*
    { value: 1, done: false }
    { value: 2, done: false }
    { value: 3, done: false }
    { value: 4, done: false }
    { value: 5, done: false }
    { value: undefined, done: true }
    { value: undefined, done: true }
*/

// 這裡將迭代器的元素邏輯
// 用一個函式的流程將迭代的元素改成用 yield 關鍵字進行輸出
// 並且在輸出時的結構為具有 value 和 done 這兩個 key 的 object
// 分別代表當前迭代元素之值以及迭代器的狀況 (迭代完畢時為 true)

// TRY: 請問以下兩者的差別是？

function* tryGenerator01() {
    yield 1;
    yield 2;
    yield 3;
}

function* tryGenerator02() {
    yield 1;
    return 2; // return 後的 generator 輸出 done 將會是 true
    yield 3;
}

// TRY: 請問以下的 console.log() 印出順序？

function* generatorFunc() {
    console.log('Iterator created...');

    yield 1;
    yield 2;
    yield 3;
}

console.log('Before creating iterator');
const tryIterator = generatorFunc();
console.log('After creating iterator');

console.log('Before invoking 1st next() method');
console.log(tryIterator.next()); // WARNING: 竟然是這裡才印...
console.log('After invoking 1st next() method');

// TRY: 請問以下會出現怎麼樣的結果？

function* fibonacciFunc() {
    let n0 = 1;
    let n1 = 1;

    while (true) {
        yield n0;

        // ES6 Destructuring Assignment
        [n0, n1] = [n1, n0 + n1];
    }
}

const tryFibSeries = fibonacciFunc();
for (let i = 0; i < 10; i++) {
    console.log(tryFibSeries.next());
}

// Generators 的型別推論
// 可以藉由 hover 來查看
// 比方說 numbersIteratorGenerator 的型別推論為
/*
    Generator<1 | 2 | 3 | 4 | 5, void, unknown>
*/
// 有三個型別參數

// 我們可以在 node_modules/typescript/lib.es2015.generator.d.ts 查看
/*
    interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
        // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
        next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
        return(value: TReturn): IteratorResult<T, TReturn>;
        throw(e: any): IteratorResult<T, TReturn>;
        [Symbol.iterator](): Generator<T, TReturn, TNext>;
    }
*/

// POINT: 原來 Generator 是一個 interface
// 擴充自 Iterator<T, TReturn, TNext>

// Declaration File 中：
// next() 方法就是輸出 TNext 型別
// return() 方法就是輸出 TReturn 型別
// throw() 方法看起來是錯誤處理時的方法
// REVIEW: [Symbol.iterator]() 之後再視情況補充吧

// 也就是說 Iterator 這個泛用型別的型別參數分別為 T, TReturn, TNext
// 分別對應我們前述範例的 1 | 2 | 3 | 4 | 5, void, unknown
// 1 | 2 | 3 | 4 | 5 是 yield 輸出元素的 union
// void 是因為我沒沒有使用 return 表達式
// REVIEW: 至於 TNext 我們會在下一篇補充 (Day 50)

// 所以如果我們正常使用 Generator 的迭代器 推論結果會很有趣
const numbersIter02 = numbersIteratorGenerator();
const numbersIter02Element = numbersIter02.next();
// hover: IteratorResult<1 | 2 | 3 | 4 | 5, void>

// 我們可以在 node_modules/typescript/lib.es2015.iterable.d.ts 查看
/*
    type IteratorResult<T, TReturn = any> =
        IteratorYieldResult<T> |
        IteratorReturnResult<TReturn>;
*/

// 也就是說 TNext 是 yield 輸出和 return 輸出的 union
// 所以迭代結束前會是 1 | 2 | 3 | 4 | 5 而結束後會是 void
// (實際上迭代結束是輸出 { value: undefined, done: true })

// POINT: 輸入與輸出的 Push-Pull Model
// 我們會利用 Declaration File 中的敘述討論
// 請自行查找

// next():
// next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
// 也就是說所有形式參數 (...args) 只能為兩種情形：
// [] 代表沒有任何參數
// TNext 代表只能有一個符合 TNext 的參數 (別忘了這是 Tuple)
//          ^^^^^^^^^

// ASK: 問題來了 有沒有想過我們呼叫 next() 方法時傳入參數的意思是什麼呢？

function* summationGenerator(
    defaultValue = 0,
): Generator<number, void, number> {
    let total = defaultValue;

    while (true) {
        total += yield total;
    }
}

const summationIter = summationGenerator();

console.log(summationIter.next(5)); // 0
console.log(summationIter.next(7)); // 7
console.log(summationIter.next(11)); // 18

// POINT: Generators 的性質
// 1. 產出的迭代器不會馬上動作
//              ^^^^^^^^^^
// 2. 執行過程方面
//    呼叫第一次的 next() 方法時會執行到第一個 yield 位置並輸出
//    如果沒有 yield 則會執行到 return 位置並輸出
// 3. 迭代器只要在第 n 次呼叫 next() 方法時帶入任何值
//    該值就會取代前一個 yield 關鍵字的位置
//           ^^^^^^^^^^^^^^^^^^^^

// 簡單地整理一下：
// 1. 第 n 次呼叫 next() 方法時 會執行到第 n 個 yield 位置
// 2. 第 n 次呼叫 next() 方法時 填入的參數會取代第 n - 1 個 yield 位置
// (第一次呼叫 next() 的參數值沒有用 第一次呼叫通常都是在初始化迭代器)

// POINT: Maxwell Alexius 要再給迭代器的這些特性下兩個名詞：
// 呼叫 next() 取出值的過程 稱為 Pull (一般叫做 Pull System)
// 呼叫 next() 並填入參數的行為以改變後續輸出 稱為 Push (Push System)

// POINT: 也就是說 Generators 有個優點
// 普通的 Iterator Pattern 中的 Iterator 是靜態的 (Static)
// 然而 ES6 Generators 可以藉由 Push-Pull System 來動態更改輸出

// POINT: 此外動態迭代器還有一個特點 叫做惰性求值 (Lazy Evaluation)
// ASK: 還記得我們在之前實作的時候常常在迭代器中放置一個 while loop 嗎？
// 首先 讀者有沒有想過 有沒有辦法表示一個數列代表所有的正整數？
// 一般來說可能會認為電腦的 Memory 是有限的
// 無法以陣列承載無窮多的正整數
// Space Complexity 更大的 Linked List 也不用說

// 不過 設想一個情境 如果我們不是馬上使用 而是需要的時候再用呢？
// 以下範例可以達成前面說的目標：

function* positiveNumberIterator() {
    let number = 1;

    while (true) {
        yield number;
        number += 1;
    }
}

// 以上的 positiveNumberGenerator
// 產出的確實是迭代器行為
// 表達的是一個全部都是正整數的數列
// 跟普通使用陣列的情形相比：
/*
    [1, 2, 3, 4, ..., n, n + 1, ...]
*/
// 完全是不一樣的
// Generator 在需要用到值的時侯再呼叫 next() 方法就可以了
//             ^^^^^^^^^^^^^
// 跟一開始就必須積極寫出值的行為 Generator 可以較晚再求出值
// 這個行為就叫做惰性求值 (Lazy Evaluation)
// 關於程式設計中的這個 Lazy 的概念可以回想 Lazy Load
// REVIEW: 或是之前在講 Singleton 的時候的 Lazy Initialization (Day 23)

// 而與惰性求值相對的是積極求值 (Eager Evaluation)
// 一般程式語言的任何表達式 (Expressions) 基本上都是積極求值的 例如：
// 1. 賦值表達式 (Assignment Expression)
//    ex.
//    let a = 1;
//    上述敘述會立刻執行 可以查詢關於 Memory Allocation 相關的行為
// 2. 運算表達式 (Arithmetic Expression)
//    ex.
//    3 + 5;
//    上述敘述會立刻求值得出結果 8
// 3. 邏輯表達式 (Logical Expression)
//    ex.
//    10 >= 8
//    上述敘述會立刻比對邏輯求出 boolean 值
// 4. 函式／方法的呼叫 (Function/Method Invocation)
//    ex.
//    Math.pow(2, 3)
//    上述敘述會立刻運算出結果 8
// POINT:
// 積極求值的優點在於事實一到就會立刻進行
// 但隨之而來的缺點在於若是消耗資源過大很容易有程式卡住的情形

// 由於光是介紹 Generator 就已經用了上萬字 剩餘部分會明天繼續討論～
