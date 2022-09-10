'use strict';
var Role;
(function (Role) {
    Role['Swordsman'] = 'Swordsman';
    Role['Warlock'] = 'Warlock';
    Role['Highwayman'] = 'Highwayman';
    Role['BountyHunter'] = 'BountyHunter';
    Role['Monster'] = 'Monster';
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
var Monster = /** @class */ (function () {
    function Monster(name) {
        this.name = name;
        this.role = Role.Monster;
    }
    Monster.prototype.attack = function (target) {
        console.log(
            ''
                .concat(this.name, ' is attacking the ')
                .concat(target.role, ' - ')
                .concat(target.name, '!'),
        );
    };
    return Monster;
})();
var human = new Character('Meepo', Role.Swordsman);
var monster = new Monster('Sticky Slime');
human.attack(monster);
monster.attack(human);
