import Role from '../characters/Role';
import WeaponWithAbstractClass from './WeaponWithAbstractClass';
import MeleeAttackWithAbstractClass from '../abilities/MeleeAttackWithAbstractClass';

export default class BasicSwordWithAbstractClass extends WeaponWithAbstractClass {
    public readonly name = 'Basic Sword';

    public availableRoles = [Role.Swordsman, Role.Highwayman];
    public attackStrategy = new MeleeAttackWithAbstractClass();
}
