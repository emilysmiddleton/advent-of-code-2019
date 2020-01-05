export function parsePathOperation(instruction: string): PathOperation {
    return {
        direction: instruction.substring(0, 1),
        length: Number.parseInt(instruction.substring(1), 10)
    };
}

export function parseOperations(line: string): PathOperation[] {
    return line.split(',').map(op => parsePathOperation(op));
}
