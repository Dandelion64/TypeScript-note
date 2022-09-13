// Day 37: 第三方套件 X 支援的引入 - 3rd-Party Package & TypeScript Declaration File

export {};

// Definition File (Declaration File)
// 一般是做型別宣告的檔案 常見於第三方套件中

// 先讓我們思考一個假設性的問題：
// ASK: VanillaJS 可以和 TypeScript 合用嗎？
// 理論上是可以的 但是少了 TS 的型別檢查來做結合的話根本荒腔走板

// 以使用 jQuery 為例
// 撰寫 index.html 和 index.ts

// 這時候雖然 TypeScript 完全不知道 '$' 是什麼跳出 error
// 實際上我們可以利用 noEmitOnError: false 這個設定強制編譯

// 這時候可以在 console 看到如下的錯誤訊息：
// Cannot find name '$'.
// Do you need to install type definitions for jQuery?
// Try `npm i --save-dev @types/jquery`

// 當我們在瀏覽器開啟 index.html
// 會發現可以運作無誤
// 然而開發者工作的 Sources 部分所顯示的編譯後的結果 似乎有沒有編譯都沒差...

// POINT: 為了應對這種與 VanillaJS Library 等檔案對接的狀況
// 就必須使用型別宣告 ((Type) Declaration)

// 首先 最陽春的做法就是在 index.ts 中使用 declare 關鍵字宣告
// declare 關鍵字的意義在於告訴 TS 這個東西是由某個地方而來
// 而這個某個地方 指的就是第三方套件或模組 (cdnjs 而來的 jQuery)

// 通常我們不會把 declare 相關的型別和一般的 TypeScript 程式碼放在一起
// 而是會放在 *.d.ts 檔中 這些檔案就被稱為 Declaration Files

/*
    declare let var_01: Tvar_01;
    declare const var_02: Tvar_02;

    declare type Tdeclare = T;

    declare interface Ideclare {
        // ...
    }

    declare class Cdeclare {
        // ...
    }

    declare namespace Ndeclare {
        // ...
    }
*/
// Ref: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html

// POINT: 接下來 我們要討論正確引入第三方套件的方法
// 有許多熱門的套件 由於改寫成 TypeScript 工程過於浩大
// 會改採撰寫 Declaration Files 的方式供專案使用

// POINT: 通常 這些專案的 Declaration Files 都集中在這個 Repo 中
// Ref: https://github.com/DefinitelyTyped/DefinitelyTyped

// 這裡附上 jQuery 的 Declaration File (比我們亂寫的複雜很多...)
// Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/JQuery.d.ts

// 這些 Declaration Files 相關的套件通常會含有 @types 這個前綴字
// 所以如果有任何套件相依於這些 Declaration Packages
// node_modules 中的 @type 就會存有相關的檔案
// 我們安裝 jQuery 的 Declaration Package 試試看
// npm i @types/jquery

// 通常 @types 系列套件只有型別宣告而沒有實際運作所需的 code
// 這點應該很容易理解 但要注意
// npm i jquery

// 最後 我們要嘗試使用 RequireJS 執行

// 必須要去官網下載 RequireJS
// https://requirejs.org/docs/download.html
// 我們必須修改 index.html (另存為 indexAMD.html)

