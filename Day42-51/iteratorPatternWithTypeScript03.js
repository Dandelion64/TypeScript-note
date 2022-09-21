'use strict';
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b)
                        if (Object.prototype.hasOwnProperty.call(b, p))
                            d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== 'function' && b !== null)
                throw new TypeError(
                    'Class extends value ' +
                        String(b) +
                        ' is not a constructor or null',
                );
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
exports.__esModule = true;
var NormalIterator = /** @class */ (function () {
    function NormalIterator(items) {
        this.items = items;
        this.currentItem = null;
        this.currentIndex = 0;
        this.currentItem = items[0];
    }
    NormalIterator.prototype.isDone = function () {
        return this.currentIndex > this.items.length - 1;
    };
    NormalIterator.prototype.next = function () {
        if (this.isDone()) throw new Error('Iterator out of bound...');
        this.currentIndex++;
        this.currentItem = this.items[this.currentIndex];
    };
    return NormalIterator;
})();
var MyArray = /** @class */ (function () {
    function MyArray(items) {
        this.items = items;
    }
    MyArray.prototype.createIterator = function () {
        return new NormalIterator(this.items);
    };
    return MyArray;
})();
var GenericLinkedListNode = /** @class */ (function () {
    function GenericLinkedListNode(value) {
        this.value = value;
        this.next = null;
    }
    return GenericLinkedListNode;
})();
var GenericLinkedList = /** @class */ (function () {
    function GenericLinkedList() {
        this.head = null;
    }
    GenericLinkedList.prototype.length = function () {
        if (this.head === null) return 0;
        var count = 0;
        var currentNode = this.head;
        while (currentNode !== null) {
            currentNode = currentNode.next;
            count++;
        }
        return count;
    };
    GenericLinkedList.prototype.at = function (index) {
        var length = this.length();
        if (index >= length) throw new Error('Index out of bound...');
        var currentIndex = 0;
        var currentNode = this.head;
        while (currentIndex !== index) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        return currentNode;
    };
    GenericLinkedList.prototype.insert = function (index, value) {
        var length = this.length();
        var newNode = new GenericLinkedListNode(value);
        if (length < index) {
            throw new Error('Index out of bound...');
        } else if (length === index) {
            if (index === 0) {
                this.head = newNode;
            } else {
                var node = this.at(index - 1);
                node.next = newNode;
            }
        } else {
            if (index === 0) {
                var originalHead = this.head;
                this.head = newNode;
                this.head.next = originalHead;
            } else {
                var prevNode = this.at(index - 1);
                var originalNode = prevNode.next;
                prevNode.next = newNode;
                newNode.next = originalNode;
            }
        }
    };
    GenericLinkedList.prototype.remove = function (index) {
        var length = this.length();
        if (length === 0) {
            throw new Error('Linked list is empty...');
        } else if (index < 0 || index > length) {
            throw new Error('Index out of bound...');
        } else {
            var prevNode = this.at(index - 1);
            var nextNode = this.at(index + 1);
            if (prevNode === null) {
                this.head = nextNode;
            } else {
                prevNode.next = nextNode;
            }
        }
    };
    GenericLinkedList.prototype.getInfo = function () {
        var currentNode = this.head;
        var currentIndex = 0;
        while (currentNode !== null) {
            console.log(
                'Index '.concat(currentIndex, ': ').concat(currentNode.value),
            );
            currentNode = currentNode.next;
            currentIndex++;
        }
    };
    return GenericLinkedList;
})();
var IterableLinkedList = /** @class */ (function (_super) {
    __extends(IterableLinkedList, _super);
    function IterableLinkedList() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    IterableLinkedList.prototype.createIterator = function () {
        var elements = [];
        var currentNode = this.head;
        while (currentNode !== null) {
            elements.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return new NormalIterator(elements);
    };
    return IterableLinkedList;
})(GenericLinkedList);
function foreach(iter, callback) {
    while (!iter.isDone()) {
        callback(iter.currentItem);
        iter.next();
    }
}
var BinaryTree = /** @class */ (function () {
    function BinaryTree(root) {
        this.root = root;
    }
    return BinaryTree;
})();
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.leftNode = null;
        this.rightNode = null;
        this.parent = null;
    }
    Object.defineProperty(TreeNode.prototype, 'left', {
        set: function (value) {
            this.leftNode = new TreeNode(value);
            this.leftNode.parent = this;
        },
        enumerable: false,
        configurable: true,
    });
    Object.defineProperty(TreeNode.prototype, 'right', {
        set: function (value) {
            this.rightNode = new TreeNode(value);
            this.rightNode.parent = this;
        },
        enumerable: false,
        configurable: true,
    });
    return TreeNode;
})();
var root = new TreeNode(1);
var binaryTree01 = new BinaryTree(root);
root.left = 2;
root.leftNode.left = 3;
root.leftNode.right = 4;
root.leftNode.rightNode.left = 5;
root.right = 6;
root.rightNode.left = 7;
root.rightNode.leftNode.left = 8;
root.rightNode.leftNode.right = 9;
root.rightNode.leftNode.rightNode.left = 10;
var NewBinaryTree = /** @class */ (function () {
    function NewBinaryTree(root) {
        this.root = root;
    }
    NewBinaryTree.prototype.preorderTraversal = function (callback) {
        this.preorderRecursive(this.root, callback);
    };
    NewBinaryTree.prototype.preorderRecursive = function (node, callback) {
        callback(node);
        if (node.leftNode !== null) {
            this.preorderRecursive(node.leftNode, callback);
        }
        if (node.rightNode !== null) {
            this.preorderRecursive(node.rightNode, callback);
        }
    };
    NewBinaryTree.prototype.createIterator = function () {
        var elements = [];
        this.preorderTraversal(function (node) {
            elements.push(node.value);
        });
        return new NormalIterator(elements);
    };
    return NewBinaryTree;
})();
var binaryTree02 = new NewBinaryTree(root);
console.log('Normal Usage:');
var valueCumulation01 = [];
binaryTree02.preorderTraversal(function (n) {
    return valueCumulation01.push(n.value);
});
console.log(valueCumulation01);
console.log('Polymorphic Iteration:');
var valueCumulation02 = [];
var binaryTree02Iterator = binaryTree02.createIterator();
foreach(binaryTree02Iterator, function (v) {
    return valueCumulation02.push(v);
});
console.log(valueCumulation02);
