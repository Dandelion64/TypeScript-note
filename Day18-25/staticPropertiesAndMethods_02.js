'use strict';
var StaticCircleGeometry = /** @class */ (function () {
    function StaticCircleGeometry() {
        return;
    }
    StaticCircleGeometry.area = function (radius) {
        return StaticCircleGeometry.PI * Math.pow(radius, 2);
    };
    StaticCircleGeometry.circumference = function (radius) {
        return 2 * StaticCircleGeometry.PI * radius;
    };
    StaticCircleGeometry.PI = Math.PI;
    return StaticCircleGeometry;
})();
var areaFromStaticMethod = StaticCircleGeometry.area(2);
var circumferenceFromStaticMethod = StaticCircleGeometry.circumference(2);
console.log(
    '\n    Using StaticCircleGeometry Class Method:\n    Area: '
        .concat(areaFromStaticMethod, '\n    Circumference: ')
        .concat(circumferenceFromStaticMethod, '\n'),
);
