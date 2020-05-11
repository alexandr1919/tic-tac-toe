import { createReducer, on } from '@ngrx/store';

import { changeScreen, newGameAction, nextTurn } from '../actions/game.actions';
import { SCREEN_STATES, TURN_STATE } from '../../shared/util';


export interface State {
  screenState: string;
  turn: string;
  isFirstPlayerPlaysCrosses: boolean;
}

const initialState: State = {
  screenState: SCREEN_STATES.START_SCREEN,
  turn: TURN_STATE.CROSS,
  isFirstPlayerPlaysCrosses: true,
};

const reducer = createReducer(initialState,
  on(changeScreen, (state, props) => ({
    screenState: props.screenState,
    turn: props.turn,
    isFirstPlayerPlaysCrosses: props.isFirstPlayerPlaysCrosses
  })),
  on(nextTurn, (state, props) => ({
    ...state,
    turn: props.turn
  })),
  on(newGameAction, (state, props) => ({
    ...state,
    turn: TURN_STATE.CROSS,
    screenState: props.screenState
  })));

export function gameReducer(state, action) {
  return reducer(state, action);
}

export const getTurn = (state: State) => state.turn;
export const getRole = (state: State) => state.isFirstPlayerPlaysCrosses;
export const getScreenState = (state: State) => state.screenState;

