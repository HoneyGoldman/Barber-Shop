import { Component, Input, OnInit } from '@angular/core';
import { Day } from 'src/Model/Day';
import { DataServiceComponent } from '../data-service/data-service.component';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
  @Input()
  date?: Date;

  day?: Day;
  localDate?: Date;
  dateSTR:string='';
  constructor(private dataService: DataServiceComponent) { }

  ngOnInit(): void {
    // this.day?.date
    if (this.date !== undefined) {
      this.localDate = this.dataService.convertUTCDateToLocalDate(this.date);
    }
    else{
      this.localDate=this.dataService.convertUTCDateToLocalDate(new Date());
    }
    console.log("selected day is " + JSON.stringify(this.localDate))
    console.log(this.localDate?.getUTCDate()!+" "+this.localDate?.getMonth()!+" "+this.localDate?.getFullYear()!)
    this.dataService.getDay(this.localDate?.getUTCDate()!, this.localDate?.getMonth()!, this.localDate?.getFullYear()!).subscribe(result => {
      this.day = result;
      console.log(JSON.stringify(this.day))
    })
   
    this.setDateSTR(this.date!);

  }


  setDateSTR(date:Date){
    this.dateSTR=this.localDate?.getUTCDate()!+"."+this.localDate?.getMonth()!
  }

  getSource(source:string){
    return (source==='default')?'יומן':'אתר';
  }

  getTime(i:number){
    let date =new Date(this.day?.startTime![0]!, this.day?.startTime![1]!+1, this.day?.startTime![2]!
      , this.day?.startTime![0]!,this.day?.startTime![1]! )
    let result:Date=new Date();
    result.setTime(date.getTime() + i *(
    (this.day?.timePerCustomer![0]! * 60 * 60 * 1000)
    +(this.day?.timePerCustomer![1]! * 60 * 1000)));
    // console.log(result);
    return result.getHours()+":"+result.getMinutes()
    
  }

  getCustomersStatistics(){
    return (this.day?.customers?.length!>1)?this.day?.customers?.length+' לקוחות':'לקוח אחד';
  }
}
