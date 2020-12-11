import * as Logger from 'bunyan';
import { Register } from '../intcode/register';
import { runProgram } from '../intcode/program';

export function parse(rawInputs: string[], _log: Logger): number[] {
    return rawInputs[0].split(',').map(n => Number.parseInt(n, 10));
}

export function run1(input: number[], _log: Logger): number {
    let max = 0;
    for (const phase of getCombos()) {
        const outputA = run(input, [0, phase.a]);
        const outputB = run(input, [outputA, phase.b]);
        const outputC = run(input, [outputB, phase.c]);
        const outputD = run(input, [outputC, phase.d]);
        const outputE = run(input, [outputD, phase.e]);
        max = Math.max(max, outputE);
    }
    return max;
}

export function run2(input: number[], _log: Logger): number {
    const reg = new Register(input);
    runProgram(reg, [5]);
    return reg.getOutput();
}

type Phases = {
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
};

function run(program: number[], inputs: number[]): number {
    const reg = new Register(program);
    runProgram(reg, inputs);
    return reg.getOutput();
}

function getCombos(): Phases[] {
    const combos = [];
    for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
            for (let c = 0; c < 5; c++) {
                for (let d = 0; d < 5; d++) {
                    for (let e = 0; e < 5; e++) {
                        const set = new Set<number>([a, b, c, d, e]);
                        if (set.size === 5) {
                            combos.push({ a, b, c, d, e });
                        }
                    }
                }
            }
        }
    }
    return combos;
}



