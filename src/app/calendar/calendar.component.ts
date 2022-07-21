import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DataServiceComponent } from '../data-service/data-service.component';
import { Appointment } from 'src/Model/Appointment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewChecked{
  text: string = 'text header';
  selected!: Date | null;
  week = 'week'
  day = 'day'
  month = 'month'
  viewState = 'month'; //defaule view state
  days: Map<string, Appointment[]> = new Map<string, Appointment[]>();
  isRealoading: boolean = true;

  constructor(private data: DataServiceComponent) { }
  ngAfterViewChecked(): void {

    console.log("started appending")
    // document.addEventListener("DOMContentLoaded", function () {
    var oneDot = document.getElementsByClassName('oneDot');
    if (oneDot !== undefined) {
      for (var i = 0; i < oneDot.length; i++) {
        var div = document.createElement('div');
        div.style.setProperty('font-size', '40px');
        div.textContent = ".";
        oneDot[i].appendChild(div);
      }
    }

    var twoDot = document.getElementsByClassName('towDot');
    if (twoDot !== undefined) {
      for (var i = 0; i < twoDot.length; i++) {
        var div = document.createElement('div');
        div.style.setProperty('font-size', '40px');
        div.textContent = ". .";
        twoDot[i].appendChild(div);
      }
    }

    var threeoDot = document.getElementsByClassName('threeDot');
    if (threeoDot !== undefined) {
      for (var i = 0; i < threeoDot.length; i++) {
        var div = document.createElement('div');
        div.style.setProperty('font-size', '40px');
        div.textContent = ". . .";
        threeoDot[i].appendChild(div);
      }
    }
  }


  ngOnInit(): void {
    this.selected = new Date();
    this.data.getAllmonthAppointment(this.selected!.getMonth(), this.selected!.getFullYear()).subscribe(appointments => {
      appointments.forEach(appointment => {
        if (this.days.get(String(appointment.date)) === undefined) {
          let newArr: Appointment[] = [appointment]
          this.days.set(String(appointment.date), newArr);
        } else {
          this.days.get(String(appointment.date))?.push(appointment);
        }
      })
      console.log(this.days)
      this.isRealoading = false;
      // this.putStyleToclasses();
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
    let mm = String(date.getMonth()+1);
    if(Number(mm)<10){mm='0'+mm}
    let dd = dateFormat.slice(2, 4);
    let newFormat = dd + '-' + mm + '-' + yyyy;
    return this.getClassBySize(this.days.get(newFormat)?.length!);
  }

  getClassBySize(size: number) {
    console.log("size class function " + size)
    if (size > 0 && size < 4) {
      return 'oneDot'
    }
    if (size > 4 && size < 6) {
      return 'towDot'
    }
    if (size >= 6) {
      return 'threeDot'
    }
    else {
      return 'default'
    }
  }

  putStyleToclasses() {
    console.log("started appending")
    document.addEventListener("DOMContentLoaded", function () {
      var oneDot = document.getElementsByClassName('oneDot');
      for (var i = 0; i < oneDot.length; i++) {
        var div = document.createElement('div');
        div.className = '';
        div.textContent = ".";
        oneDot[i].appendChild(div);
      }
    }
    )
    // let oneDot = document.getElementsByClassName('oneDot');
    // var list = document.getElementsByClassName("oneDot");
    // for (var i = 0; i < oneDot.length; i++) {
    //   let div = document.createElement('div');
    //   div.className = 'append_test';
    //   div.textContent = "appended div to " + oneDot[i].classList;
    //   oneDot[i].appendChild(div);
    //   console.log(oneDot[i]);
    // }

    // console.log(JSON.stringify(oneDot));

  }
}
