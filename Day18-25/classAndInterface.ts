// Day 25: 類別與介面 X 終極的組合 - Ultimate Combo of Class & Interface

export {};

// 一樣使用範例來討論

enum Role {
    Swordsman = 'Swordsman',
    Warlock = 'Warlock',
    Highwayman = 'Highwayman',
    BountyHunter = 'BountyHunter',
    Monster = 'Monster',
}

interface ICharacter {
    name: string;
    role: Role;
    attack(target: ICharacter): void;
}

// 有些文章會把類別和介面形容成簽訂契約 (Signing Contract)
// 一旦和介面綁定就必須實現所有契約 (介面) 內容

class Character implements ICharacter {
    constructor(public name: string, public role: Role) {}

    public attack(target: ICharacter): void {
        let verb: string;

        switch (this.role) {
            case Role.Swordsman:
                verb = 'attacking';
                break;
            case Role.Warlock:
                verb = 'cursing';
                break;
            case Role.Highwayman:
                verb = 'ambushing';
                break;
            case Role.BountyHunter:
                verb = 'shooting';
                break;
            default:
                throw new Error(`${this.role}`);
        }

        console.log(`${this.name} is ${verb} ${target.name}!`);
    }
}

// REVIEW: OOP 經驗豐富的讀者一看就知道
// 冗長的 switch/case 應該使用策略模式 (Strategy Pattern) 來處理
// 請期待後續的內容 畢竟這跟 Day 30 會提到的 Object Composition 有關

const character_01 = new Character('Arthur', Role.Swordsman);
const character_02 = new Character('Merlin', Role.Warlock);

character_01.attack(character_02);
character_02.attack(character_01);

// Class Inheritance v.s. Interface Implementation
// POINT: 最大的不同在於
// 一個子類別只能繼承一個父類別 但可以和多個介面進行綁定

// ============================================================
// 這正是介面的運用比類別的繼承更有彈性的主因

// 在軟體設計中時常討論的一個議題是：
// 耦合度 (Coupling / Dependency)
// 使用類別繼承的耦合度一定會比介面綁定還要更高
// 低耦合度是良好程式碼的特性 可讀性及可維護性都會比較好

// POINT:
// OOP 設計模式中也可以善用類別物件組織起來 (Object Composition)
// 如此一來不使用類別繼承也可以降低耦合度 (Day 30)
// ============================================================

// 假設我們新增一個介面

interface IStats {
    health: number;
    mana: number;
    strength: number;
    defense: number;
}

class ComplicatedCharacter implements ICharacter, IStats {
    constructor(
        public name: string,
        public role: Role,
        public health: number,
        public mana: number,
        public strength: number,
        public defense: number,
    ) {}

    public attack(target: ICharacter): void {
        let verb: string;

        switch (this.role) {
            case Role.Swordsman:
                verb = 'attacking';
                break;
            case Role.Warlock:
                verb = 'cursing';
                break;
            case Role.Highwayman:
                verb = 'ambushing';
                break;
            case Role.BountyHunter:
                verb = 'shooting';
                break;
            default:
                throw new Error(`${this.role}`);
        }

        console.log(`${this.name} is ${verb} ${target.name}!`);
    }
}

// 此外 類別繼承和介面綁定可以一併宣告

/*
    class C {}

    interface I1 {}
    interface I2 {}
    // ...
    interface In {}

    class D extends C implements I1, I2, ..., In { // ... }
*/

const character = new ComplicatedCharacter(
    'Maxwell',
    Role.Swordsman,
    100,
    20,
    100,
    0,
);

// TRY: 變數被註記為介面時可以指派類別的實體嗎？

const anotherCharacter: ICharacter = new Character('Martin', Role.BountyHunter);

// 看起來沒問題

character.name;
character.role;
character.health;
character.mana;
character.strength;
character.defense;

anotherCharacter.name;
anotherCharacter.role;
anotherCharacter.health; // error
anotherCharacter.mana; // error
anotherCharacter.strength; // error
anotherCharacter.defense; // error

// POINT:
// 即使變數被註記為 In 但被指派為 C
// 只要該變數至少符合介面的實作 就不會被 TypeScript 跳出錯誤

class Monster implements ICharacter {
    public role: Role = Role.Monster;

    constructor(public name: string) {}

    public attack(target: ICharacter): void {
        console.log(
            `${this.name} is attacking the ${target.role} - ${target.name}`,
        );
    }
}

const human = new Character('Meepo', Role.Swordsman);
const monster = new Monster('Sticky Slime');

human.attack(monster);
monster.attack(human);

class BountyHunter extends Character {
    // 獵物有兩種：人質或怪物
    public hostages: ICharacter[] = [];

    constructor(name: string) {
        super(name, Role.BountyHunter);
    }

    public capture(target: ICharacter, successRate: number) {
        const randomNumber = Math.random();
        const targetTitle = `${target.name} the ${target.role}`;
        let message: string;

        if (randomNumber > 1 - successRate) {
            this.hostages = [...this.hostages, target];
            message = `${this.name} has captured ${targetTitle}`;
        } else {
            message = `${this.name} failed to capture ${targetTitle}`;
        }

        console.log(message);
    }

    public sellHostages() {
        const totalPrice = this.hostages.length * 1000;
        const hostagesInfo = this.hostages
            .map((hostage) => `${hostage.name} the ${hostage.role}`)
            .join('\n');

        console.log(
            `${this.name} sells all the hostages, including: ${hostagesInfo}
            
            Receive Gold: $${totalPrice}`,
        );

        this.hostages = [];
    }
}

const bountyHunter = new BountyHunter('Maxwell');
const wantedCharacter = new Character('Marvin', Role.Highwayman);
const wantedMonster = new Monster('Eikthyrnir');
const desperado = new Character('Legendary Joe', Role.Highwayman);
bountyHunter.capture(wantedCharacter, 1);
bountyHunter.capture(wantedMonster, 0.5);
bountyHunter.capture(desperado, 0.01);
bountyHunter.sellHostages();

// TRY: 普通角色是否能夠回擊？
wantedCharacter.attack(bountyHunter);

// TRY: 怪物是否能夠回擊？
wantedMonster.attack(bountyHunter);

// POINT: 子類別繼承父類別
// 除了擁有父類別 public 和 pretected 的成員外
// 也同時繼承父類別實作之介面之性質

const anyCharacter: ICharacter = new BountyHunter('Louis');
anotherCharacter.capture(wantedMonster, 0.5);
