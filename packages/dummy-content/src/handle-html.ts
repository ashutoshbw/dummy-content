import path from 'node:path';
import { readFile } from './utils';
import fs from 'node:fs/promises';
import { parse } from 'node-html-parser';
import { checkFileExists } from './utils';

function htmlTemplate(content: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dummy Content</title>
  </head>
  <body>${content}</body>
</html>\n`;
}

export async function createOrFillHtml(
  id: string,
  filename: string,
  content: string,
) {
  const filePath = path.join(process.cwd(), filename);

  if (id !== '') {
    const htmlString = await readFile(filePath);
    const root = parse(htmlString);

    const element = root.getElementById(id);

    if (element === null) {
      console.warn(`No element found of id '${id}' in '${filename}'`);
      return;
    }

    element.innerHTML = content;

    const result =
      htmlString.slice(0, element.range[0]) +
      element.outerHTML +
      htmlString.slice(element.range[1]);

    await fs.writeFile(filePath, result);
    console.log(`${filename} is filled`);
  } else {
    const fileExists = checkFileExists(filePath);
    await fs.writeFile(filePath, htmlTemplate(content));
    console.log(`${filename} is ${fileExists ? 'replaced' : 'created'}`);
  }
}
