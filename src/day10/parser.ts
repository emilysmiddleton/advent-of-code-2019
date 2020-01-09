import { AsteroidGrid } from './types';
import { Coordinate, CoordinatesGrid } from '../coordinates';

export function parseRow(line: string): boolean[] {
    return line.split('').map(value => value === '#');
}

export function parseGrid(input: string[]): AsteroidGrid {
    return input.map(parseRow);
}

export function getAsteroids(asteroidGrid: AsteroidGrid, coordinates: CoordinatesGrid): Coordinate[] {
    const asteroids = [];
    for (let y = 0; y < asteroidGrid.length; y++) {
        for (let x = 0; x < asteroidGrid[y].length; x++) {
            if (asteroidGrid[y][x]) {
                asteroids.push(coordinates[y][x]);
            }
        }
    }
    return asteroids;
}
