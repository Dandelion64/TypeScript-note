'use strict';
var Role;
(function (Role) {
    Role['Swordsman'] = 'Swordsman';
    Role['Warlock'] = 'Warlock';
    Role['Highwayman'] = 'Highwayman';
    Role['BountyHunter'] = 'BountyHunter';
})(Role || (Role = {}));
var Character = /** @class */ (function () {
    function Character(name, role) {
        this.name = name;
        this.role = role;
    }
    Character.prototype.attack = function (target) {
        var verb;
        switch (this.role) {
            case Role.Swordsman:
                verb = 'attacking';
                break;
            case Role.Warlock:
                verb = 'cursing';
                break;
            case Role.Highwayman:
                verb = 'ambushing';
                break;
            case Role.BountyHunter:
                verb = 'shooting';
                break;
            default:
                throw new Error(''.concat(this.role));
        }
        console.log(
            ''
                .concat(this.name, ' is ')
                .concat(verb, ' ')
                .concat(target.name, '!'),
        );
    };
    return Character;
})();
var character_01 = new Character('Arthur', Role.Swordsman);
var character_02 = new Character('Merlin', Role.Warlock);
character_01.attack(character_02);
character_02.attack(character_01);
