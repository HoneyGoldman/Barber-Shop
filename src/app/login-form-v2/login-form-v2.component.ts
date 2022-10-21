import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Admin } from 'src/Model/Admin';
import { GenericFormProperties } from 'src/Model/GenericFormProperties';
import { DataServiceComponent } from '../data-service/data-service.component';

@Component({
  selector: 'app-login-form-v2',
  templateUrl: './login-form-v2.component.html',
  styleUrls: ['./login-form-v2.component.css']
})
export class LoginFormV2Component implements OnInit, AfterViewInit {
  properties: GenericFormProperties = new GenericFormProperties(this.router, this.dialog, this.dataService);
  constructor(private router: Router, private dialog: MatDialog, public dataService: DataServiceComponent) { }

  ngAfterViewInit(): void {
    let x = document.getElementById('אימייל');
    if (x !== null) {
      x.style.backgroundImage = 'url(../assets/personBlack.png)'
      x.style.backgroundSize = '15px'
      x.style.backgroundRepeat = 'no-repeat'
      x.style.backgroundPosition = 'right 10px top 8px';
      x.style.paddingRight = '30px'
      x.style.lineHeight = '80%'
    }
    let y = document.getElementById('סיסמה');
    if (y !== null) {
      y.style.backgroundImage = 'url(../assets/lockBlack.png)'
      y.style.backgroundSize = '15px'
      y.style.backgroundRepeat = 'no-repeat'
      y.style.backgroundPosition = 'right 10px top 4px';
      y.style.paddingRight = '30px'
      y.style.lineHeight = '80%'
    }
  }

  ngOnInit(): void {
    let admin = new Admin();
    admin.email = undefined;
    admin.id = 1;
    admin.password = undefined
    this.properties.propertyTranslation = new Map<string, string>([
      ['email', 'אימייל'], ['password', 'סיסמה']
    ])
    this.properties.buttonText = 'התחבר';
    this.properties.endpointUrl = '/login';
    this.properties.header = ''
    this.properties.height = '100%';
    this.properties.ignorId = true;
    this.properties.object = admin;
    this.properties.requestMethod = 'GET';
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
      console.log('injection from login')
      let admin: Admin = new Admin();;
      this.dataService.login(data['אימייל'], data['סיסמה']).subscribe(result => {
        console.log(JSON.stringify(result));
        if (result !== null) {
          this.dataService.storeAdmin(result);
          this.dataService.storeSiteId(result.siteId!);
          this.router.navigateByUrl('/Home')
        }
        else {
          //open pop up error with MatDialog using generic dialog pop up
        }
      })
    }
    this.dataService.storeAdmin(new Admin);
  }


  setAppointment(){
    this.router.navigateByUrl('/setOrder')
  }
}
