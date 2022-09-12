import CharacterWithWeapon from '../characters/CharacterWithWeapon';
import AttackWithWeapon from './AttackWithWeapon';

export default class MagicAttackWithWeapon implements AttackWithWeapon {
    public attack(
        self: CharacterWithWeapon,
        target: CharacterWithWeapon,
    ): void {
        console.log(
            `${self.name} casts magic and pierces through ${target.name}!`,
        );
    }
}
