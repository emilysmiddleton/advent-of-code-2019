import { ParameterMode, Register } from './register';

export interface Code {
    apply: (reg: Register, index: number) => void;
    getReadParameters: () => number;
    getTotalParameters: () => number;
    setModes: (modes: ParameterMode[]) => void;
    serialise: () => string;
}

export class Code1 implements Code {

    private modes: ParameterMode[];

    /**
     * [1, a, b, c] stores a + b at the space pointed to by c.
     */
    public apply(reg: Register, index: number): void {
        const a = reg.read(index + 1, this.modes[0]);
        const b = reg.read(index + 2, this.modes[1]);
        const c = reg.read(index + 3, 'Immediate');
        const result = a + b;
        reg.write(c, result);
    }

    public getReadParameters(): number {
        return 2;
    }

    public getTotalParameters(): number {
        return 3;
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
    public apply(reg: Register, index: number): void {
        const a = reg.read(index + 1, this.modes[0]);
        const b = reg.read(index + 2, this.modes[1]);
        const c = reg.read(index + 3, 'Immediate');
        const result = a * b;
        reg.write(c, result);
    }

    public getReadParameters(): number {
        return 2;
    }

    public getTotalParameters(): number {
        return 3;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '2 - ' + this.modes;
    }
}

export class Code3 implements Code {

    private input: number;
    constructor(input: number) {
        this.input = input;
    }

    /**
     * Opcode 3 takes a single integer as input and
     * saves it to the position given by its only parameter.
     * For example, the instruction 3,50 would take an
     * input value and store it at address 50.
     */
    public apply(reg: Register, index: number): number {
        const a = reg.read(index + 1, 'Immediate');
        reg.write(a, this.input);
        return index + 2;
    }

    public getReadParameters(): number {
        return 0;
    }

    public getTotalParameters(): number {
        return 1;
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

    public getTotalParameters(): number {
        return 1;
    }

    public setModes(modes: ParameterMode[]): void {
        this.modes = modes;
    }

    public serialise(): string {
        return '4 - ' + this.modes;
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

    public getTotalParameters(): number {
        return 0;
    }

    public setModes(_modes: ParameterMode[]): void {
        // N/A
    }

    public serialise(): string {
        return '99';
    }
}
