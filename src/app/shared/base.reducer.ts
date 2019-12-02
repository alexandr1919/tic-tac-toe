import { createReducer, on } from '@ngrx/store';
import { startGame, finishGame, resetScore } from './base.actions';

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
  isStartScreen: boolean;
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
  isStartScreen: true
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
    isStartScreen: false
  })),
  on(finishGame, (state, props) => ({
    ...state,
    ...props
  })),
  on(resetScore, (state = initialState) => ({
    ...state
  }))
);

export function baseReducer(state, action) {
  return reducer(state, action);
}

export const getScreenState = (state: State) =>  state.isStartScreen;
export const getPlayersData = (state: State) => state.playersData;
