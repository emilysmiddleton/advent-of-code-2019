import * as Logger from 'bunyan';
import { runProgram } from '../intcode/program';

export function parse(rawInputs: string[], _log: Logger): number[] {
    return rawInputs[0].split(',').map(n => Number.parseInt(n, 10));
}

export function run1(input: number[], _log: Logger): number {
    // replace position 1 with the value 12 and replace position 2 with the value 2
    input[1] = 12;
    input[2] = 2;
    const reg = runProgram(input);
    return reg.read(0, true);
}

export function run2(input: number[], _log: Logger): string {
    runProgram(input);
    return '';
}



