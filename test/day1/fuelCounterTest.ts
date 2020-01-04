import test from 'ava';
import { fuelRequired, totalFuel } from '../../src/day1/fuelCounter';

test('fuel required for mass 12', t => {
    t.is(2, fuelRequired(12));
});

test('fuel required for mass 14', t => {
    t.is(2, fuelRequired(14));
});

test('fuel required for mass 1969', t => {
    t.is(654, fuelRequired(1969));
});

test('fuel required for mass 100756', t => {
    t.is(33583, fuelRequired(100756));
});

test('fuel required for small amount is 0 not negative', t => {
    t.is(0, fuelRequired(2));
});

test('total fuel requirement for mass 14', t => {
    t.is(2, totalFuel(14));
});

test('total fuel requirement for mass 1969', t => {
    t.is(966, totalFuel(1969));
});

test('total fuel requirement for mass 100756', t => {
    t.is(50346, totalFuel(100756));
});
