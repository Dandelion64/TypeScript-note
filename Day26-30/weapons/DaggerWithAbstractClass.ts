import WeaponWithAbstractClass from './WeaponWithAbstractClass';
import StabAttackWithAbstractClass from '../abilities/StabAttackWithAbstractClass';

export default class DaggerWithAbstractClass extends WeaponWithAbstractClass {
    public readonly name = 'Dagger';

    public availableRoles = []; // 允許所有職業
    public attackStrategy = new StabAttackWithAbstractClass();
}
