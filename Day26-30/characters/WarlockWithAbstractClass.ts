import Role from './Role';
import CharacterWithAbstractClass from './CharacterWithAbstractClass';
import BasicWandWithAbstractClass from '../weapons/BasicWandWithAbstractClass';

export default class WarlockWithAbstractClass extends CharacterWithAbstractClass {
    constructor(name: string) {
        super(name, Role.Warlock, new BasicWandWithAbstractClass());
    }
}
