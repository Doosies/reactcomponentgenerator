(()=>{"use strict";var e={722:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.showInputBox=void 0;const n=r(496);t.showInputBox=async function(){return await n.window.showInputBox({value:"",placeHolder:"컴포넌트의 이름을 입력!",validateInput:e=>{if(!new RegExp(/^[A-Z][A-Za-z0-9]{0,}$/).test(e))return e}})}},496:e=>{e.exports=require("vscode")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=void 0;const t=r(496),o=r(722);e.activate=function(e){e.subscriptions.push(t.commands.registerCommand("reactcomponentgenerator.toggle",(async()=>{const e=await(0,o.showInputBox)();await t.commands.executeCommand("copyFilePath");const r=await t.env.clipboard.readText();e&&r&&(await t.workspace.fs.createDirectory(t.Uri.parse(`${r}/${e}/`)),await t.workspace.fs.writeFile(t.Uri.parse(`${r}/${e}/${e}.tsx`),Buffer.from(`import './${e}.style.ts';\n\ninterface ${e}Props {\n  \n} \n\nconst ${e} = ({\n\t \n}: ${e}Props) => {\n\treturn (\n\t\t<>\n      \n\t\t</>\n\t);\n}\n\nexport default ${e};\n`)),await t.workspace.fs.writeFile(t.Uri.parse(`${r}/${e}/${e}.style.ts`),Buffer.from(`import styled from 'styled-components';\n\nexport const Styled${e} = styled.div\`\n  \n\`;\n`)),await t.workspace.fs.writeFile(t.Uri.parse(`${r}/${e}/index.ts`),Buffer.from(`export { default } from './${e}';\n`)))})))}})(),module.exports=n})();