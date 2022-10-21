import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataServiceComponent } from 'src/app/data-service/data-service.component';
import { GenericPopUpComponent } from 'src/app/generic-pop-up/generic-pop-up.component';
import { Customer } from 'src/Model/Customer';
import { GenericFormProperties } from 'src/Model/GenericFormProperties';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.css']
})
export class CustomerEditorComponent implements OnInit {
  @Input() 
  customer!: Customer;
  edit=false;
  properties: GenericFormProperties = new GenericFormProperties(this.router, this.dialog, this.dataService);
  isRealoading:boolean=true;
  constructor(private router: Router, private dialog: MatDialog, public dataService: DataServiceComponent) { }

  ngOnInit(): void {
    if(this.customer){
      this.edit=true;
    }else{
      let customer = new Customer();
      customer.name=''
      customer.email=''
      customer.phoneNumber=''
      this.properties.propertyTranslation = new Map<string, string>([
        ['email', 'אימייל'],  ['name', 'שם'],['phoneNumber','נייד']
      ])
      this.properties.buttonText = 'הוסף לקוח';
      // this.properties.endpointUrl = '/login';
      this.properties.header = ''
      this.properties.height = '100%';
      this.properties.ignorId = true;
      this.properties.object = customer;
      this.properties.requestMethod = 'POST';
      this.properties.width = '200px';
      this.properties.direction = 'rtl'
  
      this.properties.formStyle = {
        'border-radius': '25px',
        'padding': '10px',
        'width': '60%',
      }
      this.properties.inputStyle = {}
      this.properties.buttonClass = ['button', 'buttonV2']
      this.properties.inputClass = ['form-group form-control inputV2']
      this.properties.headerClass = ["h1V2"]
      this.properties.submitAction = function execute(data: any) {
        let customer:Customer=new Customer();
        customer.email=data['אימייל']
        customer.name=data['שם']
        customer.phoneNumber=data['נייד']
        customer.siteId=this.dataService.getSiteId();
        this.dataService.saveCustomer(customer).subscribe(result => {
          console.log(JSON.stringify(result));
          if (result !== null) {
          }
          else {
            this.dialog.open(GenericPopUpComponent,{data:{header:'מידע',text:'הוספת לקוח בוצעה בהצלחה!',yesText:'אישור'}})
          }
        })
      }
    }
    this.isRealoading=false;
  }

}
