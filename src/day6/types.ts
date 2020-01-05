export type SpaceObject = {
    name: string,
    orbitedBy: SpaceObject[]
};

export type OrbitGraph = Map<string, SpaceObject>;
