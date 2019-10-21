import { createReducer, on } from '@ngrx/store';
import { startGame } from '../app.actions';

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

const initialState: State = {
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

const reducer = createReducer(initialState,
  on(startGame, (state, props) => ({
    firstPlayer: {
      name: props.firstPlayerName,
      score: 0
    },
    secondPlayer: {
      name: props.secondPlayerName,
      score: 0
    },
    isOngoingGame: true
  })));

export function baseReducer(state, action) {
  return reducer(state, action);
}

export const getGameState = (state: State) =>  state.isOngoingGame;
