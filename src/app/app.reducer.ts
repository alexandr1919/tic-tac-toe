import * as fromBase from './shared/base.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  base: fromBase.State;
}

export const reducers: ActionReducerMap<State> = {
  base: fromBase.baseReducer
};

export const getBaseState = createFeatureSelector<fromBase.State>('base');

export const getGameState = createSelector(getBaseState, fromBase.getGameState);
export const getPlayersData = createSelector(getBaseState, fromBase.getPlayersData);

