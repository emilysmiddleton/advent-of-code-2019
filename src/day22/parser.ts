import { Shuffle } from './types';

const DEAL_WITH_INCREMENT = 'deal with increment ';
const CUT = 'cut ';
const DEAL_NEW_STACK = 'deal into new stack';

export function parseShuffle(line: string): Shuffle {
    if (line.startsWith(DEAL_WITH_INCREMENT)) {
        const n = Number.parseInt(line.substring(DEAL_WITH_INCREMENT.length), 10);
        return { op: 'DWI', param: n };
    }
    if (line.startsWith(CUT)) {
        const n = Number.parseInt(line.substring(CUT.length), 10);
        return { op: 'CUT', param: n };
    }
    if (line.startsWith(DEAL_NEW_STACK)) {
        return { op: 'DNS' };
    }
    throw new Error('Unknown shuffle');
}
