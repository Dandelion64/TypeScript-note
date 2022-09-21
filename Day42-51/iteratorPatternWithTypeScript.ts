// Day 46: 迭代器模式 X 泛用迭代器 - Iterator Pattern Using TypeScript

export {};

// 迭代器模式 (iterator Pattern)

// 迭代器的定義：
// 專門用來巡訪 (Iterate) 或者遍歷 (Traverse) 目標聚合物 (Collection) 的內容

// 一般常見的聚合物 (Collection 或許應譯作集合) 有 Array, Set... 等
// 總之 迭代器是專門遍歷 Collection 的物件
//            ^^^^^^^^^^^^^^^^^^^^^^^

// ============================================================
// 此外 樹 (Tree) 這種資料結構也是一種 Collection
// 但 iterate 的模式就有分為：
// 1. 前序巡訪 (Preorder)
// 2. 中序巡訪 (Inorder)
// 3. 後序巡訪 (Postorder)
// 4. 層級巡訪 (Level-order)

/**
 * 其巡訪演算法有兩種：
 * 1. 深度優先巡訪 (Depth-First Search)
 *    專門以巡訪 Child Tree 為優先
 *    較適合處理 「找不找得到路徑」 相關問題
 *    ex. 迷宮
 *
 *    * 前序、中序、後序都屬於這類型
 *    * 樹狀結構越深 其耗費時間便可能增長
 *
 * 2. 廣度優先巡訪 (Breadth-First Search)
 *    專門以巡訪層級為優先
 *    較適合處理 「最短路徑」 相關問題
 *    ex. 人脈的維度 (1st degree, 2nd degree...)
 *
 *    * 只有層級巡訪屬於這類型
 *    * 樹狀結構越廣 其耗費時間便可能增長
 */

/**
 * Collection 泛指常見的聚合型資料結構
 * 不限列狀、環狀、樹狀或是圖 (Graph)
 */

// Ref: https://www.wikiwand.com/en/Tree_(data_structure)
// ============================================================

// ASK: 我們不是有 if/else 或 for/while 等方法去巡訪了嗎？
// 為什麼還會需要迭代器呢？

// POINT: 因為你不可能只會遇到普通串列的格式
//            ^^^^^^^^^^^^^^^^^^^^^^^
// 複雜的結構巡訪也會相對應的冗雜 可讀和可複用性太差 維護更是困難
// 可以想想看以下的狀況：

/*
    if (iterMode === 'inorder') {
        for () {}
    } else if (iterMode === 'preorder') {
        for () {}
    } else if (iterMode === 'postorder') {
        for () {}
    }
*/

// 如果其他地方也會用到類似的遍歷演算法
// 可能就必須 copy paste 或是採用 Strategy Mode 來抽換演算法

/**
 * 迭代器模式 (Iterator Pattern)
 *
 * 迭代器模式的主要目的在於不需要知曉任意聚合物的細節
 * 就可以遍歷內含的每一個元素
 *
 * POINT: 也就是說
 * 我們可以宣告統一的產出迭代器的介面 (Iterator Generator Interface)
 *                ^^^                     ^^^^^^^^^
 * 任何互相毫無關聯甚至是實作上天差地遠的聚合物都可以藉由實踐該介面
 * 產出同樣功能的迭代器以達到泛用的效果
 */

// TRY: 讓我們利用 Factory Method Pattern 實作陽春版 Iterator

interface Iterator<T> {
    // 實際上這個範例出自設計模式名著
    // Design Patterns — Elements of Reusable Object-Oriented Software
    // 書中多了一個 first 方法取得 Collection 的第一個值
    // 不過 Maxwell Alexius 認為此處沒有需求
    // first(): T | null;

    next(): void;

    isDone(): boolean;

    currentItem: T | null;
}

interface Iterable<T> {
    // Factory Method
    createIterator(): Iterator<T>;
}

class NormalIterator<T> implements Iterator<T> {
    public currentItem: T | null = null;
    private currentIndex = 0;

    constructor(private items: Array<T>) {
        this.currentItem = items[0];
    }

    public isDone() {
        return this.currentIndex > this.items.length - 1;
    }

    public next() {
        if (this.isDone()) throw new Error('Iterator out of bound...');

        this.currentIndex++;
        this.currentItem = this.items[this.currentIndex];
    }
}

class MyArray<T> implements Iterable<T> {
    constructor(public items: Array<T>) {}

    createIterator() {
        return new NormalIterator<T>(this.items);
    }
}

// 設計結構如圖：
// Ref: https://ithelp.ithome.com.tw/upload/images/20191012/20120614t9qkO1ycO9.png

// 實際使用看看

const collection = new MyArray<number>([1, 2, 3, 4, 5]);
const iterator = collection.createIterator();

while (!iterator.isDone()) {
    console.log(`Iterated value: ${iterator.currentItem}`);
    iterator.next();
}

try {
    iterator.next();
} catch (err) {
    console.log('Out of bound error caught...');
}

// Iterator Pattern 的優勢

// REVIEW: 先從 Day 45 取得需要的程式碼 (implementing linked list)

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

class GenericLinkedListNode<T> implements LinkedListNode<T> {
    public next: LinkedListNode<T> | null = null;

    constructor(public value: T) {}
}

class GenericLinkedList<T> implements LinkedList<T> {
    public head: LinkedListNode<T> | null = null;

    // 有些 Linked List 是用 size
    public length() {
        if (this.head === null) return 0;

        let count = 0;
        let currentNode: LinkedListNode<T> | null = this.head;

        while (currentNode !== null) {
            currentNode = currentNode.next;
            count++;
        }

        return count;
    }

    public at(index: number): LinkedListNode<T> | null {
        const length = this.length();

        if (index >= length) throw new Error('Index out of bound...');

        let currentIndex = 0;
        let currentNode = this.head as LinkedListNode<T>;

        while (currentIndex !== index) {
            currentNode = currentNode.next as LinkedListNode<T>;
            currentIndex++;
        }

        return currentNode;
    }

    public insert(index: number, value: T) {
        const length = this.length();
        const newNode = new GenericLinkedListNode(value);

        if (length < index) {
            throw new Error('Index out of bound...');
        } else if (length === index) {
            // length 恰等於 index 代表要插入新的節點在尾端
            if (index === 0) {
                this.head = newNode;
            } else {
                const node = this.at(index - 1) as LinkedListNode<T>;
                node.next = newNode;
            }
        } else {
            // length 大於 index 代表要插入新的節點在頭部或中段
            if (index === 0) {
                const originalHead = this.head;
                this.head = newNode;
                this.head.next = originalHead;
            } else {
                const prevNode = this.at(index - 1) as LinkedListNode<T>;
                const originalNode = prevNode.next as LinkedListNode<T>;
                prevNode.next = newNode;
                newNode.next = originalNode;
            }
        }
    }

    public remove(index: number): void {
        const length = this.length();

        if (length === 0) {
            throw new Error('Linked list is empty...');
        } else if (index < 0 || index > length) {
            throw new Error('Index out of bound...');
        } else {
            const prevNode = this.at(index - 1) as LinkedListNode<T> | null;
            const nextNode = this.at(index + 1) as LinkedListNode<T> | null;
            if (prevNode === null) {
                this.head = nextNode;
            } else {
                prevNode.next = nextNode;
            }
        }
    }

    public getInfo() {
        let currentNode = this.head;
        let currentIndex = 0;

        while (currentNode !== null) {
            console.log(`Index ${currentIndex}: ${currentNode.value}`);
            currentNode = currentNode.next;
            currentIndex++;
        }
    }
}

// 一般狀況下 要迭代這個 GenericLinkedList 可能要這樣寫

const list = new GenericLinkedList<number>();

list.insert(0, 123);
list.insert(1, 456);
list.insert(2, 789);
list.insert(1, 12321);

// 迭代他～

/*
    let currentNode = list.head;
    
    while (currentNode !== null) {
        console.log(`Current node value: ${currentNode.value}`);
        currentNode = currentNode.next;
    }
*/

// 假設我們希望 GenericLinkedList 也可以產出迭代器

class IterableLinkedList<T>
    extends GenericLinkedList<T>
    implements Iterable<T>
{
    public createIterator() {
        const elements: Array<T> = [];

        let currentNode = this.head;

        while (currentNode !== null) {
            elements.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return new NormalIterator(elements);
    }
}

// 利用 Generics 來宣告以使其允許接受任意型別之 Iterator

function foreach<T>(iter: Iterator<T>, callback: (v: T) => void) {
    while (!iter.isDone()) {
        callback(iter.currentItem as T);
        iter.next();
    }
}

const collection01 = new MyArray([1, 2, 3]);
const collection02 = new IterableLinkedList<number>();
collection02.insert(0, 1);
collection02.insert(1, 2);
collection02.insert(2, 3);

const iter01 = collection01.createIterator();
const iter02 = collection02.createIterator();

foreach(iter01, (v) => console.log(`v from collection01: ${v}`));
foreach(iter02, (v) => console.log(`v from collection02: ${v}`));

// 這個行為在設計模式原著又有一個名稱
// POINT: 多型巡訪 (Polymorphic Iteration)
// 也就是說即使來源是不同的 Collection
// 我們依然可以使用相同的迭代方式去遍歷 這就是多型巡訪
//              ^^^^^^^^^^^^

// POINT: 其實 Iterator Pattern
// 講直白點主要就是把聚合物內部的結構隱藏在聚合物類別中
// 綁定 Iterable<T> 介面負責去宣告建構統一的迭代器介面

// 假設我們也有二元樹 (Binary Tree) 這種資料結構
// REF: https://www.wikiwand.com/en/Binary_tree

// 讓我們嘗試定義一個過度簡化版本的 Binary Tree

class BinaryTree<T> {
    constructor(public root: TreeNode<T>) {}
}

class TreeNode<T> {
    public leftNode: TreeNode<T> | null = null;
    public rightNode: TreeNode<T> | null = null;
    public parent: TreeNode<T> | null = null;

    constructor(public value: T) {}

    // 存儲方法 --- 存放左節點
    set left(value: T) {
        this.leftNode = new TreeNode(value);

        this.leftNode.parent = this;
    }

    // 存儲方法 --- 存放右節點
    set right(value: T) {
        this.rightNode = new TreeNode(value);

        this.rightNode.parent = this;
    }
}

// 讓我們實作它

type TN = TreeNode<number>;

const root = new TreeNode(1);
const binaryTree01 = new BinaryTree(root);

root.left = 2;
(root.leftNode as TN).left = 3;
(root.leftNode as TN).right = 4;
((root.leftNode as TN).rightNode as TN).left = 5;

root.right = 6;
(root.rightNode as TN).left = 7;
((root.rightNode as TN).leftNode as TN).left = 8;
((root.rightNode as TN).leftNode as TN).right = 9;
(((root.rightNode as TN).leftNode as TN).rightNode as TN).left = 10;

// 以上的二元樹結構如下參考圖
// Ref: https://ithelp.ithome.com.tw/upload/images/20191012/201206141x1ylyiygm.png

// 一般來說 如果想要遍歷樹狀資料結構
// 又分為前序中序及後序
// 這裡會以前序為例做解釋 前序將會剛好從 1 走到 10 (設計好的啦哈哈)

class NewBinaryTree<T> implements Iterable<T> {
    constructor(public root: TreeNode<T>) {}

    public preorderTraversal(callback: (el: TreeNode<T>) => void) {
        this.preorderRecursive(this.root, callback);
    }

    // 私有 以遞迴實現前序巡訪
    private preorderRecursive(
        node: TreeNode<T>,
        callback: (el: TreeNode<T>) => void,
    ) {
        callback(node);

        if (node.leftNode !== null) {
            this.preorderRecursive(node.leftNode, callback);
        }

        if (node.rightNode !== null) {
            this.preorderRecursive(node.rightNode, callback);
        }
    }

    // 實作 Iterable<T> 的介面
    public createIterator() {
        const elements: Array<T> = [];

        // 使用 preorderTraversal() 方法將值都丟進 elements 陣列
        this.preorderTraversal((node) => {
            elements.push(node.value);
        });

        // 建構迭代器
        return new NormalIterator(elements);
    }
}

// 嘗試使用看看

const binaryTree02 = new NewBinaryTree(root);

// 一般使用手法
console.log('Normal Usage:');
const valueCumulation01: Array<number> = [];

binaryTree02.preorderTraversal((n) => valueCumulation01.push(n.value));
console.log(valueCumulation01);

// 多型巡訪
console.log('Polymorphic Iteration:');
const valueCumulation02: Array<number> = [];
const binaryTree02Iterator = binaryTree02.createIterator();

foreach(binaryTree02Iterator, (v) => valueCumulation02.push(v));
console.log(valueCumulation02);

// 本日範例架構示意圖
// Ref: https://ithelp.ithome.com.tw/upload/images/20191013/20120614DC7mDgWsJt.png
