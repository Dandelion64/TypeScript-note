// Day 45: 泛用類別與介面 X 終極組合第二彈 - Ultimate Combo of Generic Class & Interface

export {};

// 本日重點在於強調泛型的宣告下類別與介面綁定時的規則與特點

// 先看看我們主要使用的 interfaces
// 將會被用來實作 Linked List

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

// 注意上述狀況都沒有處理 index 為 float 的狀況
// 我想應該可以寫一個 function 來處理

// POINT: 實際開發時最好使用 Test-Driven Development
// 也就是先撰寫測試再實作功能
// Ref: https://www.wikiwand.com/en/Test-driven_development

// 這種開發方式有許多好處
// 例如可以一開始就依功能切分出最小單位
// 更清楚多餘的部分 以及更容易實作設計模式

const list = new GenericLinkedList<number>();

list.insert(0, 123);
list.insert(1, 456);
list.insert(2, 789);
list.insert(1, 12321);

list.getInfo(); // => [123] -> [12321] -> [456] -> [789]

// 如果 100% 確定為某型別 積極註記可以提升可讀性
console.log((list.at(0) as LinkedListNode<number>).value);
console.log((list.at(1) as LinkedListNode<number>).value);
console.log((list.at(2) as LinkedListNode<number>).value);
console.log((list.at(3) as LinkedListNode<number>).value);

try {
    list.at(4);
} catch (err) {
    console.log('Out of bound error caught');
}
