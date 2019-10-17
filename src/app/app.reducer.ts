import { createReducer, on } from '@ngrx/store';
import { startGame, finishGame } from './app.actions';

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

const _appReducer = createReducer(initialState,
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

export function appReducer(state, action) {
  return _appReducer(state, action);
}
