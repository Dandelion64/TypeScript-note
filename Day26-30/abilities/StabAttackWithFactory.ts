import CharacterWithFactory from '../characters/CharacterWithFactory';
import AttackWithFactory from './AttackWithFactory';

export default class StabAttackWithFactory implements AttackWithFactory {
    public attack(
        self: CharacterWithFactory,
        target: CharacterWithFactory,
    ): void {
        console.log(
            `${self.name} stabs through ${target.name} with his dagger!`,
        );
    }
}
