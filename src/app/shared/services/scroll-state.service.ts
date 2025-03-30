import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  private trendindScrollState = signal(0);

  setScrollState(scroll: number): void {
    this.trendindScrollState.set(scroll);
  }

  getScrollState(): number {
    return this.trendindScrollState();
  }


}
