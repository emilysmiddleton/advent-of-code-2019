import test from 'ava';
import { parseMoon } from '../../src/day12/parser';
import { applyGravity } from '../../src/day12/moon';

test('Apply gravity first moon lower x', t => {
    const moon1 = parseMoon('Ganymede', '<x=12, y=10, z=8>');
    const moon2 = parseMoon('Callisto', '<x=14, y=4, z=5>');
    applyGravity(moon1, moon2, 'x');
    t.deepEqual(moon1.velocity, { x: 1, y: 0, z: 0 });
    t.deepEqual(moon2.velocity, { x: -1, y: 0, z: 0 });
});

test('Apply gravity first moon higher x', t => {
    const moon1 = parseMoon('Ganymede', '<x=14, y=4, z=5>');
    const moon2 = parseMoon('Callisto', '<x=12, y=10, z=8>');
    applyGravity(moon1, moon2, 'x');
    t.deepEqual(moon1.velocity, { x: -1, y: 0, z: 0 });
    t.deepEqual(moon2.velocity, { x: 1, y: 0, z: 0 });
});
