import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceComponent } from 'src/app/data-service/data-service.component';
import { SetAppointmentComponent } from 'src/app/set-appointment/set-appointment.component';
import { CustomerEditorComponent } from 'src/customer-editor/customer-editor.component';
import { Appointment } from 'src/Model/Appointment';
import { Customer } from 'src/Model/Customer';
import { Day } from 'src/Model/Day';

@Component({
  selector: 'app-quick-summary',
  templateUrl: './quick-summary.component.html',
  styleUrls: ['./quick-summary.component.css']
})
export class QuickSummaryComponent implements OnInit,OnDestroy {
  currentCustomer:Customer=new Customer();
  nextCustomer:Customer=new Customer();
  id:any ;
  constructor(public dialog: MatDialog,private data:DataServiceComponent) { }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.checkCurrentAppointment(); 
    },30*1000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  checkCurrentAppointment(){
    let date=new Date();
    this.data.getCurrentTowCustomers(date.getDay(),date.getMonth()+1,date.getFullYear()).subscribe(res=>{
      if(res[0].customer===null || res[0].customer!.name==='dummy'){
        res[0].customer!.name='תור פנוי'
        res[0].customer!.phoneNumber='--'
      }
      if(res[1].customer===null || res[1].customer!.name==='dummy'){
        res[1].customer!.name='תור פנוי'
        res[1].customer!.phoneNumber='--'
      }
      this.currentCustomer=res[0].customer!;
      this.nextCustomer=res[1].customer!;
    })
    
  }

  openCustomerEditorDialog(){
    const dialogRef = this.dialog.open(CustomerEditorComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed ' + result);
     
    });
  }

  setAppointment(){
    const dialogRef = this.dialog.open(SetAppointmentComponent).updateSize('80%','90%');
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed ' + result);
     
    });
  }
}
