// Day 48: 非同步概念 X 脫離巢狀地獄 - TypeScript Generics with Asynchronous Programming I. Promise Chain

export {};

// 本日的內容會從基礎講起
// 同步非同步的部分我就略過不筆記了

/**
 * Event Loop
 */

// 1. Call Stack

// 在 JS 的世界裡變數作用域只有兩種：
// 全域 (Global Scope) 和函式作用域 (Functional Scope)
// 每一個作用域都有屬於自己的執行環境 (Execution Context)

// ============================================================
// Execution Context:
// 泛指程式碼執行到的位置之資料狀況

// 比方說假設我們在函式作用域內宣告變數 a
// a 的資料就會記錄在該函式作用域內的執行環境
// 一旦該函式執行結束回到全域時 該函式執行環境會被移除
// 因此變數 a 的資料也會被清除掉
// 全域的執行環境就沒有了 a 的資料導致其無法使用變數 a

// 上面所舉的範例與 Execution Context 中的 Variable Object 有關

// POINT: 關於 Execution Context
// Ref: https://medium.com/itsems-frontend/javascript-execution-context-and-call-stack-e36e7f77152e
// Ref: https://shawnlin0201.github.io/JavaScript/JavaScript-Execution-Context/
// Ref: https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/
// ============================================================

// 當呼叫一個函式時 一個執行環境會被建立起來 (in Creation Phase)
// 當函式執行結束事 該執行環境會被處理掉
// POINT:
// 這樣的行為跟堆疊 (Stack) 很像
// 而且是每一次呼叫函式 (Call) 都會 push 一個新的執行環境
// 每一次函式執行結束就會 pop 掉該函式的執行環境
// 這就是 Call Stack

// ============================================================
// Stack Overflow 名稱的由來就是
// 一直不斷地推入新的 Execution Context 到 Call Stack 時
// 最後 Stack Size 就會爆掉導致遺失某些資料...
// ex.
/*
    function callsItself() {
        callsItself();
    }
*/
// ============================================================

// 2. Event Table
// 有些 Web API 觸發的事件儲列會配合其他執行緒去處理 (non-Blocking)
// 例如 setTimeout() 和 EventListener
// 這個紀錄要監聽哪些事件的東西 就是 Event Table

// ============================================================
// 有時候遇到龐大的作業可以利用 setTimeout() 切割成小作業
// 這樣可以避免 Blocking
// ============================================================

// Event Queue (Task Queue)
// 一旦事件被觸發了 就會被放進事件儲列中等待

// Event Loop
// 當 Call Stack 被清空時
// Event Loop 會負責將 Event Queue 中的事件放進 Call Stack 中
// 移交給 JavaScript 的單執行緒進行處理

// ============================================================
// REVIEW: 其實還有所謂的 Microtask Queue
// 用來處理像是 Promise 的監聽
// ============================================================

/**
 * 非同步編成的演進史：
 * 1. Callback Hell (Pyramid of Doom)
 * 2. Promise Chain
 * 3. Generator Functions
 * 4. Async Functions
 */

// 1. Callback Hell (Pyramid of Doom)

// 假設我們有一個陽春的 sendRequest()
function sendRequest(
    success: (result: string) => void,
    error: (message: string) => void,
) {
    if (Math.random() > 0.9) {
        // 送出請求可能有約 10% 的錯誤機率
        error('500 Server Error...');
        return;
    }

    const time = Math.random() * 3000;
    setTimeout(() => {
        success('200 Success');
    }, time);
}

// 假設想要依序送出三個請求
// 且必須完成前一個請求才發送下一個請求

// 設定三個計時器
// console.time('1st Request Received');
// console.time('2nd Request Received');
// console.time('3rd Request Received');

sendRequest(
    (result) => {
        console.timeEnd('1st Request Received');
        console.log(`1st attempt ${result}`);

        sendRequest(
            () => {
                console.timeEnd('2nd Request Received');
                console.log(`2nd attempt ${result}`);

                sendRequest(
                    () => {
                        console.timeEnd('3rd Request Received');
                        console.log(`3rd attempt ${result}`);
                    },
                    (message) => {
                        console.log(`Error occured in 3rd attempt ${message}`);
                    },
                );
            },
            (message) => {
                console.log(`Error occured in 2nd attempt ${message}`);
            },
        );
    },
    (message) => {
        console.log(`Error occured in 1st attempt ${message}`);
    },
);

// 這種撰寫方式除了很難以閱讀之外
// 經常會發生函式主體跟錯誤處理間隔很遠的狀況
// 這種撰寫方式的耦合度很高 很難把功能拔出來
// 因此 Promise 物件誕生了

// 2. Promise Chain

// 讓我們將前面的範例改寫成 Promise 版本

function sendRequestAsPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.9) {
            // 送出請求可能有約 10% 的錯誤機率
            reject('500 Server Error...');
            return;
        }

        const time = Math.random() * 3000;
        setTimeout(() => {
            resolve('200 Success');
        }, time);
    });
}

// 設定三個計時器 Again
console.time('1st Request Received');
console.time('2nd Request Received');
console.time('3rd Request Received');

let attempts = 1;

sendRequestAsPromise()
    .then((result) => {
        console.timeEnd('1st Request Received');
        console.log(`1st attempt ${result}`);
        attempts++;

        return sendRequestAsPromise();
    })
    .then((result) => {
        console.timeEnd('2nd Request Received');
        console.log(`2nd attempt ${result}`);
        attempts++;

        return sendRequestAsPromise();
    })
    .then((result) => {
        console.timeEnd('3rd Request Received');
        console.log(`3rd attempt ${result}`);
    })
    .catch((message) => {
        console.log(`Failed in the ${attempts} attempt: ${message}`);
    });

// 這部分也可以每做一個 then 就 catch 一次
// 單純看個人習慣以及是否有需求
// 但要注意的是 Promise 只是將無窮延伸的 Callback Hell 改成垂直延展而已

// REVIEW: 剩下的兩部分會在明天再進行討論！
