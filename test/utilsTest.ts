import test from 'ava';
import { sum, min, zipReduce, greatestCommonDivisor } from '../src/utils';

test('Sum function', t => {
    t.is(10, [1, 2, 3, 4].reduce(sum));
});

test('Min function', t => {
    t.is(-2, [10, 5, 7, -2, 0, 4].reduce(min));
});

test('Zip function', t => {
    const array1 = [1, 2, 3, 4];
    const array2 = [4, 1, 8, 9];
    t.deepEqual(zipReduce(array1, array2, min), [1, 1, 3, 4]);
    t.deepEqual(zipReduce(array1, array2, sum), [5, 3, 11, 13]);
});

test('Greatest common divisor, first number bigger', t => {
    t.is(greatestCommonDivisor(4, 0), 4);
    t.is(greatestCommonDivisor(9, 3), 3);
    t.is(greatestCommonDivisor(9, 6), 3);
    t.is(greatestCommonDivisor(11, 3), 1);
});

test('Greatest common divisor, second number bigger', t => {
    t.is(greatestCommonDivisor(4, 0), 4);
    t.is(greatestCommonDivisor(9, 3), 3);
    t.is(greatestCommonDivisor(9, 6), 3);
    t.is(greatestCommonDivisor(11, 3), 1);
});

test('Greatest common divisor, negative', t => {
    t.is(greatestCommonDivisor(4, -2), 2);
});
