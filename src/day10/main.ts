import * as Logger from 'bunyan';
import { AsteroidGrid } from './types';
import { parseGrid } from './parser';
import { getInSight } from './asteroids';
import { max } from '../utils';

export function parse(rawInputs: string[], _log: Logger): AsteroidGrid {
    return parseGrid(rawInputs);
}

export function run1(grid: AsteroidGrid, _log: Logger): number {
    const counts = grid.asteroids.map(a => getInSight(grid, a).length);
    return counts.reduce(max);
}

export function run2(input: string[], _log: Logger): string {
    return input[0];

}



