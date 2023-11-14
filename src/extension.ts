/** @format */

import { commands, ExtensionContext, window } from "vscode";
import { showInputBox } from "./basicInput";
import * as fs from "fs";
import * as path from "path";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("reactcomponentgenerator.toggle", async (e) => {
      // 루트경로
      const rootPath = e.fsPath;

      // 컴포넌트 이름 입력받기
      const componentName = await showInputBox();
      // 파일 생성될 경로
      const filePath = `${rootPath}/${componentName}`;

      if (componentName) {
        // 폴더생성
        fs.mkdirSync(filePath);
        // component.tsx파일 생성
        fs.writeFileSync(
          `${filePath}/${componentName}.tsx`,
          addSnippet("reactts", componentName)
        );
        // component.style.ts 파일 생성
        // fs.writeFileSync(
        //   `${filePath}/${componentName}.style.ts`,
        //   addSnippet("style", componentName)
        // );
        // index.ts파일 생성
        fs.writeFileSync(
          `${filePath}/index.ts`,
          addSnippet("index", componentName)
        );

        window.showInformationMessage(
          componentName + " 컴포넌트 생성 완료 !! "
        );
      } else {
        window.showInformationMessage("컴포넌트 이름을 입력해주세요.");
      }
    })
  );
}

function addSnippet(snippetType: string, componentName: string) {
  const snippetsPath = path.join(__dirname, "./snippets/");
  const json = JSON.parse(
    fs.readFileSync(snippetsPath + "snippets.json").toString()
  );
  let body = json[snippetType].body;

  // 만약 존재할 경우
  if (body.length) {
    body = body
      .join("\r\n")
      .split(/(?<!\\)\$componentName/gm)
      .join(componentName);
    return body;
  }
  // 존재하지 않을 경우
  else {
    return "";
  }
}
