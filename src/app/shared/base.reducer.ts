import { createReducer, on } from '@ngrx/store';
import { startGame, finishGame } from './base.actions';

export interface State {
  playersData: {
    firstPlayer: {
      name: string,
      score: number
    };
    secondPlayer: {
      name: string,
      score: number
    };
  };
  isOngoingGame: boolean;
  isWinnerShown: boolean;
}

const initialState: State = {
  playersData: {
    firstPlayer: {
      name: '',
      score: 0
    },
    secondPlayer: {
      name: '',
      score: 0
    }
  },
  isOngoingGame: false,
  isWinnerShown: false
};

const reducer = createReducer(initialState,
  on(startGame, (state, props) => ({
    playersData: {
      firstPlayer: {
        name: props.firstPlayerName,
        score: 0
      },
      secondPlayer: {
        name: props.secondPlayerName,
        score: 0
      },
    },
    isOngoingGame: true,
    isWinnerShown: false
  })),
  on(finishGame, (state, props) => ({
    ...state,
    ...props,
    isWinnerShown: true
  })));

export function baseReducer(state, action) {
  return reducer(state, action);
}

export const getScreenState = (state: State) =>  state.isOngoingGame;
export const getWinnerState = (state: State) => state.isWinnerShown;
export const getPlayersData = (state: State) => state.playersData;
