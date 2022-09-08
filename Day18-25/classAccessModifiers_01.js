'use strict';
var CashMachine = /** @class */ (function () {
    function CashMachine(users) {
        this.users = users;
    }
    CashMachine.prototype.signIn = function (account, password) {
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
    CashMachine.prototype.signOut = function () {
        this.currentUser = undefined;
    };
    CashMachine.prototype.deposit = function (amount) {
        if (this.currentUser !== undefined) {
            this.currentUser.money += amount;
        } else {
            throw new Error('Please sign in.');
        }
    };
    CashMachine.prototype.withdraw = function (amount) {
        if (this.currentUser !== undefined) {
            this.currentUser.money -= amount;
        } else {
            throw new Error('Please sign in.');
        }
    };
    return CashMachine;
})();
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
var machine = new CashMachine(usersData);
console.log('Initialized: ');
printAccountInfo(machine.currentUser);
machine.signIn('Maxwell', 'a123');
console.log('Signed in: ');
printAccountInfo(machine.currentUser);
machine.withdraw(5);
console.log('After withdrawal: ');
printAccountInfo(machine.currentUser);
machine.signOut();
console.log('Signed out: ');
printAccountInfo(machine.currentUser);
