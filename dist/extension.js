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
function activate(context) {
    // const fs = new MemFS();
    // context.subscriptions.push(commands.registerCommand('reactcomponentgenerator.quickInput', async () => {
    // 	const rootUri = folder;
    // 	await workspace.fs.createDirectory(Uri.parse(`${rootUri}/${inputResult}/`));
    // 	// console.log(folder);
    // 	// workspace.fs.
    // 	// Component.tsx 파일 생성
    // 	// workspace.fs.cre
    // 	workspace.fs.writeFile(Uri.parse(`${rootUri}/${inputResult}/${inputResult}.tsx`), Buffer.from(
    // 		'let a:number = true;\n console.log(a);'
    // 	));
    // }));
    context.subscriptions.push(vscode_1.commands.registerCommand('reactcomponentgenerator.toggle', async () => {
        // 컴포넌트 이름 입력받기
        const inputResult = await (0, basicInput_1.showInputBox)();
        // 현재 선택한 폴더 클립보드에 복사
        await vscode_1.commands.executeCommand('copyFilePath');
        const folder = await vscode_1.env.clipboard.readText();
        if (inputResult && folder) {
            await vscode_1.workspace.fs.createDirectory(vscode_1.Uri.parse(`${folder}/${inputResult}/`));
            // 컴포넌트.tsx 파일
            await vscode_1.workspace.fs.writeFile(vscode_1.Uri.parse(`${folder}/${inputResult}/${inputResult}.tsx`), Buffer.from(`import './${inputResult}.style.ts';\n` +
                `\n` +
                `interface ${inputResult}Props {\n` +
                `  \n` +
                `} \n` +
                `\n` +
                `const ${inputResult} = ({\n` +
                `	 \n` +
                `}: ${inputResult}Props) => {\n` +
                `	return (\n` +
                `		<>\n` +
                `      \n` +
                `		</>\n` +
                `	);\n` +
                `}\n` +
                `\n` +
                `export default ${inputResult};\n`));
            // 컴포넌트.style.ts 파일
            await vscode_1.workspace.fs.writeFile(vscode_1.Uri.parse(`${folder}/${inputResult}/${inputResult}.style.ts`), Buffer.from(`import styled from 'styled-components';\n` +
                `\n` +
                `export const Styled${inputResult} = styled.div\`\n` +
                `  \n` +
                `\`;\n`));
            // index.ts 파일
            await vscode_1.workspace.fs.writeFile(vscode_1.Uri.parse(`${folder}/${inputResult}/index.ts`), Buffer.from(`export { default } from './${inputResult}';\n`));
        }
    }));
}
exports.activate = activate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map