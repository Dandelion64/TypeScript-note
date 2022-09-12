import Role from './Role';
import CharacterWithAbstractClass from './CharacterWithAbstractClass';
import BasicSwordWithAbstractClass from '../weapons/BasicSwordWithAbstractClass';

export default class SwordsmanWithAbstractClass extends CharacterWithAbstractClass {
    constructor(name: string) {
        super(name, Role.Swordsman, new BasicSwordWithAbstractClass());
    }
}
