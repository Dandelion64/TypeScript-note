import Role from './Role';
import CharacterWithFactory from './CharacterWithFactory';
import SwordsmanEquipmentFactory from '../equipments/SwordsmanEquipmentFactory';

export default class SwordsmanWithFactory extends CharacterWithFactory {
    constructor(name: string) {
        const SEF = new SwordsmanEquipmentFactory();

        super(name, Role.Swordsman, SEF.createWeapon(), SEF.createArmour());
    }
}
