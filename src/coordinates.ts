export type Coordinate = {
    x: number,
    y: number
};

export type Coordinate3D = {
    x: number,
    y: number,
    z: number
};

export type CoordinatesGrid = Coordinate[][];

export function createGrid(width: number, height: number): CoordinatesGrid {
    const grid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push({ x, y });
        }
        grid.push(row);
    }
    return grid;
}
