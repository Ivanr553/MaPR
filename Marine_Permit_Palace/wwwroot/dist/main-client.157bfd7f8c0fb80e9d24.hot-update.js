webpackHotUpdate("main-client",{

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./Source/components/CreateDocument/styling/style.sass":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./Source/components/CreateDocument/styling/style.sass ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"body {\\n  font-family: sans-serif;\\n  padding: 0;\\n  margin: 0;\\n  font-size: 0.5vw; }\\n  @media screen and (max-width: 1000px) {\\n    body {\\n      font-size: 1vw; } }\\n\\n.Link {\\n  text-decoration: none; }\\n\\ninput::-webkit-outer-spin-button,\\ninput::-webkit-inner-spin-button {\\n  display: none;\\n  -webkit-appearance: none;\\n  margin: 0; }\\n\\ninput {\\n  border: none;\\n  border-radius: 1px; }\\n\\n.documents-header {\\n  font-size: 2.5em;\\n  color: black;\\n  padding: 2.5vh 0 2.5vh 0;\\n  margin: 2.5vh 2vw 0vh 3vw !important;\\n  cursor: default;\\n  color: black;\\n  font-weight: bold; }\\n\\n@keyframes fade-in {\\n  0% {\\n    opacity: 0.2; }\\n  100% {\\n    opacity: 1; } }\\n\\n#CreateDocument {\\n  width: 100%;\\n  height: 100vh; }\\n\\n#create-document-nav-bar {\\n  width: 100%;\\n  height: 7.5vh;\\n  background-color: #4b4b4b;\\n  display: flex;\\n  flex-direction: row;\\n  align-items: flex-start;\\n  justify-content: flex-start; }\\n\\n.create-document-nav-bar-item {\\n  width: auto;\\n  height: 100%;\\n  padding: 0% 2% 0% 2%;\\n  font-size: 2em;\\n  color: white;\\n  cursor: pointer;\\n  display: flex;\\n  align-items: center;\\n  border-right: solid 1px rgba(255, 255, 255, 0.4); }\\n\\n.create-document-nav-bar-item:hover {\\n  background-color: #323232; }\\n\\n#create-document-nav-bar-item-document {\\n  border-left: solid 1px rgba(255, 255, 255, 0.4); }\\n\\n.container {\\n  width: 100%;\\n  height: 92.5%;\\n  overflow: hidden;\\n  position: relative; }\\n\\n#user-search-main-container {\\n  width: calc(100% - 2vw - 4px);\\n  margin-left: 1vw;\\n  padding-left: 1vw;\\n  background-color: white;\\n  border: solid 2px lightgrey;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: flex-start;\\n  justify-content: flex-start;\\n  overflow: auto; }\\n\\n#user-search-bar-container {\\n  margin-top: 2.5vh;\\n  position: relative; }\\n\\n#user-search-bar {\\n  font-size: 2.5em;\\n  border: solid 1px grey;\\n  border-radius: 1px;\\n  text-indent: 1vw;\\n  padding: 0.5vh 0 0.5vh 0; }\\n\\n#user-search-bar-magnifying-glass {\\n  height: 100%;\\n  width: auto;\\n  background-color: black; }\\n\\n#user-search-results-list {\\n  width: 100%;\\n  height: auto;\\n  position: absolute;\\n  top: 80%;\\n  left: 0;\\n  z-index: 600;\\n  background-color: white;\\n  list-style-type: none;\\n  padding-left: 0; }\\n\\n.user-search-result {\\n  width: calc(100% - 1vw);\\n  height: auto;\\n  font-size: 2em;\\n  cursor: pointer;\\n  margin-bottom: 0.5vh;\\n  padding: 1vh 0 1vh 1vw; }\\n\\n.user-search-result:hover {\\n  background-color: #c8c8c8; }\\n\\n#added-users-title {\\n  margin-top: 5vh;\\n  margin-bottom: 1vh;\\n  font-size: 2.25em;\\n  width: 100%;\\n  text-indent: 1%; }\\n\\n.added-users-container {\\n  width: auto;\\n  min-width: 50%;\\n  height: auto;\\n  min-height: 40%;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: flex-start;\\n  padding-top: 0.5%;\\n  border: solid 1px grey;\\n  background-color: #e6e6e6;\\n  position: relative;\\n  overflow: auto;\\n  margin-bottom: 1%; }\\n\\n.added-user {\\n  width: 99%;\\n  font-size: 2.25em;\\n  background-color: white;\\n  cursor: default;\\n  border: solid 1px grey;\\n  margin-bottom: 0.5%;\\n  padding: 0.3em 0 0.3em 0;\\n  text-indent: 1%;\\n  display: grid;\\n  grid-template-columns: 9fr 1fr;\\n  justify-content: center;\\n  align-items: center; }\\n\\n.added-user-delete-icon {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: 2em;\\n  color: #ff8e84;\\n  cursor: pointer; }\\n\\n.added-user-delete-icon:hover {\\n  color: #ff6b5e; }\\n\\n.create-document-button {\\n  position: absolute;\\n  font-size: 1.5em;\\n  padding: 0.25em 0.75em 0.25em 0.75em;\\n  background-color: lightgrey; }\\n\\n#document-view-container {\\n  width: 100%;\\n  height: auto;\\n  overflow: hidden; }\\n\\ninput:focus {\\n  outline: none; }\\n\\n#document-view-header {\\n  width: 100%;\\n  height: 10vh;\\n  right: 0;\\n  display: flex;\\n  flex-direction: row;\\n  align-items: center;\\n  justify-content: center;\\n  position: absolute;\\n  top: 0vh;\\n  z-index: 400;\\n  background-color: rgba(50, 50, 50, 0.8); }\\n\\n#save-button {\\n  width: auto;\\n  padding: 1%;\\n  font-size: 1.5em;\\n  z-index: 500;\\n  background-color: lightblue;\\n  border: solid 1px #969696;\\n  cursor: pointer;\\n  border-radius: 3px;\\n  opacity: 0.5;\\n  position: absolute;\\n  right: 15vw; }\\n\\n#document-view-no-document-warning {\\n  position: sticky;\\n  top: 30vh;\\n  width: auto;\\n  height: auto;\\n  padding: 1vh 1vw 1vh 1vw;\\n  background-color: lightgrey;\\n  z-index: 600;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  text-align: center;\\n  font-size: 3em;\\n  border: solid 1px grey;\\n  font-weight: bold; }\\n\\n#document-name-input {\\n  font-size: 1.75em;\\n  padding: 1%;\\n  background-color: #e6e6e6;\\n  min-width: 40%;\\n  font-weight: bold;\\n  text-align: center; }\\n\\n#document-view-sidebar {\\n  width: 20vw;\\n  height: 100%;\\n  position: absolute;\\n  right: -20vw;\\n  top: 0;\\n  background-color: #c8c8c8;\\n  border-left: solid 2px grey;\\n  z-index: 600;\\n  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.1); }\\n\\n.selected-field-display-container {\\n  width: calc(100% - 2px);\\n  height: auto;\\n  border: solid 1px grey;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: flex-start;\\n  justify-content: center; }\\n\\n#show-sidebar-icon-container {\\n  position: absolute;\\n  right: 2vw;\\n  top: 12vh;\\n  background-color: #afafaf;\\n  border-radius: 5px;\\n  z-index: 500;\\n  cursor: pointer;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  padding: 1vw 1.5vw 1vw 1.5vw;\\n  animation: shrink 0.3s forwards; }\\n\\n#show-sidebar-icon-container:hover {\\n  animation: grow 0.3s forwards; }\\n\\n#show-sidebar-icon {\\n  width: auto;\\n  height: 35px; }\\n\\n.show-sidebar {\\n  animation: show-sidebar 0.5s forwards; }\\n\\n.hide-sidebar {\\n  animation: hide-sidebar 0.5s forwards; }\\n\\n#close-sidebar-icon {\\n  font-size: 4em;\\n  color: grey;\\n  font-weight: bold;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  position: absolute;\\n  top: 1vh;\\n  right: 1vw;\\n  z-index: 600;\\n  cursor: pointer; }\\n\\n#close-sidebar-icon:hover {\\n  color: black; }\\n\\n#added-users-container-preview {\\n  width: calc(98% - 4px);\\n  margin-left: calc(2% - 2px); }\\n\\n@keyframes show-sidebar {\\n  0% {\\n    right: -20vw; }\\n  100% {\\n    right: 0; } }\\n\\n@keyframes hide-sidebar {\\n  0% {\\n    right: 0; }\\n  100% {\\n    right: -20vw; } }\\n\\n@keyframes grow {\\n  0% {\\n    transform: scale(1); }\\n  100% {\\n    transform: scale(1.05); } }\\n\\n@keyframes shrink {\\n  0% {\\n    transform: scale(1.05); }\\n  100% {\\n    transform: scale(1); } }\\n\\n@keyframes hide {\\n  0% {\\n    opacity: 1; }\\n  100% {\\n    opacity: 0; } }\\n\\n@keyframes show {\\n  0% {\\n    opacity: 0; }\\n  100% {\\n    opacity: 1; } }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/styling/style.sass?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js");

/***/ })

})