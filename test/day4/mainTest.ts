import test from 'ava';
import { parse } from '../../src/day4/main';

test('Parse a range', t => {
    const range = parse(['265275-781584'], null);
    t.is(265275, range.from);
    t.is(781584, range.to);
});
