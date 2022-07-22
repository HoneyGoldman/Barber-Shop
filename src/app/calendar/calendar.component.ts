import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DataServiceComponent } from '../data-service/data-service.component';
import { Appointment } from 'src/Model/Appointment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewChecked {
  text: string = 'text header';
  selected!: Date | null;
  week = 'week'
  day = 'day'
  month = 'month'
  viewState = 'month'; //defaule view state
  days: Map<string, Appointment[]> = new Map<string, Appointment[]>();
  isRealoading: boolean = true;
  isAlreadyRunDivAppending: boolean = false;
  constructor(private data: DataServiceComponent) { }

  @ViewChild('MatCalendar') set calendar(calendar:MatCalendar<null>){
      this.putDivToClasses();
  }

  ngAfterViewChecked(): void {
    
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
      // console.log(this.days)
      this.isRealoading = false;

    }, err => { console.log(err) }
    )

  }

  view(view: string) {
    this.viewState = view;
  }

  getStyle(type: string) {
    return (type === this.viewState) ? "{'font-weight':'bold'}" : "{'font-weight':'bold'}"

  }


  dateClass() {
    return (matDate: Date): MatCalendarCellCssClasses => {
      // console.log("date from mat-calendar is " + matDate)
      let newFormat = this.formatDate(matDate);
      // console.log("get class for date " + newFormat + " " + this.days.get(newFormat)?.length!)
      return this.getClassForDate(newFormat);
    }
  }

  formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  getClassForDate(format: string): string {
    return this.getClassBySize(this.days.get(format)?.length!);
  }

  getClassBySize(size: number) {

    // console.log("size class function " + size)
    if (size > 0 && size < 3) {
      return 'oneDot'
    }
    if (size > 3 && size <= 5) {
      return 'towDot'
    }
    if (size >= 6) {
      return 'threeDot'
    }
    else {
      return 'default'
    }
  }

  putDivToClasses() {
      // console.log("started")
      let paddingTop='5%'
      let fontSize='40px'
      var oneDot = document.getElementsByClassName('oneDot');
      if (oneDot !== undefined) {
        for (var i = 0; i < oneDot.length; i++) {
          var div = document.createElement('div');
          // div.style.setProperty('font-size',fontSize );
          // div.style.setProperty('padding-top',paddingTop)
          div.textContent = ".";
          div.classList.add('oneDotClass')
          oneDot[i].appendChild(div);
        }
      }

      var twoDot = document.getElementsByClassName('towDot');
      if (twoDot !== undefined) {
        for (var i = 0; i < twoDot.length; i++) {
          var div = document.createElement('div');
          // div.style.setProperty('font-size', fontSize);
          // div.style.setProperty('padding-top',paddingTop)
          div.textContent = "..";
          div.classList.add('towDotClass')
          twoDot[i].appendChild(div);
        }
      }

      var threeoDot = document.getElementsByClassName('threeDot');
      if (threeoDot !== undefined) {
        for (var i = 0; i < threeoDot.length; i++) {
          var div = document.createElement('div');
          // div.style.setProperty('font-size',fontSize);
          // div.style.setProperty('padding-top',paddingTop)
          div.textContent = "...";
          div.classList.add('threeDotClass')
          threeoDot[i].appendChild(div);
        }
      }

      var defaultList = document.getElementsByClassName('default');
      if (defaultList !== undefined) {
        for (var i = 0; i < defaultList.length; i++) {
          var div = document.createElement('div');
          // div.style.setProperty('font-size', '40px');
          // div.style.setProperty('padding-top',paddingTop)
          div.style.setProperty('color', '#9A9A9A');
          div.textContent = ".";
          div.classList.add('defaultDotClass')
          defaultList[i].appendChild(div);
        }
      }
     this.isAlreadyRunDivAppending=true;
    
  }


}
