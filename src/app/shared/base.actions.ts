import { createAction, props } from '@ngrx/store';
import { PlayersData } from './interfaces';
import { State } from './base.reducer';

export const startGame = createAction(
  '[Start-game Component] Start game',
  props<{ firstPlayerName: string; secondPlayerName: string }>()
);

export const finishGame = createAction(
  '[Game Component] Next game',
  props<PlayersData>()
);

export const resetScore = createAction(
  '[Finish-Game Component] Reset score',
  props<State>()
);

