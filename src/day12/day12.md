# Day 12

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/12/).

## Data modelling

We've used a 2D coordinate on previous days; let's extend that to a 3D coordinate.

```
type Coordinate3D = {
    x: number,
    y: number,
    z: number
};
```

For each moon we'll keep track of position and velocity.

```
type Moon = {
    name: string,
    position: Coordinate3D,
    velocity: Coordinate3D
}
```

## Parsing the input

An example row:
`<x=14, y=4, z=5>`

We can use a regular expression to match this format.

`<x=(\d+), y=(\d+), z=(\d+)>`

Regular expressions can look a bit scary, but if you break them down they are more comprehensible.
- Most characters above are literal matches (i.e. `<x=` matches that exact string).
- `?` is optional, so `-?` means an option minus sign. 
- `\d` means any digit, the `+` says "at least one". So this matches both `1`, `12`, `123` etc.
- The brackets are just used for grouping, see below

JavaScript has a `match` function:
```
const regex = /<x=(\d+), y=(\d+), z=(\d+)>/;
const result = line.match(regex);
```
The result will be an array, e.g. for the example above we'd get:

```['<x=14, y=4, z=5>, '14', '4', '5']```

This has the whole match at position 0, then each group (bracketed) match. We can then 
convert these to numbers and build our `Moon` object.

