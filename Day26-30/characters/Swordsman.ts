import Role from './Role';
import Character from './Character';
import MeleeAttack from '../abilities/MeleeAttack';

export default class Swordsman extends Character {
    constructor(name: string) {
        // 選擇武器攻擊策略
        super(name, Role.Swordsman, new MeleeAttack());
    }
}
