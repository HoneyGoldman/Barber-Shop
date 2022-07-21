import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DataServiceComponent } from '../data-service/data-service.component';
import { Observable } from 'rxjs';
import { Appointment } from 'src/Model/Appointment';
import { waitForAsync } from '@angular/core/testing';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  text: string = 'text header';
  selected!: Date | null;
  week = 'week'
  day = 'day'
  month = 'month'
  viewState = 'month'; //defaule view state
  days: Map<string, Appointment[]> = new Map<string, Appointment[]>();
  isRealoading: boolean = true;

  constructor(private data: DataServiceComponent) { }


  ngOnInit(): void {
    this.selected=new Date();
    this.data.getAllmonthAppointment(this.selected!.getMonth(), this.selected!.getFullYear()).subscribe(appointments => {
      appointments.forEach(appointment => {
        if (this.days.get(String(appointment.date)) === undefined) {
          let newArr: Appointment[] = [appointment]
          this.days.set(String(appointment.date), newArr);
        } else {
          this.days.get(String(appointment.date))?.push(appointment);
        }
      })
      // console.log(this.days)
      this.isRealoading = false;

    }
    )
  }

  view(view: string) {
    this.viewState = view;
  }

  getStyle(type: string) {
    return (type === this.viewState) ? "{'font-weight':'bold'}" : "{'font-weight':'bold'}"

  }


  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      return this.getClassForDate(date);
    }
  }


  getClassForDate(date: Date): string {
    let dateFormat: string = new Date(date).toISOString().split('T')[0]
    let yyyy = dateFormat.slice(0, 4);
    let mm = dateFormat.slice(5, 7);
    let dd = dateFormat.slice(2, 4);
    let newFormat = dd + '-' + mm + '-' + yyyy;
    // console.log("date format " + newFormat)
    return this.getClassBySize(this.days.get(newFormat)?.length!);
  }

  getClassBySize(size: number) {
    console.log("size class function " + size)
    if (size >= 0 && size <= 4) {
      return 'oneDot'
    }
    if (size >= 4 && size <= 6) {
      return 'towDot'
    }
    if (size >= 6 && size <= 10) {
      return 'threeDot'
    }
    else {
      return 'default'
    }
  }

  putStyleToclasses() {
    let detailsNews = document.querySelectorAll('div[class$="oneDot"]');
    console.log("classes divs array " + JSON.stringify(detailsNews))
    detailsNews.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'append_test';
      div.textContent = "appended div to " + item.classList;
      item.appendChild(div);
    })
  }

}
