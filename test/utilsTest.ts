import test from 'ava';
import { sum } from '../src/utils';

test('Sum function', t => {
    t.is(10, [1, 2, 3, 4].reduce(sum));
});
