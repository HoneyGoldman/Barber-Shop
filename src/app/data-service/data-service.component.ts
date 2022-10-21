import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from 'src/Model/Admin';
import { Appointment } from 'src/Model/Appointment';
import { Customer } from 'src/Model/Customer';
import { Day } from 'src/Model/Day';

@Component({
  selector: 'app-data-service',
  templateUrl: './data-service.component.html',
  styleUrls: ['./data-service.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DataServiceComponent implements OnInit {
  baseURL: string = environment.BaseURL;
  siteId = 'General'
  isLogin: boolean = false;
  admin: Admin | undefined;
  private adminObs = new BehaviorSubject<Admin>(new Admin());

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(email: string, password: string): Observable<Admin> {
    const url = this.baseURL + '/General/login?email=' + email + '&password=' + password;
    return this.http.get<Admin>(url);
  }

  getDay(day: number, month: number, year: number): Observable<Appointment[]> {
    // console.log("Data service: get Day " + day + " " + month + " " + year + " ")
    const url = this.baseURL + '/Calendar/getFullAppointmenForDay?siteId=' + this.siteId + '&day=' + day + '&month=' + (month + 1) + '&year=' + year;
    if (this.siteId === null || this, this.siteId === undefined) {
      console.log("Data service: No SITE ID !!")
    }
    return this.http.get<Appointment[]>(url);
  }
  storeSiteId(siteId: string) {
    this.siteId = siteId;
  }

  getRealAppointmentsDay(day: number, month: number, year: number): Observable<Appointment[]> {
    // console.log("Data service: get Day " + day + " " + month + " " + year + " ")
    const url = this.baseURL + '/Calendar/getDay?siteId=' + this.siteId + '&day=' + day + '&month=' + (month + 1) + '&year=' + year;
    if (this.siteId === null || this, this.siteId === undefined) {
      console.log("Data service: No SITE ID !!")
    }
    return this.http.get<Appointment[]>(url);
  }

  getAllmonthAppointment(month: number, year: number): Observable<Appointment[]> {
    const url = this.baseURL + '/Calendar/getMonth?siteId=' + this.siteId + '&month=' + (month + 1) + '&year=' + year;
    if (this.siteId === null || this, this.siteId === undefined) {
      console.log("Data service: No SITE ID !!")
    }
    return this.http.get<Appointment[]>(url);
  }

  getSiteId(): string {
    return this.siteId;
  }

  storeAdmin(admin: Admin) {
    this.admin = admin;
    if ('{}' !== JSON.stringify(admin)) {
      this.isLogin = true;
    }
    this.adminObs.next(admin);
  }

  getAdmin() {
    return this.adminObs.asObservable();
  }

  convertUTCDateToLocalDate(date: Date): Date {
    let localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return localDate;
  }

  deleteAppointment(appointment: Appointment): Observable<boolean> {
    const url = this.baseURL + '/Calendar/deleteAppointment?siteId=' + this.siteId + '&id=' + appointment.id;
    return this.http.delete<boolean>(url);
  }

  getAllBarbers(): Observable<Admin[]> {
    const url = this.baseURL + '/Admin/getAll/';
    if (this.siteId === null || this, this.siteId === undefined) {
      console.log("Data service: No SITE ID !!")
    }
    return this.http.get<Admin[]>(url);
  }

  saveCustomer(customer:Customer){
    const url = this.baseURL + '/Customer/saveCustomer';
    console.log('save customer '+JSON.stringify(customer))
    return this.http.put(url,customer);
  }

}
