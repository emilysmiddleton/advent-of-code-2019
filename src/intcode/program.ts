import { Register } from './register';
import { Code, Code1, Code2, Code3, Code4, Code99 } from './codes';
import * as fs from 'fs';

export function runProgram(reg: Register, fixed?: number): void {
    const timestamp = new Date().toISOString();
    let index = 0;
    while (index >= 0) {
        fs.appendFileSync(`output/run_${timestamp}.txt`, reg.serialise() + '\n');
        const opCode = reg.read(index, 'Immediate');
        if (opCode === 99) {
            index = -1;
        } else {
            if (reg.getActualOutput() !== 0) {
                console.log('Fault found ' + reg.getActualOutput());
                index = -1;
            } else {
                fs.appendFileSync(`output/run_${timestamp}.txt`, index + ' ' + opCode + '\n');
                const code = getCode(fixed || -1, opCode);
                code.apply(reg, index);
                index += code.getTotalParameters() + 1;
            }
        }
    }
    fs.appendFileSync(`output/run_${timestamp}.txt`, reg.serialise() + '\n');
}

export function getCode(input: number, opCode: number): Code {
    const asString = '0'.repeat(10) + opCode.toString(10);
    const baseCode = getBaseCode(input, asString.slice(-2));
    const modes =
        asString.substring(asString.length - 2 - baseCode.getReadParameters(), asString.length - 2)
            .split('')
            .reverse()
            .map(mode => mode === '0' ? 'Position' : 'Immediate');
    baseCode.setModes(modes);
    return baseCode;
}

export

function getBaseCode(input: number, opCode: string): Code {
    switch (opCode) {
        case '01':
            return new Code1();
        case '02':
            return new Code2();
        case '03':
            return new Code3(input);
        case '04':
            return new Code4();
        case '99':
            return new Code99();
        default:
            throw new Error('Unknown code ' + opCode);
    }
}


