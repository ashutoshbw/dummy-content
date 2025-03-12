import { statSync } from 'node:fs';
import path from 'node:path';
import fs from 'node:fs/promises';

export function checkFileExists(filePath: string) {
  try {
    statSync(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function readFile(filePath: string) {
  if (checkFileExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  } else {
    console.error(`${path.basename(filePath)} does not exist`);
    process.exit(1);
  }
}
