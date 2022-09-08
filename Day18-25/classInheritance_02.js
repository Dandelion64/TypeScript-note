'use strict';
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b)
                        if (Object.prototype.hasOwnProperty.call(b, p))
                            d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== 'function' && b !== null)
                throw new TypeError(
                    'Class extends value ' +
                        String(b) +
                        ' is not a constructor or null',
                );
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
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
var _NewTicketSystem_instances,
    _NewTicketSystem_type,
    _NewTicketSystem_departureTime,
    _NewTicketSystem_deriveArrivalTime,
    _NewTrainTicket_instances,
    _NewTrainTicket_stops,
    _NewTrainTicket_trainStationDetail,
    _NewTrainTicket_isStopExist;
var TransportTicketType;
(function (TransportTicketType) {
    TransportTicketType[(TransportTicketType['Train'] = 0)] = 'Train';
    TransportTicketType[(TransportTicketType['MRT'] = 1)] = 'MRT';
    TransportTicketType[(TransportTicketType['Avaiation'] = 2)] = 'Avaiation';
})(TransportTicketType || (TransportTicketType = {}));
var NewTicketSystem = /** @class */ (function () {
    function NewTicketSystem(type, startingPoint, destination, departureTime) {
        _NewTicketSystem_instances.add(this);
        _NewTicketSystem_type.set(this, void 0);
        _NewTicketSystem_departureTime.set(this, void 0);
        __classPrivateFieldSet(this, _NewTicketSystem_type, type, 'f');
        this.startingPoint = startingPoint;
        this.destination = destination;
        __classPrivateFieldSet(
            this,
            _NewTicketSystem_departureTime,
            departureTime,
            'f',
        );
    }
    NewTicketSystem.prototype.deriveDuration = function () {
        return [1, 0, 0];
    };
    NewTicketSystem.prototype.getTicketInfo = function () {
        var ticketName =
            TransportTicketType[
                __classPrivateFieldGet(this, _NewTicketSystem_type, 'f')
            ];
        var arrivalTime = __classPrivateFieldGet(
            this,
            _NewTicketSystem_instances,
            'm',
            _NewTicketSystem_deriveArrivalTime,
        ).call(this);
        console.log(
            '\n            Ticket Type: '
                .concat(ticketName, '\n            Station: ')
                .concat(this.startingPoint, ' - ')
                .concat(this.destination, '\n            Departure: ')
                .concat(
                    __classPrivateFieldGet(
                        this,
                        _NewTicketSystem_departureTime,
                        'f',
                    ),
                    '\n            Arrival: ',
                )
                .concat(arrivalTime, '\n        '),
        );
    };
    return NewTicketSystem;
})();
(_NewTicketSystem_type = new WeakMap()),
    (_NewTicketSystem_departureTime = new WeakMap()),
    (_NewTicketSystem_instances = new WeakSet()),
    (_NewTicketSystem_deriveArrivalTime =
        function _NewTicketSystem_deriveArrivalTime() {
            var departureTime = __classPrivateFieldGet(
                this,
                _NewTicketSystem_departureTime,
                'f',
            );
            var _a = this.deriveDuration(),
                hours = _a[0],
                minutes = _a[1],
                seconds = _a[2];
            var durationSeconds = hours * 60 * 60 + minutes * 60 + seconds;
            var durationMilliseconds = durationSeconds * 1000;
            var arrivalMilliseconds =
                departureTime.getTime() + durationMilliseconds;
            return new Date(arrivalMilliseconds);
        });
var NewTrainTicket = /** @class */ (function (_super) {
    __extends(NewTrainTicket, _super);
    function NewTrainTicket(startingPoint, destination, departureTime) {
        var _this =
            _super.call(
                this,
                TransportTicketType.Train,
                startingPoint,
                destination,
                departureTime,
            ) || this;
        _NewTrainTicket_instances.add(_this);
        _NewTrainTicket_stops.set(_this, [
            'Pingtung',
            'Kaohsiung',
            'Tainan',
            'Taichung',
            'Hsinchu',
            'Taoyuan',
            'Taipei',
        ]);
        _NewTrainTicket_trainStationDetail.set(_this, [
            { name: 'Pingtung', nextStop: 'Kaohsiung', duration: [0, 37, 0] },
            { name: 'Kaohsiung', nextStop: 'Tainan', duration: [0, 42, 0] },
            { name: 'Tainan', nextStop: 'Taichung', duration: [1, 28, 0] },
            { name: 'Taichung', nextStop: 'Hsinchu', duration: [0, 40, 0] },
            { name: 'Hsinchu', nextStop: 'Taoyuan', duration: [0, 28, 0] },
            { name: 'Taoyuan', nextStop: 'Taipei', duration: [0, 49, 0] },
        ]);
        return _this;
    }
    NewTrainTicket.prototype.deriveDuration = function () {
        var startingPoint = this.startingPoint;
        var destination = this.destination;
        if (
            __classPrivateFieldGet(
                this,
                _NewTrainTicket_instances,
                'm',
                _NewTrainTicket_isStopExist,
            ).call(this, startingPoint) &&
            __classPrivateFieldGet(
                this,
                _NewTrainTicket_instances,
                'm',
                _NewTrainTicket_isStopExist,
            ).call(this, destination)
        ) {
            var time = [0, 0, 0];
            var stopFound = false;
            for (
                var i = 0;
                i <
                __classPrivateFieldGet(
                    this,
                    _NewTrainTicket_trainStationDetail,
                    'f',
                ).length;
                i += 1
            ) {
                var detail = __classPrivateFieldGet(
                    this,
                    _NewTrainTicket_trainStationDetail,
                    'f',
                )[i];
                if (!stopFound && detail.name === startingPoint) {
                    stopFound = true;
                    for (var k = 0; k < time.length; k += 1) {
                        time[k] += detail.duration[k];
                    }
                } else if (stopFound) {
                    for (var m = 0; m < time.length; m += 1) {
                        time[m] += detail.duration[m];
                    }
                    if (detail.nextStop === destination) break;
                }
            }
            var minutes = Math.floor(time[2] / 60);
            time[1] += minutes;
            time[2] -= minutes * 60;
            var hours = Math.floor(time[1] / 60);
            time[0] += hours;
            time[1] -= hours * 60;
            return time;
        }
        throw new Error('Stop does not exist.');
    };
    return NewTrainTicket;
})(NewTicketSystem);
(_NewTrainTicket_stops = new WeakMap()),
    (_NewTrainTicket_trainStationDetail = new WeakMap()),
    (_NewTrainTicket_instances = new WeakSet()),
    (_NewTrainTicket_isStopExist = function _NewTrainTicket_isStopExist(stop) {
        for (
            var i = 0;
            i < __classPrivateFieldGet(this, _NewTrainTicket_stops, 'f').length;
            i += 1
        ) {
            var existedStop = __classPrivateFieldGet(
                this,
                _NewTrainTicket_stops,
                'f',
            )[i];
            if (existedStop === stop) return true;
        }
        return false;
    });
var newTrainTicket = new NewTrainTicket(
    'Tainan',
    'Hsinchu',
    new Date(2022, 7, 24, 10, 0, 0),
);
newTrainTicket.getTicketInfo();
