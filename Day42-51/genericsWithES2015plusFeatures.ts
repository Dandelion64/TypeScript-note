// Day 47: 泛型應用 X 結合 ES2015+ - TypeScript Generics with ES2015+ Features

export {};

// 今日的主題對於任何系列的讀者應該是很重要的篇章

// 請記得一定要在 tsconfig.json 中做如下設定
// 不然 TypeScript 會不知道這些物件的型別宣告
/*
    {
        "compileOptions": {
            "lib": ["DOM", "ES2015"]
        }
    }
 */

/**
 * ES6 key-value pairs 與集合物件 --- Map & Set
 *
 * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */

// ES6 Map 的重點是可以使用任何型別的值作為鍵

const typedMap = new Map<number, string>();

typedMap.set(1, 'Hello Map()');
console.log(typedMap.get(1));
console.log(typedMap.has(1));

// ES6 Set 為數學上集合的一種體現
// 無序性：沒有任何順序可言
// 互異性：沒有任何元素重複，每個元素互為不同
// 確定性：元素不外乎只有存在於或者是不存在於集合裡面，這兩種情形
// Set 在使用上可以比陣列更輕易地進行不同 Set 物件的聯集 (union)、差集(difference) 或交集 (intersection)

const typedSet = new Set<number>();

typedSet.add(123);
console.log(typedSet.values());
typedSet.clear();

// POINT:
// 若建構一個 ES6 Map 物件
// 建議提供兩個型別參數的值 Map<Tkey, Tvalue>
// 若建構一個 ES6 Set 物件
// 建議提供一個型別參數的值 Set<T>

// TRY: 以下的型別推論結果為？
const unspecifiedTypeMap01 = new Map();
const unspecifiedTypeSet01 = new Set();

const unspecifiedTypeMap02 = new Map([[123, 'Hello World!']]);
const unspecifiedTypeSet02 = new Set([1, 2, 3]);

/**
 * ES6 Promise 物件
 */

// Promise 物件可以針對非同步事件 (Asynchronous Events)
// 進行狀態機 (State Machine) 式的編程操作:
// 狀態有下列三種: pending, resolved, rejected

const request = new Promise((resolve, reject) => {
    // 假設我們有一個陽春的方法處理請求
    sentRequest(url, (response) => {
        if (response.status === 200) {
            resolve(response.data);
        } else if (response.status === 404) {
            reject('404 Not Found');
        } else if (response.status === 500) {
            reject('500 Internal Server Error');
        } /* 可能有其他不同狀態... */
    });
});

request
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

// ES6 Promise Flow 參考圖
// Ref: https://ithelp.ithome.com.tw/upload/images/20191014/201206146YgsclLifq.png

// Promise 可以一直串連成鏈狀結構

new Promise((resolve, reject) => {
    // Do something...
})
    .then((result01) => {
        // Do something...
        return new Promise((resolve, reject) => {
            // Do something...
        });
    })
    .then((result02) => {
        // Do something...
        return new Promise((resolve, reject) => {
            // Do something...
        });
    })
    .then((result03) => {
        // Do something...
        return new Promise((resolve, reject) => {
            // Do something...
        });
    });
// 可以一直這樣串接下去...

// 示意圖如下：
// Ref: https://ithelp.ithome.com.tw/upload/images/20191014/201206142bTePWplM3.png

// 回到重點
// Promise 在 TypeScript 中與泛型的使用有關 (Promise<Tresolved>)
// 可以看一下個簡單的範例：

const promise01 = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('succeeded!');
    }, 2000);
});

// 這個檢查機制是真的有用的

const wrongPromise01 = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve(5566);
    }, 2000);
});

// hover: then 和 catch 方法也會提示型別推論結果

wrongPromise01.then().catch();

// 其型別推論結果乍看之下很長
// 我們可以整理如下
/*
    then(
        onfulfilled?:
            (value: string) =>
                string |
                PromiseLike<string> |
                null |
                undefined,
        onrejected?: (
            // 錯誤發生的形式很多元所以是 any
            (reason: any) =>
                // 如果接下的這個 Promise 根本無法被執行完畢就會是 never
                PromiseLike<never> |
                null |
                undefined
        ): Promise<string>
    )
*/

// ASK: 有些讀者可能會疑惑
// 究竟為何會有像是 xxxLike 這種型別
// ex. ArrayLike<T>, PromiseLike<T>
// 這與 TypeScript lib 設定有關
// Ref: https://stackoverflow.com/questions/43712705/why-does-typescript-use-like-types
// 參考資料連結中有良好的範例 但簡單來說就是 xxxLike 會比 xxx 更限縮

// TRY: 試問以下型別推論結果為何？

const unspecifiedTypePromise01 = new Promise((resolve, reject) => {
    // Do something...
});
const unspecifiedTypePromise02 = new Promise((resolve, reject) => {
    resolve(true);
});

const resolvedPromise = Promise.resolve(true);
const rejectedPromise = Promise.reject(false);

// 看起來 Promise<T> 必須很積極地做型別註記

// 以下再測試幾個不同常見的 Promise 物件方法：

/**
 * Promise.all() --- 所有的 Promise 都 resolved 後執行
 */

const promiseAll01 = Promise.all([
    Promise.resolve('123'),
    new Promise<number>((resolve) => resolve(123)),
    new Promise<boolean>((resolve) => resolve(true)),
]);

// WARNING: 如果將其中一個故意 reject 掉
// 還是會用元組的方式來顯示推論結果 (這有點奇怪...)

const promiseAll02 = Promise.all([
    Promise.resolve('123'),
    new Promise<number>((resolve) => resolve(123)),
    new Promise<boolean>((resolve) => resolve(true)),
    Promise.reject(false),
]);

// Maxwell Alexius 認為這應該是一個錯誤的行為

/**
 * Promise.race() --- 所有的 Promise 進行比賽 誰先 resolve 誰就獲勝
 */

// 這裡很明顯應該不會以元組型別來顯示結果
// 而是使用 union 方式推論
// 畢竟所有 Promise 都有被 resolve 的可能

function delay<T>(milliseconds: number, value: T): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, milliseconds);
    });
}

const promiseRace = Promise.race([
    delay<string>(3000, 'Hello World~'),
    delay<number>(1000, 123),
    delay<boolean>(2000, false),
]);

// POINT:
// Promise.race() 通常好用的地方在於實現 Request Timeout 功能

/*
    const mightTimeout = Promise.race(
        arbitraryRequest,
        rejectDelay<string>(3000, '408 Timeout after 3 seconds...'),
    );
*/

// 上述範例是讓 request 和一個計時器比賽
// 3 秒內沒有 resolve 就會被 rejected
