##Day 22

See https://adventofcode.com/2019/day/22

## Part 1

### Modular arithmetic

This task makes use of modular arithmetic. 
This can be thought of by imagining numbers in a circle rather than the traditional number line,
like with a clock. At 11am, 3 hours later it is 2pm:

``` 
(11 + 3) mod 12
=> 14 mod 12
=> 2
```

For negative numbers, going backwards also loops round. 5 hours _before_ 3pm is 10am:

```
(3 - 5) mod 12
=> -2 mod 12
=> 10
```

You can also think of `x mod m` if as "the remainder when x is divided by m"

#### JavaScript

The `mod` operator in JavaScript is `%`.

`14 % 12`

Note that JavaScript doesn't handle negative numbers as above.

`-14 % 12` yields `-2`.

See 
[The JavaScript Modulo Bug](https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm)
for further reading (but is it a bug or a feature?)
    
_(Since I find it easiest to work with positive numbers, 
I've defined my own `mod` function that will always give a positive result.)_
 
### Shuffle operations

The problem defines three shuffle operations:

- deal into new stack
- cut N cards
- deal with increment N

For a deck of size `m`, let's consider the effect of each of these on a given card at position `x`.

#### Deal into new stack

Consider a deck of 5 cards, reversed:

`[0, 1, 2, 3, 4]`
becomes<br/>
`[4, 3, 2, 1, 0]`

This is essentially a reverse operation, `m + 1 - x`.
If we give the result `mod m`, we don't need to add `m`, it will be normalised for us.

**The card at position `x` will end up at position `1 - x`**

#### Cut N cards

This takes the first `n` cards and puts them at the end of the deck.

Consider a deck of 5 cards, cut 2:

`[0, 1, 2, 3, 4]`
becomes<br/>
`[2, 3, 4, 0, 1]`

The movements of each card are:
- 0 -> 3
- 1 -> 4
- 2 -> 0
- 3 -> 1
- 4 -> 2

Cards 0 and 1 shifted `m` positions to the right, to go after the others:

[_, _, 2, 3, 4, 0, 1]

Then all cards moved 2 to the left to fill in the gaps

[2, 3, 4, 0, 1]

So the formula is:
```
if (x < n)
    add m
minus n
```

But if we give the result `mod m`, we don't need to add `m`, it will be normalised for us.

So we can simplify this: 
**the card at position `x` will end up at position `(x - n) mod m`**

#### Deal with increment N

Consider a deck of 5 cards, dealt with increment 2.

This deals out all cards, starting with position 0, leaving a gap of `n` between each card. 
Start by dealing out the cards, not worrying about wrapping round or leaving gaps:

`[0, 1, 2, 3, 4]`
becomes<br/>
`[0, _, 1, _, 2, _, 3, _, 4]`

- 0 -> 0
- 1 -> 2
- 2 -> 4
- 3 -> 6
- 4 -> 8

We can then apply `mod 5` to wrap around:

- 0 -> 0 mod 5 -> 0
- 1 -> 2 mod 5 -> 2
- 2 -> 4 mod 5 -> 4
- 3 -> 6 mod 5 -> 1
- 4 -> 8 mod 5 -> 3

**the card at position `x` will end up at position `(x * n) mod m`**

### Summary

For a 
- deck of size m
- a given position x

The formula to apply to get it to its new position, for each operation, is:

| Operation | Formula |
|:----------|:--------|
|Deal into new stack | (1 - x) mod m |
|Cut N cards | (x - n) mod m |
|Deal with increment N | (x * n) mod m |

This is enough to complete part 1. 

- Start with `x=19` (since the deck starts in order)
- For each of your shuffles, apply the formula above
- Answer is the end result

```
result = 2019
for (shuffle)
   if (deal into new stack)
     result = (1 - result) mod m
   if (cut n)
     result = (result - n) mod m
   if (deal with increment n)
     result = (result * n) mod m
return result
```

## Part 2

The first problem we have in part 2 is the number of repeats we have.
The code for part 1 is not going to efficient enough to be run that many times.

We can instead come up with a single mathematical formula that combines all shuffles.

### Combining shuffles

The first two shuffles of my input are:

- deal with increment 16
- cut -7810
- deal with increment 70

For a position `x`, applying them sequentially gives:

```
result = (x * 16) mod m
result = (result - -7810) mod m
       = (16x + 7810) mod m
result = (result * 70) mod m
       = (1120x + 546700) mod n
```  

(For part 1, where `m=10007`, this could be simplified further to `1120x + 6322`)

Continue this logic for all 100 shuffles. For my input, this gave me the simplified formula of

- `3103x + 2718 mod 10007` for part 1
- `104382429312804x + 14756832777395` for part 2

We can check this:

```
3103 * 2019 + 2718 mod 10007 =>
6267675 mod 10007 =>
3293
```

This was the same answer we got for part 1.

### Repeating shuffles

Now we've got a single formula rather than 100, but that's still not going to be efficient 
enough to repeat it as many times as we need to.

To apply `3103x - 2718 mod 10007` twice, we have

```
(3103x + 2718) * 3103 + 2718 mod 10007 =>
(9628609x + 8741151 + 2718) mod 10007 =>
1875x + 996 mod 10007
```

A quick way to get to a large number of repeats is to keep doubling:

|Repeats|Formula|
|:------|:------|
|1 | 3103x + 2718|
|2 | 1875x + 771|
|4 | 3168x + 5388|
|8 | 9210x + 2630|

These can then be combined to get the number you need: e.g. 10 repeats is 8 + 2, so

```
(1875x + 771) * 9210 + 2630 mod 10007 =>
17268750x + 7103540 mod 10007 =>
6675x + 8577 mod 10007
```

So after 10 repeats of the shuffles, card 2019 will be at 

```
(6675 * 2019 + 8577) mod 10007 => 
13485402 mod 10007 =>
5973
```

### Reversing the shuffle

After simplifying our 100 shuffles to a single formula, then repeating 101,741,582,076,661 times, now have a simple, 
efficient formula that will tell us where a particular card will end up 
after a large number of repeats of our 100 shuffles.

The second problem is that part 2 doesn't ask us where a particular card ends up; it asks us what card
ends up in position 2020.

Going back to part 1 (because the numbers are easier), if instead we'd been asked for the card ad position 3293,
we'd be looking for `x` where

`3103x + 2718 mod 100007 = 3293`

We know that `x=2019`, but how do we calculate that?

#### Modular inverses

How do you reverse `3x mod 13`?

The modular inverse of `3 mod 13` is `9`.

e.g. 
```
5 * 3 mod 13 => 
15 mod 13 =>
2

2 * 9 mod 13 =>
18 mod 13 =>
5
```

To reverse our formula, `3103x + 2718 mod 100007`,  we need to know the modular inverse of 3103.

An [online calculator](https://planetcalc.com/3311/) tells us that it is 1448.

```
(3293 - 2718) * 1448 mod 10007 =>
575 * 1448 mod 10007 =>
832600 mod 10007 =>
2019
```

How can we calculate this for ourselves in code?

##### Extended Euclidean Algorithm

We calculate the modular inverse using something called the 
[Extended Euclidean Algorithm](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse#Extended_Euclidean_algorithm)

For the basic algorithm, we keep track of some values over several iterations. 
Here I'll use the example of `3 mod 13`. We track:

- The value (3 to start)
- The divisor (13 to start)
- The quotient (value / divisor rounded down)
- The remainder (value mod divisor)

We keep going, moving divisor => value and remainder -> value, until the value is < 2.

|i|Value |Divisor |Quotient |Remainder |
|:--------|:-----|:-------|:--------|:---------|
|0        | 3    | 13     | 0       | 3        |
|1 | 13 (divisor from previous round)| 3 (remainder from previous round) | 4 | 1 |
|2 | 3 | 1 | 3 | 0 |
|3 | 1 | 0 | - | - |

To calculate the modular inverse we'll need some extra calculations:
- x, starts at 1
- y, starts at 0

Each round x becomes the previous value of y, and y is calculated as:
`y = previous value of x - (quotient * x)`

|i|Value |Divisor |Quotient |Remainder |x   |y   |
|:--------|:-----|:-------|:--------|:---------|:---|:---|
|0        | 3    | 13     | 0       | 3        |1   |0   |
|1        | 13   | 3      | 4       | 1        |0   |1 - (4 * 0)<br/> = -4 |
|2        | 3    | 1      | 3       | 0        |-4  |0 - (3 * -4)<br/> = 13 |
|3        | 1    | 0      | -       | -        |   |

The modular inverse is the last value of x. In this case -4, or 7 (since -4 mod 13 = 7).

#### JavaScript

JavaScript handles large numbers badly, and if you use the basic number type you'll get rounding errors.
I used a node library for dealing with large numbers precisely - [BigNumber by MikeMcl](https://github.com/MikeMcl/bignumber.js#readme)

### Summary

- Combine your 100 starting shuffles into a single function
- Repeat that function (using powers of two for efficiency) to get another single function
- Find the modular inverse to get another single function representing the inverse
- Apply that final function to 2020 to get your answer
- Be careful of how large numbers are handled in your chosen language
