import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  decrement,
  increment,
  reset,
  setCount,
} from '../state/counter.actions';
import { CounterState } from '../state/counter.reducer';
import { selectCount } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-2.component.html',
  styleUrl: './counter-2.component.css',
})
export class Counter2Component {
  private readonly store: Store<{ counter: CounterState }> = inject(Store);

  globalCount$ = this.store.select(selectCount);
  localCount = signal(0);

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  incrementLocal() {
    this.localCount.set(this.localCount() + 1);
  }

  decrementLocal() {
    this.localCount.set(this.localCount() - 1);
  }

  resetLocal() {
    this.localCount.set(0);
  }

  setLocalToGlobal() {
    this.store.dispatch(setCount({ count: this.localCount() }));
  }
}