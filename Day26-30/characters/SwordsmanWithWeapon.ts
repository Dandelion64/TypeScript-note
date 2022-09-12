import Role from './Role';
import CharacterWithWeapon from './CharacterWithWeapon';
import BasicSword from '../weapons/BasicSword';

export default class SwordsmanWithWeapon extends CharacterWithWeapon {
    constructor(name: string) {
        // 預設裝備基礎用劍
        super(name, Role.Swordsman, new BasicSword());
    }
}
