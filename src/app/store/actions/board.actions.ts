import { createAction, props } from '@ngrx/store';
import { Board } from '../../shared/interfaces';

export const shoot = createAction('[Current Game Component] Shoot', props<Board>());
