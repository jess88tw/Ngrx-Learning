import { createAction, props } from '@ngrx/store';

export const setCount = createAction(
  '[Counter] Set Count',
  props<{ count: number }>()
);
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
