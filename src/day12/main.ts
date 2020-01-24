import * as Logger from 'bunyan';
import { parseMoons } from './parser';
import { Moon } from './types';
import { applyGravityToAll, applyVelocityToAll, totalEnergy } from './moon';
import { sum } from '../utils';

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

export function run2(input: string[], _log: Logger): string {
    return input[0];

}



