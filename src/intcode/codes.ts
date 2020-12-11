import { ParameterMode, Register } from './register';

export interface Code {
    apply: (reg: Register, index: number) => number;
    getReadParameters: () => number;
    setModes: (modes: ParameterMode[]) => void;
    serialise: () => string;
}

export class Code1 implements Code {

    private modes: ParameterMode[];

    /**
     * [1, a, b, c] stores a + b at the space pointed to by c.
     */
    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);
        const b = reg.read(index + 2, this.modes[1]);
        const c = reg.read(index + 3, 'Immediate');
        const result = a + b;
        reg.write(c, result);
        return index + 4;
    }

    public getReadParameters(): number {
        return 2;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '1 - ' + this.modes;
    }

}

export class Code2 implements Code {

    private modes: ParameterMode[];

    /**
     * [1, a, b, c] stores a * b at c.
     */
    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);
        const b = reg.read(index + 2, this.modes[1]);
        const c = reg.read(index + 3, 'Immediate');
        const result = a * b;
        reg.write(c, result);
        return index + 4;
    }

    public getReadParameters(): number {
        return 2;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '2 - ' + this.modes;
    }
}

export class Code3 implements Code {

    private inputs: number[];
    constructor(inputs: number[]) {
        this.inputs = inputs;
    }

    /**
     * Opcode 3 takes a single integer as input and
     * saves it to the position given by its only parameter.
     * For example, the instruction 3,50 would take an
     * input value and store it at address 50.
     */
    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, 'Immediate');
        const input = this.inputs[0];
        this.inputs = this.inputs.slice(1);
        reg.write(a, input);
        return index + 2;
    }

    public getReadParameters(): number {
        return 0;
    }

    public setModes(_modes: ParameterMode[]): void {
        // N/A
    }

    public serialise(): string {
        return '3';
    }
}

/**
 * Opcode 4 outputs the value of its only parameter.
 * For example, the instruction 4,50 would output the value at address 50.
 */
export class Code4 implements Code {

    private modes: ParameterMode[];

    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);
        reg.setOutput(a);
        return index + 2;
    }

    public getReadParameters(): number {
        return 1;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '4 - ' + this.modes;
    }
}

/**
 * Opcode 5 is jump-if-true: if the first parameter is non-zero,
 * it sets the instruction pointer to the value from the second parameter.
 * Otherwise, it does nothing.
 */
export class Code5 implements Code {

    private modes: ParameterMode[];

    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);

        if (a === 0) {
            return index + 3;
        }
        return reg.read(index + 2, this.modes[1]);
    }

    public getReadParameters(): number {
        return 2;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '5 - ' + this.modes;
    }
}

/**
 * Opcode 6 is jump-if-false: if the first parameter is zero,
 * it sets the instruction pointer to the value from the second parameter.
 * Otherwise, it does nothing.
 */
export class Code6 implements Code {

    private modes: ParameterMode[];

    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);

        if (a === 0) {
            return reg.read(index + 2, this.modes[1]);
        }
        return index + 3;
    }

    public getReadParameters(): number {
        return 2;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '6 - ' + this.modes;
    }
}

/**
 * Opcode 7 is less than: if the first parameter is less than the second parameter,
 * it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
 */
export class Code7 implements Code {

    private modes: ParameterMode[];

    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);
        const b = reg.read(index + 2, this.modes[1]);
        const c = reg.read(index + 3, 'Immediate');
        reg.write(c, a < b ? 1 : 0);
        return index + 4;
    }

    public getReadParameters(): number {
        return 2;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '7 - ' + this.modes;
    }
}

/**
 * Opcode 8 is equals: if the first parameter is equal to the second parameter,
 * it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
 */
export class Code8 implements Code {

    private modes: ParameterMode[];

    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, this.modes[0]);
        const b = reg.read(index + 2, this.modes[1]);
        const c = reg.read(index + 3, 'Immediate');
        reg.write(c, a === b ? 1 : 0);
        return index + 4;
    }

    public getReadParameters(): number {
        return 2;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '8 - ' + this.modes;
    }
}

export class Code99 implements Code {

    /**
     * Exits the program.
     */
    public apply(_reg: Register, _index: number): number {
        return -1;
    }

    public getReadParameters(): number {
        return 0;
    }

    public setModes(_modes: ParameterMode[]): void {
        // N/A
    }

    public serialise(): string {
        return '99';
    }
}
