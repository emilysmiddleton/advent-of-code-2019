import { OrbitGraph, SpaceObject } from './types';

export function parseGraph(lines: string[]): OrbitGraph {
    const graph = new Map();
    lines.forEach(line => addOrbit(graph, line));
    return graph;
}

export function addOrbit(graph: Map<string, SpaceObject>, line: string): void {
    const parts = line.split(')');
    const lhs = addObject(graph, parts[0]);
    const rhs = addObject(graph, parts[1]);
    rhs.orbits.push(lhs);
}

export function addObject(graph: Map<string, SpaceObject>, name: string): SpaceObject {
    if (!graph.has(name)) {
        graph.set(name, {
            name,
            orbits: []
        });
    }
    return graph.get(name);
}
