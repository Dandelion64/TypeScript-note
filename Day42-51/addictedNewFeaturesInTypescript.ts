// Day 50+: 用了會上癮的 TypeScript 新功能 - Easily Addicted New Features in TypeScript

export {};

// 雖說本系列文章寫成於 2020 年初
// 有些 Features 應該已經有更好的撰寫方式
// 不過跟著語言的進步過程走過一次總是好的

/**
 * ES10 Optional Chaining
 */

// 比如說函式裡經常會有設定相關的東西 在英文中經常以 option 或 config 來表示

interface SomeConfig {
    a: TypeA;
    b: TypeB;
    c: {
        d: TypeCD;
        e: {
            f: TypeCEF;
            g: {
                // ...
            };
        };
    };
}

// 這種時候 如果要取出內部的屬性 可能必須使用大量 if 判斷該屬性是否存在...

function someFunc(param01, ..., config: SomeConfig) {
    if (config.a) {
        // ...
    }
    if (config.b) {
        // ...
    }
    if (config.c) {
        if (config.d) {
            // ...
        }
        if (config.e) {
            if (config.f) {
                // ...
            }
            if (config.g) {
                // ...
            }
        }
    }
}

// 或者是使用 &&...

function someFunc(param01, ..., config: SomeConfig) {
    if (config.a) {
        // ...
    }
    if (config.b) {
        // ...
    }
    if (config.c && config.c.d) {
        // ...
    }
    if (config.c && config.c.e && config.c.e.f) {
        // ...
    }
    if (config.c && config.c.e && config.c.e.g) {
        // ...
    }
}

// 這樣實在是太麻煩
// 所以 ECMAScript 有 proposal-optional-chaining 使用 ?. (串鏈運算子)
// 處理這種問題
// Ref: https://github.com/tc39/proposal-optional-chaining

// TypeScript 在 3.7 版正式支援這個 Feature
// 可以簡化如下

function someFunc(param01, ..., config: SomeConfig) {
    if (config.a) {
        // ...
    }
    if (config.b) {
        // ...
    }
    if (config.c?.d) {
        // ...
    }
    if (config.c?.e?.f) {
        // ...
    }
    if (config.c?.e?.g) {
        // ...
    }
}

// 比方說 config.c?.d 的意思是
// 如果 config.c 有一個 d 屬性則呼叫 config.c.d

// TRY: 如果 config.c 為 undefined 或 null
// 則 config.c?.d 為何？

// TRY: 如果 config.c 的值為非物件的原始型別值
// 如數字 123 或字串 'Hello World' 則
// config.c?.d 會出現什麼？
// config.c 若是字串是不是表示 config.c?.[any] 可以接字串方法？

// TRY: 如果 config.c 為空物件 {}
// 則 config.c?.d 會出現什麼？

/**
 * ES10 Nullish Coalescing ("與跟 Null 相關的值結合" 的意思)
 */

// 和 Optional Chaining 類似
// 出自於 proposal-nullish-coalescing
// Ref: https://github.com/tc39/proposal-nullish-coalescing

// 相信使用過 JavaScript 一段時間的讀者會發現使用 && 與 || 不全然會回傳 boolean
// 那讀者可能會問 if/else 內部是怎麼處理那些判斷式的
// 其實這是被稱為短路求值 (Short Circuiting) 的一個特色

const message = option.message;

if (!message) {
    message = 'Hello World';
}

// 這樣的撰寫方式過於冗長 所以可以簡寫如下

const message = option.message || 'Hello World';

// 然而 這個範例在我們希望 message 也可以是空字串的時候會有問題
// 因為 '' 是 falsy value
// 必須改寫一下

const message = option.message || (option.message === '' ? '' : 'Hello World');

// 這樣的寫法又挺麻煩了囧...

// 這時候就可以使用 ES10 Nullish Coalescing
// 寫法是兩個問號 (??)

let message = option.message ?? 'Hello World';

// ?? 只會擋 null 和 undefined
//          ^^^^^^^^^^^^^^^^^

// 以上的寫法等效於：
const message = (option.message !== null && option.message !== undefined) ? option.message : 'Hello World';

// REVIEW: Assertion Function 相關的內容可能要請讀者買書了
// Ref: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

// ============================================================
// 敘述式 (Statement):
// 像是 if/else 或 for loop
// 不會回傳值

// 表達式 (Expressions):
// 像是運算 ((1 + 2) * 3 - 4) 或邏輯 (a > b || (c < d && e))
// 會回傳值
// ============================================================

// 最後附上 Maxwell Alexius 的開源專案
// Ref: https://github.com/Alexius-Huang/Wyrd