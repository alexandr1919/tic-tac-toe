import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBase from './shared/base.reducer';
import * as fromGame from './shared/game.reducer';

export interface State {
  base: fromBase.State;
  game: fromGame.State;
}

export const reducers: ActionReducerMap<State> = {
  base: fromBase.baseReducer,
  game: fromGame.gameReducer
};

export const getBaseState = createFeatureSelector<fromBase.State>('base');
export const getGameState = createFeatureSelector<fromBase.State>('game');

export const getBaseGameState = createSelector(getBaseState, fromBase.getGameState);
export const getPlayersData = createSelector(getBaseState, fromBase.getPlayersData);

