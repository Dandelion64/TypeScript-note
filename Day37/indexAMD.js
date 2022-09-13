var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
define('indexAMD', ['require', 'exports', 'jquery'], function (
    require,
    exports,
    jquery_1,
) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    jquery_1 = __importDefault(jquery_1);
    (0, jquery_1.default)(document).ready(function () {
        const $btn = (0, jquery_1.default)('#mainBtn');
        const $count = (0, jquery_1.default)('#count');
        let count = 0;
        $btn.on('click', () => {
            count++;
            $count.text(count);
        });
    });
});
