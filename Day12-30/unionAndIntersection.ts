// Day 17: 複合型別 X 型別複合 - TypeScript Union & Intersection

export {};

// 直接用實際例子討論吧：
// 先定義一個 union

type UserInfo_01 = {
    name: string;
    age: number;
};

type UserInfo_02 = {
    hasPet: boolean;
    ownMotorcycle: boolean;
};

type UnionSet = UserInfo_01 | UserInfo_02;

// 根據數學推理 只會有以下三種可能

const maxwellOnlyInfo_01: UnionSet = {
    name: 'Maxwell',
    age: 20,
};

const maxwellOnlyInfo_02: UnionSet = {
    hasPet: false,
    ownMotorcycle: true,
};

const maxwellOnlyInfo_03: UnionSet = {
    name: 'Maxwell',
    age: 20,
    hasPet: false,
    ownMotorcycle: true,
};

// 那麼我們來嘗試些理應錯誤的狀況

const maxwellWithPartialInfo_01: UnionSet = {
    name: 'Maxwell',
    ownsMotorcycle: true,
};

const maxwellWithPartialInfo_02: UnionSet = {
    name: 'Maxwell',
    age: 20,
    ownMotorcycle: false,
}; // WARNING: pass...?

const maxwellWithPartialInfo_03: UnionSet = {
    age: 20,
    hasPet: true,
    ownMotorcycle: false,
}; // WARNING: pass again...?

const maxwellWithPartialInfo_04: UnionSet = {};

// Primitives 的 intersection 為 never
type PrimitiveIntersection = number & string;

// TRY: 如果將廣義物件型別和原始型別進行 intersection 呢？
type GeneralizedObject = {
    Num: number;
    Str: string;
};
type GeneralizedObjectAndPrimitive = GeneralizedObject & boolean;
// 請問這個推論結果實際上和 never 一樣嗎？

// 接下來我們來回顧 Type Guard
interface ISummation {
    (...args: number[]): number;
    (arr: number[]): number;
}
// 假設某函式 F 實作了此介面
// 使用了 Function Overload 所以以下兩種寫法都成立
/*
    F(1, 2, 3, 4, 5);
    F([1, 2, 3, 4, 5]);
*/
const F: ISummation = (p1: number | number[], ...args: number[]) => {
    if (typeof p1 === 'number' && args instanceof Array) {
        return args.reduce((acc, cur) => acc + cur, p1);
    } else if (p1 instanceof Array) {
        return p1.reduce((acc, cur) => acc + cur, 0);
    }

    throw new Error('Something is wrong with your input...');
};

console.log(F(1, 2, 3, 4, 5));
console.log(F([1, 2, 3, 4, 5]));

// 有些人可能比較習慣用 Array.isArray 來檢查是否為陣列
// 這點當然是沒問題 不過要在 tsconfig.json 中調整
/*
    {
        "compilerOptions": {
            // ...
            "lib": ["dom", "es2015"]
            // ...
        }
    }
*/
// REVIEW: 關於編譯器的設定 要在 Day 31 才會討論到

// POINT: 這裡可以先記下一個觀念
// 通常基本型別使用 typeof 檢測
// 而廣義物件或類別實體使用 instanceof 進行檢測
