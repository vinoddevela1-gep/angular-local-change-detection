import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Holiday} from "./holiday";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {TimerComponent} from "./timer.component";
import {time} from "@ngtools/webpack/src/benchmark";

@Component({
  selector: 'app-list',
  template: `
      <div>
          <mat-table [dataSource]="dataSource">
              <ng-container matColumnDef="title">
                  <mat-header-cell *matHeaderCellDef> Title</mat-header-cell>
                  <mat-cell *matCellDef="let element">{{ element.title }}</mat-cell>
              </ng-container>

              <ng-container matColumnDef="description">
                  <mat-header-cell *matHeaderCellDef> Country</mat-header-cell>
                  <mat-cell *matCellDef="let element">{{ element.description }}</mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"/>
              <mat-row *matRowDef="let row; columns: displayedColumns;"/>
          </mat-table>
          <div class="flex items-center">
              @if (lastUpdate) {
                  <app-timer [lastUpdate]="lastUpdate"></app-timer>
              }
              <button mat-raised-button color="primary" class="ml-2" (click)="refresh()">Refresh</button>
          </div>
      </div>
      {{logCd()}}
  `,
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    TimerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  lastUpdate: Date | undefined
  dataSource = new MatTableDataSource<Holiday[]>([]);
  displayedColumns = ['title', 'description'];

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    fetch('https://api.eternal-holidays.net/holiday').then(res => res.json()).then(value => {
      this.lastUpdate = new Date();
      this.dataSource.data = value;
    });
  }

  protected readonly Date = Date;
  protected readonly time = time;

  logCd() {
    console.log('cd from list');
  }
}
