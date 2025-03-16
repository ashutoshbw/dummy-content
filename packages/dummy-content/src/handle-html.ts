import path from 'node:path';
import { readFile } from './utils';
import fs from 'node:fs/promises';
import { checkFileExists } from './utils';
import * as htmlparser2 from 'htmlparser2';

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

    let startIndex: number | null = null;
    let endIndex: number | null = null;
    let endTagFound = false;
    let innerDivs = 0;
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        if (name === 'div') {
          if (attributes.id === id) {
            // parser startIndex and endIndex reference: https://github.com/fb55/htmlparser2/issues/1224#issuecomment-1166629597
            startIndex = parser.endIndex + 1;
          } else if (endTagFound == false) {
            innerDivs++;
          }
        }
      },
      onclosetag(tagname) {
        if (tagname === 'div') {
          if (startIndex !== null && endTagFound == false) {
            if (innerDivs === 0) {
              endIndex = parser.startIndex;
              endTagFound = true;
            } else innerDivs--;
          }
        }
      },
    });
    parser.write(htmlString);
    parser.end();

    if (startIndex !== null && endIndex !== null) {
      const result =
        htmlString.slice(0, startIndex) + content + htmlString.slice(endIndex);
      await fs.writeFile(filePath, result);
      console.log(`${filename} is filled`);
    } else {
      console.warn(`No element found of id '${id}' in '${filename}'`);
    }
  } else {
    const fileExists = checkFileExists(filePath);
    await fs.writeFile(filePath, htmlTemplate(content));
    console.log(`${filename} is ${fileExists ? 'replaced' : 'created'}`);
  }
}
