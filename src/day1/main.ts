import * as Logger from 'bunyan';

export function parse(rawInputs: string[], _log: Logger): number[] {
    return rawInputs.map(input => Number.parseInt(input, 10));
}

export function run1(input: number[], _log: Logger): number {
    return input[0];
}

export function run2(input: number[], _log: Logger): number {
    return input[0];

}



