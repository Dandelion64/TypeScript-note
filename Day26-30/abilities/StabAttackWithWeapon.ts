import CharacterWithWeapon from '../characters/CharacterWithWeapon';
import AttackWithWeapon from './AttackWithWeapon';

export default class StabAttackWithWeapon implements AttackWithWeapon {
    public attack(
        self: CharacterWithWeapon,
        target: CharacterWithWeapon,
    ): void {
        console.log(
            `${self.name} stabs through ${target.name} with his sword!`,
        );
    }
}
