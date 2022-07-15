import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/Model/Admin';
import { DataServiceComponent } from '../data-service/data-service.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  login: boolean = false;
  constructor(private dataService: DataServiceComponent, private router: Router) { }

  ngOnInit(): void {
    console.log("login is " + this.login)
    this.dataService.getAdmin().subscribe(admin => {
      console.log(JSON.stringify(admin))
      if ('{}' !== JSON.stringify(admin)) {
        this.login = true; //debug false
      } else {
        this.login = false; // debug false
      }
    })
  }

  logOut() {
    this.login=false;
    this.dataService.storeAdmin(new Admin());
    this.dataService.storeSiteId('');
    this.router.navigateByUrl('');
  }

}
