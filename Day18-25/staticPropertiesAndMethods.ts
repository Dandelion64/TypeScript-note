// Day 21: 靜態成員 X 即刻操作 - Static Properties & Methods

export {};

// static 靜態
// ASK: 靜態與動態的差別？

// 其實最簡單的想法是這樣：
// 類別新增實體時的成員屬性／方法 就是動態屬性／方法

// POINT: 我自己的理解是：
// 靜態關心的是類別 動態關心的是實體
// 假設今天有一個 Class: Teacher
// 教師人數就應該是靜態的 而個別教師的姓名等個人資訊是動態的

// 假設今天實作一個幾何圓形的類別

class CircleGeometry {
    private PI: number = Math.PI;

    constructor(public radius: number) {
        // ...
    }

    public area(): number {
        return this.PI * this.radius ** 2;
    }

    public circumference(): number {
        return 2 * this.PI * this.radius;
    }
}

const myCircle = new CircleGeometry(2);
const areaFromInstance = myCircle.area();
const circumferenceFromInstance = myCircle.circumference();

// 每個 myCircle 的資料都不一樣
// 而靜態資料是不會這樣變動的

// 靜態成員不會隨著物件建構的不同而隨之改變
// 靜態成員不需經過建構程序 也就是說靜態成員本身就是可供操作的介面

// 我們可以使用 static 關鍵字宣告靜態成員
// 假設我們要將之改成像 Math 一樣的靜態類別

class StaticCircleGeometry {
    static PI: number = Math.PI;

    // 改成不初始化半徑

    static area(radius: number): number {
        return StaticCircleGeometry.PI * radius ** 2;
    }

    static circumference(radius: number): number {
        return 2 * StaticCircleGeometry.PI * radius;
    }
}

// 注意改成靜態成員以後就不能用 this.PI 而要改用 StaticCircleGeometry.PI
// 這是因為靜態成員是綁在類別上的 並不需要 new 來建立新實體

// 由於捨棄了建構新物件的管道
// 也不需要 constructor 了
// 所以必須改寫兩個靜態方法取得 radius 的方式

// 不需要建立實體
const areaFromStaticMethod = StaticCircleGeometry.area(2);
const circumferenceFromStaticMethod = StaticCircleGeometry.circumference(2);

console.log(`
    Using CircleGeometry Instance Method:
    Area: ${areaFromInstance}
    Circumference: ${circumferenceFromInstance}
`);

console.log(`
    Using StaticCircleGeometry Class Method:
    Area: ${areaFromStaticMethod}
    Circumference: ${circumferenceFromStaticMethod}
`);

// static 也可以配合 Access Modifiers 來使用
// 比方說今天我們想要配合 private 來防止篡改

class PrivateStaticCircleGeometry {
    // 寫法比較憋扭一點
    static #PI: number = Math.PI;

    static area(radius: number): number {
        return StaticCircleGeometry.PI * radius ** 2;
    }

    static circumference(radius: number): number {
        return 2 * StaticCircleGeometry.PI * radius;
    }

    static getValueOfPI(): number {
        return PrivateStaticCircleGeometry.#PI;
    }
}

// 無法強行存取
PrivateStaticCircleGeometry.#PI;
// 透過內部方法沒問題
PrivateStaticCircleGeometry.getValueOfPI();

// 接下來讓我們優化昨天的交通票務範例

// 先補上一些必要的片段 都是完全相同的 可以跳過

enum TransportTicketType {
    Train,
    MRT,
    Avaiation,
}

type TimeFormat = [number, number, number];

type TrainStation = {
    name: string;
    nextStop: string;
    duration: TimeFormat;
};

class TicketSystem {
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

// 我們可以將不會隨實體新增而變動的成員設定為靜態成員
// 然後將使用到 this 的部分修正為使用類別

class TrainTicket extends TicketSystem {
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

    // FIXME: static
    static #stops: string[] = [
        'Pingtung',
        'Kaohsiung',
        'Tainan',
        'Taichung',
        'Hsinchu',
        'Taoyuan',
        'Taipei',
    ];

    // FIXME: static
    static #trainStationDetail: TrainStation[] = [
        { name: 'Pingtung', nextStop: 'Kaohsiung', duration: [0, 37, 0] },
        { name: 'Kaohsiung', nextStop: 'Tainan', duration: [0, 42, 0] },
        { name: 'Tainan', nextStop: 'Taichung', duration: [1, 28, 0] },
        { name: 'Taichung', nextStop: 'Hsinchu', duration: [0, 40, 0] },
        { name: 'Hsinchu', nextStop: 'Taoyuan', duration: [0, 28, 0] },
        { name: 'Taoyuan', nextStop: 'Taipei', duration: [0, 49, 0] },
    ];

    // FIXME: this -> class
    #isStopExist(stop: string): boolean {
        for (let i = 0; i < TrainTicket.#stops.length; i += 1) {
            const existedStop = TrainTicket.#stops[i];
            if (existedStop === stop) return true;
        }
        return false;
    }

    // FIXME: this -> class
    protected deriveDuration(): TimeFormat {
        const startingPoint = this.startingPoint;
        const destination = this.destination;

        if (
            this.#isStopExist(startingPoint) &&
            this.#isStopExist(destination)
        ) {
            const time: TimeFormat = [0, 0, 0];
            let stopFound = false;

            for (
                let i = 0;
                i < TrainTicket.#trainStationDetail.length;
                i += 1
            ) {
                const detail = TrainTicket.#trainStationDetail[i];

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

// TODO: 讀者有興趣的話
// 可以撰寫簡單的靜態方法來進行站點更改或新增刪除
