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
export const getGameState = createFeatureSelector<fromGame.State>('game');

export const getScreenState = createSelector(getBaseState, fromBase.getScreenState);
export const getPlayersData = createSelector(getBaseState, fromBase.getPlayersData);

export const getTurn = createSelector(getGameState, fromGame.getTurn);
export const getCrossRole = createSelector(getGameState, fromGame.getCrossRole);
