import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { CounterActions } from '../state/counter.actions';
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

  // ngrx 的 observable 物件
  globalCount$ = this.store.select(selectCount);
  // core signal 物件
  localCount = signal(0);
  // 將 ngrx observable 轉換成 signal 物件
  test = toSignal(this.globalCount$, { initialValue: 0 });
  // 並且將根據 test 有變動時，重新計算 test2
  test2 = computed(() => {
    console.log('test2', this.test());
    return this.test();
  });

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
