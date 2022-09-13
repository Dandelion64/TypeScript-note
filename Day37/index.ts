// declare const $: any;

$(document).ready(function () {
    const $btn = $('#mainBtn');
    const $count = $('#count');

    let count = 0;

    $btn.on('click', () => {
        count++;
        $count.text(count);
    });
});
