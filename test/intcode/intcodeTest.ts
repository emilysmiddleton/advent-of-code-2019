import test from 'ava';
import { Register } from '../../src/intcode/register';
import { runProgram } from '../../src/intcode/program';

test('Day 2 - 1,0,0,0,99', t => {
    const input = [1, 0, 0, 0, 99];
    const reg = new Register(input);
    runProgram(reg);
    t.is(reg.serialise(), '{"v0":2,"v1":0,"v2":0,"v3":0,"v4":99}');
});

test('Day 2 - 2,3,0,3,99', t => {
    const input = [2, 3, 0, 3, 99];
    const reg = new Register(input);
    runProgram(reg);
    t.is(reg.serialise(), '{"v0":2,"v1":3,"v2":0,"v3":6,"v4":99}');
});

test('Day 2 - 2,4,4,5,99,0', t => {
    const input = [2, 4, 4, 5, 99, 0];
    const reg = new Register(input);
    runProgram(reg);
    t.is(reg.serialise(), '{"v0":2,"v1":4,"v2":4,"v3":5,"v4":99,"v5":9801}');
});

test('Day 2 - 1,1,1,4,99,5,6,0,99', t => {
    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const reg = new Register(input);
    runProgram(reg);
    t.is(reg.serialise(), '{"v0":30,"v1":1,"v2":1,"v3":4,"v4":2,"v5":5,"v6":6,"v7":0,"v8":99}');
});

test('Day 5 - 3,0,4,0,99', t => {
    const input = [3, 0, 4, 0, 99];
    const reg = new Register(input);
    runProgram(reg, 143);
    t.is(reg.serialise(), '{"v0":143,"v1":0,"v2":4,"v3":0,"v4":99}');
    t.is(reg.getOutput(), 143);
});

test('Day 5 - 1101,100,-1,4,0', t => {
    const input = [1101, 100, -1, 4, 0];
    const reg = new Register(input);
    runProgram(reg, 143);
    t.is(reg.serialise(), '{"v0":1101,"v1":100,"v2":-1,"v3":4,"v4":99}');
});
