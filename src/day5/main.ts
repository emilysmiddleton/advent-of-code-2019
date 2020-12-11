import * as Logger from 'bunyan';
import { Register } from '../intcode/register';
import { runProgram } from '../intcode/program';

export function parse(rawInputs: string[], _log: Logger): number[] {
    return rawInputs[0].split(',').map(n => Number.parseInt(n, 10));
}

export function run1(input: number[], _log: Logger): number {
    const reg = new Register(input);
    runProgram(reg, [1]);
    return reg.getOutput();
}

export function run2(input: number[], _log: Logger): number {
    const reg = new Register(input);
    runProgram(reg, [5]);
    return reg.getOutput();
}



