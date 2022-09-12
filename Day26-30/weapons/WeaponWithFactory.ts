import Role from '../characters/Role';
import CharacterWithFactory from '../characters/CharacterWithFactory';
import AttackWithFactory from '../abilities/AttackWithFactory';
import Equipments from '../equipments/Equipments';
import Equipment from '../equipments/Equipment';

export default abstract class WeaponWithFactory implements Equipment {
    abstract name: string;
    public type = Equipments.Weapon;

    abstract availableRoles: Role[];
    abstract attackStrategy: AttackWithFactory;

    public switchAttackStrategy(type: AttackWithFactory): void {
        this.attackStrategy = type;
    }

    public attack(
        self: CharacterWithFactory,
        target: CharacterWithFactory,
    ): void {
        this.attackStrategy.attack(self, target);
    }
}
