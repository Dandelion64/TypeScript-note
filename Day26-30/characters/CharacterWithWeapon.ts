import Role from './Role';
import AttackWithWeapon from '../abilities/AttackWithWeapon';
import Weapon from '../weapons/Weapon';

export default class CharacterWithWeapon {
    constructor(
        public readonly name: string,
        public readonly role: Role,
        private weaponRef: Weapon,
    ) {
        this.attackRef = this.weaponRef.attackStrategy;
    }

    private attackRef: AttackWithWeapon;

    public attack(target: CharacterWithWeapon) {
        this.attackRef.attack(this, target);
    }

    public equip(weapon: Weapon) {
        const { availableRoles: roles } = weapon;

        if (roles.length === 0 || roles.indexOf(this.role) !== -1) {
            console.log(`${this.name} has equipped ${weapon.name}.`);
            this.weaponRef = weapon;
            this.attackRef = this.weaponRef.attackStrategy;
        } else {
            throw new Error(`${this.role} cannot equip ${weapon.name}~`);
        }
    }
}
