import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', '..', 'package.json');
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

export function showVersion() {
  console.log(`${'dummy-content v' + packageJson.version}`);
}
