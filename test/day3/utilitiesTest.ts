import test from 'ava';
import { findIntersections, getPath, indexOf, manhattenDistance, next } from '../../src/day3/utilities';

test('Manhatten distance lhs smaller', t => {
    t.is(manhattenDistance({ x: 2, y: 6 }, { x: 6, y: 12 }), 10);
});

test('Manhatten distance rhs smaller', t => {
    t.is(manhattenDistance({ x: 6, y: 12 }, { x: 2, y: 6 }), 10);
});

test('Next up', t => {
    const coord = { x: 2, y: 10 };
    t.deepEqual({ x: 2, y: 11 }, next(coord, 'U'));
});

test('Next down', t => {
    const coord = { x: 2, y: 10 };
    t.deepEqual({ x: 2, y: 9 }, next(coord, 'D'));
});

test('Next right', t => {
    const coord = { x: 2, y: 10 };
    t.deepEqual({ x: 3, y: 10 }, next(coord, 'R'));
});

test('Next left', t => {
    const coord = { x: 2, y: 10 };
    t.deepEqual({ x: 1, y: 10 }, next(coord, 'L'));
});

test('Path', t => {
    const coord = { x: 2, y: 10 };
    const operation = { direction: 'U', length: 5 };
    const result = getPath(coord, operation);
    t.deepEqual(result, [
        { x: 2, y: 11 },
        { x: 2, y: 12 },
        { x: 2, y: 13 },
        { x: 2, y: 14 },
        { x: 2, y: 15 }
    ], JSON.stringify(result));
});

test('Intersections', t => {
    const coords1 = [
        { x: 2, y: 3 },
        { x: 4, y: 2 },
        { x: 5, y: 1 },
        { x: 2, y: 4 }
    ];
    const coords2 = [
        { x: 2, y: 99 },
        { x: 4, y: 2 },
        { x: 5, y: 1 },
        { x: 2, y: 99 }
    ];
    const result = findIntersections(coords1, coords2);
    t.deepEqual(result, [
        { x: 4, y: 2 },
        { x: 5, y: 1 }
    ], JSON.stringify(result));
});

test('index of for a coordinate object', t => {
    const coords = [
        { x: 2, y: 3 },
        { x: 4, y: 2 },
        { x: 5, y: 1 },
        { x: 2, y: 4 }
    ];
    t.is(0, indexOf(coords, { x: 2, y: 3 }));
    t.is(1, indexOf(coords, { x: 4, y: 2 }));
    t.is(2, indexOf(coords, { x: 5, y: 1 }));
    t.is(3, indexOf(coords, { x: 2, y: 4 }));
});
