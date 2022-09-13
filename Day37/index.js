$(document).ready(function () {
    var $btn = $('#mainBtn');
    var $count = $('#count');
    var count = 0;
    $btn.on('click', function () {
        count++;
        $count.text(count);
    });
});
