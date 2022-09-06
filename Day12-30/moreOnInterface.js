"use strict";
var createCounter = function () {
    var value;
    var initializedNumber;
    var counter = function (startNumber) {
        initializedNumber = startNumber;
        value = startNumber;
    };
    counter.increment = function () {
        value++;
        return value;
    };
    counter.reset = function () {
        value = initializedNumber;
    };
    Object.defineProperty(counter, 'value', {
        get: function () {
            return value;
        }
    });
    return counter;
};
var counter = createCounter();
counter(5);
console.log(counter.value);
counter.increment();
counter.increment();
counter.increment();
console.log(counter.value);
counter.reset();
console.log(counter.value);
