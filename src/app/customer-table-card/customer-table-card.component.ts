import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/Model/Appointment';
import { DataServiceComponent } from '../data-service/data-service.component';
import { GenericPopUpComponent } from '../generic-pop-up/generic-pop-up.component';
import { SetAppointmentComponent } from '../set-appointment/set-appointment.component';
import { SwapAppointmentComponent } from '../swap-appointment/swap-appointment.component';

@Component({
  selector: 'app-customer-table-card',
  templateUrl: './customer-table-card.component.html',
  styleUrls: ['./customer-table-card.component.css']
})
export class CustomerTableCardComponent implements OnInit {
  @Input()
  date!: Date | null;
  @Input()
  appointment: Appointment | undefined;
  panelOpenState: boolean = false;
  localDate?: Date;
  dateSTR: string = '';
  day1: string = "יום א'";
  day2: string = "יום ב'";
  day3: string = "יום ג'";
  day4: string = "יום ד'";
  day5: string = "יום ה'";
  day6: string = "יום ו'";
  day7: string = "שבת";
  dayText = ''
  confirmDelete: boolean = false;
  cardOpen: boolean = false;
  constructor(private dataService: DataServiceComponent, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  setDateSTR(date: Date) {
    this.dateSTR = this.localDate?.getUTCDate()! + "." + this.localDate?.getMonth()!
    let dynamicDay: string = 'day' + (1 + this.date!.getDay());
    let obj: any = this;
    this.dayText = obj[dynamicDay];
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


  nextDay() {
    // console.log("day1 is now "+this.date)
    this.date?.setDate(this.date?.getDate() + 1);
    this.ngOnInit()
    // console.log("day is now "+this.date)
  }
  previusDay() {
    // console.log("day1 is now "+this.date)
    this.date?.setDate(this.date?.getDate() - 1);
    this.ngOnInit()
    // console.log("day is now "+this.date)
  }

  openDeleteDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(GenericPopUpComponent, {
      width: '250px',
      data: { text: 'האם ברצונך לבטל את התור?', header: 'ביטול תור', noText: 'לא', yesText: 'בטל' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      this.confirmDelete = result;
      if (result) {
        this.dataService.deleteAppointment(appointment).subscribe(result => {
          if (result) {
            console.log("success!")
            this.ngOnInit();
          }
        })
      }
    });
  }

  openDelayDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(GenericPopUpComponent, {
      width: '250px',
      data: { text: 'האם ברצונך לדחות את התור?', header: 'דחה תור', noText: 'לא', yesText: 'בטל' },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }
  openSwapDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(SwapAppointmentComponent, {
      width: '250px',
      data: { text: 'האם ברצונך לדחות את התור?', header: 'דחה תור', noText: 'לא', yesText: 'בטל' },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }

  openSetAppointmentDialog(appointment: Appointment) {
    const dialogRef = this.dialog.open(SetAppointmentComponent, {
      width: '250px',
      data: { text: appointment.startTime, header: '', noText: 'לא', yesText: 'בטל' },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }

  openSetPriorityAppointmentDialog(appointment: Appointment) {
    const dialogRef = this.dialog.open(SetAppointmentComponent, {
      width: '250px',
      data: { text: appointment.startTime, header: '', noText: 'לא', yesText: 'בטל' },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed '+result);
      this.confirmDelete = result;
    });
  }
  getNameText(name: string) {
    if (name === 'dummy') return 'תור פנוי'
    return name;
  }

  getStatus(name: string) {
    if (name !== 'dummy') return true
    return false;
  }

  actionCard() {
    this.cardOpen = !this.cardOpen;
  }

  getColor() {
    if (this.cardOpen) { return '#9A9A9A' }
    else {
      return ''
    }
  }


}
