import test from 'ava';
import { getCode } from '../../src/intcode/program';

test('Code 1 Position Position', t => {
    const opCode = 1;
    const code = getCode(-1, opCode);
    t.is(code.serialise(), '1 - Position,Position');
});

test('Code 1 Position Immediate', t => {
    const opCode = 1001;
    const code = getCode(-1, opCode);
    t.is(code.serialise(), '1 - Position,Immediate');
});

test('Code 1 Immediate Position', t => {
    const opCode = 101;
    const code = getCode(-1, opCode);
    t.is(code.serialise(), '1 - Immediate,Position');
});

test('Code 1 Immediate Immediate', t => {
    const opCode = 1101;
    const code = getCode(-1, opCode);
    t.is(code.serialise(), '1 - Immediate,Immediate');
});
