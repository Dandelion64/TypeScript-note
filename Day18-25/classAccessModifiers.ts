// Day 19: 存取修飾 X 藍圖規劃 - TypeScript Class Access Modifiers

export {};

// 直接思考一個情境：提款機
type TUserAccount = {
    account: string;
    password: string;
    money: number;
};

interface AccountSystem {
    users: TUserAccount[];
    currentUser: TUserAccount | undefined;

    signIn(account: string, password: string): void;
    signOut(): void;
}

interface TransactionSystem {
    deposit(amount: number): void;
    withdraw(amount: number): void;
}

interface ICashMachine extends TransactionSystem, AccountSystem {}

// REVIEW: 這裡讓我們偷跑一個觀念
// 類別可以使用 implements 關鍵字來實作介面的規格
// 這個概念就像是對類別做積極型別註記一樣 會在 Day 24/25 繼續討論

class CashMachine implements ICashMachine {
    constructor(users: TUserAccount[]) {
        this.users = users;
    }

    users: TUserAccount[];
    currentUser: TUserAccount | undefined;

    signIn(account: string, password: string): void {
        // 因為 Array.prototype.find 是 ES6 語法
        // 暫時先用 ES5 的方式處理

        for (let i = 0; i < this.users.length; i += 1) {
            const user = this.users[i];

            if (user.account === account && user.password === password) {
                this.currentUser = user;
                break;
            }
        }

        if (this.currentUser === undefined) {
            throw new Error('User not found...');
        }
    }

    signOut(): void {
        this.currentUser = undefined;
    }

    deposit(amount: number): void {
        if (this.currentUser !== undefined) {
            this.currentUser.money += amount;
        } else {
            throw new Error('Please sign in.');
        }
    }

    withdraw(amount: number): void {
        if (this.currentUser !== undefined) {
            this.currentUser.money -= amount;
        } else {
            throw new Error('Please sign in.');
        }
    }
}

const printAccountInfo = (user: TUserAccount | undefined) => {
    if (user === undefined) {
        console.log('Please sign in...');
    } else {
        console.log(`
            Current User: ${user.account}
            Money: ${user.money}
        `);
    }
};

const usersData: TUserAccount[] = [
    { account: 'Maxwell', password: 'a123', money: 10 },
    { account: 'Martin', password: 'b456', money: 100 },
    { account: 'Marvin', password: 'c789', money: 1000 },
];

const machine = new CashMachine(usersData);
console.log('Initialized: ');
printAccountInfo(machine.currentUser);

machine.signIn('Maxwell', 'a123');
console.log('Signed in: ');
printAccountInfo(machine.currentUser);

machine.withdraw(5);
console.log('After withdrawal: ');
printAccountInfo(machine.currentUser);

machine.signOut();
console.log('Signed out: ');
printAccountInfo(machine.currentUser);

// 但是這個提款機系統應該沒有人敢用吧？
// 這個提款機中所有的屬性都可以被外界存取 連密碼也可以
// Member Access Modifiers 就是為了處理這個問題

// 存取修飾子 Access Modifiers
// 1. 分為 public, private 以及 protected
//    可以調整成員變數與方法在類別內外的存取限制
// 2. 在類別宣告時若無特別加註 便預設為 public
// 3. 若宣告某類別 C 而其中的屬性 P 以及方法 M 分別被註記為：
//    a. public 模式
//       P 與 M 可以任意在類別內外以及繼承的子類別中使用
//    b. private 模式
//       P 與 M 僅僅只能在當前類別 C 內部使用
//    c. protected 模式 (REVIEW: Day 20)
//       P 與 M 除了當前類別 C 以外也可以在繼承的子類別中使用
// 4. 若類別 C 實作了 I 介面
//    則所有 I 的規格都為 public 模式

// 根據上述的重點 應該修改如下

interface NewAccountSystem {
    signIn(account: string, password: string): void;
    signOut(): void;
}

interface NewICashMachine extends TransactionSystem, NewAccountSystem {}

class NewCashMachine implements NewICashMachine {
    // 更簡潔的寫法
    constructor(private users: TUserAccount[]) {
        this.currentUser = undefined;
    }

    private currentUser: TUserAccount | undefined;

    public signIn(account: string, password: string): void {
        for (let i = 0; i < this.users.length; i += 1) {
            const user = this.users[i];

            if (user.account === account && user.password === password) {
                this.currentUser = user;
                break;
            }
        }

        if (this.currentUser === undefined) {
            throw new Error('User not found...');
        }
    }

    public signOut(): void {
        this.currentUser = undefined;
    }

    public deposit(amount: number): void {
        if (this.currentUser !== undefined) {
            this.currentUser.money += amount;
        } else {
            throw new Error('Please sign in.');
        }
    }

    public withdraw(amount: number): void {
        if (this.currentUser !== undefined) {
            this.currentUser.money -= amount;
        } else {
            throw new Error('Please sign in.');
        }
    }
}

const newMachine = new NewCashMachine(usersData);
console.log('Initialized: ');
printAccountInfo(newMachine.currentUser);

newMachine.signIn('Maxwell', 'a123');
console.log('Signed in: ');
printAccountInfo(newMachine.currentUser);

newMachine.withdraw(5);
console.log('After withdrawal: ');
printAccountInfo(newMachine.currentUser);

newMachine.signOut();
console.log('Signed out: ');
printAccountInfo(newMachine.currentUser);

// 這篇文章的寫法 private 無法達成真正私有
// REVIEW: 真正的私有要使用 # 來達成
// 必須要調整 tsconfig.json 的設定
/*
    {
        "compilerOptions": {
            "target": "es2015",
            "strict": true,
            "lib": ["dom","es2015"]
        }
    }
*/

// 真正的私有屬性實作

class PrivateCashMachine implements NewICashMachine {
    constructor(users: TUserAccount[]) {
        this.#users = users;
        this.#currentUser = undefined;
    }

    #users: TUserAccount[];
    #currentUser: TUserAccount | undefined;

    public signIn(account: string, password: string): void {
        for (let i = 0; i < this.#users.length; i += 1) {
            const user = this.#users[i];

            if (user.account === account && user.password === password) {
                this.#currentUser = user;
                break;
            }
        }

        if (this.#currentUser === undefined) {
            throw new Error('User not found...');
        }
    }

    public signOut(): void {
        this.#currentUser = undefined;
    }

    public deposit(amount: number): void {
        if (this.#currentUser !== undefined) {
            this.#currentUser.money += amount;
        } else {
            throw new Error('Please sign in.');
        }
    }

    public withdraw(amount: number): void {
        if (this.#currentUser !== undefined) {
            this.#currentUser.money -= amount;
        } else {
            throw new Error('Please sign in.');
        }
    }
}

const privateMachine = new PrivateCashMachine(usersData);
console.log('Initialized: ');
printAccountInfo(privateMachine.#currentUser);

privateMachine.signIn('Maxwell', 'a123');
console.log('Signed in: ');
printAccountInfo(privateMachine.#currentUser);

privateMachine.withdraw(5);
console.log('After withdrawal: ');
printAccountInfo(privateMachine.#currentUser);

privateMachine.signOut();
console.log('Signed out: ');
printAccountInfo(privateMachine.#currentUser);
