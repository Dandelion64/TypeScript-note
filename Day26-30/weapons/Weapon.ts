import AttackWithWeapon from '../abilities/AttackWithWeapon';
import Role from '../characters/Role';

export default interface Weapon {
    readonly name: string;

    availableRoles: Role[];
    attackStrategy: AttackWithWeapon;
}
