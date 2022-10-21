import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditorComponent } from 'src/customer-editor/customer-editor.component';
import { Customer } from 'src/Model/Customer';

@Component({
  selector: 'app-quick-summary',
  templateUrl: './quick-summary.component.html',
  styleUrls: ['./quick-summary.component.css']
})
export class QuickSummaryComponent implements OnInit {
  currentCustomer:Customer=new Customer();
  nextCustomer:Customer=new Customer();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentCustomer.name='חוני גולדמן'
    this.currentCustomer.phoneNumber='055-6671210'
    this.nextCustomer.name='דניאל דהן'
    this.nextCustomer.phoneNumber='055-643210'
  }


  openCustomerEditorDialog(){
    const dialogRef = this.dialog.open(CustomerEditorComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
     
    });
  }
}
