const path = require('path');

module.exports = {
    mode: 'development',
    // devtool: 'cheap-module-source-map',
    // 輸入檔案位置
    entry: path.resolve(__dirname, 'Day38-41/src/indexWithFacade.ts'),
    module: {
        // 使用 ts-loader 處理 .ts 後綴的檔案並排除 node_modules
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        // 輸出檔名
        filename: 'bundleWithFacade.js',
        // 輸出位置
        path: path.resolve(__dirname, 'Day38-41/dist'),
    },
};
