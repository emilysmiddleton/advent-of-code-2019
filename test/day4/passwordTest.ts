import test from 'ava';
import { validPasswordPart1, validPasswordPart2 } from '../../src/day4/password';

test('111111 ok', t => {
    t.true(validPasswordPart1(111111));
});

test('134458 ok', t => {
    t.true(validPasswordPart1(134458));
});

test('223450 not ok', t => {
    t.false(validPasswordPart1(223450));
});

test('123789 not ok', t => {
    t.false(validPasswordPart1(123789));
});

test('111111 not ok', t => {
    t.false(validPasswordPart2(111111));
});

test('112233 ok', t => {
    t.true(validPasswordPart2(112233));
});

test('123444 not ok', t => {
    t.false(validPasswordPart2(123444));
});

test.only('111122 ok', t => {
    t.true(validPasswordPart2(111122));
});

test.only('778888 ok', t => {
    t.true(validPasswordPart2(778888));
});
