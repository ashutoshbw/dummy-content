import path from 'node:path';
import { readFile } from './utils';
import fs from 'node:fs/promises';
import { checkFileExists } from './utils';
import * as htmlparser2 from 'htmlparser2';
import pc from 'picocolors';

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

    let tagName: string | null = null;
    let startIndex: number | null = null;
    let endIndex: number | null = null;
    let endTagFound = false;
    let innerElements = 0;
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        if (attributes.id === id) {
          tagName = name;
          // parser startIndex and endIndex reference: https://github.com/fb55/htmlparser2/issues/1224#issuecomment-1166629597
          startIndex = parser.endIndex + 1;
        } else if (
          name === tagName &&
          startIndex !== null &&
          endTagFound == false
        ) {
          innerElements++;
        }
      },
      onclosetag(name) {
        if (name === tagName) {
          if (startIndex !== null && endTagFound == false) {
            if (innerElements === 0) {
              endIndex = parser.startIndex;
              endTagFound = true;
            } else innerElements--;
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
      if (tagName === null) {
        console.warn(`No element found of id '${id}' in '${filename}'`);
      } else {
        console.error(
          `Unknown problem reading the HTML. Please open an issue at ${pc.blue(pc.underline('https://github.com/ashutoshbw/dummy-content/issues'))}`,
        );
        process.exit(1);
      }
    }
  } else {
    const fileExists = checkFileExists(filePath);
    await fs.writeFile(filePath, htmlTemplate(content));
    console.log(`${filename} is ${fileExists ? 'replaced' : 'created'}`);
  }
}
