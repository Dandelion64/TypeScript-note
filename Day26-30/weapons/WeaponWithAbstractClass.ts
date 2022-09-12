import Role from '../characters/Role';
import CharacterWithAbstractClass from '../characters/CharacterWithAbstractClass';
import AttackWithAbstractClass from '../abilities/AttackWithAbstractClass';

export default abstract class WeaponWithAbstractClass {
    abstract name: string;

    abstract availableRoles: Role[];
    abstract attackStrategy: AttackWithAbstractClass;

    public switchAttackStrategy(type: AttackWithAbstractClass): void {
        this.attackStrategy = type;
    }

    public attack(
        self: CharacterWithAbstractClass,
        target: CharacterWithAbstractClass,
    ): void {
        this.attackStrategy.attack(self, target);
    }
}
