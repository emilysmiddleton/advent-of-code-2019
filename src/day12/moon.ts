import { Moon } from './types';

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
