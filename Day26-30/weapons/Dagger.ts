import Weapon from './weapon';
import StabAttackWithWeapon from '../abilities/StabAttackWithWeapon';

export default class Dagger implements Weapon {
    public readonly name = 'Dagger';

    public attackStrategy = new StabAttackWithWeapon();
    public availableRoles = []; // 允許所有職業
}
