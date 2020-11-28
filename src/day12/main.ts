import * as Logger from 'bunyan';
import { parseMoons } from './parser';
import { Moon } from './types';
import {
    applyGravityForAxis,
    applyGravityToAll, applyVelocityForAxisToAll,
    applyVelocityToAll,
    totalEnergy
} from './moon';
import { greatestCommonDivisor, sum } from '../utils';

export function parse(rawInputs: string[], _log: Logger): Moon[] {
    return parseMoons(rawInputs);
}

export function run1(moons: Moon[], _log: Logger): number {
    for (let i = 0; i < 1000; i++) {
        applyGravityToAll(moons);
        applyVelocityToAll(moons);
    }
    return moons.map(totalEnergy).reduce(sum);
}

export function run2(moons: Moon[], _log: Logger): number {
    const x = calculateCycle(moons, 'x');
    const y = calculateCycle(moons, 'y');
    const z = calculateCycle(moons, 'z');
    const xy = x * y / greatestCommonDivisor(x, y);
    return xy * z / greatestCommonDivisor(xy, z);
}

function calculateCycle(moons: Moon[], axis: string): number {
    const first = serialise(moons, axis);
    let i = 0;
    let found = false;
    while (!found) {
        applyGravityForAxis(moons, axis);
        applyVelocityForAxisToAll(moons, axis);
        const serialised = moons
            .map(moon => moon.position[axis] + '|' + moon.velocity[axis])
            .join(',');
        found = i > 0 && serialised === first;
        i++;
    }
    return i;
}

function serialise(moons: Moon[], axis: string): string {
    return moons
        .map(moon => moon.position[axis] + '|' + moon.velocity[axis])
        .join(',');
}

