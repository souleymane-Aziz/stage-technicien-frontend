import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panne } from 'src/app/shared/models/panne';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanneService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
      return this.http.post(this.serviceURL + '/pannes/find', searchParam, this.httpOptions);
  }

  public save(panne: Panne) {
      return this.http.post(this.serviceURL + '/pannes/save', panne, this.httpOptions);
  }

  public update(panne: Panne) {
      return this.http.put(this.serviceURL + '/pannes/update', panne, this.httpOptions);
  }

  public desactivate(panne: Panne) {
      return this.http.get(this.serviceURL + '/pannes/desactivate/' + panne.id, this.httpOptions);
  }

  public activate(panne: Panne) {
      return this.http.get(this.serviceURL + '/pannes/activate/' + panne.id, this.httpOptions);
  }
}
