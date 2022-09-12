// Day 30: 流言終結者 X 重新認識物件的複合 - Favour Object Composition Over Class Inheritance

export {};

// Favour Object Composition Over Class Inheritance.
// 物件複合和使用介面都是為了降低耦合度 但做法不同
// 介面是宣高規格 彈性組合
// 物件複合則是讓類別用不同的方式相關聯以達成不依賴繼承降低耦合度

// 要解釋那句名言 必須要先了解物件委派 (Delegation)
// 以下段落出自 Design Patterns - Elements of Reusable Object Oriented Software
// Delegation is a way of making composition as powerful for reuse as inheritance.
// In delegation, two objects are involved in handling a request:
// a receiving object delegates operations to its delegate.
// 物件委派是一種使 (物件) 複合像繼承一樣可良好複用的方法
// 在委派中，兩個處理相同請求的物件：
// 接收請求的物件會前行動委派給它的代理者

// Maxwell Alexius 認為委派的概念和策略模式很像
// 回想我們使用策略模式的結構：
// 我們正是將角色攻擊的行動委派給 Attack 介面下的不同攻擊策略處理
// 這些策略就是 Character 委任 Attack Request 的對象
// Ref: https://ithelp.ithome.com.tw/upload/images/20190928/20120614SJNe9BEwKJ.png

// 我們再看一個新的範例：

class MyWindow {
    public readonly shape = 'Rectangular';

    constructor(public width: number, public height: number) {}

    public area() {
        return this.width * this.height;
    }

    public circumference() {
        return 2 * (this.width + this.height);
    }
}

const myWindow = new MyWindow(50, 100);

console.log(myWindow.area());
console.log(myWindow.circumference());

// 假設視窗可能分別為圓形和矩形
// 最粗糙的做法是分別宣告並綁定相同介面

interface Geometry {
    area(): number;
    circumference(): number;
}

class Rectangle implements Geometry {
    constructor(public width: number, public height: number) {}

    public area(): number {
        return this.width * this.height;
    }

    public circumference(): number {
        return 2 * (this.width + this.height);
    }
}

class Circle implements Geometry {
    public static PI = Math.PI;

    constructor(public radius: number) {}

    public area(): number {
        return Circle.PI * this.radius ** 2;
    }

    public circumference(): number {
        return 2 * Circle.PI * this.radius;
    }
}

class RectanglarWindow extends Rectangle {
    public readonly shape = 'Rectangle';
}

class CirclarWindow extends Circle {
    public readonly shape = 'Circle';
}

// 但這種做法會有問題
// 要如何只宣告一個 MyWindow 又能同時指定 Rectangle 或 Circle 呢？
// 所以我們要在使用物件委任

// 首先我們將 MyWindow 設定一個委派物件的參考點 dimension

class NewMyWindow {
    constructor(public geometry: Geometry) {}

    public area() {
        return this.geometry.area();
    }

    public circumference() {
        return this.geometry.circumference();
    }
}

// 接下來就可以直接測試

const rectWindow = new NewMyWindow(new Rectangle(50, 100));

console.log(`Area of RectWindow: ${rectWindow.area()}`);
console.log(`Circumference of RectWindow: ${rectWindow.circumference()}`);

const circWindow = new NewMyWindow(new Circle(10));

console.log(`Area of CircWindow: ${circWindow.area()}`);
console.log(`Circumference of CircWindow: ${circWindow.circumference()}`);

// 委派物件的模式就是 Dependency Injection 的實踐
