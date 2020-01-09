import test from 'ava';
import { getBlockedCoordinates } from '../../src/day10/asteroids';

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
    const result = getBlockedCoordinates(a, b, 3, 6);
    t.deepEqual(result, [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
        { x: 1, y: 6 }
    ], JSON.stringify(result));
});
