import test from 'ava';
import { parseGraph } from '../../src/day6/parser';
import { pathLength } from '../../src/day6/orbits';

test('Path length', t => {
    const graph = parseGraph([
        'A)B',
        'B)C',
        'B)D',
        'D)E'
    ]);
    t.is(0, pathLength(graph.get('A')));
    t.is(1, pathLength(graph.get('B')));
    t.is(2, pathLength(graph.get('C')));
    t.is(2, pathLength(graph.get('D')));
    t.is(3, pathLength(graph.get('E')));
});
