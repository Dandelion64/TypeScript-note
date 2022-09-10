// Day 23: 私有建構子 X 單身狗模式 - Private Constructor & Singleton Pattern

export {};

// 單例模式 (Singleton Pattern)
// Ref: https://www.wikiwand.com/en/Singleton_pattern

// 話不多說 直接進入範例

class ConstructorIsForbidden {
    private constructor() {}
}

const forbiddenObject = new ConstructorIsForbidden();
// hover 可以看到連 constructor 都被封裝進類別裡面
// Maxwell Alexius 覺得這個特性和 Klein Bottle 很像 (???)
// Ref: https://www.wikiwand.com/en/Klein_bottle

// ASK: 為什麼要將 constructor() 給封起來呢？
// 也許是為了實作像 Math 這樣具有大量靜態方法的物件？

// 這就是所謂的單例模式
// 因為無法從外界去接觸建構子函式
// 因此此類別產出的實體在全域中有唯一性

// 例如：

class SingletonPerson {
    private constructor(
        public readonly name: string,
        public readonly age: number,
        public readonly hasPet: boolean,
    ) {}

    private static Instance: SingletonPerson = new SingletonPerson(
        'Maxwell',
        20,
        false,
    );

    static getInstance(): SingletonPerson {
        return this.Instance;
    }
}

// 以上有四個重點：
// 1. 單例模式使用私有建構子 不允許建立更多實體
// 2. SingletonPerson 中的成員 雖然是 public 卻是 readonly 所以不會被覆寫
// 3. 有一個私有靜態屬性 Instance 是此類別中唯一實體 (parse 時建構)
// 4. 可以藉由公用的靜態方法 getInstance() 回傳此實體

// REVIEW: 可以在上述程式碼中看到類別也是型別的一種 這點容後再敘

const uniquePerson = SingletonPerson.getInstance();
console.log(uniquePerson);
console.log(uniquePerson.name);
console.log(uniquePerson.age);
console.log(uniquePerson.hasPet);

// 基本的單例模式實作
// 1. 建構子為 private
// 2. 以私有靜態屬性儲存此單例的唯一實體 通常命名為 Instance
//      ^^^^^^^^^
// 3. 以公有靜態方法回傳此單例實體 是唯一取得途徑
//      ^^^^^^^^^               ^^

// 我在想因為 Private Class Fields (#) 算是很新
// 目前將 #constructor 設定 reserved word
// 真正的私有 constructor 寫法可能還要再等等兩邊整合

/*
    class SingletonC {
        private constructor() {}

        private static Instance: SingletonC = new SingletonC();

        static getInstance(): SingletonC {
            return this.Instance;
        }
    }
*/

// 單例可以用在某些特別的狀況 例如專案的設定檔

// WARNING: 要注意多執行緒的環境
// 如果有多執行緒呼叫了 new SingletonInstance
// 可能會同時產生多個單例實體
// 這點要特別小心

// POINT: 單例是可以被繼承的
// 或許有讀者會覺得奇怪 被鎖住的 constructor 是 private 欸
// 至少也要是 protected 吧

// 這點在 OOP 的 Gang of Four 撰寫的物件導向設計模式一書中有特別指出
// 原因是繼承的用意是擴單例實體的功能 沒有要去覆寫父類別的建構子

// POINT: 單例類別被繼承的目的
// 除了可以擴充實體的功能外
// 多個子類別不同的單例實體可以抽換運用

// 所以請不要將單例的建構子設定為 protected

// 接下來討一個特別的設計
// Lazy Initialization in Singleton Pattern

// 有時候建構這個單例實體可能會耗費大量的資源又不常用到
// 我們就可以使用延遲初始化的設定方式
// 邏輯很簡單 只要第一次呼叫 SingletonClass.getInstance() 時再建構就好
//                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

class LazySingletonPerson {
    private constructor(
        public readonly name: string,
        public readonly age: number,
        public readonly hasPet: boolean,
    ) {}

    private static Instance: LazySingletonPerson | null = null;

    static getInstance(): LazySingletonPerson {
        if (this.Instance === null) {
            this.Instance = new LazySingletonPerson('Maxwell', 20, false);
        }

        return this.Instance;
    }
}
