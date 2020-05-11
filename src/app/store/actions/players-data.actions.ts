import { createAction, props } from '@ngrx/store';

import { State as PlayersDataState } from '../reducers/players-data.reducer';

export const setPlayersData = createAction('[Players data] Set Data', props<PlayersDataState>());
