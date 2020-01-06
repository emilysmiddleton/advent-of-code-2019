import { Image, Layer } from './types';
import { sum, min } from '../utils';

export function getLayerWithFewest(image: Image, target: number): Layer {
    const counts = image.layers.map(layer => countInstanceOf(layer, target));
    const minCount = counts.reduce(min);
    return image.layers[counts.indexOf(minCount)];
}

export function countInstanceOf(layer: Layer, target: number): number {
    const numberPerRow = layer.grid.map(row => row.filter(digit => digit === target).length);
    return numberPerRow.reduce(sum);
}
