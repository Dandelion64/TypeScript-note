import WeaponWithFactory from './WeaponWithFactory';
import StabAttackWithFactory from '../abilities/StabAttackWithFactory';

export default class DaggerWithFactory extends WeaponWithFactory {
    public readonly name = 'Dagger';

    public availableRoles = []; // 允許所有職業
    public attackStrategy = new StabAttackWithFactory();
}
