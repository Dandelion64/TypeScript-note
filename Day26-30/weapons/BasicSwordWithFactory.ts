import Role from '../characters/Role';
import WeaponWithFactory from './WeaponWithFactory';
import MeleeAttackWithFactory from '../abilities/MeleeAttackWithFactory';

export default class BasicSwordWithFactory extends WeaponWithFactory {
    public readonly name = 'Basic Sword';

    public availableRoles = [Role.Swordsman, Role.Highwayman];
    public attackStrategy = new MeleeAttackWithFactory();
}
