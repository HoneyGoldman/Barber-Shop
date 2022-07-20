import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-pop-up',
  templateUrl: './generic-pop-up.component.html',
  styleUrls: ['./generic-pop-up.component.css']
})
export class GenericPopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
