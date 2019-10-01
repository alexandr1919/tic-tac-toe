export interface State {
  firstPlayer: {
    name: string,
    score: number
  };
  secondPlayer: {
    name: string,
    score: number
  };
  isOngoingGame: boolean;
}

const initialState = {
  firstPlayer: {
    name: '',
    score: 0
  },
  secondPlayer: {
    name: '',
    score: 0
  },
  isOngoingGame: false
};
