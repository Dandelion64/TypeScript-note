const $btn = document.querySelector('#clickMeBtn');
const $counter = document.querySelector('#count');
let count = 0;
if ($btn === null || $counter === null) {
    throw new Error("Elements shouldn't be null");
}
$btn.addEventListener('click', () => {
    count++;
    console.log('You clicked me...');
    if ($counter instanceof HTMLElement) {
        $counter.innerText = count.toString();
    }
});
//# sourceMappingURL=index.js.map
