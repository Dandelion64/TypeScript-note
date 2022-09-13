// Day 40: UBike 地圖 X 使用 LeafletJS - Using LeafletJS with TypeScript

// 今天主要的目標是完成所有功能
// 最後會在 Day 41 做代碼重構 (Refactoring)

// WARNING: 有一個名詞叫做過早優化 (Premature Optimization)
// 軟體設計有個比較麻煩的地方是過早優化會將程式設計上的彈性限縮掉
/**
 * "Premature optimization is the root of all evil." by Donald Knuth
 */

// Maxwell Alexius 想要嘗試完成以下功能
// 1. 可選擇台北市行政區
// 2. 當區域被選擇會更新地圖
// 3. 地圖會出現該區域的 UBike 站場
// 4. 站點 hover 效果 (Tooltip)

// index.ts
