import Role from './Role';
import Attack from '../abilities/Attack';

export default class Character {
    constructor(
        public readonly name: string,
        public readonly role: Role,
        private attackRef: Attack, // 策略參考點
    ) {}

    public introduce() {
        console.log(`
            Hi, I'm ${this.name} the ${this.role}
        `);
    }

    // 利用參考點進行功能傳遞
    public attack(target: Character) {
        this.attackRef.attack(this, target);
    }

    // 切換策略 (演算法)
    public switchAttackStrategy(type: Attack) {
        this.attackRef = type;
    }
}
