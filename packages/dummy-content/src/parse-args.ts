import { parseArgs as pa, type ParseArgsConfig } from 'node:util';
import { parseValue, type Config } from './conf-file-parser';
import { defaultConfig } from './config';

const argsConfig: ParseArgsConfig = {
  options: {
    config: { type: 'string', short: 'c' },
    help: { type: 'boolean', short: 'h' },
    version: { type: 'boolean', short: 'v' },
    format: { type: 'string' },
    output: { type: 'string' },
    copy: { type: 'boolean' },
    'intro-words-per-sentence': { type: 'string' },
    'intro-sentences-per-paragraph': { type: 'string' },
    'intro-paragraphs': { type: 'string' },
    sections: { type: 'string' },
    'words-per-sentence': { type: 'string' },
    'sentences-per-paragraph': { type: 'string' },
    paragraphs: { type: 'string' },
    'words-per-heading': { type: 'string' },
    emptyness: { type: 'string' },
    deepness: { type: 'string' },
    'start-h-level': { type: 'string' },
    'no-numbering': { type: 'boolean' },
    id: { type: 'string' },
    type: { type: 'string' },
  },
  allowPositionals: false,
};

export type OtherArgs = {
  [key: string]: boolean | string;
};

export function parseArgs() {
  try {
    const args = pa(argsConfig).values;
    const dummyContentArgs: Config = {};
    const otherArgs: OtherArgs = {};

    const dummyContentOptionNames = Object.keys(defaultConfig);

    for (const [key, value] of Object.entries(args)) {
      if (typeof value == 'string') {
        if (dummyContentOptionNames.includes(key)) {
          const parsedValue = parseValue(value);
          dummyContentArgs[key] = parsedValue;
        } else if (key == 'config') {
          otherArgs[key] = value;
        }
        if (value.trim() == '') {
          let shortKeyString = argsConfig.options?.[key]?.short;
          if (shortKeyString) shortKeyString = `-${shortKeyString}, `;
          else shortKeyString = '';
          console.error(
            `Option '${shortKeyString}--${key} <value>' expects an non-empty value. Received '${value}'`,
          );
          process.exit(1);
        }
      } else if (typeof value == 'boolean') {
        if (key == 'no-numbering') {
          dummyContentArgs[key] = value;
        } else otherArgs[key] = value;
      }
    }

    return { dummyContentArgs, otherArgs };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
      console.error(error);
    }
    process.exit(1);
  }
}
