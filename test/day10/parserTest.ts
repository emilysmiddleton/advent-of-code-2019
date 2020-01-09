import test from 'ava';
import { parseGrid, parseRow } from '../../src/day10/parser';

test('parse line to boolean array',  t => {
    const line = '.#..#';
    t.deepEqual(parseRow(line), [false, true, false, false, true]);
});

test('parse input to asteroid grid',  t => {
    const input = [
        '.#..#',
        '.....',
        '#####',
        '....#',
        '...##'
    ];
    t.deepEqual(parseGrid(input), [
        [false, true, false, false, true],
        [false, false, false, false, false],
        [true, true, true, true, true],
        [false, false, false, false, true],
        [false, false, false, true, true]
    ]);
});
