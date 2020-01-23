import { AsteroidGrid } from './types';
import { Coordinate, CoordinatesGrid, createGrid } from '../coordinates';

export function parseGrid(input: string[]): AsteroidGrid {
    const height = input.length;
    const width = input[0].length;
    const coordinates = createGrid(width, height);
    const asteroids = getAsteroids(input, coordinates);
    return {
        height,
        width,
        coordinates,
        asteroids
    };
}

export function getAsteroids(input: string[], coordinates: CoordinatesGrid): Coordinate[] {
    const asteroids = [];
    for (let y = 0; y < input.length; y++) {
        const split = input[y].split('');
        for (let x = 0; x < split.length; x++) {
            if (split[x] === '#') {
                asteroids.push(coordinates[y][x]);
            }
        }
    }
    return asteroids;
}
