import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBase from './store/reducers/base.reducer';
import * as fromPlayersData from './store/reducers/players-data.reducer';
import * as fromGame from './store/reducers/game.reducer';
import * as fromBoard from './store/reducers/board.reducer';
import { Board, PlayersData } from './shared/interfaces';

export interface State {
  base: fromBase.State;
  game: fromGame.State;
  board: Board;
  playersData: PlayersData;
}

export const reducers: ActionReducerMap<State> = {
  base: fromBase.baseReducer,
  game: fromGame.gameReducer,
  board: fromBoard.boardReducer,
  playersData: fromPlayersData.playersDataReducer
};

export const getGameBaseState = createFeatureSelector<fromBase.State>('base');
export const getPlayersDataState = createFeatureSelector<fromPlayersData.State>('playersData');
export const getGameState = createFeatureSelector<fromGame.State>('game');
export const getBoardState = createFeatureSelector<Board>('board');

export const getScreenState = createSelector(getGameBaseState, fromBase.getScreenState);
export const getWinnerState = createSelector(getGameBaseState, fromBase.getWinnerState);
//export const getPlayersData = createSelector(getGameBaseState, fromBase.getPlayersData);

export const getTurn = createSelector(getGameState, fromGame.getTurn);
// export const getCrossRole = createSelector(getGameState, fromGame.getCrossRole);
