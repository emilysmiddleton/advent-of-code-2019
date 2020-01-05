# Day 6

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/6/).

## Data Modelling

The data in this problem can be represented as a _graph_. A graph is made up of _nodes_ - the 'things' - and
edges - the relationships between the things.

in this case the nodes are the space objects, and the edges are the orbit relationship - if A orbits B there is an
edge between node A and node B.

We'll define a `SpaceObject` as

```
{
    name: string,
    orbitedBy: SpaceObject[]
}

```

Each space object has any number (including 0) of other space objects orbiting it.

In our solar system, we could have

```
{
    name: 'sun',
    orbitedBy: [ 
        { name: 'mercury'...},
        { name: 'venus'...}, 
        etc
]
```

## Parsing the input

Each line has the names of two objects separated by `)`.
`B)C` says that the object `B` is orbited by object `C`.

We'll build up a map of space objects by name. For each line:
- If the named objects aren't already in the map, create them (with an empty array initially)
- Add the right-hand object (`C`) to the array of the left-hand object.

