// tsc --init
// 啟動 TypeScript 專案

// tsc
// 將 .ts 編譯為 .js

// TypeScript 會自動檢查整個專案中有沒有同名的全域變數
// 所以在練習時命名會稍嫌繁瑣

const message_01 = 'Hello World';
function say(something: string): void {
    console.log(something);
    console.log(message_01.toUpperCase());    
}

say(message_01);
