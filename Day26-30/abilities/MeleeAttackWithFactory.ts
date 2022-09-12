import CharacterWithFactory from '../characters/CharacterWithFactory';
import AttackWithFactory from './AttackWithFactory';

export default class MeleeAttackWithFactory implements AttackWithFactory {
    public attack(
        self: CharacterWithFactory,
        target: CharacterWithFactory,
    ): void {
        console.log(`${self.name} strikes ${target.name} with a big sword!`);
    }
}
