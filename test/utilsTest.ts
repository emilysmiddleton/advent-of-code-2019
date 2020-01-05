import test from 'ava';
import { sum, min } from '../src/utils';

test('Sum function', t => {
    t.is(10, [1, 2, 3, 4].reduce(sum));
});

test('Min function', t => {
    t.is(-2, [10, 5, 7, -2, 0, 4].reduce(min));
});
