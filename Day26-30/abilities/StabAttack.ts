import Character from '../characters/Character';
import Attack from './Attack';

export default class StabAttack implements Attack {
    public attack(self: Character, target: Character): void {
        console.log(
            `${self.name} stabs through ${target.name} with his sword!`,
        );
    }
}
