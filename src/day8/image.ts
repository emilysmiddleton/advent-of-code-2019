import { Image, Layer } from './types';
import { sum, min, zipReduce } from '../utils';

export function getLayerWithFewest(image: Image, target: number): Layer {
    const counts = image.layers.map(layer => countInstanceOf(layer, target));
    const minCount = counts.reduce(min);
    return image.layers[counts.indexOf(minCount)];
}

export function countInstanceOf(layer: Layer, target: number): number {
    const numberPerRow = layer.grid.map(row => row.filter(digit => digit === target).length);
    return numberPerRow.reduce(sum);
}

export function combineLayer(layer1: Layer, layer2: Layer): Layer {
    return {
        grid: zipReduce(layer1.grid, layer2.grid, combineRow)
    };
}

export const combineRow = (r1, r2) => zipReduce(r1, r2, getColour);

export const getColour = (p1, p2) => p1 === 2 ? p2 : p1;
