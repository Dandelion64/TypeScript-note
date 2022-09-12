import Role from '../characters/Role';
import Equipments from './Equipments';

export default interface Equipment {
    name: string;
    type: Equipments;
    availableRoles: Role[];
}
