import { createReducer, on } from '@ngrx/store';
import { Board as State } from '../../shared/interfaces';
import { shoot } from '../actions/board.actions';

const initialState: State = {
  0: 'empty',
  1: 'empty',
  2: 'empty',
  3: 'empty',
  4: 'empty',
  5: 'empty',
  6: 'empty',
  7: 'empty',
  8: 'empty',
};

const reducer = createReducer(initialState, on(shoot, (state, props) => ({
  ...state
})));

export function boardReducer(state, action) {
  return reducer(state, action);
}

