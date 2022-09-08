'use strict';
var __classPrivateFieldSet =
    (this && this.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
        if (kind === 'm') throw new TypeError('Private method is not writable');
        if (kind === 'a' && !f)
            throw new TypeError(
                'Private accessor was defined without a setter',
            );
        if (
            typeof state === 'function'
                ? receiver !== state || !f
                : !state.has(receiver)
        )
            throw new TypeError(
                'Cannot write private member to an object whose class did not declare it',
            );
        return (
            kind === 'a'
                ? f.call(receiver, value)
                : f
                ? (f.value = value)
                : state.set(receiver, value),
            value
        );
    };
var __classPrivateFieldGet =
    (this && this.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
        if (kind === 'a' && !f)
            throw new TypeError(
                'Private accessor was defined without a getter',
            );
        if (
            typeof state === 'function'
                ? receiver !== state || !f
                : !state.has(receiver)
        )
            throw new TypeError(
                'Cannot read private member from an object whose class did not declare it',
            );
        return kind === 'm'
            ? f
            : kind === 'a'
            ? f.call(receiver)
            : f
            ? f.value
            : state.get(receiver);
    };
var _PrivateCashMachine_users, _PrivateCashMachine_currentUser;
var printAccountInfo = function (user) {
    if (user === undefined) {
        console.log('Please sign in...');
    } else {
        console.log(
            '\n            Current User: '
                .concat(user.account, '\n            Money: ')
                .concat(user.money, '\n        '),
        );
    }
};
var usersData = [
    { account: 'Maxwell', password: 'a123', money: 10 },
    { account: 'Martin', password: 'b456', money: 100 },
    { account: 'Marvin', password: 'c789', money: 1000 },
];
var NewCashMachine = /** @class */ (function () {
    // 更簡潔的寫法
    function NewCashMachine(users) {
        this.users = users;
        this.currentUser = undefined;
    }
    NewCashMachine.prototype.signIn = function (account, password) {
        for (var i = 0; i < this.users.length; i += 1) {
            var user = this.users[i];
            if (user.account === account && user.password === password) {
                this.currentUser = user;
                break;
            }
        }
        if (this.currentUser === undefined) {
            throw new Error('User not found...');
        }
    };
    NewCashMachine.prototype.signOut = function () {
        this.currentUser = undefined;
    };
    NewCashMachine.prototype.deposit = function (amount) {
        if (this.currentUser !== undefined) {
            this.currentUser.money += amount;
        } else {
            throw new Error('Please sign in.');
        }
    };
    NewCashMachine.prototype.withdraw = function (amount) {
        if (this.currentUser !== undefined) {
            this.currentUser.money -= amount;
        } else {
            throw new Error('Please sign in.');
        }
    };
    return NewCashMachine;
})();
// 真正的私有屬性實作
var PrivateCashMachine = /** @class */ (function () {
    function PrivateCashMachine(users) {
        _PrivateCashMachine_users.set(this, void 0);
        _PrivateCashMachine_currentUser.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateCashMachine_users, users, 'f');
        __classPrivateFieldSet(
            this,
            _PrivateCashMachine_currentUser,
            undefined,
            'f',
        );
    }
    PrivateCashMachine.prototype.signIn = function (account, password) {
        for (
            var i = 0;
            i <
            __classPrivateFieldGet(this, _PrivateCashMachine_users, 'f').length;
            i += 1
        ) {
            var user = __classPrivateFieldGet(
                this,
                _PrivateCashMachine_users,
                'f',
            )[i];
            if (user.account === account && user.password === password) {
                __classPrivateFieldSet(
                    this,
                    _PrivateCashMachine_currentUser,
                    user,
                    'f',
                );
                break;
            }
        }
        if (
            __classPrivateFieldGet(
                this,
                _PrivateCashMachine_currentUser,
                'f',
            ) === undefined
        ) {
            throw new Error('User not found...');
        }
    };
    PrivateCashMachine.prototype.signOut = function () {
        __classPrivateFieldSet(
            this,
            _PrivateCashMachine_currentUser,
            undefined,
            'f',
        );
    };
    PrivateCashMachine.prototype.deposit = function (amount) {
        if (
            __classPrivateFieldGet(
                this,
                _PrivateCashMachine_currentUser,
                'f',
            ) !== undefined
        ) {
            __classPrivateFieldGet(
                this,
                _PrivateCashMachine_currentUser,
                'f',
            ).money += amount;
        } else {
            throw new Error('Please sign in.');
        }
    };
    PrivateCashMachine.prototype.withdraw = function (amount) {
        if (
            __classPrivateFieldGet(
                this,
                _PrivateCashMachine_currentUser,
                'f',
            ) !== undefined
        ) {
            __classPrivateFieldGet(
                this,
                _PrivateCashMachine_currentUser,
                'f',
            ).money -= amount;
        } else {
            throw new Error('Please sign in.');
        }
    };
    return PrivateCashMachine;
})();
(_PrivateCashMachine_users = new WeakMap()),
    (_PrivateCashMachine_currentUser = new WeakMap());
var privateMachine = new PrivateCashMachine(usersData);
console.log('Initialized: ');
printAccountInfo(privateMachine._PrivateCashMachine_currentUser);
privateMachine.signIn('Maxwell', 'a123');
console.log('Signed in: ');
printAccountInfo(privateMachine._PrivateCashMachine_currentUser);
privateMachine.withdraw(5);
console.log('After withdrawal: ');
printAccountInfo(privateMachine._PrivateCashMachine_currentUser);
privateMachine.signOut();
console.log('Signed out: ');
printAccountInfo(privateMachine._PrivateCashMachine_currentUser);
