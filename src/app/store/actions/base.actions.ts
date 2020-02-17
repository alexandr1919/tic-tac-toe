import { createAction, props } from '@ngrx/store';
import { PlayersData, BaseState } from '../../shared/interfaces';
import { State } from '../reducers/base.reducer';

export const newGame = createAction('[Game Component] Next game', props<{}>());
export const finishGame = createAction('[Game Component] Finish game', props<{}>());
export const resetScore = createAction('[Finish-Game Component] Reset score-module', props<State>());

