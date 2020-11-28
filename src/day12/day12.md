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

## Part 1

### Apply gravity

For a pair of moons, we check their relative positions and adjust the velocity accordingly.
One of the nice things about JavaScript is that we write a single method
that adjusts the velocity for a given axis, and pass the axis in as a parameter.

```
export function applyGravity(moon1: Moon, moon2: Moon, axis: string): void {
    const value1 = moon1.position[axis];
    ...
```

This avoids us having to write the same code for all three axes.

To apply to all moons, we'll have to loop over each pair.

### Apply velocity

For each access add the velocity to the position:
```
moon.position.x += moon.velocity.x
```

### Calculate energy

For each moon we can calculate the total energy.= in isolation.
- potential energy is the sum of position's x, y, z
- kinetic energy is the sum of velocity's x, y, z
- total energy is potential * kinetic

To get the energy for the whole system calculate it for all moons using 
`Array.map` then sum using `reduce`.


