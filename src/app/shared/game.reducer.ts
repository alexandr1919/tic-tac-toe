import { createReducer, on } from '@ngrx/store';
import { nextTurn } from './game.actions';

export interface State {
  turn: string;
  crossRole: string;
}

const initialState: State = {
  turn: 'firstPlayer',
  crossRole: 'firstPlayer'
};

const reducer = createReducer(initialState,
  on(nextTurn, (state, props) => ({
      ...state,
      crossRole: 'secondPlayer'
  })));

export function gameReducer(state, action) {
  return reducer(state, action);
}

export const getTurn = (state: State) => state.turn;
export const getCrossRole = (state: State) => state.crossRole;
