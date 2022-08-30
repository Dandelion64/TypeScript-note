// （一）基礎物件型別

// JSON
let info_03o = {
    name: 'Maxwell',
    age: 20,
    hasPet: false,
};

// 請注意 any 推論並未發生在物件中
let someone_03o = {
    knows: undefined,
    identity: null,
};

// 此外只要多出或缺少屬性都會被 TypeScript 警告
info_03o = {
    name: 'Maxwell',
    age: 20,
};
someone_03o = {
    knows: undefined,
    identity: null,
    loves: 'Ygritte',
};

info_03o.hasPet = true;
info_03o.job = 'Engineer';

// 如果不是 optional 的 key-value pair 也不能夠被刪除
delete info_03o.hasPet;
console.log(info_03o);

// 我們可以嘗試一些更複雜的結構

// 1. 物件包物件
let nestedObject_03o = {
    prop: 'Hello',
    child: {
        prop1: 123,
        prop2: false,
    },
};

// 2. 展開物件到另一個物件中 (ES7 Rest-Spread Operator)
let obj1_03o = { hello: 'World' };
let obj2_03o = { ...obj1_03o, goodebye: 'Creul World' };

// 3. 使用 Object.assign
let obj3_03o = { hello: 'Another World' };
let obj4_03o = Object.assign(obj3_03o, {
    goodebye: 'Creul World',
});
// WARNING: 請注意這個 obj4 推論出來的型別 避免去使用它

// 現在讓我們來註記 object 型別
let justAnObject_03o: object = { hello: 'World' };
justAnObject_03o.hello = 'Max'; // 這樣竟然是錯誤的？
justAnObject_03o.hello = null;
justAnObject_03o = { goodbye: 'Cruel World' }; // 完全覆寫是可以的
justAnObject_03o.newProp = 123;
// 也就是說 TypeScript 是用像是 Immutable 的概念處理物件
// 不能對其做任何細微修改，但是可以整個取代。

// 由於在 VanillaJS 中不是 Primitive 的型別就繼承自物件
// 這是否代表我們可以用 Array 或是 Function 去覆蓋 TS 物件呢？
// 這裡讓我們先清楚地定義 VanillaJS 中的物件
// 狹義物件：僅限於 JSON 格式 ({...})
// 廣義物件：包含 JSON 格式、陣列、函式、類別、類別實體之物件
justAnObject_03o = 123; // warning
justAnObject_03o = [1, '2', true, { hello: 'World' }];
justAnObject_03o = () => {
    console.log('pass!');
};
justAnObject_03o = new Object();
// WARNING: 以創建物件的方式覆寫為基本型別 不會跳出警示
justAnObject_03o = new String('How could it be!');
justAnObject_03o = new Number(38);
// 直接用類別名稱覆寫
justAnObject_03o = Object;
justAnObject_03o = Array;
// 請注意除了第一種寫法之外一致通過

// 也就是說考慮以下狀況
let A_03o: object;
// A_03o 可以被任何廣義物件覆寫
// A_03o 一旦被帶入任何廣義物件 就只能被覆寫 不能被微調

// 也就是說 TypeScript 對物件型別的推論其實很好用了 不需要去註記它
// 畢竟推論結果 我們只能以格式相同的物件覆寫 或更新型別正確的屬性值

// 接下來讓我們嘗試看看將狹義物件換成廣義物件
// 首先定義一系列廣義物件讓 TS 來推論
let arrayObject_03o = [1, 2, 3, 4, 5];
let functionObject_03o = () => {
    console.log('Again!?');
};
let objectObject_03o = new Promise((res) => res(123));
let primitiveObject_03o = new String('wololo');
let classItself_03o = Object;

// 以下應該會被 TS 警告
arrayObject_03o.customProp = 123;
functionObject_03o.customProp = 456;
objectObject_03o.customProp = 'Huh?';
primitiveObject_03o.customProp = 'puhipuhi';
classItself_03o.customProp = 3.1415926;

// 接下來讓我們偷跑一點函式型別
// 函式的型別組成分為 input 和 output
// Array.prototype.pop() 沒有任何 input
// 但 output 可以為任意值
// 由於我們的陣列裡都是數字 所以我們可以這樣惡意覆寫而不跳出警告
arrayObject_03o.pop = () => 123;
// 但是以下狀況不行
arrayObject_03o.pop = () => '123';
arrayObject_03o.pop = () => {
    console.log(123);
};

// 也就是說廣義物件的檢查方式也與狹義物件相同
