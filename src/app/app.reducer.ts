import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBase from './shared/base.reducer';
import * as fromGame from './shared/game.reducer';

export interface State {
  base: fromBase.State;
  current: fromGame.State;
}

export const reducers: ActionReducerMap<State> = {
  base: fromBase.baseReducer,
  current: fromGame.gameReducer
};

export const getGameBaseState = createFeatureSelector<fromBase.State>('base');
export const getCurrentGameState = createFeatureSelector<fromGame.State>('current');

export const getScreenState = createSelector(getGameBaseState, fromBase.getScreenState);
export const getWinnerState = createSelector(getGameBaseState, fromBase.getWinnerState);
export const getPlayersData = createSelector(getGameBaseState, fromBase.getPlayersData);

export const getTurn = createSelector(getCurrentGameState, fromGame.getTurn);
export const getCrossRole = createSelector(getCurrentGameState, fromGame.getCrossRole);
