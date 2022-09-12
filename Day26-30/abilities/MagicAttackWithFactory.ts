import CharacterWithFactory from '../characters/CharacterWithFactory';
import AttackWithFactory from './AttackWithFactory';

export default class MagicAttackWithFactory implements AttackWithFactory {
    public attack(
        self: CharacterWithFactory,
        target: CharacterWithFactory,
    ): void {
        console.log(
            `${self.name} casts magic and pierces through ${target.name}!`,
        );
    }
}
