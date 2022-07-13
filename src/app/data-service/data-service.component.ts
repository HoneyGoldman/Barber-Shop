import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from 'src/Model/Admin';

@Component({
  selector: 'app-data-service',
  templateUrl: './data-service.component.html',
  styleUrls: ['./data-service.component.css']
})
@Injectable({
  providedIn: 'root' // just before your class
})
export class DataServiceComponent implements OnInit {
  baseURL: string=environment.BaseURL;
  siteId=''
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
  
}
