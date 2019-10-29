import { createAction, props } from '@ngrx/store';

export const startGame = createAction(
  '[Start-game Component] Start game',
  props<{ firstPlayerName: string; secondPlayerName: string }>()
);
export const finishGame = createAction(
  '[Finish-game Component] Finish game',
  props<{ firstPlayerName: string, secondPlayerName: string, firstPlayerScore: number, secondPlayerScore: number}>()
);
