// Day 27: 策略模式 X 臨機應變 - Strategy Pattern Using TypeScript. II

export {};

// 延續前一天的範例 繼續實作策略的切換
// 假設物理攻擊不只有武器攻擊 還有刺擊 (StabAttack)

// 首先要新增一個攻擊策略 StabAttack.ts

// 然後回想一下那句話：
// Changing algorithm during runtime.
// 也就是説我們要在父類別來切換演算法！

import Swordsman from './characters/Swordsman';
import Warlock from './characters/Warlock';

// 記得載入其他攻擊方式
import StabAttack from './abilities/StabAttack';

const swordsman = new Swordsman('Lancelot');
const warlock = new Warlock('Morgana');

console.log('MeleeAttack: ');
swordsman.attack(warlock);

// 策略切換
swordsman.switchAttackStrategy(new StabAttack());

console.log('StabAttack: ');
swordsman.attack(warlock);

// 接下來我們來試試看設計角色裝備武器的功能
// 讓不同的武器自己帶有不同的攻擊策略
// (*WithWeapon.ts)
// 然後進行驗收

import SwordsmanWithWeapon from './characters/SwordsmanWithWeapon';
import WarlockWithWeapon from './characters/WarlockWithWeapon';

import BasicWand from './weapons/BasicWand';
import Dagger from './weapons/Dagger';

const swordsmanWithWeapon = new SwordsmanWithWeapon('Dandelion');
const warlockWithWeapon = new WarlockWithWeapon('Ouyi');

console.log('MeleeAttack/BasicSword: ');
swordsmanWithWeapon.attack(warlockWithWeapon);

swordsmanWithWeapon.equip(new Dagger());

console.log('Dagger/StabAttack: ');
swordsmanWithWeapon.attack(warlockWithWeapon);

try {
    swordsmanWithWeapon.equip(new BasicWand());
} catch (err) {
    console.log(err);
}

// 新的關係圖如下：
// Ref: https://ithelp.ithome.com.tw/upload/images/20190926/20120614atn7rU8kod.png

// 也可以選擇不要讓角色跟攻擊策略有連結
// 而是藉由武器的連結進行攻擊
// Ref: https://ithelp.ithome.com.tw/upload/images/20190926/20120614NZmBw1QHFJ.png
// 這樣做的好處是可以實作不同攻擊方式
// 法師也可以進行物理攻擊！！

// 剩下的部分要留待明天囉～
