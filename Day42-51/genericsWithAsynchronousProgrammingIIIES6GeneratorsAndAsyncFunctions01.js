'use strict';
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
console.time('1st Pong');
console.time('2nd Pong');
console.time('3rd Pong');
console.log('Promise Chain Representation:');
pingRequest(1)
    .then(function (response) {
        console.log(response.data);
        console.timeEnd('1st Pong');
        return pingRequest(2);
    })
    .then(function (response) {
        console.log(response.data);
        console.timeEnd('2nd Pong');
        return pingRequest(3);
    })
    .then(function (response) {
        console.log(response.data);
        console.timeEnd('3rd Pong');
    })
    .catch(function (response) {
        console.log('Status: '.concat(response.status));
    });
