import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Conges } from "src/app/shared/models/conges";
import { AppUtil } from "src/app/shared/utils/App-util";
import { SearchParam } from "src/app/shared/utils/search-param";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
  })
export class EmployeService{
    private serviceURL: string;
    private httpOptions: any;
    constructor(private http: HttpClient){
        this.serviceURL = environment.rhApiUrl;
        this.httpOptions = new AppUtil().httpHeaders();
      }
      public findAllEmploye(){
        return this.http.get(this.serviceURL + '/employe/findAll');
      }
    }