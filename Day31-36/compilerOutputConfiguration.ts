// Day 32: 專案輸出 X 輸出設定 - TypeScript Compiler Output Configurations

export {};

// 專案輸出相關設定：

// 1. rootDir (專案的主目錄) & outDir (專案輸出位置)
// default: "./"

// 這裡有個特別的狀況要注意
// 就是即使在 rootDir 外還有 ts 檔案也一樣會被編譯
// 雖然 TypeScript 會提醒你違反了規則 但必須手動刪除那些檔案很累人...

// 2. noEmitOnError (不忽略任何專案錯誤 只有出錯就不輸出)
// default: false

// ============================================================
// 其實還有 rootDirs 和 noEmit 等選項
// 等遇到再研究就可以

// rootDirs 允許多個主目錄 可能會需要一些背景知識
// 也需要理解 baseUrl 這個設定
// Ref: https://www.typescriptlang.org/docs/handbook/module-resolution.html

// noEmit 永不輸出
// 通常是用來測試能不能編譯
// ============================================================

// 3. outFile (打包成單個檔案的位置和檔名(url))
// 有潛藏的先決條件
// module 必須設定為 "AMD" 或 "System"
// 此外 outFile 無法同時和 outDir 被套用
// 同時設定時將自動忽略 outDir
// 所以可以使用相對路徑等方式設定 outFile 位置

// 這部分也是需要再研究吧
// Ref: https://github.com/Microsoft/TypeScript/issues/7252
/*
    "Concatenation with commonJs does not make much sense."

    CommonJs expects files to exist at certain places, and changing their location breaks how they are loaded. moreover CommonJs/node modules have different scoping rules than script files, and concatenating them breaks that, so the only way to do this correctly is to wrap them in functions, and add a loader, which is pretty much AMD or system.js.
*/

// Maxwell Alexius: 用 Webpack 可以解決很多問題
// 所以比較不需要去鑽研各種模組系統

// REVIEW: 關於如何以 ReauireJS 等方式執行編譯後的檔案
// 會在介紹完 TypeScript Namespaces 後一併討論 (Day 37)

// 明天將會討論與 Debug 有關的設定
