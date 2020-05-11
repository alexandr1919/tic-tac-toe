import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlayersData from './store/reducers/players-data.reducer';
import * as fromGame from './store/reducers/game.reducer';

export interface State {
  game: fromGame.State;
  playersData: fromPlayersData.State;
}

export const reducers: ActionReducerMap<State> = {
  game: fromGame.gameReducer,
  playersData: fromPlayersData.playersDataReducer
};

export const getGameState = createFeatureSelector<fromGame.State>('game');
export const getPlayersDataState = createFeatureSelector<fromPlayersData.State>('playersData');

export const getScreenState = createSelector(getGameState, fromGame.getScreenState);
export const getRoleState = createSelector(getGameState, fromGame.getRole);
export const getTurnState = createSelector(getGameState, fromGame.getTurn);
