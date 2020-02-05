import { createReducer, on } from '@ngrx/store';
import { finishGame } from '../actions/base.actions';
import { Player } from '../../shared/interfaces';
import { startGame } from '../actions/players-data.actions';


export interface State {
  firstPlayer: Player;
  secondPlayer: Player;
}

const initialState: State = {
  firstPlayer: {
    name: '',
    score: 0
  },
  secondPlayer: {
    name: '',
    score: 0
  }
};

const reducer = createReducer(initialState,
  on(startGame, (state, props) => ({
    firstPlayer: {
      name: props.firstPlayerName,
      score: 0
    },
    secondPlayer: {
      name: props.secondPlayerName,
      score: 0
    }
  }))
  /*on(finishGame, (state, props) => ({
    ...state,
    ...props,
    isWinnerShown: true
  }))*/);

export function playersDataReducer(state, action) {
  return reducer(state, action);
}
