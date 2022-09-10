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
var _CircleGeometryV2_PI;
var CircleGeometryV2 = /** @class */ (function () {
    function CircleGeometryV2(radius) {
        this.radius = radius;
        _CircleGeometryV2_PI.set(this, Math.PI);
        this.area =
            __classPrivateFieldGet(this, _CircleGeometryV2_PI, 'f') *
            Math.pow(radius, 2);
    }
    CircleGeometryV2.prototype.circumference = function () {
        return (
            2 *
            __classPrivateFieldGet(this, _CircleGeometryV2_PI, 'f') *
            this.radius
        );
    };
    return CircleGeometryV2;
})();
_CircleGeometryV2_PI = new WeakMap();
var randomCircle = new CircleGeometryV2(2);
console.log(randomCircle.area);
