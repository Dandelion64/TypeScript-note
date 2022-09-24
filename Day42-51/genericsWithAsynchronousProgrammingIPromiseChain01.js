'use strict';
exports.__esModule = true;
function sendRequest(success, error) {
    if (Math.random() > 0.9) {
        error('500 Server Error...');
        return;
    }
    var time = Math.random() * 3000;
    setTimeout(function () {
        success('200 Success');
    }, time);
}
console.time('1st Request Received');
console.time('2nd Request Received');
console.time('3rd Request Received');
sendRequest(
    function (result) {
        console.timeEnd('1st Request Received');
        console.log('1st attempt '.concat(result));
        sendRequest(
            function () {
                console.timeEnd('2nd Request Received');
                console.log('2nd attempt '.concat(result));
                sendRequest(
                    function () {
                        console.timeEnd('3rd Request Received');
                        console.log('3rd attempt '.concat(result));
                    },
                    function (message) {
                        console.log(
                            'Error occured in 3rd attempt '.concat(message),
                        );
                    },
                );
            },
            function (message) {
                console.log('Error occured in 2nd attempt '.concat(message));
            },
        );
    },
    function (message) {
        console.log('Error occured in 1st attempt '.concat(message));
    },
);
