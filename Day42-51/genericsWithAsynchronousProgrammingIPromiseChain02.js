'use strict';
exports.__esModule = true;
function sendRequestAsPromise() {
    return new Promise(function (resolve, reject) {
        if (Math.random() > 0.9) {
            reject('500 Server Error...');
            return;
        }
        var time = Math.random() * 3000;
        setTimeout(function () {
            resolve('200 Success');
        }, time);
    });
}
console.time('1st Request Received');
console.time('2nd Request Received');
console.time('3rd Request Received');
var attempts = 1;
sendRequestAsPromise()
    .then(function (result) {
        console.timeEnd('1st Request Received');
        console.log('1st attempt '.concat(result));
        attempts++;
        return sendRequestAsPromise();
    })
    .then(function (result) {
        console.timeEnd('2nd Request Received');
        console.log('2nd attempt '.concat(result));
        attempts++;
        return sendRequestAsPromise();
    })
    .then(function (result) {
        console.timeEnd('3rd Request Received');
        console.log('3rd attempt '.concat(result));
    })
    .catch(function (message) {
        console.log(
            'Failed in the '.concat(attempts, ' attempt: ').concat(message),
        );
    });
