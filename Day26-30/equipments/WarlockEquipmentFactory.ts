import EquipmentFactory from './EquipmentFactory';
import BasicWandWithFactory from '../weapons/BasicWandWithFactory';
import BasicArmourWithFactory from '../armours/BasicArmourWithFactory';

class WarlockEquipmentFactory implements EquipmentFactory {
    public createWeapon() {
        return new BasicWandWithFactory();
    }

    public createArmour() {
        return new BasicArmourWithFactory();
    }
}

export default WarlockEquipmentFactory;
