import { Image, Layer } from './types';

export function parseImage(input: string, width: number, height: number): Image {
    const image = { layers: [] };
    const layerSize = width * height;
    for (let i = 0; i < input.length; i += layerSize) {
        const layerString = input.substring(i, i + layerSize);
        image.layers.push(parseLayer(layerString, width));
    }
    return image;
}

export function parseLayer(input: string, width: number): Layer {
    const grid = [];
    for (let i = 0; i < input.length; i += width) {
        const row = input.substring(i, i + width);
        const digits = row.split('').map(c => Number.parseInt(c, 10));
        grid.push(digits);
    }
    return { grid };
}

