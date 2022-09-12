import Role from '../characters/Role';
import Weapon from './weapon';
import MeleeAttackWithWeapon from '../abilities/MeleeAttackWithWeapon';

export default class BasicSword implements Weapon {
    public readonly name = 'Basic Sword';

    public attackStrategy = new MeleeAttackWithWeapon();
    public availableRoles = [Role.Swordsman, Role.Highwayman];
}
