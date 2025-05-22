import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depannage } from 'src/app/shared/models/depannage';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepannageService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
      return this.http.post(this.serviceURL + '/depannages/find', searchParam, this.httpOptions);
  }

  public save(depannage: Depannage) {
      return this.http.post(this.serviceURL + '/depannages/save', depannage, this.httpOptions);
  }

  public update(depannage: Depannage) {
      return this.http.put(this.serviceURL + '/depannages/update', depannage, this.httpOptions);
  }

  public desactivate(depannage: Depannage) {
      return this.http.get(this.serviceURL + '/depannages/desactivate/' + depannage.id, this.httpOptions);
  }

  public activate(depannage: Depannage) {
      return this.http.get(this.serviceURL + '/depannages/activate/' + depannage.id, this.httpOptions);
  }
}
