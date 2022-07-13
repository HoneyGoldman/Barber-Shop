import { MatDialogModule } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppRoutingModule } from "src/app/app-routing.module";
import { DataServiceComponent } from "src/app/data-service/data-service.component";

export class GenericFormProperties{
    object?:any;
    endpointUrl?:string;
    requestMethod?:string;
    buttonText?:string;
    header?:string;
    headerStyle?:any;
    headerClass?:any;
    inputStyle?:any;
    inputClass?:any;
    formStyle?:any;
    formClass?:any
    buttonStyle?:any;
    buttonClass?:any;
    height?:string;
    width?:string;
    ignorId?:boolean;
    direction?:any;
    propertyTranslation?:Map<string,string>;
    submitAction?:Function;

    constructor(public router:Router,public dialog:MatDialogModule,public dataService:DataServiceComponent){
    }
}