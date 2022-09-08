'use strict';
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
var _TicketSystem_instances,
    _TicketSystem_type,
    _TicketSystem_startingPoint,
    _TicketSystem_destination,
    _TicketSystem_departureTime,
    _TicketSystem_deriveDuration,
    _TicketSystem_deriveArrivalTime;
var TransportTicketType;
(function (TransportTicketType) {
    TransportTicketType[(TransportTicketType['Train'] = 0)] = 'Train';
    TransportTicketType[(TransportTicketType['MRT'] = 1)] = 'MRT';
    TransportTicketType[(TransportTicketType['Avaiation'] = 2)] = 'Avaiation';
})(TransportTicketType || (TransportTicketType = {}));
var TicketSystem = /** @class */ (function () {
    function TicketSystem(type, startingPoint, destination, departureTime) {
        _TicketSystem_instances.add(this);
        _TicketSystem_type.set(this, void 0);
        _TicketSystem_startingPoint.set(this, void 0);
        _TicketSystem_destination.set(this, void 0);
        _TicketSystem_departureTime.set(this, void 0);
        __classPrivateFieldSet(this, _TicketSystem_type, type, 'f');
        __classPrivateFieldSet(
            this,
            _TicketSystem_startingPoint,
            startingPoint,
            'f',
        );
        __classPrivateFieldSet(
            this,
            _TicketSystem_destination,
            destination,
            'f',
        );
        __classPrivateFieldSet(
            this,
            _TicketSystem_departureTime,
            departureTime,
            'f',
        );
    }
    TicketSystem.prototype.getTicketInfo = function () {
        var ticketName =
            TransportTicketType[
                __classPrivateFieldGet(this, _TicketSystem_type, 'f')
            ];
        var arrivalTime = __classPrivateFieldGet(
            this,
            _TicketSystem_instances,
            'm',
            _TicketSystem_deriveArrivalTime,
        ).call(this);
        console.log(
            '\n            Ticket Type: '
                .concat(ticketName, '\n            Station: ')
                .concat(
                    __classPrivateFieldGet(
                        this,
                        _TicketSystem_startingPoint,
                        'f',
                    ),
                    ' - ',
                )
                .concat(
                    __classPrivateFieldGet(
                        this,
                        _TicketSystem_destination,
                        'f',
                    ),
                    '\n            Departure: ',
                )
                .concat(
                    __classPrivateFieldGet(
                        this,
                        _TicketSystem_departureTime,
                        'f',
                    ),
                    '\n            Arrival: ',
                )
                .concat(arrivalTime, '\n        '),
        );
    };
    return TicketSystem;
})();
(_TicketSystem_type = new WeakMap()),
    (_TicketSystem_startingPoint = new WeakMap()),
    (_TicketSystem_destination = new WeakMap()),
    (_TicketSystem_departureTime = new WeakMap()),
    (_TicketSystem_instances = new WeakSet()),
    (_TicketSystem_deriveDuration = function _TicketSystem_deriveDuration() {
        return [1, 0, 0];
    }),
    (_TicketSystem_deriveArrivalTime =
        function _TicketSystem_deriveArrivalTime() {
            var departureTime = __classPrivateFieldGet(
                this,
                _TicketSystem_departureTime,
                'f',
            );
            var _a = __classPrivateFieldGet(
                    this,
                    _TicketSystem_instances,
                    'm',
                    _TicketSystem_deriveDuration,
                ).call(this),
                hours = _a[0],
                minutes = _a[1],
                seconds = _a[2];
            var durationSeconds = hours * 60 * 60 + minutes * 60 + seconds;
            var durationMilliseconds = durationSeconds * 1000;
            var arrivalMilliseconds =
                departureTime.getTime() + durationMilliseconds;
            return new Date(arrivalMilliseconds);
        });
var randomTicket = new TicketSystem(
    TransportTicketType.Train,
    'Tainan',
    'Taipei',
    new Date(2022, 7, 24, 9, 0, 0),
);
randomTicket.getTicketInfo();
