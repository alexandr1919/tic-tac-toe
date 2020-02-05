import { createReducer, on } from '@ngrx/store';
import { nextGame, nextTurn } from '../actions/game.actions';

export interface State {
  isFirstPlayerTurn: boolean;
  isFirstPlayerPlaysCrosses: boolean;
}

const initialState: State = {
  isFirstPlayerTurn: true,
  isFirstPlayerPlaysCrosses: true,
};

const reducer = createReducer(initialState,
  on(nextTurn, (state, props) => {
    console.log(props)
    return {
      ...state,
      isFirstPlayerTurn: props.isFirstPlayerTurn
    }
  }),
  on(nextGame, (state, props) => ({
    ...state,
    isFirstPlayerPlaysCrosses: props.isFirstPlayerPlayCrosses
  })));

export function gameReducer(state, action) {
  return reducer(state, action);
}
//
// export const getTurn = (state: State) => state.isFirstPlayerTurn;
// export const getCrossRole = (state: State) => state.isFirstPlayerPlaysCrosses;
