# Day 10

See [part 1 and 2](problem.md), or [the original online](https://adventofcode.com/2019/day/10/).

## Data Modelling

We used a grid - an array of arrays - in day 8; we'll do the same here.
To simplify later code, we can make this an array of booleans:
true if that spot contains an asteroid, false otherwise.

## Parsing the input

For each line, use `split` to turn into an array and then map each character to a boolean.
