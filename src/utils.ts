export const sum = (accumulator, currentValue) => accumulator + currentValue;

export const min = (accumulator, currentValue) => accumulator < currentValue ? accumulator : currentValue;

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
