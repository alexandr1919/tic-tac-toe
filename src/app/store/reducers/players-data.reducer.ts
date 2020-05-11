import { createReducer, on } from '@ngrx/store';

import { setPlayersData } from '../actions/players-data.actions';

export interface State {
  firstPlayer: {
    name: string;
    score: number;
  };
  secondPlayer: {
    name: string;
    score: number;
  };
}

const initialState: State = {
  firstPlayer: {
    name: null,
    score: 0
  },
  secondPlayer: {
    name: null,
    score: 0
  }
};

const reducer = createReducer(initialState,
  on(setPlayersData, (state, props) => ({
    firstPlayer: props.firstPlayer,
    secondPlayer: props.secondPlayer
  })));

export function playersDataReducer(state, action) {
  return reducer(state, action);
}
