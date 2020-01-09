import { AsteroidGrid } from './types';

export function parseRow(line: string): boolean[] {
    return line.split('').map(value => value === '#');
}

export function parseGrid(input: string[]): AsteroidGrid {
    return input.map(parseRow);
}
