import { greatestCommonDivisor, max } from '../utils';
import { Coordinate } from '../coordinates';
import { AsteroidGrid } from './types';

export function getBlockedCoordinates(asteroidGrid: AsteroidGrid, a: Coordinate, b: Coordinate): Coordinate[] {
    const diff = getGradient(a, b);

    const blocked = [];
    let x = b.x + diff.x;
    let y = b.y + diff.y;
    while (x >= 0 && y >= 0 && x < asteroidGrid.width && y < asteroidGrid.height) {
        blocked.push(asteroidGrid.coordinates[y][x]);
        x += diff.x;
        y += diff.y;
    }
    return blocked;
}

export function getGradient(a: Coordinate, b: Coordinate): Coordinate {
    const diff = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    const gcd = greatestCommonDivisor(diff.x, diff.y);
    diff.x = diff.x / gcd;
    diff.y = diff.y / gcd;
    return diff;
}

export function getInSight(asteroidGrid: AsteroidGrid, coordinate: Coordinate): Coordinate[] {
    const blockers = [];
    for (const asteroid of asteroidGrid.asteroids) {
        if (coordinate !== asteroid) {
            blockers.push(...getBlockedCoordinates(asteroidGrid, coordinate, asteroid));
        }
    }
    return asteroidGrid.asteroids.filter(a => a !== coordinate && blockers.indexOf(a) < 0);
}

export function getCompare(base: Coordinate): (coord1: Coordinate, coord2: Coordinate) => number {
    return (coord1, coord2) => {
        const normalised1 = { x: coord1.x - base.x, y: coord1.y - base.y };
        const normalised2 = { x: coord2.x - base.x, y: coord2.y - base.y };
        return compare(normalised1, normalised2);
    };
}

export function compare(coord1: Coordinate, coord2: Coordinate): number {
    const area1 = getArea(coord1);
    const area2 = getArea(coord2);
    if (area1 !== area2) {
        return area1 - area2;
    }
    switch (area1) {
        case 0: return coord2.y - coord1.y;
        case 4: return coord1.y - coord2.y;
        case 2: return coord1.x - coord2.x;
        case 6: return coord2.x - coord1.x;
        default: return (coord2.x / coord2.y) - (coord1.x / coord1.y);
    }
}

function getArea(coord: Coordinate): number {
    if (coord.x === 0) {
        return coord.y < 0 ? 0 : 4;
    }
    if (coord.y === 0) {
        return coord.x > 0 ? 2 : 6;
    }
    if (coord.x > 0) {
        return coord.y < 0 ? 1 : 3;
    }
    return coord.y < 0 ? 7 : 5;
}

export function getVaporiseOrder(grid: AsteroidGrid): Coordinate[] {
    const inSight = grid.asteroids.map(a => getInSight(grid, a));
    const counts = inSight.map(list => list.length);
    const maxPosition = counts.reduce(max);
    const position = grid.asteroids[counts.indexOf(maxPosition)];
    return getInSight(grid, position).sort(getCompare(position));
}
