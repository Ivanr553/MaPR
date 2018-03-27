const path = require('path');

module.exports = {
  entry: './wwwroot/source/App.tsx',
  output: {
    path: path.resolve(__dirname, 'wwwroot/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
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
  resolve: {
      extensions: [".tsx", ".ts", ".js"]
  }
};