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
  state={day:0,month:0,year:0}
  viewState = 'month'; //defaule view state
  days: Map<string, Appointment[]> = new Map<string, Appointment[]>();
  isRealoading: boolean = true;
  isAlreadyRunDivAppending: boolean = false;
  constructor(private data: DataServiceComponent) { }


  // @ViewChild(MatCalendar, { static: false }) calendar!: MatCalendar<Date>;

  @ViewChild('MatCalendar') set calendar(calendar:MatCalendar<Date>){
      this.putDivToClasses();
  }

  ngAfterViewChecked(): void {
    
  }


  ngOnInit(): void {
    this.isRealoading=true;
    this.selected = new Date();
    this.state.day=this.selected.getDay();
    this.state.month=this.selected.getMonth()+1;
    this.state.year=this.selected.getFullYear();
    this.updateMonthCache(this.state.month, this.state.year);
    this.isRealoading=false;
  }

  updateMonthCache(month:number,year:number){
    this.data.getAllmonthAppointment(month, year).subscribe(appointments => {
      appointments.forEach(appointment => {
        if (this.days.get(String(appointment.date)) === undefined) {
          let newArr: Appointment[] = [appointment]
          this.days.set(String(appointment.date), newArr);
        } else {
          this.days.get(String(appointment.date))?.push(appointment);
        }
      })

    }, err => { console.log(err) }
    )
  }

  view(view: string) {
    this.viewState = view;
  }

  onChangeEvent($event: any) {
    console.log($event)
    this.putDivToClasses()
  }

  dateClass() {
    return (matDate: Date): MatCalendarCellCssClasses => {
      let newDateFormat = this.formatDate(matDate);
      return this.getClassForDate(newDateFormat);
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
      return 'defaultDot'
    }
  }

  putDivToClasses() {
      let classesBody={oneDot:'.',towDot:'..',threeDot:'...',defaultDot:'.'}
      for (const [key, value] of Object.entries(classesBody)) {
        let elements=document.getElementsByClassName(key)
        if(elements!==undefined){
          for (var i = 0; i < elements.length; i++) {
            var div = document.createElement('div');
            div.textContent = value;
            if(elements[i].childElementCount===2){
            div.classList.add(''+key)
              elements[i].appendChild(div);
            }
          }
        }
      }
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target.ariaLabel && event.target.ariaLabel.includes("Previous month")) {
      
      this.state.month=this.state.month-1;
      if(this.state.month===0){
        this.state.month=12
        this.state.year=this.state.year-1
      }
      this.updateMonthCache(this.state.month,this.state.year);
    } else if (event.target.ariaLabel && event.target.ariaLabel.includes("Next month")) {
      this.state.month=this.state.month+1;
      if(this.state.month===13){
        this.state.month=1
        this.state.year=this.state.year+1
      }
      this.updateMonthCache(this.state.month,this.state.year);
    }
  }

}
