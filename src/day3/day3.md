# Day 1

See [part 1](problem.md), or [the original online](https://adventofcode.com/2019/day/3/).

## Modelling

We can consider each point on the grid by an x,y coordinate, starting position 0,0:

```
{
    x: 0,
    y: 0
}

```

An operation, e.g. R1002, has both direction (up/down/right/left) and magnitude.

```
{
    direction: 'R',
    length: 1002
}
```
## Parsing the input

All the input is on a single comma separated line. Use `Array.split` to get an array of operations. 

The resulting string has the direction as the first character, and the magnitude as the rest.

## Part 1

### Applying an operation

Right and left operations add or subtract from the `x` position respectively.
Up and down operations add or subtract from the `y` position respectively.

### Finding the wire's path

We can find the full path of the wire - a list of coordinates - 
by applying the operations, starting at `0,0`.

### Intersections

We need to find all points that are in both sets. In other languages we could use a set and a union method.

TypeScript does have `Set`, but it doesn't have a built--in union method, and if doesn't define two objects as
equals unless they refer to literally the same object rather than having equal values for all fields.

I've chosen to define a new `indexOf` method that works for the coordinate object, and define the intersection
using this method and a filter.

This is pretty inefficient, and makes me miss Java. But it is ok for this problem.

### Manhattan Distance

Manhattan distance is the distance needed to travel between two coordinates, 
only able to travel north/south and east/west. 

- The difference between the two `x` values gives the horizontal distance to travel.
- The difference between the two `y` values gives the vertical distance to travel.

Use `absolute` to make sure the result is positive.

In pseudocode:

```
manhatten(coord1, coord2)
    horizontal = abs(coord1.x - coord2.x)
    vertical = abs(coord1.y - coord2.y)
    return horizontal + vertical
```

### Problem answer

* Find all coordinates in a wire's path
* Find the coordinates that are in both paths
* Calculate the manhattan distance of each of those points
* Return the smallest

This is very slow.

## Part 2

> calculate the number of steps each wire takes to reach each intersection; 
> choose the intersection where the sum of both wires' steps is lowest

### Calculating the number of steps

The number of steps for a given coordinate is the same as its position in the path array
(plus one, we're not including the start coordinate in our path).

This can therefore be calculated using the custom `indexOf` method we defined for part 1.

### Problem answer

* Find all coordinates in a wire's path
* Find the coordinates that are in both paths
* Calculate the number of steps of each of these points by adding their path positions
* Return the smallest

As for part 1, this is very slow.
