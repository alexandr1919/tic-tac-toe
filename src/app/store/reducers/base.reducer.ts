import { createReducer, on } from '@ngrx/store';
import { finishGame } from '../actions/base.actions';
import { startGame } from '../actions/players-data.actions';

export interface State {
  isOngoingGame: boolean;
  isWinnerShown: boolean;
}

const initialState: State = {
  isOngoingGame: false,
  isWinnerShown: false
};

const reducer = createReducer(initialState,
  on(startGame, () => ({
    isOngoingGame: true,
    isWinnerShown: false
  }))/*,
  on(finishGame, (state, props) => ({
    ...state,
    ...props,
    isWinnerShown: true
  }))*/);

export function baseReducer(state, action) {
  return reducer(state, action);
}

export const getScreenState = (state: State) =>  state.isOngoingGame;
export const getWinnerState = (state: State) => state.isWinnerShown;
