// Day 29: 工廠模式 X 抽象工廠 - Factory Method & Abstract Factory Pattern Using TypeScript

export {};

// 工廠模式 (Factory Method Pattern)
// Ref: https://www.wikiwand.com/en/Factory_method_pattern

// 如果觀察策略模式的做法 會發現每一次要選擇某項策略時
// 我們都必須要 import 他才行...

// 假設今天有 10 種武器呢？
/*
    import BigSword from './weapons/BigSword';
    import SilverSpear from './weapons/SilverSpear';
    import FlamingSword from './weapons/FlamingSword';
    import VengenceSword from './weapons/VengenceSword';
    import WretchedHeart from './weapons/WretchedHeart';
    import BloodSucker from './weapons/BloodSucker';
    import MothersMercy from './weapons/MothersMercy';
    import CursedSword from './weapons/CursedSword';
    import CosmicBlade from './weapons/CosmicBlade';
*/
// 我們可以利用工廠模式解決這種問題

// 首先建構一個 class: WeaponFactory
// 其負責建構不同武器
// 但在這之前 我們先將所有武器進行列舉
// 存在 weapons/Weapons.ts 中

// 如此一來就變成這樣使用：

import SwordsmanWithWeapon from './characters/SwordsmanWithWeapon';
import WarlockWithWeapon from './characters/WarlockWithWeapon';

import Weapons from './weapons/Weapons';
import WeaponFactory from './weapons/WeaponFactory';

const swordsman = new SwordsmanWithWeapon('Arthur');
const warlock = new WarlockWithWeapon('Merlin');

const weaponFactory = new WeaponFactory();

swordsman.attack(warlock);

const dagger = weaponFactory.createWeapon(Weapons.Dagger);
swordsman.equip(dagger);
swordsman.attack(warlock);

// 上面的 createWeapon() 被俗稱為工廠方法 Factory Method
// 理想狀態下 一個工廠只會打造出對應的一種商品
// 但是我們此處的 createWeapon() 接受一個參數
// 代表必須指名建構的武器
// 實際上這種參數化的工廠方法是工廠模式的變體
//          ^^^^^^^^^^^^^^^^^^^^^^^^^

// 以上的部分 指的是一般的 Factory Pattern

// ASK: 那假設今天角色可以裝備其他防具、頭盔等裝備呢
// 難道就要有好幾間工廠負責生產了嗎？
// 如果是這樣的話 工廠是不是也需要統一的母工廠負責管理呢？

// 這時候 Abstract Factory 就可以派上用場了
// 這個統一的母工廠 Equipment 就應該是 Abstract Class

// 首先定義裝備種類在 equipments/Equipments.ts
// 然後定義介面在 equipments/Equipment.ts
// 接下來是 equipments/EquipmentFactory.ts

// 我們同時創造 Armour Abstract Class
// 並把武器工廠切分出來 要求其綁定 Equipment 介面

// 接下來修改角色部分
// 再修改職業建構子 直接產生預設武器和防具

// 由於結構有點複雜 可以參考結構圖
// Ref: https://ithelp.ithome.com.tw/upload/images/20190927/20120614AgYb9jNkLv.png

// 抽象工廠 (Abstract Factory) 的意義在於
// 不直接實作工廠 而藉由介面抽象化再分別建構個別子工廠
// 當然也可以使用抽象類別 但要考慮這是否有必要

import SwordsmanWithFactory from './characters/SwordsmanWithFactory';
import WarlockWithFactory from './characters/WarlockWithFactory';

const swordsmanWithFactory = new SwordsmanWithFactory('Lancelot');
const warlockWithFactory = new WarlockWithFactory('Morgana');

swordsmanWithFactory.attack(warlockWithFactory);

// TRY: 可以新增一個類別來處理裝備不同武器的部分
