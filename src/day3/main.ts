import * as Logger from 'bunyan';
import { findIntersections, getFullPath, manhattenDistance } from './utilities';
import { parseOperations } from './parser';

export function parse(rawInputs: string[], _log: Logger): PathOperation[][] {
    return [parseOperations(rawInputs[0]), parseOperations(rawInputs[1])];
}

export function run1(paths: PathOperation[][], _log: Logger): number {
    const start = { x: 0, y: 0, steps: 0 };
    const path1 = getFullPath(start, paths[0]);
    const path2 = getFullPath(start, paths[1]);
    const intersections = findIntersections(path1, path2);
    const smallest = intersections.reduce((prev, current, _index, _all) => {
        const m1 = manhattenDistance(start, prev);
        const m2 = manhattenDistance(start, current);
        return m1 < m2 ? prev : current;
    });
    return manhattenDistance(start, smallest);
}

export function run2(paths: PathOperation[][], _log: Logger): number {
    const start = { x: 0, y: 0, steps: 0 };
    const path1 = getFullPath(start, paths[0]);
    const path2 = getFullPath(start, paths[1]);
    const intersections = findIntersections(path1, path2);
    const smallest = intersections.reduce((prev, current, _index, _all) => {
        const s1 = prev.steps;
        const s2 = current.steps;
        return s1 < s2 ? prev : current;
    });
    return smallest.steps;
}

