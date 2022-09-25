// Day 50: 非同步函式X非同步程序的同步化-TypeScript Generics with Asynchronous Programming III. Async Functions

export {};

// REVIEW: 延續前一天的內容討論非同步編程的演進
// 雖然原文標題沒有寫出
// 但其實我們還沒討論該怎麼在 TypeScript 中使用 Generator

// 3. Generator Functions (基本介紹請參考昨天的內容)

// 首先要複習一下 Maxwell Alexius 為非同步編程的演進史撰寫的壯闊史詩：
// (因為有點恢宏 在 Day 48 的時候並沒有節錄 請見諒 這會是我們第一次看到它)

/**
 * 啟始於 Callback Hell，
 * 攤平為 Promise Chain，
 * 乘載於 Generator Functions，
 * 演變成 Async Functions。
 */

// ASK: 問題來了 乘載於 Generators 所指的到底是什麼呢？

// 顯然的我們是想要將 Promise Chain 改寫為 Generator 的形式
// 先不要管語法格式 看起來大概會像這樣
/*
    function sendRequestGenerator() {
        const response01 = yield request01();
        const response02 = yield request02();
        const response03 = yield request03();

        return [response01, response02, response03];
    }
*/

// 更簡單的想法是：
// 每一次 yield request 出去時 (Pull 一個 Promise<T>)
// 會將該 request 的 response 回傳 (Push 進該 Promise<T> resolve 的結果)

// 以下是完整一點的範例程式碼 (Promise Chain)：
// 優化了之前的實作方式

type PongResponse = {
    data: string | null;
    status: 200 | 500;
};

function pingRequest(num: number, errorProbability = 0): Promise<PongResponse> {
    return new Promise((resolve, reject) => {
        const probability = Math.random();

        if (probability < errorProbability) {
            reject({ data: null, status: 500 });
        }

        const timeout = Math.random() * 3000;

        setTimeout(() => {
            resolve({ data: `Pong: ${num}`, status: 200 });
        }, timeout);
    });
}

// 這是第三次開啟計時器啦～
// console.time('1st Pong');
// console.time('2nd Pong');
// console.time('3rd Pong');

console.log('Promise Chain Representation:');
pingRequest(1)
    .then((response) => {
        console.log(response.data);
        console.timeEnd('1st Pong');
        return pingRequest(2);
    })
    .then((response) => {
        console.log(response.data);
        console.timeEnd('2nd Pong');
        return pingRequest(3);
    })
    .then((response) => {
        console.log(response.data);
        console.timeEnd('3rd Pong');
    })
    .catch((response) => {
        console.log(`Status: ${response.status}`);
    });

// TODO: 我們終於可以將之轉換成 Generator 形式了！

// FIXME: 這邊的 Annotation 有點過於武斷了
function* pingsGenerator(): Generator<
    Promise<PongResponse>,
    void,
    PongResponse
> {
    const response01 = yield pingRequest(1);
    console.log(response01.data);
    console.timeEnd('1st Pong');

    const response02 = yield pingRequest(2);
    console.log(response02.data);
    console.timeEnd('2nd Pong');

    const response03 = yield pingRequest(3);
    console.log(response03.data);
    console.timeEnd('3rd Pong');
}

// 測試看看
// 注意 Lazy Evaluation 的特性

const pingsIter = pingsGenerator();

type PRP = Promise<PongResponse>;

// Generator 版本用的 Timer
// console.time('1st Pong');
// console.time('2nd Pong');
// console.time('3rd Pong');

(pingsIter.next().value as PRP).then((response01) => {
    console.log('Response 1 received');

    (pingsIter.next(response01).value as PRP).then((response02) => {
        console.log('Response 2 received');

        (pingsIter.next(response02).value as PRP).then((response03) => {
            console.log('Response 3 received');

            pingsIter.next(response03);
        });
    });
});

// ASK: 讀者或許會有疑問 覺得寫起來非常冗長
// POINT: 事實上 上面的那段過程可以用遞迴來處理

function runGenerator(gen: () => Generator) {
    const iter = gen();

    // TODO: 在這裡用上遞迴
    function recursiveIteration(pushResponse: any) {
        const result = iter.next(pushResponse);
        if (result.done) return;

        (result.value as Promise<any>).then((response) => {
            recursiveIteration(response);
        });
    }

    (iter.next().value as Promise<any>).then((response) => {
        recursiveIteration(response);
    });
}

runGenerator(pingsGenerator);

// 此外 這樣的寫法的好處在於
// 可以使用平常撰寫指令式程式碼的想法來做 Error Handling

// FIXME: 這邊的 Annotation 有點過於武斷了
function* newPingsGenerator(): Generator<
    Promise<PongResponse>,
    void,
    PongResponse
> {
    try {
        const response01 = yield pingRequest(1);
        console.log(response01.data);
        console.timeEnd('1st Pong');
    } catch (err01: any) {
        throw new Error(err01);
    }

    try {
        const response02 = yield pingRequest(2);
        console.log(response02.data);
        console.timeEnd('2nd Pong');
    } catch (err02: any) {
        throw new Error(err02);
    }

    try {
        const response03 = yield pingRequest(3);
        console.log(response03.data);
        console.timeEnd('3rd Pong');
    } catch (err03: any) {
        throw new Error(err03);
    }
}

// 這樣在錯誤處理方面就比較一目了然對吧
// Generators 將 Promise Chain 中的每個 Promise
// 拆解為迭代器中的一個個元素
// 元素和元素間可以自由添加任何邏輯 (incl. Error Handling)
// 這使得我們可以專注在程序的敘述過程上

// POINT: Generators 在非同步編程的演進中的角色
// 1. 運用 Push-Pull Model 結合 Recursion 可以取代 Promise Chain
//    (Recursion 就是模擬 Chaining)
// 2. 可以在 Generators 內部：
//    a. 對 response 進行 Data Reshaping
//    b. 進行 try/catch/finally 錯誤處理
//    c. POINT: 甚至 yield Promise.all([...]) 做平行化處理
//    (藉由 yield 方式寫得很像是 Synchronous)
// 可以參考以下這個 Github Repo. 來學習更多 Generator 相關知識
// Ref: https://github.com/tj/co

// 4. Async Functions

// 實際上這個演變就非常簡單了
// 就是將 Promise Chain 改寫成 Generator 的那個格式：
// * 將 Generator Function 改成 Async Function 寫法
// * 將 yield 關鍵字改為 await

async function pingsAsyncFunc() {
    try {
        const response01 = await pingRequest(1);
        console.log(response01.data);
        console.timeEnd('1st Pong');
    } catch (err01: any) {
        throw new Error(err01);
    }

    try {
        const response02 = await pingRequest(2);
        console.log(response02.data);
        console.timeEnd('2nd Pong');
    } catch (err02: any) {
        throw new Error(err02);
    }

    try {
        const response03 = await pingRequest(3);
        console.log(response03.data);
        console.timeEnd('3rd Pong');
    } catch (err03: any) {
        throw new Error(err03);
    }
}

// hover: 輸出為 Promise<void> 因為沒有 return

console.log('Using Async Function:');
console.time('1st Pong');
console.time('2nd Pong');
console.time('3rd Pong');

pingsAsyncFunc().then(() => {
    console.log('Request Process Ended!');
});

// TRY: 請問型別推論結果為？

async function returnSomething() {
    return 42;
}

// 可以看到 Async Function 回傳的值
// 無論是不是非同步相關的東西 都會包進 Promise 中

// 請進行以下一系列嘗試

function delayAfter<T>(milliseconds: number, value: T): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, milliseconds);
    });
}

// TRY: 請問以下程式碼會如何運作？

async function example01() {
    const message = await delayAfter(3000, 'Hello World~');

    console.log(message);
}

example01();

// TRY: 請問以下程式碼會如何運作？
// TypeScript 又會對 await 關鍵字下怎麼樣的提示訊息？

async function example02() {
    const message = await 'Hello World~~';

    console.log(message);
}

example02();

// TRY: 請問以下會印出怎麽樣的訊息？延遲時間為何？

async function example03() {
    const result = await Promise.race([
        delayAfter(5000, 'Hello World~~~'),
        delayAfter(3000, 123),
        delayAfter(4000, true),
    ]);

    console.log(result);
}

example03();

// TRY: 請問以下會印出怎麽樣的訊息？延遲時間為何？

async function example04() {
    const result = await Promise.all([
        delayAfter(5000, 'Hello World~~~~'),
        delayAfter(3000, 1234),
        delayAfter(4000, true),
    ]);

    console.log(result);
}

example04(); // WARNING: 會印出一個陣列

// TRY: 請問以下的程式碼差異為何？

async function example05_01() {
    return await Promise.resolve(12345);
}

async function example05_02() {
    return Promise.resolve(12345);
}

example05_01();
example05_02();

// TRY: 請問以下的程式碼會如何運作？

async function example06_01() {
    console.log('First async function called.');
    return await delayAfter(1000, 'Hello~~~~~~');
}

async function example06_02() {
    const result = await example06_01();
    console.log('Second async function called.');

    await delayAfter(2000, 'World~~~~~~');
    return result;
}

example06_02().then(console.log);

// TRY: 如果想要設計一個 Request Timeout Feature
// 並且進行錯誤處理 該如何利用 Async Function 與 Promise 設計？

// Promise.race() 配合一個 throw timeout error 的 racer.

// TRY: 如果 Async Function 被積極註記為輸出 Promise<number> 代表？
// 如果 Async Function 被積極註記為非 Promise<T> 類型的物件又會如何？

// POINT: 以下進行總結：

// Async Function 是利用 Generator 結合 Promise Chain 而來
// 是 ES7 的標準 具有以下優點：
// 1. 可讀性大幅提升
// 2. 可使用 await 等待 resolve 結果
// 3. 錯誤處理更為直觀
// 4. 非同步程序也可以進行高度抽象化
//    ^^^^^^^^^^^^^^^^^^^^^^^^
// 5. 可以互相組合為巢狀結構
// 6. await Promise.all() 可以進行平行化處理
// 7. await Promise.race() 可以執行最先執行完畢的結果

// 非同步函式的推論結果必須要是 Promise<T> 類型的結果
// 如果積極註記為非 Promise<T> 的物件會被 TypeScript 警告
