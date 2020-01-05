import { SpaceObject } from './types';


export function pathToRoot(object: SpaceObject): SpaceObject[] {
    const path = [];
    let current = object;
    while (current.orbits) {
        current = current.orbits;
        path.push(current);
    }
    return path;
}

export function pathLength(object: SpaceObject): number {
    return pathToRoot(object).length;
}

export const toName = (object: SpaceObject) => object.name;
