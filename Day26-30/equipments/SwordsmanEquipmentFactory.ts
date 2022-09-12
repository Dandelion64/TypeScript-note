import EquipmentFactory from './EquipmentFactory';
import BasicSwordWithFactory from '../weapons/BasicSwordWithFactory';
import BasicArmourWithFactory from '../armours/BasicArmourWithFactory';

class SwordsmanEquipmentFactory implements EquipmentFactory {
    public createWeapon() {
        return new BasicSwordWithFactory();
    }

    public createArmour() {
        return new BasicArmourWithFactory();
    }
}

export default SwordsmanEquipmentFactory;
