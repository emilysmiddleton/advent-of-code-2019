import { Coordinate } from '../coordinates';

export type AsteroidGrid = {
    height: number,
    width: number,
    asteroids: Coordinate[],
    coordinates: Coordinate[][]
};
