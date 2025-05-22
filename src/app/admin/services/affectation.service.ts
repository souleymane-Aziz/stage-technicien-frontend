import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affectation } from 'src/app/shared/models/affectation';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
      return this.http.post(this.serviceURL + '/affectations/find', searchParam, this.httpOptions);
  }

  public save(affectation: Affectation) {
      return this.http.post(this.serviceURL + '/affectations/save', affectation, this.httpOptions);
  }

  public update(affectation: Affectation) {
      return this.http.put(this.serviceURL + '/affectations/update', affectation, this.httpOptions);
  }

  public desactivate(affectation: Affectation) {
      return this.http.get(this.serviceURL + '/affectations/desactivate/' + affectation.id, this.httpOptions);
  }

  public activate(affectation: Affectation) {
      return this.http.get(this.serviceURL + '/affectations/activate/' + affectation.id, this.httpOptions);
  }
}
