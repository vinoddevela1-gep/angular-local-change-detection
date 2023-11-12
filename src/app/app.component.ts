import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ListComponent} from "./list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent],
  template: `
      <div class="max-w-screen-lg m-auto pt-4">
          <h1>Local Change Detection in Angular</h1>
          <p>Open the console. You will see a log statement every time Angular runs the Change Detection for the
              TimerComponent or ListComponent.<br>You will notice that it regularly checks the TimeComponent but not
              the ListComponent.<br>This is only possible from Angular 17 onwards and is local change detection.</p>
          <app-list/>
      </div>`
})
export class AppComponent {
}
