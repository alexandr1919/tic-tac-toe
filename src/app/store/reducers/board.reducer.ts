import { createReducer, on } from '@ngrx/store';
import { Board as State } from '../../shared/interfaces';
import { shoot } from '../actions/board.actions';

const initialState: State = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
};

const reducer = createReducer(initialState, on(shoot, (state, props) => (props)));

export function boardReducer(state, action) {
  return reducer(state, action);
}

