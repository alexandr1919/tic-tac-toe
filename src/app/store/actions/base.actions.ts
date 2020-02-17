import { createAction, props } from '@ngrx/store';

export const newGame = createAction('[Game Component] Next game', props<{}>());
export const finishGame = createAction('[Game Component] Finish game', props<{}>());
