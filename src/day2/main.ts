import * as Logger from 'bunyan';
import { runProgram } from '../intcode/program';
import { Register } from '../intcode/register';

export function parse(rawInputs: string[], _log: Logger): number[] {
    return rawInputs[0].split(',').map(n => Number.parseInt(n, 10));
}

export function run1(input: number[], _log: Logger): number {
    // replace position 1 with the value 12 and replace position 2 with the value 2
    input[1] = 12;
    input[2] = 2;
    const reg = new Register(input);
    runProgram(reg);
    return reg.getOutput();
}

export function run2(input: number[], _log: Logger): number {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const newInput = [...input];
            newInput[1] = noun;
            newInput[2] = verb;
            const reg = new Register(newInput);
            runProgram(reg);
            if (reg.getOutput() === 19690720) {
                return (100 * noun) + verb;
            }
        }
    }
    return -1;
}



