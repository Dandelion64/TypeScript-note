'use strict';
var CircleGeometry = /** @class */ (function () {
    function CircleGeometry(radius) {
        this.radius = radius;
        this.PI = Math.PI;
        // ...
    }
    CircleGeometry.prototype.area = function () {
        return this.PI * Math.pow(this.radius, 2);
    };
    CircleGeometry.prototype.circumference = function () {
        return 2 * this.PI * this.radius;
    };
    return CircleGeometry;
})();
var myCircle = new CircleGeometry(2);
var areaFromInstance = myCircle.area();
var circumferenceFromInstance = myCircle.circumference();
console.log(
    '\n    Using CircleGeometry Instance Method:\n    Area: '
        .concat(areaFromInstance, '\n    Circumference: ')
        .concat(circumferenceFromInstance, '\n'),
);
