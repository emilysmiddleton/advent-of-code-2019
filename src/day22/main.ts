import * as Logger from 'bunyan';
import { parseShuffle } from './parser';
import { BigNumber } from 'bignumber.js';

import {
    modularInverse, normalise,
    repeat, shuffleCard,
    simplify
} from './shuffle';
import { Shuffle, SimplifiedShuffle } from './types';

export function parse(rawInputs: string[], _log: Logger): Shuffle[] {
    return rawInputs.map(parseShuffle);
}

export function run1(shuffles: Shuffle[], _log: Logger): BigNumber {
    const size = new BigNumber(10007);
    const shuffle = simplify(size, shuffles);
    return shuffleCard(size, shuffle, new BigNumber(2019));
}

export function run2(shuffles: Shuffle[], _log: Logger): BigNumber {
    const size = new BigNumber(119315717514047);
    const repeats = 101741582076661;
    const shuffle = simplify(size, shuffles);
    const repeated = repeat(size, shuffle, repeats);
    return inverse(size, repeated, new BigNumber(2020));
}

function inverse(size: BigNumber, shuffle: SimplifiedShuffle, index: BigNumber): BigNumber {
    const inverse = new BigNumber(modularInverse(shuffle.multiply.toNumber(), size.toNumber()));
    const prevIndex = index.minus(shuffle.add).times(new BigNumber(inverse));
    return normalise(size, prevIndex);
}



