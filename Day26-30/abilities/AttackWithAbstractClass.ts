import CharacterWithAbstractClass from '../characters/CharacterWithAbstractClass';

export default interface AttackWithAbstractClass {
    attack(
        self: CharacterWithAbstractClass,
        target: CharacterWithAbstractClass,
    ): void;
}
