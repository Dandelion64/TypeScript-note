'use strict';
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
var collection = new MyArray([1, 2, 3, 4, 5]);
var iterator = collection.createIterator();
while (!iterator.isDone()) {
    console.log('Iterated value: '.concat(iterator.currentItem));
    iterator.next();
}
try {
    iterator.next();
} catch (err) {
    console.log('Out of bound error caught...');
}
