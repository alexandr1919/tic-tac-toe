import { createAction, props } from '@ngrx/store';
import { PlayersData } from './interfaces';

export const startGame = createAction(
  '[Start-game Component] Start game',
  props<{ firstPlayerName: string; secondPlayerName: string }>()
);

export const finishGame = createAction(
  '[Game Component] Next game',
  props<PlayersData>()
);

