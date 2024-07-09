import { createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0,
};

// export const counterReducer = createReducer(
//   initialState,
//   on(setCount, (state, { count }) => ({ ...state, count })),
//   on(increment, (state) => ({ ...state, count: state.count + 1 })),
//   on(decrement, (state) => ({ ...state, count: state.count - 1 })),
//   on(reset, (state) => ({ ...state, count: 0 }))
// );

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.setCount, (state, { count }) => ({ ...state, count })),
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1,
  })),
  on(CounterActions.reset, (state) => ({ ...state, count: 0 }))
);
