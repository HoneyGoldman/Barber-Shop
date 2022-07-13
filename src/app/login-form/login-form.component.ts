import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Admin} from 'src/Model/Admin';
import { GenericFormProperties } from 'src/Model/GenericFormProperties';
import { AppRoutingModule } from '../app-routing.module';
import { DataServiceComponent } from '../data-service/data-service.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  properties: GenericFormProperties = new GenericFormProperties(this.router,this.dialog,this.data);
  constructor(private router:Router,private dialog:MatDialogModule,private data:DataServiceComponent) { }

  ngOnInit(): void {
    let admin = new Admin();
    admin.email=undefined;
    admin.id=1;
    admin.password=undefined
    this.properties.propertyTranslation=new Map<string,string>([
      ['email','מייל'],['password','סיסמה']
    ])
    this.properties.buttonText = 'התחבר';
    this.properties.endpointUrl = '/login';
    this.properties.header = 'כניסה למערכת'
    this.properties.height = '150px';
    this.properties.ignorId = true;
    this.properties.object = admin;
    this.properties.requestMethod = 'GET';
    this.properties.width = '200px';
    this.properties.direction = 'rtl'
    
    this.properties.formStyle = {
      // 'border': '2px solid rgb(0 0 0 / 4%);',
      // 1px solid #00000038;
      'border-radius': '9px',
      'padding': '10px',
      // 'background-color':'#0d6efd47',
      // 'background-image': 'linear-gradient(25deg, #E24C3B, #FBF3EF, #0088E0,#E24C3B, #FBF3EF, #0088E0,#E24C3B, #FBF3EF, #0088E0)'
    }
    this.properties.inputStyle={ 'border': 'none','border-bottom': '1px solid black','background': 'transparent','border-radius':'0px'}
    // this.properties.buttonStyle = {
    //   'background-color': 'white',
    //   'border': '2px solid #008CBA',
    //   'color': 'black',
    //   'padding': '16px 32px',
    //   'text-align': 'center',
    //   'text-decoration': 'none',
    //   'display': 'inline-block',
    //   'font-size': '16px',
    //   'margin': '4px 2px',
    //   'transition-duration': '0.4s',
    //   'cursor': 'pointer',
    // }
    this.properties.buttonClass=['button','buttonBlue']
    this.properties.inputClass=['form-group form-control']
    this.properties.headerClass=["h1"]
    this.properties.submitAction=function buildName() {
      console.log('injection from login')
    }
  }

}
