import { type Config } from './conf-file-parser';
import { contentTypes } from './content-types';
import { countOptions, type DummyContentConfig } from './config';

interface SuccessResult<T> {
  success: true;
  message: undefined;
  data: T;
}

interface FailureResult {
  success: false;
  message: string;
  data: unknown;
}

type ValidationResult<T> = SuccessResult<T> | FailureResult;

function isNonNegativeInteger(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n > -1;
}

// Overloads
function report<T>(
  success: true,
  message: undefined,
  data: T,
): SuccessResult<T>;
function report(
  success: false,
  message: string,
  data?: undefined,
): FailureResult;

// Implementation
function report<T>(
  success: boolean,
  message?: string,
  data?: T,
): ValidationResult<T> {
  if (success) {
    return { success: true, message: undefined, data } as SuccessResult<T>;
  } else {
    return {
      success: false,
      message: message,
      data: undefined,
    } as FailureResult;
  }
}

const numberErrorReport = (v: unknown, key: string, sourceString: string) =>
  report(
    false,
    `${sourceString}'${key}' expectes a non-negative integer. Received '${v}'`,
  );

function validateCount(
  count: unknown | unknown[],
  key: string,
  sourceString: string,
) {
  if (Array.isArray(count)) {
    if (count.length <= 2) {
      if (!isNonNegativeInteger(count[0]))
        return numberErrorReport(count[0], key, sourceString);
      if (!isNonNegativeInteger(count[1]))
        return numberErrorReport(count[1], key, sourceString);
      return report<number[]>(true, undefined, count);
    } else {
      return report(
        false,
        `${sourceString}'${key}' expectes one or two numbers. Received '${count}'`,
      );
    }
  } else {
    if (isNonNegativeInteger(count))
      return report<number>(true, undefined, count);
    else return numberErrorReport(count, key, sourceString);
  }
}

function isInZeroToOne(v: unknown) {
  return typeof v === 'number' && v >= 0 && v <= 1;
}

function validateOutput(v: unknown, sourceString: string) {
  const extensions = ['md', 'mdx', 'html'];
  if (Array.isArray(v)) {
    return report(
      false,
      `${sourceString}'output' expects a single .md, .mdx or .html file`,
    );
  } else {
    if (typeof v != 'string') {
      return report(
        false,
        `${sourceString}Invalid 'output' filename '${v}'. Supported extensions are .md, .mdx and .html`,
      );
    } else {
      if (!extensions.some((e) => v.endsWith(e))) {
        return report(
          false,
          `${sourceString}Invalid 'output' filename '${v}'. Supported extensions are .md, .mdx and .html`,
        );
      }
    }
  }
  return report<string>(true, undefined, v);
}

export function validateConfig(
  config: Config,
  source?: string,
): ValidationResult<DummyContentConfig> {
  const sourceString = source ? `${source}:\n  ` : '';
  for (const [key, value] of Object.entries(config)) {
    if (countOptions.includes(key)) {
      const reportResult = validateCount(value, key, sourceString);
      if (reportResult.success == false) return reportResult;
    } else if (key == 'format') {
      if (value != 'html' && value != 'md') {
        return report(
          false,
          `${sourceString}Expected 'format' to be html or md. Received '${value}'.`,
        );
      }
    } else if (key == 'emptyness' || key == 'deepness') {
      if (!isInZeroToOne(value)) {
        return report(
          false,
          `${sourceString}'${key}' expectes a number from between 0(inclusive) and 1(inclusive). Received '${value}'`,
        );
      }
    } else if (key == 'id') {
      if (!(typeof value === 'string' && /^[a-z]+((-|_)?\w*)*$/i.test(value))) {
        return report(
          false,
          `${sourceString}Invalid 'id' ${value}. Should match /^[a-z]+((-|_)?\\w*)*$/i`,
        );
      }
    } else if (key == 'start-h-level') {
      if (
        !(
          typeof value === 'number' &&
          Number.isInteger(value) &&
          value >= 1 &&
          value <= 6
        )
      ) {
        return report(
          false,
          `${sourceString}'${key}' expects a integer between 1(inclusive) and 6(inclusive). Received ${value}.`,
        );
      }
    } else if (key == 'no-numbering') {
      // nothing to do
    } else if (key == 'type') {
      if (
        !(typeof value == 'string' && Object.keys(contentTypes).includes(value))
      ) {
        const contentTypesInfo = Object.keys(contentTypes).map((t) => {
          return `${t}${contentTypes[t]?.description ? `: ${contentTypes[t].description}` : ''}`;
        });

        return report(
          false,
          `${sourceString}Unknown content 'type' ${value} received. Available values: \n- ${contentTypesInfo.join(
            '\n- ',
          )}`,
        );
      }
    } else if (key == 'output') {
      const reportResult = validateOutput(value, sourceString);
      if (!reportResult.success) return reportResult;
    } else {
      return report(false, `${sourceString}Unknown option ${key}.`);
    }
  }
  return report<DummyContentConfig>(true, undefined, config);
}
