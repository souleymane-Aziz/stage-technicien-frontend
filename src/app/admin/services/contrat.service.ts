import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Conges } from "src/app/shared/models/conges";
import { Contrats } from "src/app/shared/models/contrats";
import { AppUtil } from "src/app/shared/utils/App-util";
import { SearchParam } from "src/app/shared/utils/search-param";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
  })
export class ContratService{
  
    private serviceURL: string;
    private httpOptions: any;
  constructor(private http: HttpClient){
    this.serviceURL = environment.rhApiUrl;
    this.httpOptions = new AppUtil().httpHeaders();
  }
  
  public save(contrat:Contrats){
    return this.http.post(this.serviceURL + '/contrats/save', contrat, this.httpOptions);
  }
  public update(contrat:Contrats){
    return this.http.post(this.serviceURL + '/contrats/update', contrat, this.httpOptions);
  }
  public annule(contrat:Contrats){
    return this.http.put(this.serviceURL + '/contrats/annule/' , contrat,this.httpOptions);
  }
  
  public findAll(){
    return this.http.get(this.serviceURL + '/contrats/findAll');
  }
}