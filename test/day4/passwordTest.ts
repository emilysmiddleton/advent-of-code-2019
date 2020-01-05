import test from 'ava';
import { validPassword } from '../../src/day4/password';

test('111111 ok', t => {
    t.true(validPassword(111111));
});

test('134458 ok', t => {
    t.true(validPassword(134458));
});

test('223450 not ok', t => {
    t.false(validPassword(223450));
});

test('123789 not ok', t => {
    t.false(validPassword(123789));
});
