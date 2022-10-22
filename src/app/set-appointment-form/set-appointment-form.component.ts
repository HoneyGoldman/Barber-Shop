import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { CustomerEditorComponent } from 'src/customer-editor/customer-editor.component';
import { Admin } from 'src/Model/Admin';
import { Customer } from 'src/Model/Customer';
import { DataServiceComponent } from '../data-service/data-service.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-set-appointment-form',
  templateUrl: './set-appointment-form.component.html',
  styleUrls: ['./set-appointment-form.component.css']
})
export class SetAppointmentFormComponent implements OnInit {
  isLoading: boolean = true;
  formGroup = new UntypedFormGroup({});
  myControl = new FormControl('', Validators.required);
  customers: Customer[] = []
  customersNames: string[] = []
  filteredOptions: Observable<string[]> | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: UntypedFormBuilder,private dialog:MatDialog,private dataService:DataServiceComponent) { }

  ngOnInit(): void {
  
    this.dataService.getAllCustomers().subscribe(barbers => {
      this.customers = barbers;
      this.customers.forEach(customer => {
        this.customersNames.push( customer.name!+' '+customer.phoneNumber);
      })
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }


  

  SubmitByName(data:any) {
    let customerRes=new Customer();
    console.log(JSON.stringify(this.myControl.value)+JSON.stringify(this.data))
    this.customers.forEach(customer=>{
      if((customer.name!+' '+customer.phoneNumber)===this.myControl.value){
        customerRes=customer;
      }
    })
    this.dataService.setAppointment(this.data).subscribe(res=>{
      console.log('Done!')
    })
  }


  private _filter(value: string): string[] {
    // console.log("filter " + value)
    const filterValue = value.toLowerCase();
    return this.customersNames.filter(name => name.toLowerCase().includes(filterValue));
  }


  

  filter(value: string) {
    let filter = value;
    return this.customers.filter(customer => customer.name?.includes(filter));
  }

  openCustomerEditorDialog(){
    const dialogRef = this.dialog.open(CustomerEditorComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }


}
