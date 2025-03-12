export type Config = {
  [key: string]: boolean | string | number | (string | number)[];
};

export function parseValue(value: string | boolean) {
  if (typeof value == 'string') {
    if (value == 'true') return true;
    if (value == 'false') return false;
    if (value.includes(',')) {
      return value
        .split(',')
        .map((v) => {
          const vTrimmed = v.trim();
          if (vTrimmed === '') return null;
          return isNaN(Number(vTrimmed)) ? vTrimmed : Number(vTrimmed);
        })
        .filter((v) => v !== null);
    } else {
      return isNaN(Number(value)) ? value : Number(value);
    }
  } else {
    return value;
  }
}

export function parseConfig(configStr: string, configFilename: string): Config {
  const lines = configStr.split('\n');
  const config: Config = Object.create(null);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line !== undefined && line.trim() !== '') {
      if (!/^\w+(-\w+)*\s*:[^:]*$/.test(line)) {
        console.error(`Syntax error on line ${i + 1} of ${configFilename}:`);
        console.error(line);
        process.exit(1);
      }
      const [key, value] = line.split(':').map((item) => item.trim());
      if (value == '') {
        console.error(`${configFilename}`);
        console.error(`  ${key} is missing value`);
        process.exit(1);
      }
      const parsedValue = parseValue(value!);
      config[key!] = parsedValue;
    }
  }

  return config;
}
