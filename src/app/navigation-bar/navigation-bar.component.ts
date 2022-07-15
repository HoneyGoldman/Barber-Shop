import { Component, OnInit } from '@angular/core';
import { DataServiceComponent } from '../data-service/data-service.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  login: boolean = false;
  constructor(private dataService: DataServiceComponent) { }

  ngOnInit(): void {
    console.log("login is " + this.login)
    this.dataService.getAdmin().subscribe(admin => {
      console.log(JSON.stringify(admin))
      if ('{}' !== JSON.stringify(admin)) {
        this.login = true; //debug false
      } else {
        this.login = true; // debug false
      }
    })
  }

}
