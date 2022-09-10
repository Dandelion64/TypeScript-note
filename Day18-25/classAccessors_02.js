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
var _CircleGeometryV3_PI;
var CircleGeometryV3 = /** @class */ (function () {
    function CircleGeometryV3(radius) {
        this.radius = radius;
        _CircleGeometryV3_PI.set(this, Math.PI);
    }
    Object.defineProperty(CircleGeometryV3.prototype, 'area', {
        // Getter Method
        // POINT: 使用 get 關鍵字
        get: function () {
            return (
                __classPrivateFieldGet(this, _CircleGeometryV3_PI, 'f') *
                Math.pow(this.radius, 2)
            );
        },
        enumerable: false,
        configurable: true,
    });
    CircleGeometryV3.prototype.circumference = function () {
        return (
            2 *
            __classPrivateFieldGet(this, _CircleGeometryV3_PI, 'f') *
            this.radius
        );
    };
    return CircleGeometryV3;
})();
_CircleGeometryV3_PI = new WeakMap();
var getterCircle = new CircleGeometryV3(2);
console.log(getterCircle.area);
getterCircle.radius = 3;
console.log(getterCircle.area);
