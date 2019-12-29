import { readFileSync } from 'fs';
import { createLogger } from 'bunyan';

const args = process.argv;
const day = args[2];
const part = args[3];
const inputPath = `./src/day${day}/input.txt`;
const func = `run${part}`;
const code = require(`./src/day${day}/main`);

const rawInputs = readFileSync(inputPath, { encoding: 'ascii' })
    .split('\n')
    .filter(value => value !== '');
const log = createLogger({ name: `AoC2019-${day}-${part}`, level: 'debug' });

const inputs = code.parse(rawInputs, log);
const answer = code[func](inputs, log);

log.info({ answer }, 'Answer');
