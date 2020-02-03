import { createAction, props } from '@ngrx/store';
import { Board } from './interfaces';

export const shoot = createAction('[Current Game Component] Shoot', props<{[key: number]: 'crossed' | 'noughted'}>());
