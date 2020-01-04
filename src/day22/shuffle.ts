import { BigNumber } from 'bignumber.js';
import { Shuffle, SimplifiedShuffle } from './types';

export function simplify(size: BigNumber, shuffles: Shuffle[]): SimplifiedShuffle {
    let result = {
        multiply: new BigNumber(1),
        add: new BigNumber(0)
    };
    for (const shuffle of shuffles) {
        result = compoundShuffle(result, shuffle);
        result.add = normalise(size, result.add);
        result.multiply = normalise(size, result.multiply);
    }
    return result;
}

export function normalise(size: BigNumber, value: BigNumber): BigNumber {
    return value.mod(size)
        .plus(size)
        .mod(size);
}

export function compoundShuffle(current: SimplifiedShuffle, shuffle: Shuffle): SimplifiedShuffle {
    switch (shuffle.op) {
        case 'CUT': {
            return {
                add: current.add.minus(shuffle.param),
                multiply: current.multiply
            };
        }
        case 'DWI': {
            return {
                add: current.add.times(shuffle.param),
                multiply: current.multiply.times(shuffle.param)
            };
        }
        case 'DNS': {
            return {
                add: current.add.times(-1).minus(1),
                multiply: current.multiply.times(-1)
            };
        }
        default:
            throw new Error('Unknown operation ' + shuffle.op);
    }
}

export function modularInverse(a: number, m: number): number {
    let newModulo = m;
    let newValue = a;

    let y = 0;
    let x = 1;

    while (newValue > 1) {
        const quotient = Math.floor(newValue / newModulo);
        const remainder = newValue % newModulo;

        newValue = newModulo;
        newModulo = remainder;

        const prevX = x;
        x = y;
        y = prevX - quotient * y;
    }
    return x < 0 ? x + m : x;
}

export function shuffleCard(size: BigNumber, shuffle: SimplifiedShuffle, card: BigNumber): BigNumber {
    return card.times(new BigNumber(shuffle.multiply)).plus(new BigNumber(shuffle.add)).mod(size);
}

export function repeat(size: BigNumber, shuffle: SimplifiedShuffle, repeats: number): SimplifiedShuffle {
    const max = Math.floor(Math.log2(repeats)) + 1;
    const powerShuffles = powersOfTwo(size, shuffle, max);
    const binary = repeats.toString(2).split('').reverse();
    let combined = { multiply: new BigNumber(1), add: new BigNumber(0) };
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
            combined = combine(size, combined, powerShuffles[i]);
        }
    }
    return combined;
}

export function powersOfTwo(size: BigNumber, shuffle: SimplifiedShuffle, max: number): SimplifiedShuffle[] {
    const result = [shuffle];
    let last = shuffle;
    for (let i = 1; i < max; i++) {
        last = combine(size, last, last);
        result.push(last);
    }
    return result;
}

export function combine(size: BigNumber, shuffle1: SimplifiedShuffle, shuffle2: SimplifiedShuffle): SimplifiedShuffle {
    return {
        multiply: normalise(size, new BigNumber(shuffle1.multiply).times(new BigNumber(shuffle2.multiply))),
        add: normalise(size, new BigNumber(shuffle1.add).times(new BigNumber(shuffle2.multiply)).plus(new BigNumber(shuffle2.add)))
    };
}
