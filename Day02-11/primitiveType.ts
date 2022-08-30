let myName_02p = 'Maxwell';
let age_02p = 20;
let hasPet_02p = false;
let nothing_02p = undefined;
let nothingLiterally_02p = null;

// 此時將滑鼠移至 IDE 中的變數名稱上
// 可以發現 TypeScipt 認得某些變數型別
// 這就是型別推論 (Type Inference)

// TypeScript 會將 undefined 以及 null 推論為 any
// 這是因為這兩種型別是 Nullable Types
// 讀者只要先記得他們會被推論為 any 就可以了

// 型別推論的真正用意在於
// 如果嘗試將其型別改變 TypeScript 會跳出 warning
age_02p = 'Young'; // warning
// 然而 any 推論的變數可以被隨便一再改變型別 這會導致混亂
// 所以學習 TypeScript 的第一步就是請避免使用 any (只有極少數狀況會用到)

// 另一種會出現 any 推論的狀況是遲滯性指派 Delayed Initialization
// 其實就是先宣告變數之後再賦值
let messageToSend_02p;
messageToSend_02p = 'Cat';
messageToSend_02p = 12345;
// 原理其實也很簡單 就是宣告變數卻不賦值時此變數的值是 undefined

// 因此，為了避免 any 型別推論，應當對 Nullable Types 或延遲賦值的變數做型別註記
let absoluteNothing_02p: undefined = undefined;
let literallyAbsoluteNothing_02p: null = null;
absoluteNothing_02p = 12345; // warning
literallyAbsoluteNothing_02p = 12345; // warning

// 如果今天想要讓某變數預設為 Nullable Types 但之後可能會是某型別的話，比方說：
let canBeNullableString_02p: string;
canBeNullableString_02p = 'Hello';
canBeNullableString_02p = 12345; // warning
canBeNullableString_02p = true; // warning
// 會發現只要值是字串是可以正確運作的

// 一開始尚未賦值時應該是 undefined
// 為什麼 TypeScript 不會報錯呢？
let canBeNullableString_02p_u: string;
let myString_02p = canBeNullableString_02p_u; // warning
canBeNullableString_02p_u = 'Hello';
// 可以注意到其實 TypeScript 是會跳出警告的
// 這概念有點暫時性死區 (TDZ, Temporal Dead Zone)

// 回到我們原本的目的：允許預設為 Nullable Types 的字串值
// 可以使用 union
let absolutelyEitherNullOrString_02p: string | null = null;
absolutelyEitherNullOrString_02p = 'wow';
absolutelyEitherNullOrString_02p = null;
absolutelyEitherNullOrString_02p = 'wow again...';

// 我們也可以對延遲賦值的變數型別註記
let A_02p: string;
A_02p = B_02p as string;
// 可以發現以下三點：
// （一） A_02p 的宣告不會被警告
// （二） B_02p 會因為 TDZ 而被警告
// （三） 乍看之下可以不用註記 A_02p 但其實應該嚴謹地防止 any 推論
