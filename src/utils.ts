export const sum = (accumulator, currentValue) => accumulator + currentValue;

export const min = (accumulator, currentValue) => accumulator < currentValue ? accumulator : currentValue;

export const max = (accumulator, currentValue) => accumulator > currentValue ? accumulator : currentValue;

export function zip<T>(array1: T[], array2: T): T[][] {
    const result = [];
    for (let i = 0; i < array1.length; i++) {
        result.push([array1[i], array2[i]]);
    }
    return result;
}

export function zipReduce<T>(array1: T[], array2: T, func: (t1: T, t2: T) => T): T[] {
    return zip(array1, array2).map(pair => func(pair[0], pair[1]));
}

export function greatestCommonDivisor(a: number, b: number): number {
    let divisor = Math.min(Math.abs(a), Math.abs(b));
    let dividend = Math.max(Math.abs(a), Math.abs(b));
    while (divisor > 0) {
        const prevDivisor = divisor;
        divisor = dividend % divisor;
        dividend = prevDivisor;
    }
    return dividend;
}
