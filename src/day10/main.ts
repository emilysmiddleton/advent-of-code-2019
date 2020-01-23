import * as Logger from 'bunyan';
import { AsteroidGrid } from './types';
import { parseGrid } from './parser';
import { getInSight, getVaporiseOrder } from './asteroids';
import { max } from '../utils';

export function parse(rawInputs: string[], _log: Logger): AsteroidGrid {
    return parseGrid(rawInputs);
}

export function run1(grid: AsteroidGrid, _log: Logger): number {
    const counts = grid.asteroids.map(a => getInSight(grid, a).length);
    return counts.reduce(max);
}

export function run2(grid: AsteroidGrid, _log: Logger): number {
    const toLaser = getVaporiseOrder(grid);
    console.log(toLaser);
    console.log(toLaser.length);
    const result = toLaser[199];
    return (result.x * 100) + result.y;
}
