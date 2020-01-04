export function fuelRequired(mass: number): number {
    const result =  Math.floor(mass / 3) - 2;
    return result < 0 ? 0 : result;
}
