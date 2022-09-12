import Role from '../characters/Role';
import ArmourWithFactory from './ArmourWithFactory';

export default class BasicArmourWithFactory extends ArmourWithFactory {
    public readonly name = 'Basic Armour';

    public availableRoles = [Role.Swordsman, Role.BountyHunter];
}
