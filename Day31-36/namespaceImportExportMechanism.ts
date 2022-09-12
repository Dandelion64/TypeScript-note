// Day 36: 戰線分散 X 組織集中 - TypeScript Namespaces Import/Export Mechanism

export {};

// 由於今天的內容要切分出各個不同檔案
// 這部分會放在同名資料夾中

// 先建立一個 namespace

namespace Circle {
    export const PI = Math.PI;

    export function area(radius: number) {
        return PI * radius ** 2;
    }

    export function circumference(radius: number) {
        return 2 * PI * radius;
    }
}

// 接下來如果要引用外部的 namespace
// 根據官方文件：
// Ref: https://www.typescriptlang.org/docs/handbook/namespaces.html#splitting-across-files

/*
    Once there are multiple files involved, we’ll need to make sure all of the compiled code gets loaded. There are two ways of doing this.

    First, we can use concatenated output using the --outFile flag to compile all of the input files into a single JavaScript output file.

    // ...

    Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file. If multiple JS files get produced, we’ll need to use <script> tags on our webpage to load each emitted file in the appropriate order.
*/

// 我們先使用第二種方法 比較簡單 (實際上不太好用)
// 我們將 Namespace 都移到測試資料夾中去宣告
// ./namespaceImportExportMechanism
// 請注意引用時要注意順序 (in the appropriate order)

// 觀察編譯結果時可以發現
// 是簡單地使用一個 IIFE 包裝起來實現語彙作用域的

// 甚至也可以將命名空間跨檔案進行融合

// WARNING: 請注意第二種方法 <script> 法只能用在前端
// node.js 一定會出錯 因為找不到模組

// 接下來讓我們嘗試第一種方法 利用 outFile 打包
// 請記得只有 module 為 AMD 或 System 時才可以使用此指令
// 稍微修改一下 tsconfig.json
/*
    {
        "compileOptions": {
            "module": "amd",
            "outFile": "./result.js"
        }
    }
*/
// 此外還需要用到 Triple-Slash Directive
// Maxwell Alexius 取了一個便於理解的別名: 參照指令 (Reference Directives)

// TRY: 可以嘗試把 Triple-Slash Directive 移除後編譯 看看結果是什麼
// TRY: 也可以嘗試把 module 換成 system 看看編譯後的結果會不會運作

// 第一種方法法打包出來的檔案 node.js 環境也可以執行
// 必須配合 Triple-Slash Directives
// WARNING: Triple-Slash Directives 必須自我封閉 </>

// 最後我們要介紹 TypeScript Module 和 Namespace 之間的歷史故事
// 在 2014 年左右 (也就是說還沒有 2015 年推出的 ES6)
// 當時 Module (import/export) 被稱為 External Module
// Namespace 則被稱為 Internal Module

// 既然如此 較晚推出的 ES6 Module System 自然整合了兩個前輩的優點
// 也就不太需要使用到 Namespace 了 (Legacy Feature...)

// 但是有些較古老的套件
// 在定義檔 (Definition Files) 中使用 Namespace 包裝一系列型別
// 之後為了怕相依的其他套件壞光光
// 當然就沒有再改
// 所以還是要稍微了解比較好
