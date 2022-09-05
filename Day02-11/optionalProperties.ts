// Day 09: 選用屬性 X 型別擴展 - Optional Properties

export default {};

// 在開始之前必須再三強調
// "越自由的條件 對工具的了解度也就越低 而要背負的風險也就越高"

// 假設現在我們要定義一筆會員資料的格式
// 為了降低使用者進入平台的門檻 我們會將許多資料設定為選填
// 假設我們用複合型別的方式來處理

enum Gender {
    Male,
    Female,
    Other,
}

type AccountInfo = {
    account: string;
    password: string;
    nickname: string | undefined;
    birth: Date | undefined;
    gender: Gender | undefined;
    subscribed: boolean;
};

const accountMaxwell: AccountInfo = {
    account: 'nordic.wyvern',
    password: '<hashed-password>',
    subscribed: false,
};

// WARNING: 在 TypeScript 中
// undefinded 這種型別代表必須存取 undefined 這種值

// 為了解決這種狀況 我們可以使用選用屬性註記 (Optional Property Annotation)
type NewAccountInfo = {
    account: string;
    password: string;
    nickname?: string;
    birth?: Date;
    gender?: Gender;
    subscribed: boolean;
};

const accountDandelion: NewAccountInfo = {
    account: 'Coolilipo',
    password: '<hashed-password>',
    subscribed: false,
};

// Syntax:
type A = {
    P?: T;
};
// 將會選擇性地忽略 P 這個屬性
// 也可以選擇填入 P 這個屬性但賦職為 undefined

// 或者我們結合複合型別來做使用
type AccountSystem = {
    account: string;
    password: string;
    subscribed: boolean;
};

type AccountPersonalInfo = {
    nickname?: string;
    birth?: Date;
    gender?: Gender;
};

type PersonalAccount = AccountSystem & AccountPersonalInfo;
// 請 hover 看看型別推論結果
// ASK: 這樣子程式碼規模龐大的時候 我要怎麼知道分別為何呢？
// POINT: 使用 VSCODE 快捷鍵 Ctrl/Command + LB

// 接下來讓我們把選用屬性用在函式和元組上試試
const addThreeAsDefault = (n1: number, n2?: number) => {
    if (n2) {
        return n1 + n2;
    }
    return n1 + 3;
};

console.log(addThreeAsDefault(4));
console.log(addThreeAsDefault(5, 6));

type VehicleInfo = [string, string, string?, Date?];
const car: VehicleInfo = ['CRV', 'Honda', new Date()]; // error
const bicycle: VehicleInfo = ['???', 'Giant', undefined, new Date()];
const motor: VehicleInfo = ['Ninja', 'Honda', 'Bruce', new Date()];
