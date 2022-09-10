'use strict';
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b)
                        if (Object.prototype.hasOwnProperty.call(b, p))
                            d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== 'function' && b !== null)
                throw new TypeError(
                    'Class extends value ' +
                        String(b) +
                        ' is not a constructor or null',
                );
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
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
                .concat(target.name),
        );
    };
    return Monster;
})();
var BountyHunter = /** @class */ (function (_super) {
    __extends(BountyHunter, _super);
    function BountyHunter(name) {
        var _this = _super.call(this, name, Role.BountyHunter) || this;
        // 獵物有兩種：人質或怪物
        _this.hostages = [];
        return _this;
    }
    BountyHunter.prototype.capture = function (target, successRate) {
        var randomNumber = Math.random();
        var targetTitle = ''.concat(target.name, ' the ').concat(target.role);
        var message;
        if (randomNumber > 1 - successRate) {
            this.hostages = __spreadArray(
                __spreadArray([], this.hostages, true),
                [target],
                false,
            );
            message = ''
                .concat(this.name, ' has captured ')
                .concat(targetTitle);
        } else {
            message = ''
                .concat(this.name, ' failed to capture ')
                .concat(targetTitle);
        }
        console.log(message);
    };
    BountyHunter.prototype.sellHostages = function () {
        var totalPrice = this.hostages.length * 1000;
        var hostagesInfo = this.hostages
            .map(function (hostage) {
                return ''.concat(hostage.name, ' the ').concat(hostage.role);
            })
            .join('\n');
        console.log(
            ''
                .concat(this.name, ' sells all the hostages, including: ')
                .concat(
                    hostagesInfo,
                    '\n            \n            Receive Gold: $',
                )
                .concat(totalPrice),
        );
        this.hostages = [];
    };
    return BountyHunter;
})(Character);
var bountyHunter = new BountyHunter('Maxwell');
var wantedCharacter = new Character('Marvin', Role.Highwayman);
var wantedMonster = new Monster('Eikthyrnir');
var desperado = new Character('Legendary Joe', Role.Highwayman);
bountyHunter.capture(wantedCharacter, 1);
bountyHunter.capture(wantedMonster, 0.5);
bountyHunter.capture(desperado, 0.01);
bountyHunter.sellHostages();
