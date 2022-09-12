import CharacterWithWeapon from '../characters/CharacterWithWeapon';

export default interface AttackWithWeapon {
    attack(self: CharacterWithWeapon, target: CharacterWithWeapon): void;
}
