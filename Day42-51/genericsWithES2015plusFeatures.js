"use strict";
// Day 47: 泛型應用 X 結合 ES2015+ - TypeScript Generics with ES2015+ Features
exports.__esModule = true;
// 今日的主題對於任何系列的讀者應該是很重要的篇章
// 請記得一定要在 tsconfig.json 中做如下設定
// 不然 TypeScript 會不知道這些物件的型別宣告
/*
    {
        "compileOptions": {
            "lib": ["DOM", "ES2015"]
        }
    }
 */
/**
 * ES6 key-value pairs 與集合物件 --- Map & Set
 *
 * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
var typedMap = new Map();
typedMap.set(1, 'Hello Map()');
console.log(typedMap.get(1));
console.log(typedMap.has(1));
