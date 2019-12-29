import test from 'ava';
import { BigNumber } from 'bignumber.js';
import {
    combine, compoundShuffle,
    modularInverse, repeat,
    shuffleCard
} from '../../src/day22/shuffle';

test('Deal into new stack is times -1 then minus 1', t => {
    const begin = {
        add: new BigNumber(10),
        multiply: new BigNumber(5)
    };
    const shuffle = {
        op: 'DNS'
    };
    t.deepEqual(compoundShuffle(begin, shuffle), {
        add: new BigNumber(-11),
        multiply: new BigNumber(-5)
    })
});

test('Deal with increment multiplies', t => {
    const begin = {
        add: new BigNumber(10),
        multiply: new BigNumber(5)
    };
    const shuffle = {
        op: 'DWI',
        param: 7
    };
    t.deepEqual(compoundShuffle(begin, shuffle), {
        add: new BigNumber(70),
        multiply: new BigNumber(35)
    })
});

test('Cut takes off add', t => {
    const begin = {
        add: new BigNumber(10),
        multiply: new BigNumber(5)
    };
    const shuffle = {
        op: 'CUT',
        param: 7
    };
    t.deepEqual(compoundShuffle(begin, shuffle), {
        add: new BigNumber(3),
        multiply: new BigNumber(5)
    })
});

test('Modula inverse', t => {
    t.is(modularInverse(8, 11), 7);
    t.is(modularInverse(3103, 10007), 1448);
});

test('Apply twice', t => {
    const size = new BigNumber(10);
    const shuffle = {
        multiply: new BigNumber(3),
        add: new BigNumber(2)
    };
    const twice = combine(size, shuffle, shuffle);
    t.deepEqual(twice, {
        multiply: new BigNumber(9),
        add: new BigNumber(8)
    });
    for (let i = 0; i < 10; i++) {
        const shuffledTwice = shuffleCard(size, shuffle, shuffleCard(size, shuffle, new BigNumber(i)));
        const simplified = shuffleCard(size, twice, new BigNumber(i));
        t.deepEqual(shuffledTwice, simplified);
    }
});

test('Combine shuffles', t => {
    const size = new BigNumber(10);
    const shuffle1 = {
        multiply: new BigNumber(3),
        add: new BigNumber(2)
    };
    const shuffle2 = {
        multiply: new BigNumber(8),
        add: new BigNumber(9)
    };
    const combined = combine(size, shuffle1, shuffle2);
    t.deepEqual(combined, {
        multiply: new BigNumber(4),
        add: new BigNumber(5)
    });
    for (let i = 0; i < 10; i++) {
        const shuffledTwice = shuffleCard(size, shuffle2, shuffleCard(size, shuffle1, new BigNumber(i)));
        const simplified = shuffleCard(size, combined, new BigNumber(i));
        t.deepEqual(shuffledTwice, simplified);
    }
});

test('Repeat shuffle 5 times', t => {
    const size = new BigNumber(17);
    const shuffle1 = {
        multiply: new BigNumber(3),
        add: new BigNumber(5)
    };
    const basicRepeat = combine(size, shuffle1, combine(size, shuffle1, combine(size, shuffle1, combine(size, shuffle1, shuffle1))));
    for (let i = 0; i < size.toNumber(); i++) {
        let result = new BigNumber(i);
        for (let j = 0; j < 5; j++) {
            result = shuffleCard(size, shuffle1, result);
        }
        t.deepEqual(result, shuffleCard(size, basicRepeat, new BigNumber(i)));
    }
    const quickRepeat = repeat(size, shuffle1, 5);
    t.deepEqual(basicRepeat, quickRepeat);
});
