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

export function combineLayers(image: Image): Layer {
    return image.layers.reduce((a, b) => combineLayer(a, b));
}

export function combineLayer(layer1: Layer, layer2: Layer): Layer {
    return {
        grid: zipReduce(layer1.grid, layer2.grid, combineRow)
    };
}

export const combineRow = (r1, r2) => zipReduce(r1, r2, getColour);

export const getColour = (p1, p2) => p1 === 2 ? p2 : p1;

export function renderLayer(layer: Layer): string {
    const rows = layer.grid.map(row => row.map(d => d === 1 ? '0' : ' ').reduce(sum) + '\n');
    return rows.reduce(sum);
}
