export interface BaseState {
  isWinnerShown: boolean;
  isOngoingGame: boolean;
}

export interface GameState {
  isFirstPlayerTurn: boolean;
  isFirstPlayerPlaysCrosses: boolean;
}

export interface PlayersData {
  firstPlayer: Player;
  secondPlayer: Player;
}

export interface Player {
  score: number;
  name: string;
}

export interface Board {
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

export interface FiredShot {
  cell: number;
  state: 'crossed' | 'noughted';
  isFirstPlayerTurn: boolean;
}
