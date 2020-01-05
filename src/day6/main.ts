import * as Logger from 'bunyan';
import { OrbitGraph, SpaceObject } from './types';
import { parseGraph } from './parser';
import { sum } from '../utils';

export function parse(rawInputs: string[], _log: Logger): OrbitGraph {
    return parseGraph(rawInputs);
}

export function run1(input: OrbitGraph, _log: Logger): number {
    return Array.from(input.values()).map(pathLength).reduce(sum);
}

export function run2(input: string[], _log: Logger): string {
    return input[0];
}

export function pathLength(object: SpaceObject): number {
    if (object.orbits.length === 0) {
        return 0;
    }
    return 1 + pathLength(object.orbits[0]);
}

