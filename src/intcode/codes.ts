import { Register } from './register';

export interface Code {
    apply: (reg: Register, index: number) => number;
}

export class Code1 implements Code {

    /**
     * [1, a, b, c] stores a + b at the space pointed to by c.
     */
    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, false);
        const b = reg.read(index + 2, false);
        const result = a + b;
        reg.write(index + 3, result);
        return index + 4;
    }
}

export class Code2 implements Code {

    /**
     * [1, a, b, c] stores a * b at c.
     */
    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, false);
        const b = reg.read(index + 2, false);
        const result = a * b;
        reg.write(index + 3, result);
        return index + 4;
    }
}

export class Code99 implements Code {

    /**
     * Exits the program.
     */
    public apply(_reg: Register, _index: number): number {
        return -1;
    }

}

const CODE_1 = new Code1();
const CODE_2 = new Code2();
const CODE_99 = new Code99();

export function getCode(reg: Register, index: number): Code {
    const opCode = reg.read(index, true);
    switch (opCode) {
        case 1:
            return CODE_1;
        case 2:
            return CODE_2;
        case 99:
            return CODE_99;
        default:
            throw new Error('Unknown code ' + opCode);
    }
}
