webpackHotUpdate("main",{

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {﻿const path = __webpack_require__(/*! path */ \"./node_modules/path-browserify/index.js\");\nconst webpack = __webpack_require__(/*! webpack */ \"./node_modules/webpack/lib/webpack.js\")\n\nmodule.exports = {\n    entry: { 'main-client': './Source/App.tsx'},\n  output: {\n    path: path.resolve(__dirname, 'wwwroot/dist'),\n      filename: 'bundle.js',\n      publicPath: '/dist/'\n  },\n  mode: 'development',\n//   devServer: {\n//       contentBase: path.resolve(__dirname, 'wwwroot/dist'),\n//       hot: true,\n//       port: 5000\n//   },\n  module: {\n    rules: [\n        {\n            test: /\\.tsx?$/,\n            loader: 'ts-loader',\n            exclude: /node_modules/,\n        },\n        {\n            test: /\\.css$/,\n            loader: 'style-loader!css-loader'\n        },\n        {\n            test: /\\.(png|jpg|gif)$/,\n            loader: 'file-loader'\n        },\n        {\n            test: /\\.(scss|sass)$/,\n            use: [{\n                loader: \"style-loader\"\n            }, {\n                loader: \"css-loader\"\n            }, {\n                loader: \"sass-loader\"\n            }]\n        },\n        {\n            test: /\\.mp4$/,\n            loader: 'file-loader'\n        }\n    ]\n  },\n  plugins: [\n    new webpack.HotModuleReplacementPlugin()\n  ],\n  resolve: {\n      extensions: [\".tsx\", \".ts\", \".js\"]\n  },\n  externals:[{\n    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'\n}]\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./webpack.config.js?");

/***/ })

})