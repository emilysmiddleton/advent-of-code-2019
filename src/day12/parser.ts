import { Moon } from './types';

export function parseMoon(name: string, line: string): Moon {
    const regex = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;
    console.log(line);
    const found = line.match(regex);
    console.log(found);
    return {
        name,
        position: {
            x: Number.parseInt(found[1], 10),
            y: Number.parseInt(found[2], 10),
            z: Number.parseInt(found[3], 10)
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        }
    };
}

export function parseMoons(input: string[]): Moon[] {
    return [
        parseMoon('Io', input[0]),
        parseMoon('Europa', input[1]),
        parseMoon('Ganymede', input[2]),
        parseMoon('Callisto', input[3])
    ];
}
