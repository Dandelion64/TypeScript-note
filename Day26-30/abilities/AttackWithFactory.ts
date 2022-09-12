import CharacterWithFactory from '../characters/CharacterWithFactory';

export default interface AttackWithFactory {
    attack(self: CharacterWithFactory, target: CharacterWithFactory): void;
}
