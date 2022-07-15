import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from 'src/Model/Admin';

@Component({
  selector: 'app-data-service',
  templateUrl: './data-service.component.html',
  styleUrls: ['./data-service.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DataServiceComponent implements OnInit {
  baseURL: string=environment.BaseURL;
  siteId=''
  isLogin:boolean=false;
  admin:Admin | undefined;
  private adminObs = new BehaviorSubject<Admin>(new Admin());
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(email:string,password:string):Observable<Admin>{
    const url=this.baseURL+'/General/login?email='+email+'&password='+password;
    return this.http.get<Admin>(url);
  }

  storeSiteId(siteId:string){
    this.siteId=siteId;
  }

  getSiteId():string{
    return this.siteId;
  }

  storeAdmin(admin:Admin){
    this.admin=admin;
    if('{}'!==JSON.stringify(admin)){
    this.isLogin=true;
    }
    this.adminObs.next(admin);
  }

  getAdmin(){
    return this.adminObs.asObservable();
  }
  
}
