export function fuelRequired(mass: number): number {
    const result =  Math.floor(mass / 3) - 2;
    return result < 0 ? 0 : result;
}

export function totalFuel(mass: number): number {
    const fuel = fuelRequired(mass);
    if (fuel === 0) {
        return 0;
    }
    return fuel + totalFuel(fuel);
}
