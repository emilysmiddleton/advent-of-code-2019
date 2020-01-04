import * as Logger from 'bunyan';
import { fuelRequired, totalFuel } from './fuelCounter';
import { sum } from '../utils';

export function parse(rawInputs: string[], _log: Logger): number[] {
    return rawInputs.map(input => Number.parseInt(input, 10));
}

export function run1(input: number[], _log: Logger): number {
    return input.map(fuelRequired).reduce(sum);
}

export function run2(input: number[], _log: Logger): number {
    return input.map(totalFuel).reduce(sum);
}



