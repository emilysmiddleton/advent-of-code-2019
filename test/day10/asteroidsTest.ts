import test from 'ava';
import { getInSight, getBlockedCoordinates } from '../../src/day10/asteroids';
import { parseGrid } from '../../src/day10/parser';
import { max } from '../../src/utils';

/**
 * B blocks A from the points marked X
 * .A.
 * ...
 * .B.
 * .X.
 * .X.
 * .X.
 */
test('blockers in straight vertical line', t => {
    const grid = parseGrid([
        '.#.',
        '...',
        '.#.',
        '...',
        '...',
        '...'
    ]);
    const a = { x: 1, y: 0 };
    const b = { x: 1, y: 2 };
    const result = getBlockedCoordinates(grid, a, b);
    t.deepEqual(result, [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ], JSON.stringify(result));
});

/**
 * B blocks A from the points marked X
 * .......
 * .A.BXXX
 * .......
 */
test('blockers in straight horizonal line', t => {
    const grid = parseGrid(['.......', '.#.#...', '.......']);
    const a = { x: 1, y: 1 };
    const b = { x: 3, y: 1 };
    const result = getBlockedCoordinates(grid, a, b);
    t.deepEqual(result, [
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 6, y: 1 }
    ], JSON.stringify(result));
});

/**
 * B blocks A from the points marked X
 * A...
 * .B..
 * ..X.
 * ...X
 */
test('blockers in diagonal line', t => {
    const grid = parseGrid(['#...', '.#..', '....', '....']);
    const a = { x: 0, y: 0 };
    const b = { x: 1, y: 1 };
    const result = getBlockedCoordinates(grid, a, b);
    t.deepEqual(result, [
        { x: 2, y: 2 },
        { x: 3, y: 3 }
    ], JSON.stringify(result));
});

/**
 * B blocks A from the points marked X
 * A......
 * ..B....
 * ....X..
 * ......X
 */
test('blockers at other gradient', t => {
    const grid = parseGrid(['#......', '..#....', '.......', '.......']);
    const a = { x: 0, y: 0 };
    const b = { x: 2, y: 1 };
    const result = getBlockedCoordinates(grid, a, b);
    t.deepEqual(result, [
        { x: 4, y: 2 },
        { x: 6, y: 3 }
    ], JSON.stringify(result));
});

/**
 * Expected counts:
 * .7..7
 * .....
 * 67775
 * ....7
 * ...87
 */
test('count asteroids in sight', t => {
    const grid = parseGrid([
        '.#..#',
        '.....',
        '#####',
        '....#',
        '...##'
    ]);
    t.is(getInSight(grid, grid.asteroids[0]).length, 7);
    t.is(getInSight(grid, grid.asteroids[1]).length, 7);
    t.is(getInSight(grid, grid.asteroids[2]).length, 6);
    t.is(getInSight(grid, grid.asteroids[3]).length, 7);
    t.is(getInSight(grid, grid.asteroids[4]).length, 7);
    t.is(getInSight(grid, grid.asteroids[5]).length, 7);
    t.is(getInSight(grid, grid.asteroids[6]).length, 5);
    t.is(getInSight(grid, grid.asteroids[7]).length, 7);
    t.is(getInSight(grid, grid.asteroids[8]).length, 8);
    t.is(getInSight(grid, grid.asteroids[9]).length, 7);
});

test.only('get smallest, example from site 1', t => {
    const grid = parseGrid([
        '......#.#.',
        '#..#.#....',
        '..#######.',
        '.#.#.###..',
        '.#..#.....',
        '..#....#.#',
        '#..#....#.',
        '.##.#..###',
        '##...#..#.',
        '.#....####'
    ]);
    const counts = grid.asteroids.map(a => getInSight(grid, a).length);
    t.is(counts.reduce(max), 33);
});
