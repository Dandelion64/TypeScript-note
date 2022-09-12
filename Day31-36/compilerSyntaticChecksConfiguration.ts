// Day 34: 專案語法 X 嚴格把關 - TypeScript Compiler Syntatic Checks Configurations

export {};

// 專案語法檢查相關設定：

// Linter: 專案自己專屬的 style guide
// 例如 AirBnB 開發出的專案
// Ref: https://github.com/airbnb/javascript

// TypeScript 並沒有內建 Coding Styles 檢查工具
// 原因很簡單 TypeScript 本來就只加上型別註記延伸語法
// 大多數狀況下原生的檢查工具就已經足以勝任
// 即使要對這小部分進行檢查 也已經有 TSLint 等工具
// Ref: https://github.com/palantir/tslint
// (已經被整合進 ESLint 之中)

// 1. strickNullChecks (嚴格檢查 Nullable Types)
// default: false

// 如果將 strickNullChecks 設定為 false
// 則會將 Nullable Types 是為任何型別可以出現的一種形式
// 反過來說 如果將 strickNullChecks 設定為 true
// 則 null 和 undefined 會被視為自身型別
// 只能被指派到自身型別或是 any 型別之上

// 考慮範例如下：

// 遲滯性指派勢必觸發 TDZ
let a: number;
const b = a;
// 但如果將 strickNullChecks 設定為 false
// 就可以成功編譯

// 2. noImplicitAny (禁止 Implicit Any)
// default: false

// 一旦因為未積極註記導致 implicit any 就會跳出 error

// 3. 型別推論檢測相關設定: strict* 系列
// 可以根據自身或專案需求選擇性採用

/*
    strictFunctionTypes
    strictBindCallApply
    strictPropertyInitialization
*/

// 4. 額外語法與型別推論檢測相關設定: no* 系列
// 會比第三點稍微常用一些

/*
    // 不能有未使用的變數
    noUnusedLocals
    // 不能有未使用的形式參數
    noUnusedParameters
    // 不能沒有 Return (除非是 void)
    noImplicitReturns
    // 不能在 switch/case 中缺少 break 導致執行其他狀況
    noFallthroughCasesInSwitch
    // this 被推論為 any 時會跳出 error
    noImplicitThis
*/
