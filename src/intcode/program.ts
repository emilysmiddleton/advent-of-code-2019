import { Register } from './register';
import { getCode } from './codes';

export function runProgram(input: number[]): Register {
    const reg = new Register(input);
    let index = 0;
    while (index >= 0) {
        const code = getCode(reg, index);
        index = code.apply(reg, index);
    }
    return reg;
}

