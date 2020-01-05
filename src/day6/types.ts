export type SpaceObject = {
    name: string,
    orbits: SpaceObject[],
    orbitedBy: SpaceObject[]
};

export type OrbitGraph = Map<string, SpaceObject>;
