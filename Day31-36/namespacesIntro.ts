// Day 35: 命名空間 X 組織分明 - TypeScript Namespaces Introduction

export {};

// 其實 Namespace 不一定實用
// 畢竟連 TypeScript-ESLint 都制定了 no-namespace 這個規則
// Ref: https://typescript-eslint.io/rules/no-namespace/

// 但 Maxwell Alexius 認為有助於讀者理解
// 「第三方套件到底如何融入到 TypeScript 專案」

// 在結合第三方套件時 有時可以藉由 TypeScript Namespace 的設定
// 重新詮釋適合自己專案的型別定義與設定

// ASK: 命名空間 (NameSpace) 是什麼？

// POINT: Namespace 的主要目的是組織並包裝程式碼
//                            ^^^^^^^^

// 比方説 假設兩部分的程式碼中都有名為 cache 的變數
// 這就是變數命名上的衝突
// 而 Namespace 可以界定出這樣的空間 其中不用擔心與其他部分有命名衝突

// 讓我們考慮以下範例：
// 為了防止 error 可以在 .eslintrc 中暫時關閉 no-namespace 規則

namespace MyMath {
    export const PI = Math.PI;

    export const AreaOfCircle = (radius: number) => {
        return PI * radius ** 2;
    };

    export const AreaOfRectangle = (width: number, height: number) => {
        return width * height;
    };

    export const CircumferenceOfCircle = (radius: number) => {
        return 2 * PI * radius;
    };

    export const CircumferenceOfRectangle = (width: number, height: number) => {
        return 2 * (width + height);
    };
}

// 如此一來可以避免和第三方套件衝突

// 要使用命名空間中的變數
// 可以向物件的呼叫方法一樣
// 但只有被 export 的變數才可以由外界取用

console.log(MyMath.PI);
console.log(MyMath.AreaOfCircle(100));
console.log(MyMath.CircumferenceOfRectangle(50, 100));

// 重點整理：
/*
    namespace N {
        export const X = <arbitrary-value>;

        export function M() { return <arbitrary-value>; }
    }

    N.X;
    N.M();
*/

// 巢狀 namespace

namespace MyMathV2 {
    export namespace Circle {
        export const PI = Math.PI;

        export const area = (radius: number) => {
            return PI * radius ** 2;
        };

        export const circumference = (radius: number) => {
            return 2 * PI * radius;
        };
    }

    export namespace Rectangle {
        export const area = (width: number, height: number) => {
            return width * height;
        };

        export const circumference = (width: number, height: number) => {
            return 2 * (width + height);
        };
    }
}

console.log(MyMathV2.Circle.PI);
console.log(MyMathV2.Circle.area(100));
console.log(MyMathV2.Rectangle.circumference(50, 100));

// 可以輸出任何變數 只要加上 export 關鍵字
// (唯一不能輸出的是值本身)
// ex. export 12345;

namespace Misc {
    // REVIEW: Indexable Types (Day 15)
    export type Dictionary = { [key: string]: string };

    export interface UserInfo {
        name: string;
        age: number;
        hasPet: boolean;
    }

    export class Vehicle {
        constructor(
            public type: string,
            public wheels: number,
            public color: string,
        ) {}

        public getInfo() {
            console.log(
                `The ${this.color} ${this.type} has ${this.wheels} wheels.`,
            );
        }
    }
}

// REVIEW: 我們曾經學習過 Interface Merging (Day 14)
// 當時提到正式名稱其實是 Declaration Merging
// Namespace 也可以 merging
// Ref: https://www.typescriptlang.org/docs/handbook/declaration-merging.html

// 以下的範例和 MyMathV2 等價

namespace MyMathV3 {
    export namespace Circle {
        export const PI = Math.PI;

        export const area = (radius: number) => {
            return PI * radius ** 2;
        };

        export const circumference = (radius: number) => {
            return 2 * PI * radius;
        };
    }
}

namespace MyMathV3 {
    export namespace Rectangle {
        export const area = (width: number, height: number) => {
            return width * height;
        };

        export const circumference = (width: number, height: number) => {
            return 2 * (width + height);
        };
    }
}

console.log(MyMathV3.Circle.PI);
console.log(MyMathV3.Circle.area(100));
console.log(MyMathV3.Rectangle.circumference(50, 100));

// ASK: 如果交互使用同一個命名空間的不同區塊的功能會怎麼樣？

namespace Circle {
    export const PI = Math.PI;

    export function area(radius: number) {
        return PI * radius ** 2;
    }

    export function circumference(radius: number) {
        return 2 * PI * radius;
    }
}

namespace Circle {
    export function degreeToRadian(degree: number) {
        return (degree / 180) * PI;
    }
}

console.log(Circle.degreeToRadian(180));

// WARNING: 如果取消第一次宣告 Circle 時的 PI 前面的 export
// 則即使在同名稱的 namespace 下也不可使用 PI

namespace Circle {
    export function degreeToRadian(degree: number) {
        return (degree / 360) * 2 * PI;
    }
}

// 無法重複宣告同名函式 (Duplicate function implementations.)
// POINT: 但是可以透過 Interface 進行 Function Overload

namespace DOMNamespace {
    export interface MyDocument {
        createElement(name: 'p'): HTMLParagraphElement;
        createElement(name: 'div'): HTMLDivElement;
    }
}

namespace DOMNamespace {
    export interface MyDocument {
        createElement(name: 'a'): HTMLAnchorElement;
        createElement(name: 'span'): HTMLSpanElement;
    }
}

// POINT: Introfaces Merging v.s. Namespaces Merging
// 1. 介面宣告的是規格 命名空間則是一系列功能的包裝
//                            ^^^^^^^^^^^^^
// 2. 皆可以動態擴充
//    介面的擴充即是規格的擴充
//    命名空間的擴充則是包含介面的一系列功能 (變數 函式 類別) 的宣告
// 3. 介面可以進行函式過載 命名空間只是單純輸出功能 (變數)

// 明天將會討論 既然已經有了 import/export 為何還要有 namespace
// (既生 import/export 何生 namespace)
