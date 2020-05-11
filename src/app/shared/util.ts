export interface IBoard {
  0: null | 'crossed' | 'noughted';
  1: null | 'crossed' | 'noughted';
  2: null | 'crossed' | 'noughted';
  3: null | 'crossed' | 'noughted';
  4: null | 'crossed' | 'noughted';
  5: null | 'crossed' | 'noughted';
  6: null | 'crossed' | 'noughted';
  7: null | 'crossed' | 'noughted';
  8: null | 'crossed' | 'noughted';
}

export const board: IBoard = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null
};

export const COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

interface IScreenSates {
  START_SCREEN: string;
  ONGOING_GAME: string;
  GAME_FINISHED: string;
}

export const SCREEN_STATES: IScreenSates = {
  START_SCREEN: 'startScreen',
  ONGOING_GAME: 'ongoingGame',
  GAME_FINISHED: 'gameFinished'
};

interface ITurn {
  CROSS: string;
  NOUGHT: string;
}

export const TURN_STATE: ITurn = {
  CROSS: 'cross',
  NOUGHT: 'nought'
};

interface IResult {
  DRAW: string;
  CROSS: string;
  NOUGHT: string;
}

export const RESULT: IResult = {
  DRAW: 'draw',
  CROSS: 'cross',
  NOUGHT: 'nought'
};
