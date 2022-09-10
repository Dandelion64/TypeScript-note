'use strict';
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
var _CircleGeometryV4_PI;
var CircleGeometryV4 = /** @class */ (function () {
    function CircleGeometryV4(radius) {
        this.radius = radius;
        _CircleGeometryV4_PI.set(this, Math.PI);
    }
    Object.defineProperty(CircleGeometryV4.prototype, 'area', {
        get: function () {
            return (
                __classPrivateFieldGet(this, _CircleGeometryV4_PI, 'f') *
                Math.pow(this.radius, 2)
            );
        },
        set: function (value) {
            this.radius = Math.pow(
                value / __classPrivateFieldGet(this, _CircleGeometryV4_PI, 'f'),
                0.5,
            );
        },
        enumerable: false,
        configurable: true,
    });
    Object.defineProperty(CircleGeometryV4.prototype, 'circumference', {
        get: function () {
            return (
                2 *
                __classPrivateFieldGet(this, _CircleGeometryV4_PI, 'f') *
                this.radius
            );
        },
        enumerable: false,
        configurable: true,
    });
    return CircleGeometryV4;
})();
_CircleGeometryV4_PI = new WeakMap();
var accessorCircle = new CircleGeometryV4(2);
console.log(accessorCircle.radius);
console.log(accessorCircle.area);
accessorCircle.area = Math.PI * Math.pow(3, 2);
console.log(accessorCircle.radius);
