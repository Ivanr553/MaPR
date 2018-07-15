const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: { 'main-client': './Source/App.tsx'},
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.mp4$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
};