// Day 02: 型別推論 X 註記 - Type Inference & Annotation

export {};

// TypeScript 會自動進行型別推論
// 然而這個功能有其極限，所以最好明確註記，且不要濫用 any。

// 註記形式（一）：註記在變數前面
const message: string = 'Hello World';
//           ^^^^^^^^

// 函式型別的註記請容後再敘
function mayReturnEitherStringOrNumber(b: boolean): string | number {
    if (b) {
        return '20';
    } else {
        return 20;
    }
}

// 註記形式（二）：註記在未知的值
const agei = <number>mayReturnEitherStringOrNumber(false);
//           ^^^^^^^^
console.log(typeof agei); // 'number'

// 註記形式（三）：註記在未知的值 但使用 as 關鍵字
const ageiAsString = mayReturnEitherStringOrNumber(true) as string;
//                                                       ^^^^^^^^^
console.log(typeof ageiAsString); // 'string'

// TypeScript 中的型別有：

// 基本型別 (Primitive Types)：
// 包含 number, string, boolean, undefined, null, symbol,
// 以及 void (常見於函式型別)
// void 代表此函式不回傳值 相似於回傳 undefined
// 但習慣上我們都會以 void 做表示

// 物件型別 (Object Types)
// 從原始型別或物件型別組合出來的複合型態
// (比如物件裡面的 Key-Value 個別是 string 和 number 型別組合成的)
// （一）基礎物件型別：包括 JSON, 陣列 (Array<T> 或 T[]),
// 類別及其實體 (Class 和 new Class() 產生的 instance)
// （二） TypeScript 擴充型別：
// Enum 和 Tuple，內建於 TypeScript 之中
// （三）函式型別 (Function Type)：
// 類似於 (input) => (output) 這種格式，容後再敘。

// 明文型別 Literal Type
// 將一個值本身宣告為一種型別
// 例如將 "Hello World" 宣告後就只能存 "Hello World" 這個字串值
// 通常會看到的是 Object Literal Type，這部分之後會多做說明。

// 特殊型別：
// Maxwell Alexius 自行區分出的型別
// 包含 any, never 以及 unknown

// 複合型別：
// Maxwell Alexius 自行區分出的型別
// 包含 union 以及 intersaction
// 由邏輯運算子 | 以及 & 組成

// 泛用型別 (Generic Type)：
// 留待日後介紹，可以使程式碼更加通用。
