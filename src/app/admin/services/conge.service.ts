import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Conges } from "src/app/shared/models/conges";
import { AppUtil } from "src/app/shared/utils/App-util";
import { SearchParam } from "src/app/shared/utils/search-param";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
  })
export class CongeService{
    private serviceURL: string;
    private httpOptions: any;
    constructor(private http: HttpClient){
        this.serviceURL = environment.rhApiUrl;
        this.httpOptions = new AppUtil().httpHeaders();
      }

public save(conge:Conges){
    return this.http.post(this.serviceURL + '/conges/save',conge,this.httpOptions)
   
}
public update(conge:Conges){
    return this.http.post(this.serviceURL + '/conges/update', conge, this.httpOptions);
  }
  public valide(conge:Conges){
    return this.http.put(this.serviceURL + '/conges/valide', conge , this.httpOptions);
  }
  
  public annule(conge:Conges){
    return this.http.put(this.serviceURL + '/conges/annule/' , conge,this.httpOptions);
  }
  public findAll(){
    return this.http.get(this.serviceURL + '/conges/findAll');
  }
}