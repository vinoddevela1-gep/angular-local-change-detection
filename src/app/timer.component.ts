import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {interval, map, Observable, timer} from "rxjs";
import internal from "node:stream";

@Component({
  selector: 'app-timer',
  template: `<span class="px-2">Last Updated: {{ lastUpdateInSeconds() | number:'1.0-0' }} Seconds</span> {{ logCd() }}`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    DecimalPipe,
    AsyncPipe
  ]
})
export class TimerComponent {
  @Input() lastUpdate = new Date();
  lastUpdateInSeconds = signal(0)

  constructor() {
    setInterval(() => {
      this.lastUpdateInSeconds.set((new Date().getTime() - this.lastUpdate.getTime()) / 1_000);
    }, 1000);
  }

  logCd() {
    console.log('log from timer');
  }
}
