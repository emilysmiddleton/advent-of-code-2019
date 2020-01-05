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
