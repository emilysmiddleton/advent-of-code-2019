import BigNumber from 'bignumber.js';

export type Shuffle = {
    op: string,
    param?: number
};

export type SimplifiedShuffle = {
    multiply: BigNumber,
    add: BigNumber
};
