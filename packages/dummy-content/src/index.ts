#!/usr/bin/env node

import path from 'node:path';
import { readFile, checkFileExists } from './utils';
import fs from 'node:fs/promises';
import clipboard from 'clipboardy';
import { parseConfig } from './conf-file-parser';
import { type DummyContentConfig, defaultConfig } from './config';
import { validateConfig } from './config-validator';
import { parseArgs } from './parse-args';
import { dummyContentMaker } from './content-maker';
import { createOrFillHtml } from './handle-html';
import { showHelp } from './help';
import { showVersion } from './version';

const { dummyContentArgs, otherArgs } = parseArgs();
let configFileData: DummyContentConfig = {};

if (otherArgs.help === true) {
  showHelp();
  process.exit(0);
} else if (otherArgs.version == true) {
  showVersion();
  process.exit(0);
}

if (typeof otherArgs.config == 'string') {
  if (otherArgs.config.endsWith('.conf')) {
    const configFilename = otherArgs.config;
    const content = await readFile(path.join(process.cwd(), configFilename));
    const parsedConfig = parseConfig(content, configFilename);
    const validationOfConfigFile = validateConfig(parsedConfig, configFilename);
    if (validationOfConfigFile.success) {
      configFileData = validationOfConfigFile.data;
    } else {
      console.error(validationOfConfigFile.message);
      process.exit(1);
    }
  } else {
    console.error(
      `Option '-c, --config' expects a '.conf' file. Received '${otherArgs.config}'`,
    );
    process.exit(1);
  }
}

const validationOfArgs = validateConfig(dummyContentArgs);

if (validationOfArgs.success) {
  const mergedConfig: Required<DummyContentConfig> = {
    ...defaultConfig,
    ...configFileData,
    ...validationOfArgs.data,
  };

  let resolvedFormat = mergedConfig.format;
  if (mergedConfig.output !== '') {
    const outputExension = mergedConfig.output.match(/\.(\w+)$/)?.[1];
    if (outputExension) {
      if (outputExension == 'md' || outputExension == 'mdx')
        resolvedFormat = 'md';
      else resolvedFormat = outputExension;
    }
  }
  mergedConfig.format = resolvedFormat;

  const content = dummyContentMaker(mergedConfig).trim();

  if (mergedConfig.output.endsWith('.html')) {
    await createOrFillHtml(mergedConfig.id, mergedConfig.output, content);
  } else if (
    mergedConfig.output.endsWith('.md') ||
    mergedConfig.output.endsWith('.mdx')
  ) {
    const filePath = path.join(process.cwd(), mergedConfig.output);
    const fileExists = checkFileExists(filePath);
    await fs.writeFile(filePath, content + '\n');
    console.log(
      `${mergedConfig.output} is ${fileExists ? 'replaced' : 'created'}`,
    );
  } else if (otherArgs.copy === true) {
    clipboard.writeSync(content);
    console.log('✔ Copied');
  } else {
    console.log(content);
  }
} else {
  console.error(validationOfArgs.message);
  process.exit(1);
}
