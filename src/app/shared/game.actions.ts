import { createAction, props } from '@ngrx/store';

export const nextTurn = createAction(
  '[Game Component] Next turn',
  props<{isFirstPlayerTurn: boolean}>()
);

export const nextGame = createAction(
  '[Game Component] Next game',
  props<{isFirstPlayerPlayCrosses: boolean}>()
);
