// Day 44: 介面與類別 X 泛型註記機制 - TypeScript Generic Class & Interface

export {};

/**
 * 泛用介面 (Generic Interface)
 */

// 為了討論介面與類別整合時會遇到的狀況
// 今天的範例會以鏈結串列 (Linked List) 這個資料結構討論
// Ref: https://www.wikiwand.com/en/Linked_list

/*
    interface LinkedListNode {
        value: any;
        next: LinkedListNode | null;
    }

    interface LinkedList {
        head: LinkedListNode | null;
        length(): number;
        at(index: number): LinkedListNode | null;
        insert(index: number, value: any): void;
        remove(index: number): void;
    }
*/

// 以上的 LinkList 介面有五個規格
// 1. head 為首元素
//    由於鏈結串列可以為空 因此不排除 null 型別
// 2. length() 方法
//    回傳鏈結串列長度
// 3. at() 方法
//    回傳該索引值的元素
// 4. insert() 方法
//    插入元素
// 5. remove() 方法
//    移除元素

// 而 LinkedListNode 介面
// next 可以為 null 是因為可能是最後一個元素

// 但目前的寫法 使用到了 any 型別
// 我們應該使用 Generics 來給予限制同時維持彈性

interface LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
}

interface LinkedList<U> {
    head: LinkedListNode<U> | null;
    length(): number;
    at(index: number): LinkedListNode<U> | null;
    insert(index: number, value: U): void;
    remove(index: number): void;
}

/**
 * 泛用類別 (Generic class)
 */

class C<T> {
    constructor(public memberProp: T) {}

    public memberFunc() {
        return this.memberProp;
    }

    // Getter
    get value() {
        return this.memberProp;
    }

    // Setter
    set value(input: T) {
        this.memberProp = input;
    }
}

// POINT: 泛用類別有一些特別便利之處 以下一一示範：

// 1. 不註記在變數上而在建立物件時才顯性代入型別參數

const instanceOfC01 = new C<number>(214);

instanceOfC01.memberProp;
instanceOfC01.memberFunc();
instanceOfC01.value;
instanceOfC01.value = 412;
instanceOfC01.value = 'Wololo~';

// 2. 註記在變數上

const instanceOfC02: C<number> = new C(5566);

instanceOfC02.memberProp;
instanceOfC02.memberFunc();
instanceOfC02.value;
instanceOfC02.value = 9453;

// 3. 不註記在變數上 但指派實體時 甚至可以不用註記型別參數給建構子

const instanceOfC03 = new C(33);

instanceOfC03.memberProp;
instanceOfC03.memberFunc();
instanceOfC03.value;
instanceOfC03.value = 66;

// 既然可以不用註記 那麼積極註記通常就是為了可讀性或指定型別

/**
 * 泛用類別的繼承 (Generic Class Inheritance)
 */

// REVIEW: 大致上與 Day 24 所討論的父子類別行為相同
// 這裡只特別挑出子類別繼承父類別 且父類別為泛用類別的宣告方式來討論

// ASK: 試分辨以下兩種格式

class D extends C<T> {}
class E<T> extends C<T> {}

// D 必須明確知道 T 型別用以推論
// 但 E 已經知道他的型別就是 T

// POINT: 子類別繼承泛用類別的情形
// 若子類別為普通類別時
// 繼承到的泛用父類別必須確切指名該型別參數的確切型別值
// 然而若子類別也是泛用類別時
// 則繼承到的泛用父類別除了可以指定特定的型別外
// 也可以填入子類別所宣告的型別參數建立型別上的連結

// TRY: 試理解下述狀況

class Cparent<T, U> {
    constructor(public member1: T, public member2: U) {}

    get value1() {
        return this.member1;
    }

    get value2() {
        return this.member2;
    }
}

class Cchild01<T, U> extends Cparent<T, U> {}
class Cchild02<T, U = T> extends Cparent<T, U> {}
class Cchild03<T, U extends T> extends Cparent<T, U> {}
