import CharacterWithAbstractClass from '../characters/CharacterWithAbstractClass';
import AttackWithAbstractClass from './AttackWithAbstractClass';

export default class MeleeAttackWithAbstractClass
    implements AttackWithAbstractClass
{
    public attack(
        self: CharacterWithAbstractClass,
        target: CharacterWithAbstractClass,
    ): void {
        console.log(`${self.name} strikes ${target.name} with a big sword!`);
    }
}
