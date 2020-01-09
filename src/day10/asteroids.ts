import { greatestCommonDivisor } from '../utils';
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
