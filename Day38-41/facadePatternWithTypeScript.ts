// Day 41: UBike 地圖 X 外觀模式 - Façade Pattern in TypeScript

// 我們在這系列的練習中曾經使用過許多 Design Pattern:
// ex. Singleton Pattern, Strategy Pattern,
//     Abstract Factory Pattern, Factory Method Pattern.
// 而 Façade Pattern 也是一種設計模式
// 一般來說正式的翻譯 應該是門面模式才對
// Façade 指得是建築物或人的正面

// 我們會在學習這個設計模式的過程中重構前三天的程式碼
// 為此要先思考有沒有邏輯混淆不清或是權責不單一之處

/**
 * 1. Leaflet 地圖的實體建構
 *    Map 和 MarkerLayer 應該是不同的東西
 */

/**
 * 2. 主程式 (index.ts)
 *    裏面做了很多事情：
 *    a. 將每筆 UBike 站點資料轉換成 Marker 物件
 *    b. Marker 物件會綁定對應的 Tooltip 以顯示站點資訊
 *    c. 將一系列的 Marker 丟到圖層裡並顯示到地圖上
 *
 *    這裡有三個角色在互動：
 *    a. Map 實體
 *    b. Marker Layer 圖層
 *    c. Marker
 */

/**
 * 3. 更新地圖
 *    使用者每次選擇行政區都會觸發 updateUBikeMap() 和 focusOnDistrict()
 *    所以實際上前述三個角色都有被更動
 */

// 接下來讓我們思考這個專案本身有哪些重要的部分

/**
 * 1. map 實體
 * 2. Initializer - 初始化地圖的邏輯
 * 3. MarkerLayer - 負責匯集 Marker 以渲染
 * 4. Marker - Tooltip 的容器
 */

// 接下來讓我們在 /src/ubikeMap 中進行實作

// POINT: 外觀模式 (門面模式)
// 外觀模式就是把複雜的內部結構簡化為單一介面
// 你可以在複雜的功能下定義一系列的子介面 (Subclasses/Sub-interfaces)
// 然後整合子介面再變成單一的介面供 Client 端使用

// 現在我們有 MapInitializer, MapMarkerLayer, MapMarker
// 可以將它們整合成單一介面供 Client (index.ts) 使用
// 這個介面我們寫成 MapFacade.ts

// 可以參考結構示意圖：
// Ref: https://ithelp.ithome.com.tw/upload/images/20191008/201206149gU0HFKboW.png

// 最後就可以使用這個門面介面了
// indexWithFacade.ts

// POINT:
// 門面模式最大的優點是：他可以隱藏使用的內部套件與機制
// 仔細看 indexWithFacade.ts
// 看不到 leaflet
// 只看得到 MapConfig 和 MapFacade

// 門面模式在 Client 端的程式碼就是這麼直觀
// 是高度抽象化的結果
// 我們不會看到實作細節而得以專注在主程式的行為上

// POINT:
// 既然實作細節都被隱藏起來
// Client 端也就不容易有誤用內部功能而造成程式運行出錯的狀況

// 事實上 Facade Pattern 非常常見
// 例如：

/**
 * 1. 一個語言的編譯器介面：
 *    隱藏了內部的一連串實作細節，包含：
 *    a. Lexer (語法解析)
 *    b. Parser (敘述式或表達式的解析)
 *    c. Code Generator (機器語言的產出)
 *
 * 2. CLI (Command-Line Interface) 等工具
 *
 * 3. 各種套件的 API
 *
 * 4. RESTful API
 */

// 最後出個作業
// TRY: 請自行實作 map.flyTo()
