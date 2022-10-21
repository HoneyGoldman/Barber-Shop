import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/Model/Customer';

@Component({
  selector: 'app-customer-block',
  templateUrl: './customer-block.component.html',
  styleUrls: ['./customer-block.component.css']
})
export class CustomerBlockComponent implements OnInit {
  @Input() customer!: Customer;
  constructor() { }

  ngOnInit(): void {
  }

}
