export type SpaceObject = {
    name: string,
    orbits: SpaceObject[]
};

export type OrbitGraph = Map<string, SpaceObject>;
