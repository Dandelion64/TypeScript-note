import Role from './Role';
import WeaponWithFactory from '../weapons/WeaponWithFactory';
import ArmourWithFactory from '../armours/ArmourWithFactory';
import Equipment from '../equipments/Equipment';

export default class CharacterWithFactory {
    constructor(
        public readonly name: string,
        public readonly role: Role,
        private weaponRef: WeaponWithFactory,
        private armourRef: ArmourWithFactory,
    ) {}

    public equip(equipment: Equipment) {
        const { availableRoles: roles } = equipment;

        if (roles.length === 0 || roles.indexOf(this.role) !== -1) {
            // Type Guard
            // 也可以選擇分別定義 equipWeapon 和 equipArmour
            // 但這會失去將所有類型抽象化為 Equipment 的意義
            if (equipment instanceof WeaponWithFactory) {
                this.weaponRef = equipment;
            } else if (equipment instanceof ArmourWithFactory) {
                this.armourRef = equipment;
            }
        } else {
            throw new Error(`${this.role} cannot equip ${equipment.name}~`);
        }

        console.log(
            `${this.name} has equipped a ${equipment.type} - ${equipment.name}`,
        );
    }

    public attack(target: CharacterWithFactory) {
        this.weaponRef.attack(this, target);
    }
}
