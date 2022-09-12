import Role from '../characters/Role';
import Weapon from './weapon';
import MagicAttackWithWeapon from '../abilities/MagicAttackWithWeapon';

export default class BasicWand implements Weapon {
    public readonly name = 'Basic Wand';

    public attackStrategy = new MagicAttackWithWeapon();
    public availableRoles = [Role.Warlock];
}
