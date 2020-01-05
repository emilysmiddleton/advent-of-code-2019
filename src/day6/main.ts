import * as Logger from 'bunyan';
import { OrbitGraph } from './types';
import { parseGraph } from './parser';
import { sum } from '../utils';
import { pathToRoot, pathLength, toName } from './orbits';

export function parse(rawInputs: string[], _log: Logger): OrbitGraph {
    return parseGraph(rawInputs);
}

export function run1(input: OrbitGraph, _log: Logger): number {
    return Array.from(input.values()).map(pathLength).reduce(sum);
}

export function run2(input: OrbitGraph, _log: Logger): number {
    const you = input.get('YOU');
    const santa = input.get('SAN');
    const youPath = pathToRoot(you).map(toName);
    const santaPath = pathToRoot(santa).map(toName);
    const intersection = youPath.find(o => santaPath.indexOf(o) >= 0);
    return youPath.indexOf(intersection) + santaPath.indexOf(intersection);
}



