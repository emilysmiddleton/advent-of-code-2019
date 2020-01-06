import * as Logger from 'bunyan';
import { Image } from './types';
import { parseImage } from './parser';
import { countInstanceOf, getLayerWithFewest } from './image';

export function parse(rawInputs: string[], _log: Logger): Image {
    return parseImage(rawInputs[0], 25, 6);
}

export function run1(input: Image, _log: Logger): number {
    const layer = getLayerWithFewest(input, 0);
    return countInstanceOf(layer, 1) * countInstanceOf(layer, 2);
}

export function run2(input: string[], _log: Logger): string {
    return input[0];

}



