import {Component, Input, OnInit} from '@angular/core';
import {WeeklyStats} from '../shared/models/schema.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  title = 'Weekly Overview';
  overviews = [];
  @Input() weeklyStats: WeeklyStats;
  constructor() { }

  ngOnInit(): void {
    this.overviews = this.getStatsAsArray(this.weeklyStats);
  }

  private getStatsAsArray(weeklyStats: WeeklyStats): any[] {
      return Object.keys(weeklyStats).map((key) => [Number(key), weeklyStats[key]]);
  }
}
