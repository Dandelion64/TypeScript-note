'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
exports.__esModule = true;
function pingRequest(num, errorProbability) {
    if (errorProbability === void 0) {
        errorProbability = 0;
    }
    return new Promise(function (resolve, reject) {
        var probability = Math.random();
        if (probability < errorProbability) {
            reject({ data: null, status: 500 });
        }
        var timeout = Math.random() * 3000;
        setTimeout(function () {
            resolve({ data: 'Pong: '.concat(num), status: 200 });
        }, timeout);
    });
}
function pingsAsyncFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var response01, err01_2, response02, err02_2, response03, err03_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pingRequest(1)];
                case 1:
                    response01 = _a.sent();
                    console.log(response01.data);
                    console.timeEnd('1st Pong');
                    return [3 /*break*/, 3];
                case 2:
                    err01_2 = _a.sent();
                    throw new Error(err01_2);
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, pingRequest(2)];
                case 4:
                    response02 = _a.sent();
                    console.log(response02.data);
                    console.timeEnd('2nd Pong');
                    return [3 /*break*/, 6];
                case 5:
                    err02_2 = _a.sent();
                    throw new Error(err02_2);
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, pingRequest(3)];
                case 7:
                    response03 = _a.sent();
                    console.log(response03.data);
                    console.timeEnd('3rd Pong');
                    return [3 /*break*/, 9];
                case 8:
                    err03_2 = _a.sent();
                    throw new Error(err03_2);
                case 9:
                    return [2 /*return*/];
            }
        });
    });
}
// hover: 輸出為 Promise<void> 因為沒有 return
console.log('Using Async Function:');
console.time('1st Pong');
console.time('2nd Pong');
console.time('3rd Pong');
pingsAsyncFunc().then(function () {
    console.log('Request Process Ended!');
});
