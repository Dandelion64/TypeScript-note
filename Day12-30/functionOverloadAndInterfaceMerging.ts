// Day 14: 函式超載 X 究極融合 - Function Overload & Interface Merging

export {};

// ============================================================
// Function Overload:
// (有一個我們很熟悉的範例 就是 ES7 展開/其餘運算子)

// 通常在靜態型別的語言 (C++, Java...)
// 必須嚴格對函式或方法的 I/O 強制進行型別註記
// 尤其這一類的語言 型別的種類和特性會比 TypeScript 規範得還要細緻
// (比方說 VanillaJS 的 number
// 在 C++ 中被細分為 int, float, long, double 以及他們的特定組合)

// 假設今天我們要用 C++ 來計算正方形面積：
/*
    int areaOfRect(int size) {
        return size * size;
    }
*/
// 或是計算長方形面積：
/*
    int areaOfRect(int edge1, int edge2) {
        return edge1 * edge2;
    }
*/
// 甚至要處理型別的問題：
/*
    float areaOfRect(float size) {
        return size * size;
    }
*/
// POINT: 發現了嗎 函式名稱都是一樣的 (areaOfRect)
// 這種單一函式可以根據填入參數的不同執行不同的擴充函式的形式 就是函式過載
// ============================================================

// 而在 TypeScript Interface 中屬性對應的函式可以被超載
//                            ^^^^^^^^^^^^^^^^^^^
// 考慮以下範例：

// 一般的宣告方式絕對不行
function addition(p1: number, p2: number) {
    return p1 + p2;
}
function addition(p1: string, p2: string) {
    return parseInt(p1, 10) + parseInt(p2, 10);
}

// 但是在介面中就可以
interface AddOperation {
    addition(p1: number, p2: number): number;
    addition(p1: string, p2: string): number;
}

// 你或許會以為這是後面的屬性覆蓋了前一個屬性 像是物件一樣
// 讓我們嘗試看看
const implementAddition_01: AddOperation = {
    addition(p1: string, p2: string) {
        return parseInt(p1, 10) + parseInt(p2, 10);
    },
};
// hover: (+1 overload)
// TypeScript 明確表示這是一個有過載的函式

// 但是用物件的話 會被覆蓋掉吧...
const implementAddition_02: AddOperation = {
    addition(p1: number, p2: number) {
        return p1 + p2;
    },
    addition(p1: string, p2: string) {
        return parseInt(p1, 10) + parseInt(p2, 10);
    },
};
// 果然不行...

// 改成用複合型別進行 union 呢
const implementAddition_03: AddOperation = {
    addition(p1: number | string, p2: number | string) {
        if (typeof p1 === 'number' && typeof p2 === 'number') {
            return p1 + p2;
        } else if (typeof p1 === 'string' && typeof p2 === 'string') {
            return parseInt(p1, 10) + parseInt(p2, 10);
        }
    },
};
// 目前這樣的做法
// 在 p1 p2 型別不同時會相當於回傳 undefined 導致錯誤
// 我們可以利用 never 型別時學到的觀念來修正它
const implementAddition_04: AddOperation = {
    addition(p1: number | string, p2: number | string) {
        if (typeof p1 === 'number' && typeof p2 === 'number') {
            return p1 + p2;
        } else if (typeof p1 === 'string' && typeof p2 === 'string') {
            return parseInt(p1, 10) + parseInt(p2, 10);
        }

        throw new Error(`Error thrown`);
    },
};

// ============================================================
// 來嘗試一些奇怪的關於用介面實作函式過載的範例

// 1. 一模一樣也沒問題 但是很像是冗餘的程式碼
interface AddOperation_01 {
    add(p1: number, p2: number): number;
    add(p1: number, p2: number): number;
}

// 2. 回傳型別不同 但參數相同
interface AddOperation_02 {
    add(p1: number, p2: number): number;
    add(p1: number, p2: number): string;
}

// 3. 參數數量不同
interface AddOperation_03 {
    add(p1: number): number;
    add(p1: number, p2: number): number;
}

// WARNING: 其實連型別畫面宣告出來可韓式也可以進行過載
// 但是 Maxwell Alexius 在這系列的教學中
// 不希望對靜態意義的型別系統採用超出靜態行為的技巧
// ============================================================

// 介面融合 (Interface Merging) - 介面延展的另類形式
// POINT: 介面融合在跟第三方套件或框架協作時非常常用 請一定要學會

// ============================================================
// 官方文件中 其實正確的名稱是 Declaration Merging
// 介面只是其中一種格式
// 這屬於較為進階的部分
// 日後如果想要開發 TypeScript 版本的套件
// 就必須對這裡特別鑽研
// Ref: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
// ============================================================

// 介面融合當然也有相對應的規定要遵守
// 假定 I 介面被重複定義多次
// 該介面的推論結果將會是所有重複定義之介面的交集
// 所以重複定義時該屬性的型別必須與過往定義時之對應部分吻合

// 舉例來說 假設我們現在要創建一個 DOM Element (以 <a></a> 為例)
const $app = document.querySelector('#app');
const $a = document.createElement('a');

$a.setAttribute('href', '<url>');
$a.style.color = 'red';
$app?.appendChild($a);
// ? 表示 $app 可能是 null

// 當我們創建的元素是 <a></a> 的時候 $a 是 HTMLAnchorElement
// 但是如果創建的是 <p></p> 則是 HTMLParagraphElement
// <input> 則是 HTMLInputElement...
// ASK: 那 createElement 的這個介面會長什麼樣子呢？

// 錯誤的實作方式：
interface MyDocument {
    createElement(
        tagName: string,
    ):
        | HTMLAnchorElement
        | HTMLAreaElement
        | HTMLBodyElement
        | HTMLButtonElement
        | HTMLCanvasElement;
    // ...
}
// 是不是有哪裡怪怪的... tagName 未免太寬鬆了吧
// 這樣有可能輸入 'a' 卻允許創建 HTMLButtonElement 的欸...

// 正確的實作方式：
// 必須運用字串明文型別 (String Literal Type) 配合函式來實作
// Maxwell Alexius OS: 其實這是官方文件的範例...
interface MyDocument {
    createElement(tag: 'a'): HTMLAnchorElement;
    createElement(tag: 'p'): HTMLParagraphElement;
    createElement(tag: 'body'): HTMLBodyElement;
    createElement(tag: 'input'): HTMLInputElement;
    // ...
}

// 不過這種作法還是有個問題
// 就是 HTML 元素最少也超過一百多種 要是全部寫在一起豈不是又臭又長嗎？
// 這時候就要利用 Interface Merging 來進行拆解

// Block-level Elements
interface MyDocument {
    createElement(tag: 'p'): HTMLParagraphElement;
    createElement(tag: 'body'): HTMLBodyElement;
    createElement(tag: 'div'): HTMLDivElement;
}

// Inline-Level Elements
interface MyDocument {
    createElement(tag: 'a'): HTMLAnchorElement;
    createElement(tag: 'span'): HTMLSpanElement;
    createElement(tag: 'input'): HTMLInputElement;
}

// ============================================================
// 介面融合的應用情境

// 如果今天專案和第三方套件之間要合作
// 此時兩個專案之間產生了 dependency
// 勢必有可能在型別上有衝突
// WARNING: 尤其如果使用了 Middleware 更是如此 (因其調整了 request)

// 假設有一個陽春 Middleware 自定義了 request 格式
interface StupidRequest {
    headers: Header[];
    body: Body;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}
// 其中並沒有針對 url 解析出路徑的 query string
// 也沒有宣告 query 這個屬性

// 假設我們現在的 request 網址如下
// http://domain.com/index?user=dandeliion&page=29
// 可以將 query string: ?user=dandeliion&page=29 解析成
/*
    {
        "query": {
            "user": "dandelion",
            "page": 29,
        }
    }
*/

// 經過 Middleware 調整後的 request 會變成這樣
interface StupidRequest {
    headers: Header[];
    body: Body;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    query?: Dictionary;
}

// 利用 Interface Merging 處理
// 先直接講最佳解法：
// 假設以下部分在另一支檔案之中 (我們寫在同一支裡所以 eslint 會跳 error)
// ------------------------------------------------------------
type Dictionary = { [propName: string]: string };
namespace StupidFramework {
    interface StupidRequest {
        query?: Dictionary;
    }
}
// ------------------------------------------------------------

// REVIEW: 這個問題也可以用 TypeScript namespaces 來解決
// 但要更後續才會討論了 (Day 35 以後)
// 現階段只要清楚理解兩個重點：
// 1. Middleware 會對 TypeScript 協作上產生困難點
// 2. 通常第三方套件會有自己的 namespace 防止污染全域
//    為此進行 interface merging 時你必須指定該套件的 namespace
// ============================================================
