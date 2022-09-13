// Day 39: UBike 地圖 X 資料處理 - Data Processing using Type Alias

// 今天的重點是善用型別化名來處理從第三方 API 來的資料

// 首先我們在 fetchUBikeData.ts 中取得資料
// 因為 Promise 是功能相關的物件涉及型別
// 我們要在 tsconfig.json 中設定
/*
    {
        "compilerOptions": {
            "lib": ["DOM", "ES2015"]
        }
    }
*/
// REVIEW: 這部分的型別推論機制涉及泛用型別 (Generics)
// 會在 Day 47 再討論

// 因為第三方 API 的資料格式很複雜
// 最好在拉取資料的檔案中寫好文件以免日後查找困難
// 然後就可以在 AJAX 過程中將資料轉換為我們想要的格式

// 另外我們也撰寫一隻檔案儲存行政區相關的資料
// districtData.ts

// 最後我們將所有型別相關的部分切分出去寫成 Declaration File
// data.d.ts
