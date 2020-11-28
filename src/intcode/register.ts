export class Register {
    private values: number[] = [];

    constructor(start: number[]) {
        this.values.push(...start);
    }

    /**
     * Reads that value at the given index.
     * If raw is true, return that, else
     * treat that as a further pointer.
     */
    public read(index: number, raw: boolean): number {
        const valueAtIndex = this.values[index];
        return raw ? valueAtIndex : this.values[valueAtIndex];
    }

    public write(index: number, value: number): void {
        const pointer = this.values[index];
        this.values[pointer] = value;
    }

}
