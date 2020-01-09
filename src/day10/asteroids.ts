import { greatestCommonDivisor } from '../utils';

export function getBlockedCoordinates(a: Coordinate, b: Coordinate, width: number, height: number): Coordinate[] {
    const diff = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    const gcd = greatestCommonDivisor(diff.x, diff.y);
    diff.x = diff.x / gcd;
    diff.y = diff.y / gcd;
    const blocked = [];
    let coord = { x: b.x, y: b.y };
    while (coord.x < width && coord.y < height) {
        coord = {
            x: coord.x + diff.x,
            y: coord.y + diff.y
        };
        blocked.push(coord);
    }
    return blocked;

}
