// Day 28: 抽象類別 X 藍圖基底 - TypeScript Abstract Class

export {};

// 今天想實現的是藉由切換武器來改動攻擊模式
// 且完全獨立於角色職業
// (*WithAbstractClass.ts)

// POINT: 為了減少重複的程式碼
// Weapon 不再是介面而應該是類別
// 而且為了使之同時具有類別的多樣實作以及介面的綁定特性
// 使用 abstract class 關鍵字宣告為抽象類別
// 之後如果必須強迫綁定某成員 就以 abstract 關鍵字標記

// 然後進行驗收

import SwordsmanWithAbstractClass from './characters/SwordsmanWithAbstractClass';
import WarlockWithAbstractClass from './characters/WarlockWithAbstractClass';

import DaggerWithAbstractClass from './weapons/DaggerWithAbstractClass';
import BasicWandWithAbstractClass from './weapons/BasicWandWithAbstractClass';

const swordsman = new SwordsmanWithAbstractClass('Arthur');
const warlock = new WarlockWithAbstractClass('Merlin');

console.log('MeleeAttack/BasicSword: ');
swordsman.attack(warlock);

console.log('StabAttack/Dagger: ');
swordsman.equip(new DaggerWithAbstractClass());
swordsman.attack(warlock);

try {
    swordsman.equip(new BasicWandWithAbstractClass());
} catch (err) {
    console.log(err);
}

// 若抽象類別 AbstractC 的宣告方式如下：
/*
    abstract class AbstractC {
        // 抽象成員
        abstract Pabstract: Tp_abstract;

        // 父類別成員
        [public | private | protected] Prop: Tprop;
        
        // 抽象方法
        abstract Mabstract(p: Tp): Tm_abstract_return;
        
        // 父類別方法
        [public | private | protected] Method(pp: Tpp): Tm_return;
    }
*/
// 則其子類別 AbstractSubC 具有以下特性：
// 繼承 AbstractC 的成員 Prop 與方法 Method
// 必須實作 Pabstract 與 Mabstract (綁定)

// 此外
// 抽象類別不能建立物件 也就是說抽象成員不能初始化
// 抽象類別必須被繼承才能實作
// 由於抽象成員必須被綁定 所以必須被設定為 public
