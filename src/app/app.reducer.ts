import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBase from './store/reducers/base.reducer';
import * as fromPlayersData from './store/reducers/players-data.reducer';
import * as fromGame from './store/reducers/game.reducer';
import * as fromBoard from './store/reducers/board.reducer';
import { Board } from './shared/interfaces';

export interface State {
  base: fromBase.State;
  current: fromGame.State;
  board: Board;
}

export const reducers: ActionReducerMap<State> = {
  base: fromBase.baseReducer,
  current: fromGame.gameReducer,
  board: fromBoard.boardReducer
};

export const getGameBaseState = createFeatureSelector<fromBase.State>('base');
export const getPlayersDataState = createFeatureSelector<fromPlayersData.State>('players-data');
export const getCurrentGameState = createFeatureSelector<fromGame.State>('current');
export const getBoardState = createFeatureSelector<Board>('board')

export const getScreenState = createSelector(getGameBaseState, fromBase.getScreenState);
export const getWinnerState = createSelector(getGameBaseState, fromBase.getWinnerState);
//export const getPlayersData = createSelector(getGameBaseState, fromBase.getPlayersData);

export const getTurn = createSelector(getCurrentGameState, fromGame.getTurn);
export const getCrossRole = createSelector(getCurrentGameState, fromGame.getCrossRole);
