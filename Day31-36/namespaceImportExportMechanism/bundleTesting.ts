// 測試用

// Triple-Slash Directive
// TypeScript 會建議使用 import/export 就好
// @typescript-eslint/triple-slash-reference
// 可以先把 eslint 的檢查設定關閉
// Ref: https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html

/// <reference path="./MyMath/MergedCircle.ts" />
/// <reference path="./MyMath/MergedRectangle.ts" />

console.log(MyMath.Circle.PI);
console.log(MyMath.Circle.area(5));
console.log(MyMath.Circle.circumference(10));
console.log(MyMath.Rectangle.area(5, 10));
console.log(MyMath.Rectangle.circumference(10, 20));
