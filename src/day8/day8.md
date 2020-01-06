# Day 6

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/8/).

## Data Modelling

I'll define two types

- a layer, which has a grid of digits represented as a two-dimensional array

```
{
    grid: number[][]
}
```

- an image, which has multiple layers

```
{
    layers: Layer[]
}
```

## Parsing the input

We have `width` and `height`, and a single string containing all the digits.

- Split the string up into (width * height) chunks. One chunk is one layer.
- For each chunk
    - Split that string into chunks of size `width` to get each row
    - Split each row into characters and parse as a number to get the digits

For the given example `123456789120`:
- Split into layers `123456` and `789120`
- For layer `123456`
    - Split into rows `123` and `456`
    - Convert to `[1, 2, 3]` and `[4, 5, 6]`
- Same for layer `789120`

## Part 1

> the Elves would like you to find the layer that contains the fewest 0 digits

For each layer, we can use `filter` to find the '0's then count them.

We can then use our existing `min` function to find the fewest 0s.

> On that layer, what is the number of 1 digits multiplied by the number of 2 digits?

Count the number of 1 and 2 digits using the same method as we counted the 0 digits, then multiply.
