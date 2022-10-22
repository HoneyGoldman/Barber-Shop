import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-appointment',
  templateUrl: './set-appointment.component.html',
  styleUrls: ['./set-appointment.component.css']
})
export class SetAppointmentComponent implements OnInit {
  isRealoading:boolean=true;
  today:Date=new Date();
  constructor() { }

  ngOnInit(): void {
    this.isRealoading=false;
  }

}
