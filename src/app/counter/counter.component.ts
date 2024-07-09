import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../state/counter.actions';
import { CounterState } from '../state/counter.reducer';
import { selectCount } from '../state/counter.selectors';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  private readonly store: Store<{ counter: CounterState }> = inject(Store);

  globalCount$ = this.store.select(selectCount);
  localCount = signal(0);

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
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
    this.store.dispatch(CounterActions.setCount({ count: this.localCount() }));
  }
}
