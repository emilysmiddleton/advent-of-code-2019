import test from 'ava';
import { addObject, addOrbit, parseGraph } from '../../src/day6/parser';
import { toName } from '../../src/day6/orbits';

test('Creates object where key not exist', t => {
    const graph = new Map();
    addObject(graph, 'A');
    t.true(graph.has('A'));
    const object = graph.get('A');
    t.is(object.name, 'A');
    t.is(object.orbits.length, 0);
    t.is(object.orbitedBy.length, 0);
});

test('Add object no affect when already there', t => {
    const graph = new Map();
    const a1 = { name: 'A', orbitedBy: [] };
    graph.set('A', a1);
    const a2 = addObject(graph, 'A');
    // Should be the exact same object.
    t.is(a1, a2);
});

test('addOrbit adds relationships', t => {
    const graph = new Map();
    addOrbit(graph, 'A)B');
    t.true(graph.has('A'), JSON.stringify(graph));
    t.true(graph.has('B'), JSON.stringify(graph));
    const a = graph.get('A');
    const b = graph.get('B');

    t.deepEqual(a.orbits.map(toName), []);
    t.deepEqual(a.orbitedBy.map(toName), ['B']);

    t.deepEqual(b.orbits.map(toName), ['A']);
    t.deepEqual(b.orbitedBy.map(toName), []);
});

test.only('parse adds all relationships', t => {
    const graph = parseGraph([
        'A)B',
        'B)C',
        'B)D'
    ]);
    const a = graph.get('A');
    const b = graph.get('B');
    const c = graph.get('C');
    const d = graph.get('D');

    t.deepEqual(a.orbits.map(toName), []);
    t.deepEqual(a.orbitedBy.map(toName), ['B']);

    t.deepEqual(b.orbits.map(toName), ['A']);
    t.deepEqual(b.orbitedBy.map(toName), ['C', 'D']);

    t.deepEqual(c.orbits.map(toName), ['B']);
    t.deepEqual(c.orbitedBy.map(toName), []);

    t.deepEqual(d.orbits.map(toName), ['B']);
    t.deepEqual(d.orbitedBy.map(toName), []);
});
