import Role from '../characters/Role';
import WeaponWithAbstractClass from './WeaponWithAbstractClass';
import MagicAttackWithAbstractClass from '../abilities/MagicAttackWithAbstractClass';

export default class BasicWandWithAbstractClass extends WeaponWithAbstractClass {
    public readonly name = 'Basic Wand';

    public availableRoles = [Role.Warlock];
    public attackStrategy = new MagicAttackWithAbstractClass();
}
