import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataServiceComponent } from './data-service/data-service.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LoginHebComponentComponent } from './login-heb-component/login-heb-component.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { LoginFormV2Component } from './login-form-v2/login-form-v2.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ClockComponent } from './clock/clock.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DayViewComponent } from './day-view/day-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DataServiceComponent,
    GenericFormComponent,
    LoginFormComponent,
    ProgressBarComponent,
    LoginHebComponentComponent,
    HomeComponent,
    AddCustomerComponent,
    LoginFormV2Component,
    NavigationBarComponent,
    ClockComponent,
    CalendarComponent,
    DayViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'he-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
