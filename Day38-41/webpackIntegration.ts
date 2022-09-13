// Day 38: UBike 地圖 X Webpack 環境建構 - TypeScript Webpack Integration

// 這邊開始會進入第二部分 --- Webpack
// 其實實務上 Webpack 是很常用的
// 但這系列之所以從 namespace 開始介紹的原因是：
// 一般來說測試或學習的時候 不太會用到那麼大型的環境

// 關於 Webpack 最簡單的架構圖如下：
// Ref: https://ithelp.ithome.com.tw/upload/images/20191005/20120614sE1KTpxW6Q.png

// POINT:
// 簡單來說 Webpack 會將 Modules with Dependencies 打包為 Static Assets
// 只要是 Modules 中的東西
// 不管是 *.js, *.css, *.scss, *.png, *.jpg ... 都可以打包
// 最後依分類存放

// 而打包專案的方式就是用所謂的 Loader 進行
// ex.
// 打包 CSS 就使用 css-loader
// 打包 SASS 就使用 sass-loader
// 打包 TypeScript 就使用 ts-loader
// ...

// ============================================================
// Webpack 官方網站：
// https://webpack.js.org/
// TypeScript 相關設定：
// https://webpack.js.org/guides/typescript/
// ============================================================

// 安裝 Webpack 相關套件
// npm i webpack webpack-cli --save-dev

// 安裝 TypeScript 與相關 Loader
// npm i typescript ts-loader --save-dev
// 之所以要重新安裝 TypeScript 是因為之前我們安裝在全域 (-g)
// 但 Webpack 對其處理是在專案內部進行參照

// POINT:
// 習慣上 開發時我們會將主程式都放在 /src 中
// 打包專案時則會輸出到 /build 或 /dist 中 (當然企業可能有企業的做法)

// 我們還需要設定 tsconfig.json
/*
    {
        "compilerOptions": {
            "target": "es5",
            "module": "es6",
            "outDir": "./Day38-41/dist/",
            "rootDir": "./",
            "strict": true,
            "noImplicitAny": true,
            "strictNullChecks": true,
        }
    }
*/

// 此外我們要建立 webpack.config.js 並撰寫內容
// npx webpack 即可進行打包

// 這次的範例
// 我們會使用 LeafLetJS 配合 UBike 台北市公共自行車即時資訊製作公車地圖
// Ref: https://leafletjs.com/
// Ref: https://data.gov.tw/dataset/137993

// 由於 leafletJS 使用原生 JS 撰寫
// 我們必須安裝其 Declaration Package
// npm i leaflet @types/leaflet

// 此外 我們還需要 CDN 其 CSS
// 如果有其他想要了解的地方 可以參考官方文件
// Ref: https://leafletjs.com/index.html

// 可以將地圖相關的資訊切分出去 再利用型別系統檢查
// 也可以利用 Ctrl(Command) + MLB 來快速查看 Declaration File
// 就不需要上網看文件了
