// Day 31: 專案監控 X 編譯設定 - TypeScript Compiler Compile Configurations

export {};

// 這系列主要會討論三件事情
// 1. Compiler
// 2. Webpack
// 3. Façade Pattern (外觀樣式)

// REVIEW: tsconfig.json
// Docs: https://www.typescriptlang.org/docs/handbook/compiler-options.html

// 在開始討論前 我們要先知道一些關於 tsc 指令的狀況
// tsc (將會根據 tsconfig.json 的設定來做編譯)
// tsc *.ts (忽略 tsconfig.json 直接編譯)
// 所以如果想使用 tsc 指令配合設定的話
// tsc --<config-1> <config-1-value> --<config-2> <config-2-value> ...
// ex. tsc --target ES5

// POINT: 此外 TypeScript 在編譯時會將型別系統的註記拔除

// 專案相關設定：

// 1. target (編譯語言版本)
// default: "ES3"

// ES3 和 ES5 差不多但 ES6 開始會差很多

// 2. lib (引入功能層面支援)
// default: []

// 參考官方文件會發現 lib 可以接受的值特別多
// 用來補足宣告性群組 (Declaration Group)
// 常用到的有 "DOM" (window, document, ...), "ES2015" (object.assign()...) 等
// 可以理解成如果有在 lib 中做設定 TypeScript 會幫忙宣告
/*
    declare interface Window {}
    declare interface Document {}
*/
// 宣告性註記的意義在於
// 如果不提前告訴 TypeScript
// TypeScript 會將其推論為 any 型別
// REVIEW: declare 關鍵字會在後續篇章中討論到 (Day 37)

// ============================================================
// 有些人可能會感到疑惑
// ASK: 箭頭函式也是 ES6 語法 為什麼不用經過 lib？

// POINT: TypeScript 可以接受任何語法層面的東西
// 例如 let/const, destructuring assignment, arrow function,
//     class declaration, computed properties, rest-spread operator,
//     generators (迭代器產生函式的語法) ...

// 但像是 Promise, Symbol, Array 的擴充方法 (ex. Array.prototype.findIndex())
// 這些是可以利用 polyfill 實現的功能
// ============================================================

// 3. module (模組系統)
// default: "commonjs"

// a. CommonJS
// 特點是使用 require/exports (node.js 使用 module.exports)

// b. AMD, Asynchronous Module Definition
// 由 CommonJS 延伸而來 使用 define 關鍵字進行非同步載入
// 有名的框架是 RequireJS
// Ref: https://ithelp.ithome.com.tw/articles/10120521

// c. ES6 Module System
// 使用 import/export

// ============================================================
// 備註：
// 其實還有 UMD, System 等方式
// 不過等遇到了再去查詢就可以了

// 通常 AMD 或 System 那類方式編譯後的結果必須用特殊的 Module Loader
// AMD 可以使用 RequireJS
// System 可以使用 SystemJS
// ============================================================

// ASK: 使用 "module": "ES6" 作為編譯設定會發現有沒有編譯好像沒差？
// 其實並不是沒差 而是我們還未進行打包 (bundle)
// 所以編譯結果會有多個檔案

// 剩下的部分要留待明天囉～
