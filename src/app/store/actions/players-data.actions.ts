import { createAction, props } from '@ngrx/store';

export const startGame = createAction('[Start-game Component] Start game', props<{ firstPlayerName: string; secondPlayerName: string }>());
