# Day 10

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/10/).

## Data Modelling

We can use the coordinate object we introduced on day 3.
We don't need to keep track of the whole grid, just a list of coordinates where there is
an asteroid.

## Parsing the input

For each line, use `split` to turn into an array, and create a coordinate 
for each point there is a `#`.

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

## Part 2

We already have code to find out where the station will be, and all 
asteroids in sight from that point.
To find the coordinate vaporised 200th, we'll need to sort them.

### JavaScript sort

JavaScript has an array method `sort` which takes a function comparing two objects.

When comparing (a, b)
- return a negative number if `a` should come first
- return 0 if the numbers are equal
- return a positive number if `b` should come first

I always have to think about which way round this is! The best 
way I've found to remember is it to remember you can sort numbers with
`a - b` (so when a comes before b the result is negative).

### Clockwise sorting

First I adjusted all the coordinates so that the base (X below) was (0,0),
and all other coordinates in relation to that.

I then categorised coordinates into 8 'zones'.

```
777701111
777701111
777701111
777701111
6666X2222
555543333
555543333
555543333
555543333
```

For coordinates in different zone, return `zone a - zone b`.

Within the same zone:
- For the verticals (0, 4) compare the y coordinates
- For the horizontals (2, 6) compare the x coordinates
- For the diagonals (1, 3, 5, 7) compare the gradient of `x/y`.
