import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/Model/Customer';

@Component({
  selector: 'app-quick-summary',
  templateUrl: './quick-summary.component.html',
  styleUrls: ['./quick-summary.component.css']
})
export class QuickSummaryComponent implements OnInit {
  currentCustomer:Customer=new Customer();
  nextCustomer:Customer=new Customer();
  constructor() { }

  ngOnInit(): void {
    this.currentCustomer.name='חוני גולדמן'
    this.currentCustomer.phoneNumber='055-6671210'
    this.nextCustomer.name='דניאל דהן'
    this.nextCustomer.phoneNumber='055-643210'
  }

}
