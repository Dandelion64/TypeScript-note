'use strict';
var MyMath;
(function (MyMath) {
    var Circle;
    (function (Circle) {
        Circle.PI = Math.PI;
        function area(radius) {
            return Circle.PI * Math.pow(radius, 2);
        }
        Circle.area = area;
        function circumference(radius) {
            return 2 * Circle.PI * radius;
        }
        Circle.circumference = circumference;
    })((Circle = MyMath.Circle || (MyMath.Circle = {})));
})(MyMath || (MyMath = {}));
(function (MyMath) {
    let Rectangle;
    (function (Rectangle) {
        Rectangle.area = (width, height) => {
            return width * height;
        };
        Rectangle.circumference = (width, height) => {
            return 2 * (width + height);
        };
    })((Rectangle = MyMath.Rectangle || (MyMath.Rectangle = {})));
})(MyMath || (MyMath = {}));
/// <reference path="./MyMath/MergedCircle.ts" />
/// <reference path="./MyMath/MergedRectangle.ts" />
console.log(MyMath.Circle.PI);
console.log(MyMath.Circle.area(5));
console.log(MyMath.Circle.circumference(10));
console.log(MyMath.Rectangle.area(5, 10));
console.log(MyMath.Rectangle.circumference(10, 20));
