import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericFormProperties } from 'src/Model/GenericFormProperties';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { HomeComponent } from './home/home.component';
import { LoginFormV2Component } from './login-form-v2/login-form-v2.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginHebComponentComponent } from './login-heb-component/login-heb-component.component';


const routes: Routes = [
  { path: '', component: LoginFormV2Component},
  { path: 'Home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
