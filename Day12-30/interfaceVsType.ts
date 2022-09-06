// Day 16: TypeScript Interface V.S. Type

export {};

// REVIEW: 其實這天的內容算是總複習

// 首先附上 stockoverflow 上對於 type v.s. interface 的討論
// Ref: https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript

// 以下條列出重點：
// 1. Interface 不能直接模擬原始型別 Enum 與 Tuple
//    但 Type 和 Interface 都可以宣告廣義物件格式
//    也就是說兩者都可以使用下述功能：
//    a. 選用屬性 (Optional Properties)
//    b. 函式過載 (Function Overload)
//    c. Indexable Types
//    d. 唯獨屬性 (Read-only Properties)
//    e. 互相複合 (union & intersection)
/*
        type T = <arbitrary-type>;

        interface I {
            // Interface Declaration
        }

        type Tunion = T | I;
        type Tintersection = T & I;
*/
// 2. 只有 Interface 可以對 Primitives 以外的型別進行擴展
//    Type 只能直接定義出新的靜態型別
/*
        type T = {
            prop1: Tprop1;
        };

        interface I extends T {
            prop2: Tprop2;
        }

        type Tprimitive = number;
        interface Ierror extends Tprimitive {}
*/
// 3. 結論：
//    a. 不希望被擴充的時候 使用 type
//    b. Primitives, Tuple and Enum 只能使用 type
//    c. 複合型別一般使用 type 宣告
//    d. 希望提高可複用性與相容性 甚至會與第三方套件協作時用 interface
//    e. 物件格式建議使用 interface 彈性更大一些
//    f. 混用時要回想 a. 希不希望被擴充？ 來決定使用 type 或 interface

// ============================================================
// ASK: 為什麼 Type 和 Interface 互相複合是可以被接受的呢？
// 或許是為了滿足這種情況：
enum Gender {
    Male,
    Female,
    Other,
}

interface AccountSystem {
    email: string;
    password: string;
    subscribed: boolean;
}

interface AccountInfo {
    nickName?: string;
    age?: number;
    gender?: Gender;
}

type User = AccountSystem & AccountInfo; // 要明確知道這是一個靜態型別
// REVIEW: Interface 和 Class 的使用會在 Day 25 討論
// ============================================================
