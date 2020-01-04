# Day 1

See [part 1](problem-part-1.md), or [the original online](https://adventofcode.com/2019/day/1/).

## Parsing the input

Each line in the input file represents the mass of a module. Little parsing is needed here beyond converting
from a string to a number. 

In TypeScript we use `Number.parseInt`

## Fuel required

> Fuel required to launch a given module is based on its mass. 
> Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

One straightforward calculation for each input line. 

In TypeScript `Math.floor` can be used to round down.
