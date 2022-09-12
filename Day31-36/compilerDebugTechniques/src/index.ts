const $btn = document.querySelector('#clickMeBtn');
const $counter = document.querySelector('#count');

let count = 0;

// Type Guard 或積極型別註記防止兩者為 null
/*
    const $btn = <HTMLButtonElement>document.querySelector('#clickMeBtn');
    const $counter = <HTMLSpanElement>document.querySelector('#count');
*/
// Type Guard 較為合理 畢竟他的確有可能為 null

if ($btn === null || $counter === null) {
    throw new Error("Elements shouldn't be null");
}

$btn.addEventListener('click', () => {
    count++;
    console.log('You clicked me...');

    // Debug 可以使用下列方法
    // 1. VanillaJS 的 debugger
    // 但 ESLint 認為這不再恰當
    // debugger;

    // 2. 使用開發者工具的 Sources 下 breakpoint
    // 備註： Sources 中存放的是該網頁從 Server 端取得的靜態資源

    // 3. 使用 TypeScript 編譯器設定 sourceMap
    /*
        {
            "compilerOptions": {
                "sourceMap": true,
            }
        }
    */
    // 編譯後會發現多了一個 .js.map 檔案
    // 其實任何專案 minified 或 uglified 後也都會有一個 Source Map
    // 也就是說有了 map 瀏覽器就會知道原本的 *.ts 長什麼樣子
    // Sources 中會新增 src/index.ts
    // 我們可以在其中設定斷點
    // 也就是說 SourceMap 可以讓我們用原本的 ts 檔來除錯

    // Type Guard
    if ($counter instanceof HTMLElement) {
        $counter.innerText = count.toString();
    }
});
