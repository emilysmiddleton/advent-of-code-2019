export function validPasswordPart1(input: number): boolean {
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

export function validPasswordPart2(input: number): boolean {
    const digits = input.toString(10).split('').map(d => Number.parseInt(d, 10));
    let adjacentSame = false;
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > digits[i + 1]) {
            return false;
        }
        const rightSame = digits[i] === digits[i + 1];
        const leftDifferent = i === 0 || digits[i - 1] !== digits[i];
        const rightOfRightDifferent = i > digits.length - 2 || digits[i + 2] !== digits[i];
        adjacentSame = adjacentSame || (rightSame && leftDifferent && rightOfRightDifferent);
    }
    return adjacentSame;
}
