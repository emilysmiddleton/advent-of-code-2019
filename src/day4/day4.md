# Day 4

See [part 1](problem.md), or [the original online](https://adventofcode.com/2019/day/4/).

## Parsing the input

The input is a range separated by a hypen; split on the hyphen and convert each part to a number.

I've chosen to define a range type.

```
{
    from: number
    to: number
}
```

### Approach

We could either try and construct numbers that meet the criteria:

- starting with first digit 2
- get next possible digits (2-9)
- for each of those possibilities, calculate next possibilities and so on.

Alternatively we could loop over all numbers in our range and test them against each condition.

I'm going to try the latter as it seems simpler.

### Conditions

If we start with testing all the number in our range, we will already satisfy the first two conditions.

- Two adjacent digits are the same (like 22 in 122345)
- Going from left to right, the digits never decrease

If we split the 6 digits into individual digits, then we can look at each pair and check these conditions

### Summary

In pseudocode, to check a number
```
adjacentSame = false
for each pair of adjacent digits
    if first > second
        doesn't meet criteria
    if first = second
        adjacentSame = true
if !adjacentSame
    doesn't meet criteria
```
