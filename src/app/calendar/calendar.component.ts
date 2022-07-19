import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  text: string = 'text header';
  selected: Date =new Date();
  week = 'week'
  day = 'day'
  month = 'month'
  viewState = 'month'; //defaule view state
  constructor() { }

  ngOnInit(): void {
  }

  view(view: string) {
    this.viewState=view;
  }

  getStyle(type: string) {
      return (type===this.viewState) ? "{'font-weight':'bold'}":"{'font-weight':'bold'}"
     
  }


}
