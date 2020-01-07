import test from 'ava';
import { parseImage, parseLayer } from '../../src/day8/parser';

test('Parse image', t => {
    const input = '123456789012';
    const image = parseImage(input, 3, 2);
    t.is(image.layers.length, 2);
    t.deepEqual(image.layers[0].grid, [
        [1, 2, 3],
        [4, 5, 6]
    ]);
    t.deepEqual(image.layers[1].grid, [
        [7, 8, 9],
        [0, 1, 2]
    ]);
});

test('Parse layer', t => {
    const input = '123456';
    t.deepEqual(parseLayer(input, 3).grid, [
        [1, 2, 3],
        [4, 5, 6]
    ]);
});
