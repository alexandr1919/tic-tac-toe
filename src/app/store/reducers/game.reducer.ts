import { createReducer, on } from '@ngrx/store';
import { nextTurn } from '../actions/game.actions';

export interface State {
  isFirstPlayerTurn: boolean;
  isFirstPlayerPlaysCrosses: boolean;
}

const initialState: State = {
  isFirstPlayerTurn: true,
  isFirstPlayerPlaysCrosses: true,
};

const reducer = createReducer(initialState,
  on(nextTurn, (state, props) => ({
    ...state,
    isFirstPlayerTurn: props.isFirstPlayerTurn
  })));

export function gameReducer(state, action) {
  return reducer(state, action);
}

export const getTurn = (state: State) => state.isFirstPlayerTurn;
