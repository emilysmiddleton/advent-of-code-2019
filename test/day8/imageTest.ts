import test from 'ava';
import { parseLayer, parseImage } from '../../src/day8/parser';
import { countInstanceOf, getLayerWithFewest } from '../../src/day8/image';

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
