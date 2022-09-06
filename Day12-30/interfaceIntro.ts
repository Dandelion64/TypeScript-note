// Day 12: 介面宣告 X 使用介面 - TypeScript Interface Intro.

export {};

// 其實 Interface 的概念和 Type Alias 有點像
// 可以把它想成是更具彈性的型別

// 差異：
// 型別化名可以用原始型別與各種廣義物件格式表示
type Primitives = number | string | boolean | null | undefined;
// Primitives 其實還有 never 和 symbol
type PrimitiveArray = Primitives[];
type OperatorFunc = (op1: Primitives, op2: Primitives) => unknown;
type PersonalInfo = {
    name: string;
    age: number;
    hasPet: boolean;
};
type VehicleTuple = [string, string, string, Date];
enum WeekDayEnum {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
}
type WeekDayString = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
type WeekDayFormat = WeekDayEnum | WeekDayString;

// ============================================================
// WARNING:
// 上述最後一個範例有點特別
// 雖然平時看到的明文型別看起來是物件格式
// 實際上原始型別的值和廣義物件的值都可以獨立成一個型別
// 這個應該是屬於知道就好的概念 很難遇到
// ============================================================

// 介面只可以用兩種形式以及混合 (Hybrid) 來表示
// (所謂的 Hybrid 指的是前述兩種形式的混合)
// TypeScript Interface 可以用 Interface 關鍵字進行宣告
// 介面中的詳細註記可為：
// 1. 物件格式 (即 JSON 格式)
//    但是屬性對型別 不是對值
//        ^^^^^^^
// 2. 單一函式格式
//    不一定需要標示函式名稱 (意思是可為匿名函式)
// 3. 混合 (即 1. 和 2. 都使用)

// ============================================================
// WARNING:
// 然而在物件格式的介面定義下
// 如果真的把值 (比如字串作為型別) 寫下去 也是可以的
// 只是以後你註記某變數時使用了該介面
// 該變數必須強制把該屬性對應的值原封不動複製上去
// ============================================================

// Interface 的表現形式
enum Gender {
    Male,
    Female,
    Other,
}
type UserType = [string, string, number];

// 1. 物件格式
interface UserInfo {
    // Primitives
    id: number;
    name: string;

    // 廣義物件
    birth: Date;
    interests: string[];

    // Enum & Tuple
    gender: Gender;
    usertype: UserType;

    // Literal Type 這裡用物件格式
    address: {
        country: string;
        city: string;
        postalCode: string;
    };

    // Function Type
    logInfo(message: string): void;
}

// 2. 單一函式格式
interface UpdateRecord {
    (id: number, newRecord: UserInfo): void;
}
// 可以藉由此函式介面定義一系列的更改 UserInfo 用的函式
// 分別作為更改名稱、更改性別、更改興趣等等...

// 以下是使用 Interface 的範例
interface Person {
    name: string;
    age: number;
    hasPet: boolean;
}

// 實際使用
const maxwell: Person = {
    name: 'Maxwell',
    age: 20,
    hasPet: false,
};

const marvin: Person = {
    name: 'Marvin',
    hasPet: true,
};

const leo: Person = {
    name: 'Leo',
    age: 28,
    hasPet: false,
    job: 'DevOps',
};

const toby: Person = {
    name: 'Toby',
    age: 34,
    hasPet: 'Crocodile',
};

// REVIEW: 還記得 Day 08 時提到形式參數的檢查是 Duck-Typing 嗎？
// 現在讓我們用 Interface 測試看看 (Person 是一個 interface)
const printPersonInfo = (person: Person) => {
    console.log(`Name: ${person.name}`);
    console.log(`Age is: ${person.age}`);
    console.log(`Owns a pet?: ${person.hasPet}`);
};

// 直接代入狹義物件的明文格式
printPersonInfo({
    name: 'Malibu',
    age: 29,
    hasPet: true,

    job: 'Front-End',
    nothingSpecial: null, // undefined 也可以
});

// 存入變數再代入形式參數
const infoDandelion = {
    name: 'Dandelion',
    age: 92,
    hasPet: false,

    job: 'F2E',
    nothingSpecial: null,
};
printPersonInfo(infoDandelion);
// 一樣應該要進行積極註記來避免 Duck-Typing

// 目前看起來 type 和 interface 好像完全一樣嘛！
// 然而實際意義上有重大的差別 這點後面會慢慢揭曉
