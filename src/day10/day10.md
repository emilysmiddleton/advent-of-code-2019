# Day 10

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/10/).

## Data Modelling

We used a grid - an array of arrays - in day 8; we'll do the same here.
To simplify later code, we can make this an array of booleans:
true if that spot contains an asteroid, false otherwise.

## Parsing the input

For each line, use `split` to turn into an array and then map each character to a boolean.

## Part 1

> A monitoring station can detect any asteroid to which it has direct line of sight - that is, 
> there cannot be another asteroid exactly between them.

For each position, we need to find out how many other asteroids are visible.

We only need to consider coordinates where an asteroid is located. The difficulty here is that any angle is 
permitted

### Lines of blocking

For any pair of asteroids, we can find all the points that the asteroid blocks.

In a vertical line: B blocks the points marked X from A
```
.A.
...
.B.
.X.
.X.
```
In a diagonal line:

```
A....
.....
..B..
...X.
....X
```

At another angle:

```
.A......
...B....
.....X..
.......X
```

To find the coordinates blocked:
- Find the gradient of the line. This is `(b.x - a.x, b.y - a.y)`
- Simplify if possible (e.g for second example `(2, 2)` can be simplified to `(1, 1)`)
- Starting at B, keep adding the gradient to find the next blocked point.

So for the first example:
- A is `(1, 0)`, B is `(3, 1)`
- Gradient is `(2, 1)`
- Points blocked are `(3, 1) + (2, 1) = (5, 2)`, `(5, 2) + (2, 1) = (7, 3)`, etc.
