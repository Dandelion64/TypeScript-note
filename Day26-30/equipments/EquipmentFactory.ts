import WeaponWithFactory from '../weapons/WeaponWithFactory';
import ArmourWithFactory from '../armours/ArmourWithFactory';

export default interface EquipmentFactory {
    createWeapon(): WeaponWithFactory;
    createArmour(): ArmourWithFactory;
}
