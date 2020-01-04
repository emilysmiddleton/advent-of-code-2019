import test from 'ava';
import { parsePathOperation } from '../../src/day3/parser';

test('Up single digit', t => {
    const parsed = parsePathOperation('U2');
    t.deepEqual(parsed, { direction: 'U', length: 2 });
});

test('Right double digits', t => {
    const parsed = parsePathOperation('R27');
    t.deepEqual(parsed, { direction: 'R', length: 27 });
});
