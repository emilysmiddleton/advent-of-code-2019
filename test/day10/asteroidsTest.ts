import test from 'ava';
import { getInSight, getBlockedCoordinates } from '../../src/day10/asteroids';
import { createGrid } from '../../src/coordinates';
import { getAsteroids, parseGrid } from '../../src/day10/parser';

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
    const a = { x: 1, y: 0 };
    const b = { x: 1, y: 2 };
    const grid = createGrid(3, 6);
    const result = getBlockedCoordinates(grid, a, b);
    t.deepEqual(result, [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ], JSON.stringify(result));
    // exact same object
    t.is(result[0], grid[3][1]);
});

/**
 * B blocks A from the points marked X
 * .......
 * .A.BXXX
 * .......
 */
test('blockers in straight horizonal line', t => {
    const a = { x: 1, y: 1 };
    const b = { x: 3, y: 1 };
    const grid = createGrid(7, 3);
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
    const a = { x: 0, y: 0 };
    const b = { x: 1, y: 1 };
    const grid = createGrid(4, 4);
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
    const a = { x: 0, y: 0 };
    const b = { x: 2, y: 1 };
    const grid = createGrid(7, 4);
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
test.only('count asteroids in sight', t => {
    const asteroidGrid = parseGrid([
        '.#..#',
        '.....',
        '#####',
        '....#',
        '...##'
    ]);
    const grid = createGrid(5, 5);
    // List of asteroids
    const asteroids = getAsteroids(asteroidGrid, grid);
    t.is(getInSight(grid, asteroids, asteroids[0]).length, 7);
    t.is(getInSight(grid, asteroids, asteroids[1]).length, 7);
    t.is(getInSight(grid, asteroids, asteroids[2]).length, 6);
    t.is(getInSight(grid, asteroids, asteroids[3]).length, 7);
    t.is(getInSight(grid, asteroids, asteroids[4]).length, 7);
    t.is(getInSight(grid, asteroids, asteroids[5]).length, 7);
    t.is(getInSight(grid, asteroids, asteroids[6]).length, 5);
    t.is(getInSight(grid, asteroids, asteroids[7]).length, 7);
    t.is(getInSight(grid, asteroids, asteroids[8]).length, 8);
    t.is(getInSight(grid, asteroids, asteroids[9]).length, 7);
});
