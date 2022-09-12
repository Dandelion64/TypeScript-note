import Role from '../characters/Role';
import ArmourWithFactory from './ArmourWithFactory';

export default class BasicRobeWithFactory extends ArmourWithFactory {
    public readonly name = 'Basic Robe';

    public availableRoles = [Role.Warlock];
}
