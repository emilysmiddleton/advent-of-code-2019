import { Moon } from './types';

const axes = ['x', 'y', 'z'];

export function applyGravity(moon1: Moon, moon2: Moon, axis: string): void {
    const value1 = moon1.position[axis];
    const value2 = moon2.position[axis];
    if (value1 < value2) {
        moon1.velocity[axis] += 1;
        moon2.velocity[axis] -= 1;
    }
    if (value1 > value2) {
        moon1.velocity[axis] -= 1;
        moon2.velocity[axis] += 1;
    }
}

/**
 * simply add the velocity of each moon to its own position.
 * For example, if Europa has a position of x=1, y=2, z=3 and a velocity of x=-2, y=0,z=3,
 * then its new position would be x=-1, y=2, z=6.
 * This process does not modify the velocity of any moon.
 */
export function applyVelocity(moon: Moon): void {
    axes.forEach(axis => moon.position[axis] += moon.velocity[axis]);
}

export function applyGravityToAll(moons: Moon[]): void {
    for (let i = 0; i < moons.length; i++) {
        for (let j = i + 1; j < moons.length; j++) {
            axes.forEach(axis => applyGravity(moons[i], moons[j], axis));
        }
    }
}

export function applyVelocityToAll(moons: Moon[]): void {
    moons.forEach(applyVelocity);
}
