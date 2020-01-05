import * as Logger from 'bunyan';
import { Range } from './types';

export function parse(rawInputs: string[], _log: Logger): Range {
    const parts = rawInputs[0].split('-');
    return {
        from: Number.parseInt(parts[0], 10),
        to: Number.parseInt(parts[1], 10)
    };
}

export function run1(input: Range, _log: Logger): number {
    return input.from;
}

export function run2(input: Range, _log: Logger): number {
    return input.from;

}



