// Day 15: 功能多樣性 X 多樣性介面 - More on TypeScript Interface
// (雖說標題是這樣下 其實很多內容都是在講 Property)

export {};

// POINT: 模仿部分廣義物件的行為 - Indexable Types
// TypeScript 的介面以及型別其實都有針對物件的屬性或索引做微調
// 這個功能稱之為 Indexable Types (中文不太好翻譯吶...)
// 寫法如下： (寫法像是 ES6 Computed Property Names)

type Dictionary = {
    [propName: string]: string; // 只要屬性為字串 值為字串
};

interface StringTypedList {
    [index: number]: string; // 只要屬性為數值 值為字串
}

// 實際測試看看
const normalDictionary: Dictionary = {
    hello: 'world',
    thisFeature: 'is crazy',
};
// 允許空物件
const emptyDictionary: Dictionary = {};
const wrongDictionary: Dictionary = {
    hello: 123,
    thisFeature: true,
    withFunction() {
        console.log('Wrong type...');
    },
    nestedDictionary: {
        hello: 123,
    },
};

const stringTypedArray: StringTypedList = {
    123: 'Hello',
    [456]: 'hi',
};
// 允許空狹義物件
const emptyStringTypedArray_01: StringTypedList = {};
// 也允許直接作為 Array
const stringTypedArrayLiteral: StringTypedList = ['1', '2'];
// 空陣列也可以
const emptyStringTypedArray_02: StringTypedList = [];

stringTypedArray[0];
stringTypedArray[1];

const wrongStringTypedArray: StringTypedList = {
    message: 'Hello',
    thisFeature: true,
};
stringTypedArray['hello'];
stringTypedArray.hello;

// ============================================================
// 備註：
// StringTypedList 這個介面的實作其實有點類似 Hash Table
// Ref: https://www.wikiwand.com/zh-tw/%E5%93%88%E5%B8%8C%E8%A1%A8
// ============================================================

// ASK: 以下的寫法有沒有問題呢？
type UseBothKeyType = {
    [key: number]: number;
    [key: string]: string;
};
type UserInfo_01 = {
    name: string;
    [prop: string]: string;
};
type UserInfo_02 = {
    name: string;
    birth: Date;
    [prop: string]: string;
};

// REVIEW: 選用屬性 (Optional Property)
// 在屬性後加上 ? 可以使之成為選用屬性 (Day 09)

// POINT: 唯讀屬性 (Read-Only Property)
// 在屬性前加上 readonly 這個 keyword 就可以使之變成唯讀模式

type AccountUserWithReadonlyPropertyT = {
    readonly email: string;
    readonly password: string;
    name?: string;
    age?: number;
};

interface AccountUserWithReadonlyPropertyI {
    readonly email: string;
    readonly password: string;
    name?: string;
    age?: number;
}

const sampleAccount_01: AccountUserWithReadonlyPropertyT = {
    email: 'maxwell@example.com',
    password: '<hashed-password>',
    name: 'Maxwell',
};

sampleAccount_01.email;
sampleAccount_01.email = 'new@example.com';

const sampleAccount_02: AccountUserWithReadonlyPropertyI = {
    email: 'dandelion@example.com',
    password: '<hashed-password>',
    age: 92,
};

sampleAccount_02.password;
sampleAccount_02.password = 'ggqq5566';

// REVIEW: 介面的混合格式 Hybrid Type Interface
// 直接實作一個計數器的範例吧：

interface Counter {
    (start: number): void;

    increment(): number;
    reset(): void;
    value: number;
}

const createCounter = (): Counter => {
    let value: number;
    let initializedNumber: number;

    const counter = function (startNumber: number) {
        initializedNumber = startNumber;
        value = startNumber;
    } as Counter;

    counter.increment = () => {
        value++;
        return value;
    };

    counter.reset = () => {
        value = initializedNumber;
    };

    Object.defineProperty(counter, 'value', {
        get() {
            return value;
        },
    });

    return counter;
};

// 可以進行簡單的實作
const counter: Counter = createCounter();

counter(5);
console.log(counter.value);

counter.increment();
counter.increment();
counter.increment();
console.log(counter.value);

counter.reset();
console.log(counter.value);

// WARNING: 儘管混合式的 Interface 可以做出更多不同的物件形式
// 但是如果忘記定義其中的一個功能 例如...increment()
// 這在執行上一定會出錯 但 TypeScript 檢查不出來
// 還好 Maxwell Alexius 認為 Interface Type Hybrid 其實不常用
// 如果想瞭解更多也可以參考官方文件：
// Ref: https://www.typescriptlang.org/docs/handbook/interfaces.html#hybrid-types

// 學習到這裡 讀者應該發現了
// TypeScript 有個很大的好處 是不需要經過編譯就可以找出潛在的 bug
// 不像 VanillaJS 必須要執行程式碼然後利用 Error Stack Debug
