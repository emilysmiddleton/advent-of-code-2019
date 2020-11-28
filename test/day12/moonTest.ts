import test from 'ava';
import { parseMoon, parseMoons } from '../../src/day12/parser';
import {
    applyGravity,
    applyGravityToAll, applyVelocityForAxis,
    applyVelocityToAll, kineticEnergy,
    potentialEnergy, totalEnergy
} from '../../src/day12/moon';

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

test('Apply velocity', t => {
    const moon = {
        name: 'Ganymede',
        position: { x: 1, y: 2, z: 3 },
        velocity: { x: -3, y: 4, z: 0 }
    };
    applyVelocityForAxis(moon, 'x');
    t.deepEqual(moon.position, { x: -2, y: 2, z: 3 });
});

test('Update', t => {
    const moons = parseMoons([
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>'
    ]);
    applyGravityToAll(moons);
    t.deepEqual(moons[0].velocity, { x: 3, y: -1, z: -1 });
    t.deepEqual(moons[1].velocity, { x: 1, y: 3, z: 3 });
    t.deepEqual(moons[2].velocity, { x: -3, y: 1, z: -3 });
    t.deepEqual(moons[3].velocity, { x: -1, y: -3, z: 1 });
    applyVelocityToAll(moons);
    t.deepEqual(moons[0].position, { x: 2, y: -1, z: 1 });
    t.deepEqual(moons[1].position, { x: 3, y: -7, z: -4 });
    t.deepEqual(moons[2].position, { x: 1, y: -7, z: 5 });
    t.deepEqual(moons[3].position, { x: 2, y: 2, z: 0 });
});

test('potential energy', t => {
    const moon = parseMoon('Io', '<x=2, y=-10, z=-7>');
    t.is(potentialEnergy(moon), 19);
});

test('kinetic energy', t => {
    const moon = {
        name: 'Io',
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 2, y: -10, z: -7 }
    };
    t.is(kineticEnergy(moon), 19);
});

test('total energy', t => {
    const moon = {
        name: 'Io',
        position: { x: -4, y: 5, z: 2 },
        velocity: { x: 2, y: -10, z: -7 }
    };
    t.is(totalEnergy(moon), 209);
});
