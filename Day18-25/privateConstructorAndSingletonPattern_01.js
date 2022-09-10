'use strict';
var SingletonPerson = /** @class */ (function () {
    function SingletonPerson(name, age, hasPet) {
        this.name = name;
        this.age = age;
        this.hasPet = hasPet;
    }
    SingletonPerson.getInstance = function () {
        return this.Instance;
    };
    SingletonPerson.Instance = new SingletonPerson('Maxwell', 20, false);
    return SingletonPerson;
})();
var uniquePerson = SingletonPerson.getInstance();
console.log(uniquePerson);
console.log(uniquePerson.name);
console.log(uniquePerson.age);
console.log(uniquePerson.hasPet);
