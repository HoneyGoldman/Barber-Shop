import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/Model/Appointment';
import { Day } from 'src/Model/Day';
import { DataServiceComponent } from '../data-service/data-service.component';
import { GenericPopUpComponent } from '../generic-pop-up/generic-pop-up.component';
import { SwapAppointmentComponent } from '../swap-appointment/swap-appointment.component';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DayViewComponent implements OnInit {
  @Input()
  date!: Date | null;

  appointments?: Appointment[];
  realAppointments?:Appointment[];
  localDate?: Date;
  dateSTR: string = '';
  day1:string="יום א'";
  day2:string="יום ב'";
  day3:string="יום ג'";
  day4:string="יום ד'";
  day5:string="יום ה'";
  day6:string="יום ו'";
  day7:string="שבת";
  dayText=''
  confirmDelete:boolean=false;
  constructor(private dataService: DataServiceComponent,public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.date !== undefined) {
      this.localDate = this.dataService.convertUTCDateToLocalDate(this.date!);
    }
    else {
      this.localDate = this.dataService.convertUTCDateToLocalDate(new Date());
    }
    // console.log("selected day is " + JSON.stringify(this.localDate))
    // console.log(this.localDate?.getUTCDate()!+" "+this.localDate?.getMonth()!+" "+this.localDate?.getFullYear()!)
    this.dataService.getDay(this.localDate?.getUTCDate()!, this.localDate?.getMonth()!, this.localDate?.getFullYear()!).subscribe(result => {
      this.appointments = result;
      // this.sortAppointmentsByTime();
      // console.log(JSON.stringify(this.appointments))
    })
    this.setDateSTR(this.date!);
    this.dataService.getRealAppointmentsDay(this.localDate?.getUTCDate()!, this.localDate?.getMonth()!, this.localDate?.getFullYear()!).subscribe(result => {
      this.realAppointments = result;
      // this.sortAppointmentsByTime();
      // console.log(JSON.stringify(this.appointments))
    })

  }


  setDateSTR(date: Date) {
    this.dateSTR = this.localDate?.getUTCDate()! + "." + this.localDate?.getMonth()!
    let dynamicDay:string='day'+(1+this.date!.getDay());
    let obj:any=this;
    this.dayText=obj[dynamicDay];
  }

  getSource(source: string) {
    return (source === 'default') ? 'יומן' : 'אתר';
  }

  getTime(i: number) {
    // let date =new Date(this.appointment?.startTime![0]!, this.appointment?.startTime![1]!+1, this.day?.startTime![2]!
    //   , this.day?.startTime![0]!,this.appointment?.startTime![1]! )
    // let result:Date=new Date();
    // result.setTime(date.getTime() + i *(
    // (this.day?.timePerCustomer![0]! * 60 * 60 * 1000)
    // +(this.day?.timePerCustomer![1]! * 60 * 1000)));
    // // console.log(result);
    // return result.getHours()+":"+result.getMinutes()

  }

  getCustomersStatistics() {
    if(this.realAppointments?.length===0){ return ''}
    return (this.realAppointments?.length! > 1) ? this.realAppointments?.length + ' לקוחות' : 'לקוח אחד';
  }

  sortAppointmentsByTime() {
    this.appointments?.sort(function (a, b) {
      let A = Number(a.startTime?.slice(0, 2)) * 60 + Number(a.startTime?.slice(3, 5))
      let B = Number(b.startTime?.slice(0, 2)) * 60 + Number(b.startTime?.slice(3, 5))
      return A > B ? 1 : A < B ? -1 : 0;
    })
  }

  nextDay(){
    console.log("day1 is now "+this.date)
    this.date?.setDate(this.date?.getDate()+1);
    this.ngOnInit()
    console.log("day is now "+this.date)
  }
  previusDay(){
    console.log("day1 is now "+this.date)
    this.date?.setDate(this.date?.getDate()-1);
    this.ngOnInit()
    console.log("day is now "+this.date)
  }

  openDeleteDialog(appointment:Appointment): void {
    const dialogRef = this.dialog.open(GenericPopUpComponent, {
      width: '250px',
      data: {text:'האם ברצונך לבטל את התור?',header:'ביטול תור',noText:'לא',yesText:'בטל'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }

  openDelayDialog(appointment:Appointment): void {
    const dialogRef = this.dialog.open(GenericPopUpComponent, {
      width: '250px',
      data: {text:'האם ברצונך לדחות את התור?',header:'דחה תור',noText:'לא',yesText:'בטל'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }
  openSwapDialog(appointment:Appointment): void {
    const dialogRef = this.dialog.open(SwapAppointmentComponent, {
      width: '250px',
      data: {text:'האם ברצונך לדחות את התור?',header:'דחה תור',noText:'לא',yesText:'בטל'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }

  getNameText(name:string){
    if(name==='dummy') return 'תור פנוי'
    return name;
  }

  getStatus(name:string){
    if(name!=='dummy') return true
    return false;
  }
}
