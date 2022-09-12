import Role from './Role';
import WeaponWithAbstractClass from '../weapons/WeaponWithAbstractClass';

export default class CharacterWithAbstractClass {
    constructor(
        public readonly name: string,
        public readonly role: Role,
        private weaponRef: WeaponWithAbstractClass,
    ) {}

    public attack(target: CharacterWithAbstractClass) {
        this.weaponRef.attack(this, target);
    }

    public equip(weapon: WeaponWithAbstractClass) {
        const { availableRoles: roles } = weapon;

        if (roles.length === 0 || roles.indexOf(this.role) !== -1) {
            console.log(`${this.name} has equipped ${weapon.name}.`);
            this.weaponRef = weapon;
        } else {
            throw new Error(`${this.role} cannot equip ${weapon.name}~`);
        }
    }
}
