import Role from './Role';
import Character from './Character';
import MagicAttack from '../abilities/MagicAttack';

export default class Warlock extends Character {
    constructor(name: string) {
        // 選擇魔法攻擊策略
        super(name, Role.Warlock, new MagicAttack());
    }
}
