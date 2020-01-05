import { SpaceObject } from './types';


export function pathToRoot(object: SpaceObject): SpaceObject[] {
    const path = [];
    let current = object;
    while (current.orbits.length > 0) {
        current = current.orbits[0];
        path.push(current);
    }
    return path;
}

export function pathLength(object: SpaceObject): number {
    return pathToRoot(object).length;
}
