// Day 26: 策略模式 X 選擇策略 - Strategy Pattern Using TypeScript. I

export {};

// 在前一天的內容曾經提過
// 遇到很多 switch/case 的時候可以使用策略模式來處理

// 首先我們統整一下可以使用策略模式的狀況
// 1. 分支眾多 但都有相似的行為 (或演算法)
// 2. 要定義新的行為 最差的寫法就是 if/else... 或 switch/case...

// 首先必須調整一下 tsconfig.json 中的設定
/*
    {
        "compilerOptions": {
            "ourDir": "./build",
            "rootDir": "./",
        }
    }
*/
// 這樣可以將編譯過後的檔案統一放在 build 資料夾中
// REVIEW: 編譯相關的資訊會在 Day 30 後討論

// 另外安裝一些方便的套件
// npm i nodemon concurrently --save-dev
// nodemon 會在偵測到 js 黨被修改時以 node 執行該檔案
// concurrently 則會同時執行 package.json 的不同 script 定義的指令

// 再去修改 package.json 中的 script 部分
/*
{
    "scripts": {
        "start:watch": "tsc -w",
        "start:run": "nodemon build/index.js",
        "start": "concurrently npm:start:*"
    }
}
*/
// WARNING: 檔名可能會有不同 使用時再去修改
// start:watch 會在偵測 ts 檔案更動時重新編譯
// start:run 會在每次 js 檔案被更動後以 node 執行
// start concurrently 會同時執行上述兩個指令

import Swordsman from './characters/Swordsman';
import Warlock from './characters/Warlock';

const swordsman = new Swordsman('Arthur');
const warlock = new Warlock('Merlin');

swordsman.introduce();
warlock.introduce();

// 在簡單的定義了一些職業之後
// 假設我們會有物理攻擊和魔法攻擊兩種攻擊方式
// 以往的做法 我們會在父類別定義 attack()
// 然後在子類別定義 attack() 去覆寫父類別的方法
// 這樣實在是有點繁瑣...

// POINT: 在介紹策略模式之前
// 我們先介紹策略模式的核心理念：
// Changing algorithm during runtime.
// 也就是根據不同狀況靈活地轉換策略 (演算法) 而非另訂繼承

// ============================================================
// POINT:
// 與其直接實作 (implement) 各種功能
// 不如在父類別建立演算法的參考點 (reference point)
// 任何基於該參考點的演算法必須依照某介面 (interface) 進行實作
// 父類別則可以藉由切換參考點的演算法調整子類別的行為

// 策略模式所謂的策略
// 既然可以和介面進行綁定
// 代表策略是一個類別的宣告
//     ^^^^^^^^^^^^^^^
// ============================================================

// 接下來我們要建立一個資料夾 abilities 來實作策略 (stategies)

// 關係如下：
/*
Character {
    attackRef: attack --- reference ---> <interface>Attack {
                                            attack(Character, Character): void
                                        }
    attack(Character): void
}

Swordsman, Warlock --- extends ---> Character

MeleeAttack {
    attack(): void
},
MagicAttack {
    attack(): void
} --- implements ---> Attack
*/
// Ref: https://ithelp.ithome.com.tw/upload/images/20190925/20120614wp2iXaFmJp.png

console.log('The swordsman is attacking the warlock: ');
swordsman.attack(warlock);
console.log('The warlock is attacking the swordsman: ');
warlock.attack(swordsman);
