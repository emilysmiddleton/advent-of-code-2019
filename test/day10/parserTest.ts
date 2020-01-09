import test from 'ava';
import { parseGrid, parseRow } from '../../src/day10/parser';

test('parse line to boolean array', t => {
    const line = '.#..#';
    t.deepEqual(parseRow(line), [false, true, false, false, true]);
});

test('parse input to asteroid grid', t => {
    const input = [
        '.#..#.',
        '......',
        '#####.',
        '....#.',
        '...##.'
    ];
    const grid = parseGrid(input);
    t.is(grid.width, 6);
    t.is(grid.height, 5);
    t.deepEqual(grid.asteroids, [
        { x: 1, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 4 }
    ]);
});
