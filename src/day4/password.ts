export function validPassword(input: number): boolean {
    const digits = input.toString(10).split('').map(d => Number.parseInt(d, 10));
    let adjacentSame = false;
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > digits[i + 1]) {
            return false;
        }
        if (digits[i] === digits[i + 1]) {
            adjacentSame = true;
        }

    }
    return adjacentSame;
}
