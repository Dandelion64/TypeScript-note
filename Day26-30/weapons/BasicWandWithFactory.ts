import Role from '../characters/Role';
import WeaponWithFactory from './WeaponWithFactory';
import MagicAttackWithFactory from '../abilities/MagicAttackWithFactory';

export default class BasicWandWithFactory extends WeaponWithFactory {
    public readonly name = 'Basic Wand';

    public availableRoles = [Role.Warlock];
    public attackStrategy = new MagicAttackWithFactory();
}
