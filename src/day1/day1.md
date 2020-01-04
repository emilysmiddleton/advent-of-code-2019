# Day 1

See [part 1](problem.md), or [the original online](https://adventofcode.com/2019/day/1/).

## Parsing the input

Each line in the input file represents the mass of a module. Little parsing is needed here beyond converting
from a string to a number. 

In TypeScript we use `Number.parseInt`

## Part 1

### Fuel required

> Fuel required to launch a given module is based on its mass. 
> Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

One straightforward calculation for each input line. 

In TypeScript `Math.floor` can be used to round down.

### Puzzle answer

To get the answer we'll add up the results of the fuel required function.

In TypeScript we can use `Array.map` to apply the calculation for each input,
and then `Array.reduce` to sum them.

## Part 2

### Negative fuel

> Any mass that would require negative fuel should instead be treated as if it requires zero fuel

We can reuse our fuel calculator from part 1, but need to ensure it will return 0 
instead of a negative value.

### Fuel required for fuel

> However, that fuel also requires fuel, and that fuel requires fuel, and so on

One example given:
```
  fuel for 1969
= 654 + fuel for 654
= 654 + 216 + fuel for 216
= 654 + 216 + 70 + fuel for 70
= 654 + 216 + 70 + 21 + fuel for 21
= 654 + 216 + 70 + 21 + 5 + fuel for 5
= 654 + 216 + 70 + 21 + 5 + 0
```

This lends itself nicely to using a _recursive function_; one that calls itself repeatedly with a new value.

All recursive functions need a 'stop' condition, in this case if will stop when the fuel required is 0.

In pseudocode:

```
function totalFuel(mass)
    fuel = fuelRequired(mass)      // our previous function
    if (fuel = 0) return 0         // stop condition
    return fuel + totalFuel(fuel)  // recurse
```

### Problem answer

To get the answer we'll add up the results of the fuel required function as before,
but using our new recursive function that takes the additional requirements into account.
