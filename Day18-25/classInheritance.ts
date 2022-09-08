// Day 20: 類別繼承 X 延用設計 - TypeScript Class Inheritance

export {};

// 這次要思考的範例是：交通票務

enum TransportTicketType {
    Train,
    MRT,
    Avaiation,
}

// 此元組分別代表小時、分鐘、秒鐘
type TimeFormat = [number, number, number];

// 直接使用 JavaScript Private Class Features (#)
// 不使用 TypeScript private
class TicketSystem {
    constructor(
        type: TransportTicketType,
        startingPoint: string,
        destination: string,
        departureTime: Date,
    ) {
        this.#type = type;
        this.#startingPoint = startingPoint;
        this.#destination = destination;
        this.#departureTime = departureTime;
    }

    #type: TransportTicketType;
    #startingPoint: string;
    #destination: string;
    #departureTime: Date;

    #deriveDuration(): TimeFormat {
        // 因為交通方式有三種 所以可以先寫預設值
        return [1, 0, 0];
    }

    #deriveArrivalTime(): Date {
        const departureTime = this.#departureTime;
        const [hours, minutes, seconds] = this.#deriveDuration();

        const durationSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        const durationMilliseconds = durationSeconds * 1000;

        const arrivalMilliseconds =
            departureTime.getTime() + durationMilliseconds;
        return new Date(arrivalMilliseconds);
    }

    public getTicketInfo(): void {
        // REVIEW: Day 07 列舉的反射性
        const ticketName = TransportTicketType[this.#type];
        const arrivalTime = this.#deriveArrivalTime();

        console.log(`
            Ticket Type: ${ticketName}
            Station: ${this.#startingPoint} - ${this.#destination}
            Departure: ${this.#departureTime}
            Arrival: ${arrivalTime}
        `);
    }
}

// ============================================================
// REVIEW: 有 OOP 概念的讀者
// 可能會選擇使用抽象類別將 #deriveDuration 或其他成員轉換為抽象成員
// 抽象類別會在 Day 28 介紹
// ============================================================

// 讀者可能會發現 幾乎所有的成員都是 private
// 其中一個原因是 OOP 很直觀
// 每定義一個新物件就會有其屬性及方法
// 然而屬性卻很容易被篡改 這被稱為物件的變異 (Mutation)
// 為了防止這些屬性被隨意竄改 導致在具有多個實體時的 debug 難度驟增
// 最好就不要隨便使用 public 來設定

// POINT: 為了防止物件輕易發生變異
// 設計類別時 盡量將成員 (member) 設計為 private
// 這就是封裝 (Encapsulation)
//      ^^^^^^^^^^^^^^^^^^^

const randomTicket = new TicketSystem(
    TransportTicketType.Train,
    'Tainan',
    'Taipei',
    new Date(2022, 7, 24, 9, 0, 0), // 時間為 2022/08/24 09:00:00
);

randomTicket.getTicketInfo();

// ASK: 然而每次建立票券時 必須標示出票券的種類 (好長...)
// 三種交通方式計算站點的方式不同
// 難道 deriveDuration 要用 if/else 分別處理嗎？
// 應該要有一個時刻表會根據站點自動計算間隔跟時間才對吧
// 這個時候 就是繼承 (Inheritance) 派上用場的時候

type TrainStation = {
    name: string;
    nextStop: string;
    duration: TimeFormat;
};

class TrainTicket {
    #stops: string[] = [
        'Pingtung',
        'Kaohsiung',
        'Tainan',
        'Taichung',
        'Hsinchu',
        'Taoyuan',
        'Taipei',
    ];

    #trainStationDetail: TrainStation[] = [
        { name: 'Pingtung', nextStop: 'Kaohsiung', duration: [0, 37, 0] },
        { name: 'Kaohsiung', nextStop: 'Tainan', duration: [0, 42, 0] },
        { name: 'Tainan', nextStop: 'Taichung', duration: [1, 28, 0] },
        { name: 'Taichung', nextStop: 'Hsinchu', duration: [0, 40, 0] },
        { name: 'Hsinchu', nextStop: 'Taoyuan', duration: [0, 28, 0] },
        { name: 'Taoyuan', nextStop: 'Taipei', duration: [0, 49, 0] },
    ];

    #isStopExist(stop: string): boolean {
        for (let i = 0; i < this.#stops.length; i += 1) {
            const existedStop = this.#stops[i];
            if (existedStop === stop) return true;
        }
        return false;
    }

    #deriveDuration(): TimeFormat {
        const startingPoint = this.#startingPoint;
        const destination = this.#destination;

        if (
            this.#isStopExist(startingPoint) &&
            this.#isStopExist(destination)
        ) {
            const time: TimeFormat = [0, 0, 0]; // 存的是址
            let stopFound = false;

            for (let i = 0; i < this.#trainStationDetail.length; i += 1) {
                const detail = this.#trainStationDetail[i];

                if (!stopFound && detail.name === startingPoint) {
                    stopFound = true;
                    for (let k = 0; k < time.length; k += 1) {
                        time[k] += detail.duration[k];
                    }
                } else if (stopFound) {
                    for (let k = 0; k < time.length; k += 1) {
                        time[k] += detail.duration[k];
                    }

                    if (detail.nextStop === destination) break;
                }
            }

            const minutes = Math.floor(time[2] / 60);
            time[1] += minutes;
            time[2] -= minutes * 60;

            const hours = Math.floor(time[1] / 60);
            time[0] += hours;
            time[1] -= hours * 60;

            return time;
        }

        throw new Error('Stop does not exist.');
    }
}

// WARNING: 實際上在規劃站點資料的時候
// 為了處理不同行車方向與路線 最好是用 Graph 這種資料結構
// Ref: https://www.wikiwand.com/en/Graph_(abstract_data_type)

// 型別的繼承
/*
    class C {
        public Ppublic: T1;
        private Pprivate: T2;
        protected Pprotected: T3;

        public Mpublic(p: T4) { // ... }
        private Mprivate(p: T5) { // ... }
        protected Mprotected(p: T6) { // ... }
    }

    class D extends C {}
*/

// 其中：
// C 為 D 的父類別 (Parent Class/Superclass)
// D 為 C 的子類別 (Child Class/Subclass)

// D 類別具有以下的特性
// 1. 可以使用 private 以外的所有成員及方法
// 2. D 類別的實體同時屬於類別 C
// 3. C 類別的實體不屬於類別 D

// 可以使用 super() 呼叫父層的建構子函式

// REVIEW: 類別的型別推論與註記的機制將會在 Day 24 討論
// 核心觀念是：Class 和 Interface 本身就是一種 Type Alias

// 為了讓子類別可以存取 我們要新增具有 protected 成員的父類別

class NewTicketSystem {
    constructor(
        type: TransportTicketType,
        startingPoint: string,
        destination: string,
        departureTime: Date,
    ) {
        this.#type = type;
        this.startingPoint = startingPoint;
        this.destination = destination;
        this.#departureTime = departureTime;
    }

    #type: TransportTicketType;
    protected startingPoint: string;
    protected destination: string;
    #departureTime: Date;

    protected deriveDuration(): TimeFormat {
        return [0, 0, 0];
    }

    #deriveArrivalTime(): Date {
        const departureTime = this.#departureTime;
        const [hours, minutes, seconds] = this.deriveDuration();

        const durationSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        const durationMilliseconds = durationSeconds * 1000;

        const arrivalMilliseconds =
            departureTime.getTime() + durationMilliseconds;
        return new Date(arrivalMilliseconds);
    }

    public getTicketInfo(): void {
        const ticketName = TransportTicketType[this.#type];
        const arrivalTime = this.#deriveArrivalTime();

        console.log(`
            Ticket Type: ${ticketName}
            Station: ${this.startingPoint} - ${this.destination}
            Departure: ${this.#departureTime}
            Arrival: ${arrivalTime}
        `);
    }
}

class NewTrainTicket extends NewTicketSystem {
    constructor(
        startingPoint: string,
        destination: string,
        departureTime: Date,
    ) {
        super(
            TransportTicketType.Train,
            startingPoint,
            destination,
            departureTime,
        );
    }

    #stops: string[] = [
        'Pingtung',
        'Kaohsiung',
        'Tainan',
        'Taichung',
        'Hsinchu',
        'Taoyuan',
        'Taipei',
    ];

    #trainStationDetail: TrainStation[] = [
        { name: 'Pingtung', nextStop: 'Kaohsiung', duration: [0, 37, 0] },
        { name: 'Kaohsiung', nextStop: 'Tainan', duration: [0, 42, 0] },
        { name: 'Tainan', nextStop: 'Taichung', duration: [1, 28, 0] },
        { name: 'Taichung', nextStop: 'Hsinchu', duration: [0, 40, 0] },
        { name: 'Hsinchu', nextStop: 'Taoyuan', duration: [0, 28, 0] },
        { name: 'Taoyuan', nextStop: 'Taipei', duration: [0, 49, 0] },
    ];

    #isStopExist(stop: string): boolean {
        for (let i = 0; i < this.#stops.length; i += 1) {
            const existedStop = this.#stops[i];
            if (existedStop === stop) return true;
        }
        return false;
    }

    protected deriveDuration(): TimeFormat {
        const startingPoint = this.startingPoint;
        const destination = this.destination;

        if (
            this.#isStopExist(startingPoint) &&
            this.#isStopExist(destination)
        ) {
            const time: TimeFormat = [0, 0, 0];
            let stopFound = false;

            for (let i = 0; i < this.#trainStationDetail.length; i += 1) {
                const detail = this.#trainStationDetail[i];

                if (!stopFound && detail.name === startingPoint) {
                    stopFound = true;
                    for (let k = 0; k < time.length; k += 1) {
                        time[k] += detail.duration[k];
                    }
                } else if (stopFound) {
                    for (let k = 0; k < time.length; k += 1) {
                        time[k] += detail.duration[k];
                    }

                    if (detail.nextStop === destination) break;
                }
            }

            const minutes = Math.floor(time[2] / 60);
            time[1] += minutes;
            time[2] -= minutes * 60;

            const hours = Math.floor(time[1] / 60);
            time[0] += hours;
            time[1] -= hours * 60;

            return time;
        }

        throw new Error('Stop does not exist.');
    }
}

const newTrainTicket = new NewTrainTicket(
    'Tainan',
    'Hsinchu',
    new Date(2022, 7, 24, 10, 0, 0),
);

newTrainTicket.getTicketInfo();

// 最後強調一些 super 的觀念
// 1. 子類別的建構子函式中
//    在呼叫 super() 前 由於物件尚未建立完畢 不能使用 this
// 2. 假設子類別沒有實作建構子函式
//    我們曾經提過沒有繼承的情況下 預設的建構子函式為
/*
    constructor() {

    }
*/
//    在下述假設狀況下 預設的子類別建構子函式如下
/*
    class C {
        constructor(...args) {
            this.P1 = args[0];
            this.P2 = args[1];
            // ...
            this.Pn = args[n-1];
        }
    }

    class D extends C {
        constructor (...args) {
            super(...args);
        }
    }
*/
