// Day 18: 類別宣告 X 藍圖設計 - TypeScript Class

export {};

// ============================================================
// TypeScript 的 Class 很大程度的修正了 VanillaJS 的殘缺 OOP
// 比方說 Private Access Modifier
/*
    class A {
        // Private Member
        #value;
        
        // Private Method
        #method() {}
        
        // Private Member Accessor
        get #something() {}
        set #something() {}
    }
*/
// Maxwell Alexius OS: 直接用 private 關鍵字不是比較好嗎...
// ============================================================

// 通常一個介面的宣告 就是要作為物件的規格來使用
interface PersonInfo {
    name: string;
    age: number;
    hasPet: boolean;
}

const maxwell: PersonInfo = {
    name: 'Maxwell',
    age: 20,
    hasPet: false,
};

const martin: PersonInfo = {
    name: 'Martin',
    age: 24,
    hasPet: true,
};

const toby: PersonInfo = {
    name: 'Toby',
    age: 32,
    hasPet: false,
};

// 如果要讓物件可以做出什麼行為 最簡單的做法就是定義一個方法 (Method)

// REVIEW: 介面可以重複被宣告 最後的結果會是其聯集
// 這是叫做 Declaration Merging 的技巧 (Day 14)
interface PersonInfo {
    name: string;
    age: number;
    hasPet: boolean;
    printInfo(): void;
}

const ohyi: PersonInfo = {
    name: 'Ohyi',
    age: 29,
    hasPet: false,
    printInfo() {
        console.log(`
            Name: ${this.name}
            Age: ${this.age}
            Owns a pet?: ${this.hasPet}
        `);
    },
};

const waiting: PersonInfo = {
    name: 'Waiting',
    age: 5,
    hasPet: false,
    printInfo() {
        console.log(`
            Name: ${this.name}
            Age: ${this.age}
            Owns a pet?: ${this.hasPet}
        `);
    },
};

const wangfu: PersonInfo = {
    name: 'Wangfu',
    age: 14,
    hasPet: true,
    printInfo() {
        console.log(`
            Name: ${this.name}
            Age: ${this.age}
            Owns a pet?: ${this.hasPet}
        `);
    },
};

// 這時候明眼人都看出來了 違反了 DRY (Don't Repeat Yourself)

// printInfo 是物件的方法
// 而每一個物件實作 printInfo 的方式都一模一樣
// Class 就是為了處理這個問題
// 它和介面很相似 又能夠預先把物件的屬性和方法定義出來

// 類別最基本的宣告方式如下：
/*
    class C {
        P: Tp;

        M(paramName: Tparam): Toutput {
            // Do Something...
        }
    }
*/

// Class 和 Interface 間的最大差異是
// Interface 只能定義規格而 Class 可以進一步描述行為

class CPersonInfo {
    name: string;
    age: number;
    hasPet: boolean;

    // 建構子函式 (WARNING: 不是方法)
    constructor(name: string, age: number, hasPet: boolean) {
        this.name = name;
        this.age = age;
        this.hasPet = hasPet;
    }

    printInfo() {
        console.log(`
            Name: ${this.name}
            Age: ${this.age}
            Owns a pet?: ${this.hasPet}
        `);
    }
}

// 重點如下：
// 1. 物件初始化的時候 最先進行的是 constructor
// 2. 類別的宣告不一定要存在建構子函式
//    建構子函式的預設值是空函式 (前提是沒有繼承其他的類別)
// 3. 若建構子函式有參數部分 必須積極註記
// 4. 建構子函式只用來初始化屬性
// 5. 若有必要在物件建構時執行其他的 Business Logic
//    建議將這些程序抽象化後定義為該類別的方法 再在建構子函式中呼叫
//    (一般抽象化過後的方法 會被標記為私有 (private))
