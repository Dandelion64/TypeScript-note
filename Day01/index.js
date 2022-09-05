"use strict";
// tsc --init
// 啟動 TypeScript 專案
// tsc
// 將 .ts 編譯為 .js
const message = 'Hello World';
function say(something) {
    console.log(something);
    console.log(message.toUpperCase());
}
say(message);
