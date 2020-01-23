import test from 'ava';
import { getInSight, getBlockedCoordinates, compare, getVaporiseOrder } from '../../src/day10/asteroids';
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

test('get smallest, example from site 1', t => {
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

test('sort different areas', t => {
    sortTest([
        { x: 0, y: -2 }, // 0
        { x: 2, y: -2 }, // 1
        { x: 2, y: 0 },  // 2
        { x: 2, y: 2 },  // 3
        { x: 0, y: 2 },  // 4
        { x: -2, y: 2 }, // 5
        { x: -2, y: 0 }, // 6
        { x: -2, y: -2 } // 7
    ], t);
});

test('sort x=0, y>0', t => {
    sortTest([
        { x: 0, y: 2 },
        { x: 0, y: 4 }
    ], t);
});

test('sort x=0, y<0', t => {
    sortTest([
        { x: 0, y: -2 },
        { x: 0, y: -4 }
    ], t);
});

test('sort y=0, x>0', t => {
    sortTest([
        { x: 2, y: 0 },
        { x: 4, y: 0 }
    ], t);
});

test('sort y=0, x<0', t => {
    sortTest([
        { x: -2, y: 0 },
        { x: -4, y: 0 }
    ], t);
});

test('sort x>0, y>0', t => {
    sortTest([
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 2 }
    ], t);
});

test('sort x>0, y<0', t => {
    sortTest([
        { x: 1, y: -2 },
        { x: 2, y: -2 },
        { x: 2, y: -1 }
    ], t);
});

test('sort x<0, y<0', t => {
    sortTest([
        { x: -2, y: -1 },
        { x: -2, y: -2 },
        { x: -1, y: -2 }
    ], t);
});

test('sort x<0, y>0', t => {
    sortTest([
        { x: -1, y: 2 },
        { x: -2, y: 2 },
        { x: -2, y: 1 }
    ], t);
});

function sortTest(ordered: Coordinate[], t: any): void {
    for (let i = 0; i < ordered.length; i++) {
        for (let j = 0; j < ordered.length; j++) {
            const result = compare(ordered[i], ordered[j]);
            const message = JSON.stringify(ordered[i]) + JSON.stringify(ordered[j]) + result;
            if (i < j) {
                t.true(result < 0, message);
            }
            if (i > j) {
                t.true(result > 0, message);
            }
            if (i === j) {
                t.is(result, 0, message);
            }
        }
    }
}

/**

 .#....###24...#..
 ##...##.13#67..9#
 ##...#...5.8####.
 ..#.....X...###..
 ..#.#.....#....##

 .#....###.....#..
 ##...##...#.....#
 ##...#......1234.
 ..#.....X...5##..
 ..#.9.....8....76

 .8....###.....#..
 56...9#...#.....#
 34...7...........
 ..2.....X....##..
 ..1..............

 ......23#.....#..
 ......1...#.....#
 .................
 ........X....##..
 .................
 */
test('Vaporise order', t => {
    const grid = parseGrid([
        '.#....#####...#..',
        '##...##.#####..##',
        '##...#...#.#####.',
        '..#.....#...###..',
        '..#.#.....#....##'
    ]);
    const toVaporise = getVaporiseOrder(grid);
    t.deepEqual(toVaporise, [
        { x: 8, y: 1 },
        { x: 9, y: 0 },
        { x: 9, y: 1 },
        { x: 10, y: 0 },
        { x: 9, y: 2 },
        { x: 11, y: 1 },
        { x: 12, y: 1 },
        { x: 11, y: 2 },
        { x: 15, y: 1 },

        { x: 12, y: 2 },
        { x: 13, y: 2 },
        { x: 14, y: 2 },
        { x: 15, y: 2 },
        { x: 12, y: 3 },
        { x: 16, y: 4 },
        { x: 15, y: 4 },
        { x: 10, y: 4 },
        { x: 4, y: 4 },

        { x: 2, y: 4 },
        { x: 2, y: 3 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 5, y: 2 },
        { x: 1, y: 0 },
        { x: 5, y: 1 },
        { x: 6, y: 1 },
        { x: 6, y: 0 },
        { x: 7, y: 0 }
    ]);
});
