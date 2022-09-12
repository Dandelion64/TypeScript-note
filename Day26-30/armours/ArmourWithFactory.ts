import Role from '../characters/Role';
import Equipments from '../equipments/Equipments';
import Equipment from '../equipments/Equipment';

// 如果有宣告 Potion 等子類別 可能會需要 usePotion() 方法
export default abstract class ArmourWithFactory implements Equipment {
    abstract name: string;
    public type = Equipments.Armour;

    abstract availableRoles: Role[];
}
