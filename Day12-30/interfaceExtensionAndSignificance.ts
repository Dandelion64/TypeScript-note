// Day 13: 介面的延展 X 功能與意義 - Interface Extension & Significance

export {};

// 介面的擴展 (Interface Extension / Inheritance)
//                                 ^^^^^^^^^^^

// 讓我們使用一個似曾相識的例子吧 (Day 09 時用 union 處理)
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

interface AccountPersonalInfo {
    nickname?: string;
    birth?: Date;
    gender?: Gender;
}

interface UserAccount extends AccountSystem, AccountPersonalInfo {}
// 寫法就像物件導向的繼承一樣啊...

// 實際使用看看這個介面
const accountMaxwell: UserAccount = {
    email: 'max@example.com',
    password: '<hashed-password>',
    subscribed: false,
    nickname: 'Maxwell',
    gender: Gender.Male,
};
// 少一個鍵
const accountMartin: UserAccount = {
    email: 'martin@example.com',
    password: '<hashed-password>',
    nickname: 'tintin',
    birth: new Date(1970, 1, 1),
    gender: Gender.Male,
};
// 多一個鍵
const accountMarvin: UserAccount = {
    email: 'marvin@example.com',
    password: '<hashed-password>',
    subscribed: true,
    nickname: 'vinvin',
    birth: new Date(2020, 1, 1),
    gender: Gender.Other,
    hasPet: false,
};

// POINT: 重點一
// 若我們有一系列的 TypeScript 介面 I1, I2, ..., In
// 其中不同的介面卻有重複的屬性名稱
// 這種情形是可被接受的 前提是名稱相同之屬性各自對應之型別不能衝突
//         ^^^^^^^                           ^^^^^^^^^
// 以下範例：
interface I1 {
    a: string;
    b: number;
}
interface I2 {
    b: number;
    c: boolean;
}
interface I3 {
    a: string;
    c: string; // conflict with I2
}

interface I12 extends I1, I2 {}
interface I13 extends I1, I3 {}
interface I23 extends I2, I3 {}
interface I123 extends I1, I2, I3 {}

// 從這個例子可以慢慢看出 Type 和 Interface 之間的差異
// Interface 是一種規格
// 可以自由擴展擴充 當然也允許部分相容
// Type 是靜態的資料型態
// 儘管可以利用 union 達成看似型別擴展的感覺
// 實際上是創造出新的靜態型別
//        ^^^^^^^^^^^^^^
// 這種行為如果被歸類在擴展的話 代表這是動態資料型態喔...

// ============================================================
// 另外 關於介面有一句名言

// Code against interface, not implementation:
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Decouple every part of your code and compose from them,
// instead of short-lived implementation.
// 程式碼不應該直接實作，而是應該定義一系列的介面：
// 拆解並組裝每一個小部分，而飛直截了當地進行實作。

// 小單元的程式碼不但容易管理 也易於測試
// 對這每個小單元進行抽象化 就可以用清楚明晰的方式實作大功能
// 直接實作出完整功能 整個主體高度脈絡化 非常難以維護
// 也難以抽取出小功能進行個別測試

// 通常一段程式也是也是一次只做一件事情比較好
// 單一職責原則 (SRP, Single Responsibility Principle)
// SRP 其實是一種物件導向設計典範
// "A class should have only one reason to change."
// ============================================================

// REVIEW: Day 17 會再回來複習 Type 和 Interface 的比較
