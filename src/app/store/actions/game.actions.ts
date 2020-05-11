import { createAction, props } from '@ngrx/store';

import * as fromGame from '../reducers/game.reducer';

export const changeScreen = createAction('[Game] Change Screen', props<fromGame.State>());
export const nextTurn = createAction('[Game] Next turn', props<{turn: string}>());
export const newGameAction = createAction('[Game] New Game', props<{screenState: string}>());
