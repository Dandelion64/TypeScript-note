// Day 22: 特殊成員 X 存取方法 - TypeScript Class Accessors

export {};

// 存取子 (Accessors)

// 讓我們沿用昨天的範例
// ASK: 我們能不能不要使用 area() 方法
// 改成呼叫屬性來計算出面積呢？

// 一種可行方法如下

class CircleGeometryV2 {
    #PI: number = Math.PI;

    // 為了在外界存取得到必須要設定為 public
    public area: number;

    constructor(public radius: number) {
        this.area = this.#PI * radius ** 2;
    }

    public circumference(): number {
        return 2 * this.#PI * this.radius;
    }
}

const randomCircle = new CircleGeometryV2(2);
console.log(randomCircle.area);

// 目前這樣做的缺點很明顯 就是我們可以用以下方式覆寫掉面積的值
randomCircle.area = 5; // public member

// POINT: 此外 老實說不應該在建構子函式中進行運算

// 因此我們要介紹存取子 (Accessors)
// 存取子分為 Getter 和 Setter
// 也就是時常聽到的 Getter/Setter Methods(Functions)

// ============================================================
// WARNING:
// 某些程式語言中
// 會以 Accessors 代表取值方法
// 而以 Mutators 代表存值方法 (變異子)
// 也就不採用 Getter/Setter 的名稱 使用的是 Accessor/Mutator
// ============================================================

class CircleGeometryV3 {
    #PI: number = Math.PI;

    constructor(public radius: number) {}

    // Getter Method
    // POINT: 使用 get 關鍵字
    get area() {
        return this.#PI * this.radius ** 2;
    }

    public circumference(): number {
        return 2 * this.#PI * this.radius;
    }
}

const getterCircle = new CircleGeometryV3(2);
console.log(getterCircle.area);
getterCircle.area = 5566; // error

// hover 的結果很有趣
// TypeScript 認為 area 是 read-only
// 也就是說 如果只有定義取值方法 將會是唯獨狀態

getterCircle.radius = 3;
console.log(getterCircle.area);

// 讓我們順便實作 setter method

class CircleGeometryV4 {
    #PI: number = Math.PI;

    constructor(public radius: number) {}

    get area() {
        return this.#PI * this.radius ** 2;
    }

    set area(value: number) {
        this.radius = (value / this.#PI) ** 0.5;
    }

    get circumference() {
        return 2 * this.#PI * this.radius;
    }
}

const accessorCircle = new CircleGeometryV4(2);
console.log(accessorCircle.radius);
console.log(accessorCircle.area);
accessorCircle.area = Math.PI * 3 ** 2;
console.log(accessorCircle.radius);

accessorCircle.area = 'puhipuhi'; // error

// POINT:
// Getter Method 不能有任何參數且一定要回傳值
// 因其模擬的是取得物件屬性的行為
// Setter Method 只能有一個參數
//               ^^^^^^^^^^^
// 因其模擬的是值派值到物件屬性的行為

/*
class C {
    get P() {
        return <some-value>;
    }

    ser P(value: Tassign) {
        // do something...
    }
}
*/

// ============================================================
// POINT: 
// readonly 也是可以使用的一個關鍵字

class CircleGeometry {
    public readonly PI: number = Math.PI;
    static readonly staticPI: number = Math.PI;

    // ...
}

const anotherRandomCircle = new CircleGeometry();
anotherRandomCircle.PI;
anotherRandomCircle.PI = 5566; // error
CircleGeometry.staticPI;
CircleGeometry.staticPI = 5566; // error
// ============================================================
