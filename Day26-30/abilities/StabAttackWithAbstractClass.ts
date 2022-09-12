import CharacterWithAbstractClass from '../characters/CharacterWithAbstractClass';
import AttackWithAbstractClass from './AttackWithAbstractClass';

export default class StabAttackWithAbstractClass
    implements AttackWithAbstractClass
{
    public attack(
        self: CharacterWithAbstractClass,
        target: CharacterWithAbstractClass,
    ): void {
        console.log(
            `${self.name} stabs through ${target.name} with his dagger!`,
        );
    }
}
