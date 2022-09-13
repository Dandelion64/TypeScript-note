// 當然也以考慮用普通的 data.ts export 型別化名

declare type Districts =
    | '中正區'
    | '大同區'
    | '中山區'
    | '松山區'
    | '大安區'
    | '萬華區'
    | '信義區'
    | '士林區'
    | '北投區'
    | '內湖區'
    | '南港區'
    | '文山區';

// YouBike 2.0 臺北市公共自行車即時資訊
declare type SourceUBikeInfo = {
    sno: string; // 場站代號
    sna: string; // 場站名稱 (ch)
    tot: string; // 場站總車位數
    sbi: string; // 場站目前車輛數
    sarea: string; // 場站行政區 (ch) ex."信義區"
    mday: string; // 各場站來源資料更新時間
    lat: string; // 緯度
    lng: string; // 經度
    ar: string; // 場站位置描述 (ch) ex."復興南路二段273號西側"
    sareaen: string; // 場站行政區 (en)
    snaen: string; // 場站名稱 (en)
    aren: string; // 場站位置描述 (en)
    bemp: string; // 場站空位數
    act: string; // 場站正常使用狀態碼 ex."1"
    srcUpdateTime: string; // 系統發布資料更新的時間
    updateTime: string; // 北市府交通局數據平台經過處理後將資料存入 DB 的時間
    infoTime: string; // 各場站來源資料更新時間
    infoDate: string; // 各場站來源資料更新時間 (只有日期)
};

// 我們理想中的資料格式
declare type UBikeInfo = {
    availableBikes: number; // sbi
    totalBikes: number; // tot
    latLng: LatLngExpression; // lat, lng
    districtName: string; // sarea
    stopName: string; // sna
};
