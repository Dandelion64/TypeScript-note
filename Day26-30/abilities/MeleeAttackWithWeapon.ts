import CharacterWithWeapon from '../characters/CharacterWithWeapon';
import AttackWithWeapon from './AttackWithWeapon';

export default class MeleeAttackWithWeapon implements AttackWithWeapon {
    public attack(
        self: CharacterWithWeapon,
        target: CharacterWithWeapon,
    ): void {
        console.log(`${self.name} strikes ${target.name} with a big sword!`);
    }
}
