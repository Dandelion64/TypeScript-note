import Role from './Role';
import CharacterWithWeapon from './CharacterWithWeapon';
import BasicWand from '../weapons/BasicWand';

export default class WarlockWithWeapon extends CharacterWithWeapon {
    constructor(name: string) {
        // 預設裝備基礎法杖
        super(name, Role.Warlock, new BasicWand());
    }
}
