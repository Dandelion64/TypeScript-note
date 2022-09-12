import CharacterWithAbstractClass from '../characters/CharacterWithAbstractClass';
import AttackWithAbstractClass from './AttackWithAbstractClass';

export default class MagicAttackWithAbstractClass
    implements AttackWithAbstractClass
{
    public attack(
        self: CharacterWithAbstractClass,
        target: CharacterWithAbstractClass,
    ): void {
        console.log(
            `${self.name} casts magic and pierces through ${target.name}!`,
        );
    }
}
