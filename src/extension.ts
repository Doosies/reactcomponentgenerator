import { commands, ExtensionContext, Uri, workspace, env } from 'vscode';
import { showInputBox } from './basicInput';


export function activate(context: ExtensionContext) {
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
	context.subscriptions.push(commands.registerCommand('reactcomponentgenerator.toggle', async () => {

		// 컴포넌트 이름 입력받기
		const inputResult = await showInputBox();

		// 현재 선택한 폴더 클립보드에 복사
		await commands.executeCommand('copyFilePath');
		const folder = await env.clipboard.readText();

		if (inputResult && folder) {
			await workspace.fs.createDirectory(Uri.parse(`${folder}/${inputResult}/`));

			// 컴포넌트.tsx 파일
			await workspace.fs.writeFile(Uri.parse(`${folder}/${inputResult}/${inputResult}.tsx`), Buffer.from(
				`import './${inputResult}.style.ts';\n` +
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
				`export default ${inputResult};\n`
			));

			// 컴포넌트.style.ts 파일
			await workspace.fs.writeFile(Uri.parse(`${folder}/${inputResult}/${inputResult}.style.ts`), Buffer.from(
				`import styled from 'styled-components';\n` +
				`\n` +
				`export const Styled${inputResult} = styled.div \`\n` +
				`  \n` +
				`\`\n`
			));

			// index.ts 파일
			await workspace.fs.writeFile(Uri.parse(`${folder}/${inputResult}/index.ts`), Buffer.from(
				`export { default } from './${inputResult}';\n`
			));
		}
	}));
}