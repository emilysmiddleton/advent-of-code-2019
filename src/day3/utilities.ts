export function manhattenDistance(coord1: Coordinate, coord2: Coordinate): number {
    return Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);
}

export function next(coord: Coordinate, direction: string): Coordinate {
    switch (direction) {
        case 'U': return { x: coord.x, y: coord.y + 1 };
        case 'D': return { x: coord.x, y: coord.y - 1 };
        case 'L': return { x: coord.x - 1, y: coord.y };
        case 'R': return { x: coord.x + 1, y: coord.y };
        default: throw new Error('Unknown direction ' + direction);
    }
}

export function getPath(start: Coordinate, operation: PathOperation): Coordinate[] {
    const path = [];
    let current = start;
    for (let i = 0; i < operation.length; i++) {
        current = next(current, operation.direction);
        path.push(current);
    }
    return path;
}

export function getFullPath(start: Coordinate, operations: PathOperation[]): Coordinate[] {
    const path = [];
    let begin = start;
    for (const operation of operations) {
        const coords = getPath(begin, operation);
        path.push(...coords);
        begin = coords[coords.length - 1];
    }
    return path;
}

export function findIntersections(coords1: Coordinate[], coords2: Coordinate[]): Coordinate[] {
    return coords1.filter(value => indexOf(coords2, value) >= 0);
}

export function indexOf(coords: Coordinate[], coord: Coordinate): number {
    return coords.findIndex(c => c.x === coord.x && c.y === coord.y);
}

export function format(coord: Coordinate): string {
    return coord.x + ',' + coord.y;
}
