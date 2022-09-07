'use strict';
var F = function (p1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof p1 === 'number' && args instanceof Array) {
        return args.reduce(function (acc, cur) {
            return acc + cur;
        }, p1);
    } else if (p1 instanceof Array) {
        return p1.reduce(function (acc, cur) {
            return acc + cur;
        }, 0);
    }
    throw new Error('Something is wrong with your input...');
};
console.log(F(1, 2, 3, 4, 5));
console.log(F([1, 2, 3, 4, 5]));
