// Day 24: 類別推論 X 註記類別 - Class Type Inference & Annotation

export {};

// 讓我們用一個範例來討論：

enum Color {
    White,
    Black,
    Brown,
    Gray,
    Rainbow,
}

class Horse {
    constructor(
        public name: string,
        public color: Color,
        public readonly type: string,
        private noise: string = 'MeeeeeeeEeeééeéeée~~',
    ) {}

    public makeNoise() {
        console.log(this.noise);
    }

    public info() {
        console.log(this.infoText);
    }

    protected infoText(): string {
        return `It's ${this.name} the ${Color[this.color]} ${this.type}.`;
    }
}

// 建構子函式型別推論結果為
// Horse(name: string, color: Color, type: string, noise?: string): Horse

// 重點如下：
// 1. 函式名稱為 Horse
//    原生 JavaScript 使用 Function 來模擬
// 2. 回傳類型是 Horse
//    代表 Horse 本身是一種 Type Alias
//    也就是說 宣告一個類別等同於創建新的型別 可以用來做型別註記
// 3. ASK: noise 是選用屬性？

let randomHorse = new Horse('Martin', Color.Black, 'Pony');

// 驗證一下檢查機制
randomHorse.color = 'White'; // error
randomHorse.isNatural = false; // error
randomHorse = null; // error
randomHorse = new Horse('Toby', Color.Brown, 'Stallion');

// 類別的型別註記方式
const anotherHorse: Horse = new Horse('Leo', Color.Black, 'Bronco');
const oneAnotherHorse = <Horse>new Horse('Wendy', Color.White, 'Mustang');
const noMoreHorse = new Horse('Alexius', Color.Rainbow, 'Foal') as Horse;

// WARNING: 事實上也可以用類別實作 type

type SomeType = {
    message: string;
};

class SomeClass implements SomeType {
    // ...
}

// WARNING: 但非常不建議這麼做
// 因為型別是靜態資料格式 類別是以物件設計實作動態行為
// 混用會把自己搞得很混亂的...

// 接下來會分別討論 Class Inheritance / 實作 Interface 時的各種狀況

// Inheritance

class Unicorn extends Horse {
    constructor(name: string) {
        super(name, Color.Rainbow, 'Mystical Unicorn', 'Nheehehehé~~');
    }

    protected infoText(): string {
        return `It's Charlie!`;
    }

    public puke(): void {
        console.log('Puking rainbow vomit!');
    }
}

// Unicorn 覆寫了父類別的 infoText()
// 具有類別的 puke() 方法

const randomUnicorn = new Unicorn('Maxwell');

// ASK: 那這樣子可以嗎？

const whatWasThat: Horse = new Unicorn('Unihorse');

// 實際上是可以的 子類別同時具有父類別和子類別的特性
// 被註記為父類別的變數可以指派子類別的物件
// 在 VanillaJS 中 他們隸屬於同一條原型鏈 (Prototype Chain)
// WARNING: 但是否註記父類別依然有差 而且差的比想像中多

randomUnicorn.puke();
whatWasThat.puke(); // 註記為父類別就不給呼叫子類別的方法了...

// ASK: 那這種狀況呢？

const shouldBeUnicorn: Unicorn = new Horse(
    'Unicoco',
    Color.Rainbow,
    'Unicorn hoho~',
    'Nyeeeee~~',
);

// hover: Property 'puke' is missing in type 'Horse'
// but require in type 'Unicorn'

// ASK: 意思是如果都有 puke() 方法就沒問題嗎？

class Stallion extends Horse {
    constructor(name: string) {
        super(name, Color.Brown, 'Stallion');
    }
}

const shouldBeStallion: Stallion = new Horse(
    'Stallionon',
    Color.Gray,
    'Stallion onon~',
);

// 還真的沒有問題 子類別竟然可以被指派父類別的實體

// POINT:
// 1. C_Inherit 的型別推論機制和一般類別相同
// 2. 若變數 A 被註記為父類別 C
//    可以將 A 指派給 C 的實體或是 C_Inherit 的實體
// 3. 若變數 B 被註記為子類別 C_Inherit
//    若子類別沒有新增成員 可以將 B 指派配 C 的實體

// 從上述的狀況看起來 我們可以假設如下：
// POINT: 類別繼承過後的推論機制
// 並非以原型鏈或類別名稱來辨識
// 而是直接以實體格式比對是否為同一型別

// 我們可以嘗試看看

class C1 {
    constructor(public prop: string) {}

    public publicMethod(): string {
        return this.prop;
    }
}

class C2 {
    constructor(public prop: string) {}

    public publicMethod(): string {
        return this.prop;
    }
}

const publicObject: C1 = new C2('Hello');

// 竟然真的通過了
// ASK: 那更複雜的格式呢？

class privateC1 {
    constructor(public prop: string, private privateProp: number) {}

    public publicMethod(): number {
        return this.privateMethod();
    }

    private privateMethod(): number {
        return this.privateProp;
    }
}

class privateC2 {
    constructor(public prop: string, private privateProp: number) {}

    public publicMethod(): number {
        return this.privateMethod();
    }

    private privateMethod(): number {
        return this.privateProp;
    }
}

const privateObject: privateC1 = new privateC2();

// POINT: 實際上只要有 private 和 protected 成員就不完全相等
// 也就是說
// 如果兩個類別 C1 和 C2 所有成員名稱和型別都對應
// 而且都只有 public 成員
// TypeScript 會判定兩者等效

// TRY: 如果類別有這種特性
// 那型別跟介面呢

type T1 = { Hello: string };
type T2 = { Hello: string };

interface I1 {
    Hello: string;
}

interface I2 {
    Hello: string;
}

function logTypeOne(obj: T1) {
    console.log(obj);
}

logTypeOne(<T1>{ Hello: 'World' });
logTypeOne(<T2>{ Hello: 'World' });
logTypeOne(<I1>{ Hello: 'World' });
logTypeOne(<I2>{ Hello: 'World' });

// 也是相同的原理！

// REVIEW: 剩下兩種狀況就留待明天再討論了...
