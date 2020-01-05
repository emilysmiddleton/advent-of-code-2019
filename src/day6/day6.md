# Day 6

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/6/).

## Data Modelling

For each SpaceObject we'll want to keep track of the object it's orbiting.

```
{
    name: string,
    orbits: SpaceObject[]
}

```

In our own solar system, we could have e.g.

```
{
    name: 'sun',
    orbits: []
}

{
    name: 'mercury',
    orbits: [ <sun> ]
]

etc
```

## Parsing the input

Each line has the names of two objects separated by `)`.
`B)C` says that the object `C` orbits `B`.

We'll build up a map of space objects by name. For each line:
- If the named objects aren't already in the map, create them (with an empty array initially)
- Set `orbits` of the right-hand side to the left-hand side.

## Part 1

> What is the total number of direct and indirect orbits in your map data

For each space object, it's total number of orbits (direct and indirect) is the
length of the path from it to the COM station.

So for a simple graph:
```
COM - A - B
      |
      \ - C - D
```

| Object | Path | Length |
|:-------|:-----|:-------|
| COM |  | 0 |
| A | COM | 1 |
| B | A - COM | 2 |
| C | A - COM | 2 |
| D | C - A - COM | 3 |

Total 8.

## Part 2

>What is the minimum number of orbital transfers required to move from the object
> YOU are orbiting to the object SAN is orbiting? 

### Minimal Orbital transfers

We are looking for the "minimal orbital transfers", i.e. the shortest route from us to Santa.

To find this, we look for the first point in common in our route back to COM.

```
                          YOU
                         /
        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
```

Path from K to COM is

```
K - J - E - D - C - B - COM
```

Path from I to COM is

```
I - D - C - B - COM
```

So the first point in common is `D`.

- The number of steps to get from K to D is 3
- The number of steps to get from I to D is 1

So the minimum number of steps from K to is is:

- 3 steps from K to D
- 1 step from D to I

Total 4.

### Implementation


In part 1 we wrote method that calculates the path from us to the root (COM).

We can reuse this to find:
- the path from the object we orbit (K) to COM
- the path from the object SAN orbits (I) to COM

Then find the first common point and add up the lengths.
