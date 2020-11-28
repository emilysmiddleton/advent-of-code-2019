import test from 'ava';
import { parseMoon } from '../../src/day12/parser';

test('parse moon', t => {
    const moon = parseMoon('Io', '<x=-1, y=0, z=12>');
    t.is(moon.name, 'Io');
    t.deepEqual(moon.position, { x: -1, y: 0, z: 12 });
    t.deepEqual(moon.velocity, { x: 0, y: 0, z: 0 });
});
