export type ParameterMode = 'Position' | 'Immediate';

export class Register {
    private values: any = {};
    private output: number;

    constructor(start: number[]) {
        for (let i = 0; i < start.length; i++) {
            this.putValue(i, start[i]);
        }
    }

    /**
     * Reads that value at the given index.
     * If raw is true, return that, else
     * treat that as a further pointer.
     */
    public read(index: number, mode: ParameterMode): number {
        const valueAtIndex = this.getValue(index);
        return mode === 'Immediate' ? valueAtIndex : this.getValue(valueAtIndex);
    }

    public write(index: number, value: number): void {
        console.log(`write ${index} ${value}`);
        this.putValue(index, value);
    }

    public setOutput(value: number): void {
        this.output = value;
    }

    public getActualOutput(): number {
        return this.output || 0;
    }

    public getOutput(): number {
        return this.output || this.getValue(0);
    }

    public serialise(): string {
        return JSON.stringify(this.values);
    }

    private getValue(i: number): number {
        return this.values['v' + i];
    }

    private putValue(i: number, v: number): void {
        console.log(`v${i}=${v}`);
        if (i === undefined || v === undefined || isNaN(i) || isNaN(v)) {
            throw new Error('Invalid value');
        }
        this.values['v' + i] = v;
    }

}
