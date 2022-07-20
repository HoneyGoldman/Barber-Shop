import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ClockComponent implements OnInit ,OnDestroy{
  @Input()
  timeView:boolean=true;

  day1:string="יום א'";
  day2:string="יום ב'";
  day3:string="יום ג'";
  day4:string="יום ד'";
  day5:string="יום ה'";
  day6:string="יום ו'";
  day7:string="שבת";
  dayText=''
 
  time:Date=new Date();
  rxTime = new Date();
  intervalId:any;
  subscription: Subscription | undefined;

  constructor() { }
  
  ngOnInit(): void {
    let dynamicDay:string='day'+(1+this.time.getDay());
    let obj:any=this;
    if(obj[dynamicDay]!==undefined){
    this.dayText=obj[dynamicDay];
    // console.log("clock component "+this.dayText)
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    }
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time: Date) => {
        this.rxTime = time;
      });
    
    }

    ngOnDestroy() {
      clearInterval(this.intervalId);
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

}
