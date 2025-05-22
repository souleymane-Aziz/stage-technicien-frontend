import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestataire } from 'src/app/shared/models/prestataire';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
      return this.http.post(this.serviceURL + '/prestataires/find', searchParam, this.httpOptions);
  }

  public save(prestataire: Prestataire) {
      return this.http.post(this.serviceURL + '/prestataires/save', prestataire, this.httpOptions);
  }

  public update(prestataire: Prestataire) {
      return this.http.put(this.serviceURL + '/prestataires/update', prestataire, this.httpOptions);
  }

  public desactivate(prestataire: Prestataire) {
      return this.http.get(this.serviceURL + '/prestataires/desactivate/' + prestataire.id, this.httpOptions);
  }

  public activate(prestataire: Prestataire) {
      return this.http.get(this.serviceURL + '/prestataires/activate/' + prestataire.id, this.httpOptions);
  }

}
