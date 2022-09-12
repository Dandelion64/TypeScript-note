import Character from '../characters/Character';
import Attack from './Attack';

export default class MagicAttack implements Attack {
    public attack(self: Character, target: Character): void {
        console.log(
            `${self.name} casts magic and pierces through ${target.name}!`,
        );
    }
}
