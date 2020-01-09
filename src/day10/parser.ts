import { AsteroidGrid } from './types';
import { Coordinate, CoordinatesGrid, createGrid } from '../coordinates';

export function parseRow(line: string): boolean[] {
    return line.split('').map(value => value === '#');
}

export function parseGrid(input: string[]): AsteroidGrid {
    const asteroidGrid = input.map(parseRow);
    const height = asteroidGrid.length;
    const width = asteroidGrid[0].length;
    const coordinates = createGrid(width, height);
    const asteroids = getAsteroids(asteroidGrid, coordinates);
    return {
        height,
        width,
        coordinates,
        asteroids
    };
}

export function getAsteroids(asteroidGrid: boolean[][], coordinates: CoordinatesGrid): Coordinate[] {
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
