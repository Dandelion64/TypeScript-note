import Role from './Role';
import CharacterWithFactory from './CharacterWithFactory';
import WarlockEquipmentFactory from '../equipments/WarlockEquipmentFactory';

export default class WarlockWithFactory extends CharacterWithFactory {
    constructor(name: string) {
        const WEF = new WarlockEquipmentFactory();

        super(name, Role.Warlock, WEF.createWeapon(), WEF.createArmour());
    }
}
