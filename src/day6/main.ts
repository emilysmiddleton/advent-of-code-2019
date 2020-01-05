import * as Logger from 'bunyan';
import { OrbitGraph } from './types';
import { parseGraph } from './parser';
import { sum } from '../utils';
import { pathLength } from './orbits';

export function parse(rawInputs: string[], _log: Logger): OrbitGraph {
    return parseGraph(rawInputs);
}

export function run1(input: OrbitGraph, _log: Logger): number {
    return Array.from(input.values()).map(pathLength).reduce(sum);
}

export function run2(input: string[], _log: Logger): string {
    return input[0];
}



