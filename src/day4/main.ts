import * as Logger from 'bunyan';
import { Range } from './types';
import { validPasswordPart1, validPasswordPart2 } from './password';

export function parse(rawInputs: string[], _log: Logger): Range {
    const parts = rawInputs[0].split('-');
    return {
        from: Number.parseInt(parts[0], 10),
        to: Number.parseInt(parts[1], 10)
    };
}

export function run1(input: Range, _log: Logger): number {
    return countValidPasswords(input, validPasswordPart1);
}

export function run2(input: Range, _log: Logger): number {
    return countValidPasswords(input, validPasswordPart2);
}

export function countValidPasswords(input: Range, checker: (value: number) => boolean): number {
    let count = 0;
    for (let i = input.from; i < input.to; i++) {
        if (checker(i)) {
            count++;
        }
    }
    return count;
}

