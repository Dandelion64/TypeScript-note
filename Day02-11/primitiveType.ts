// Day 02: 型別推論 X 註記 - Type Inference & Annotation

export {};

let myName = 'Maxwell';
let age = 20;
let hasPet = false;
let nothing = undefined;
let nothingLiterally = null;

// 此時將滑鼠移至 IDE 中的變數名稱上
// 可以發現 TypeScipt 認得某些變數型別
// 這就是型別推論 (Type Inference)

// TypeScript 會將 undefined 以及 null 推論為 any
// 這是因為這兩種型別是 Nullable Types
// 讀者只要先記得他們會被推論為 any 就可以了

// 型別推論的真正用意在於
// 如果嘗試將其型別改變 TypeScript 會跳出 error
age = 'Young'; // error
// 然而 any 推論的變數可以被隨便一再改變型別 這會導致混亂
// 所以學習 TypeScript 的第一步就是請避免使用 any (只有極少數狀況會用到)

// 另一種會出現 any 推論的狀況是遲滯性指派 Delayed Initialization
// 其實就是先宣告變數之後再賦值
let messageToSend;
messageToSend = 'Cat';
messageToSend = 12345;
// 原理其實也很簡單 就是宣告變數卻不賦值時此變數的值是 undefined

// 因此，為了避免 any 型別推論，應當對 Nullable Types 或延遲賦值的變數做型別註記
let absoluteNothing: undefined = undefined;
let literallyAbsoluteNothing: null = null;
absoluteNothing = 12345; // error
literallyAbsoluteNothing = 12345; // error

// 如果今天想要讓某變數預設為 Nullable Types 但之後可能會是某型別的話，比方說：
let canBeNullableString: string;
canBeNullableString = 'Hello';
canBeNullableString = 12345; // error
canBeNullableString = true; // error
// 會發現只要值是字串是可以正確運作的

// 一開始尚未賦值時應該是 undefined
// 為什麼 TypeScript 不會報錯呢？
let canBeNullableString_u: string;
let myString = canBeNullableString_u; // error
canBeNullableString_u = 'Hello';
// 可以注意到其實 TypeScript 是會跳出警告的
// 這概念有點暫時性死區 (TDZ, Temporal Dead Zone)

// 回到我們原本的目的：允許預設為 Nullable Types 的字串值
// 可以使用 union
let absolutelyEitherNullOrString: string | null = null;
absolutelyEitherNullOrString = 'wow';
absolutelyEitherNullOrString = null;
absolutelyEitherNullOrString = 'wow again...';

// 我們也可以對延遲賦值的變數型別註記
let A: string;
A = B as string;
// 可以發現以下三點：
// （一） A 的宣告不會被警告
// （二） B 會因為 TDZ 而被警告
// （三） 乍看之下可以不用註記 A 但其實應該嚴謹地防止 any 推論
