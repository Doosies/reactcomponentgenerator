import { window } from 'vscode';

export async function showInputBox() {
	return await window.showInputBox({
		value: '',
		placeHolder: '컴포넌트의 이름을 입력!',
		validateInput: text => {
			const reg: RegExp = /^[A-Z][A-Za-z0-9]{0,}$/;
			const passReg = new RegExp(reg).test(text);
			if (!passReg) {
				return text;
			}
		}
	});
}
