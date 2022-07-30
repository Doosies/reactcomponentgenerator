/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showInputBox = void 0;
const vscode_1 = __webpack_require__(1);
async function showInputBox() {
    return await vscode_1.window.showInputBox({
        value: '',
        placeHolder: '컴포넌트의 이름을 입력!',
        validateInput: text => {
            const reg = /^[A-Z][A-Za-z0-9]{0,}$/;
            const passReg = new RegExp(reg).test(text);
            if (!passReg) {
                return text;
            }
        }
    });
}
exports.showInputBox = showInputBox;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
const basicInput_1 = __webpack_require__(2);
const fs = __webpack_require__(3);
const path = __webpack_require__(4);
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('reactcomponentgenerator.toggle', async (e) => {
        // 루트경로
        const rootPath = e.fsPath;
        // 컴포넌트 이름 입력받기
        const componentName = await (0, basicInput_1.showInputBox)();
        // 파일 생성될 경로
        const filePath = `${rootPath}/${componentName}`;
        // 폴더생성
        fs.mkdirSync(filePath);
        if (componentName) {
            // component.tsx파일 생성
            fs.writeFileSync(`${filePath}/${componentName}.tsx`, addSnippet('reactts', componentName));
            // component.style.ts 파일 생성
            fs.writeFileSync(`${filePath}/${componentName}.style.ts`, addSnippet('style', componentName));
            // index.ts파일 생성
            fs.writeFileSync(`${filePath}/index.ts`, addSnippet('index', componentName));
            vscode_1.window.showInformationMessage(componentName + ' 컴포넌트 생성 완료 !! ');
        }
        else {
            vscode_1.window.showInformationMessage('컴포넌트 이름을 입력해주세요.');
        }
    }));
}
exports.activate = activate;
function addSnippet(snippetType, componentName) {
    const snippetsPath = path.join(__dirname, './snippets/');
    const json = JSON.parse(fs.readFileSync(snippetsPath + 'snippets.json').toString());
    let body = json[snippetType].body;
    // 만약 존재할 경우
    if (body.length) {
        body = body.join('\r\n').split(/(?<!\\)\$componentName/gm).join(componentName);
        return body;
    }
    // 존재하지 않을 경우
    else {
        return '';
    }
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map