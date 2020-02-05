import { createAction, props } from '@ngrx/store';
import { PlayersData } from '../../shared/interfaces';
import { State } from '../reducers/base.reducer';

export const finishGame = createAction(
  '[Game Component] Next game',
  props<PlayersData>()
);

export const resetScore = createAction(
  '[Finish-Game Component] Reset score-module',
  props<State>()
);

