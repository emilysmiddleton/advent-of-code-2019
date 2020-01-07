import test from 'ava';
import { parseLayer, parseImage } from '../../src/day8/parser';
import { combineLayer, combineRow, countInstanceOf, getColour, getLayerWithFewest } from '../../src/day8/image';

test('count number of matching digits per layer', t => {
    const layer = parseLayer('123456121', 3);
    t.is(3, countInstanceOf(layer, 1));
    t.is(2, countInstanceOf(layer, 2));
    t.is(1, countInstanceOf(layer, 3));
});

test('layer with fewest Xs', t => {
    const image = parseImage('101010' + '012012' + '000111' + '000012', 3, 2);
    t.is(getLayerWithFewest(image, 0), image.layers[1]);
    t.is(getLayerWithFewest(image, 1), image.layers[3]);
    t.is(getLayerWithFewest(image, 2), image.layers[0]);
});

test('combine colour', t => {
    t.is(getColour(0, 0), 0);
    t.is(getColour(0, 1), 0);
    t.is(getColour(0, 2), 0);
    t.is(getColour(1, 0), 1);
    t.is(getColour(1, 1), 1);
    t.is(getColour(1, 2), 1);
    t.is(getColour(2, 0), 0);
    t.is(getColour(2, 1), 1);
    t.is(getColour(2, 2), 2);
});

test('combineRow', t => {
    const row1 = [0, 0, 0, 1, 1, 1, 2, 2, 2];
    const row2 = [0, 1, 2, 0, 1, 2, 0, 1, 2];
    t.deepEqual(combineRow(row1, row2), [0, 0, 0, 1, 1, 1, 0, 1, 2]);
});

test('combine layer', t => {
    const layer1 = parseLayer('012012', 3);
    const layer2 = parseLayer('000111', 3);
    t.deepEqual(combineLayer(layer1, layer2), parseLayer('010011', 3));
});
