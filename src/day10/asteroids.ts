import { greatestCommonDivisor } from '../utils';
import { Coordinate, CoordinatesGrid } from '../coordinates';

export function getBlockedCoordinates(grid: CoordinatesGrid, a: Coordinate, b: Coordinate): Coordinate[] {
    const width = grid[0].length;
    const height = grid.length;

    const diff = getGradient(a, b);

    const blocked = [];
    let x = b.x + diff.x;
    let y = b.y + diff.y;
    while (x >= 0 && y >= 0 && x < width && y < height) {
        blocked.push(grid[y][x]);
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

export function getInSight(grid: CoordinatesGrid, asteroids: Coordinate[], coordinate: Coordinate): Coordinate[] {
    const blockers = [];
    for (const asteroid of asteroids) {
        if (coordinate !== asteroid) {
            blockers.push(...getBlockedCoordinates(grid, coordinate, asteroid));
        }
    }
    return asteroids.filter(a => a !== coordinate && blockers.indexOf(a) < 0);
}
