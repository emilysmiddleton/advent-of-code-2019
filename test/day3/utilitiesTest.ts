import test from 'ava';
import { findIntersections, getPath, manhattenDistance, next } from '../../src/day3/utilities';

test('Manhatten distance lhs smaller', t => {
    t.is(manhattenDistance({ x: 2, y: 6, steps: 0 }, { x: 6, y: 12, steps: 0 }), 10);
});

test('Manhatten distance rhs smaller', t => {
    t.is(manhattenDistance({ x: 6, y: 12, steps: 0 }, { x: 2, y: 6, steps: 0 }), 10);
});

test('Next up', t => {
    const coord = { x: 2, y: 10, steps: 0 };
    t.deepEqual({ x: 2, y: 11, steps: 1 }, next(coord, 'U'));
});

test('Next down', t => {
    const coord = { x: 2, y: 10, steps: 0 };
    t.deepEqual({ x: 2, y: 9, steps: 1 }, next(coord, 'D'));
});

test('Next right', t => {
    const coord = { x: 2, y: 10, steps: 0 };
    t.deepEqual({ x: 3, y: 10, steps: 1 }, next(coord, 'R'));
});

test('Next left', t => {
    const coord = { x: 2, y: 10, steps: 0 };
    t.deepEqual({ x: 1, y: 10, steps: 1 }, next(coord, 'L'));
});

test('Path', t => {
    const coord = { x: 2, y: 10, steps: 0 };
    const operation = { direction: 'U', length: 5 };
    const result = getPath(coord, operation);
    t.deepEqual(result, [
        { x: 2, y: 11, steps: 1 },
        { x: 2, y: 12, steps: 2 },
        { x: 2, y: 13, steps: 3 },
        { x: 2, y: 14, steps: 4 },
        { x: 2, y: 15, steps: 5 }
    ], JSON.stringify(result));
});

test('Intersections', t => {
    const coords1 = [
        { x: 2, y: 3, steps: 0 },
        { x: 4, y: 2, steps: 0 },
        { x: 5, y: 1, steps: 0 },
        { x: 2, y: 4, steps: 0 }
    ];
    const coords2 = [
        { x: 2, y: 99, steps: 0 },
        { x: 4, y: 2, steps: 0 },
        { x: 5, y: 1, steps: 0 },
        { x: 2, y: 99, steps: 0 }
    ];
    const result = findIntersections(coords1, coords2);
    t.deepEqual(result, [
        { x: 4, y: 2, steps: 0 },
        { x: 5, y: 1, steps: 0 }
    ], JSON.stringify(result));
});
