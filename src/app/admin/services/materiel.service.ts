import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materiel } from 'src/app/shared/models/materiel';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
    return this.http.post(this.serviceURL + '/materiels/find', searchParam, this.httpOptions);
}

public save(materiel: Materiel) {
    return this.http.post(this.serviceURL + '/materiels/save', materiel, this.httpOptions);
}

public update(materiel: Materiel) {
    return this.http.put(this.serviceURL + '/materiels/update', materiel, this.httpOptions);
}

public desactivate(materiel: Materiel) {
    return this.http.get(this.serviceURL + '/materiels/desactivate/' + materiel.id, this.httpOptions);
}

public activate(materiel: Materiel) {
    return this.http.get(this.serviceURL + '/materiels/activate/' + materiel.id, this.httpOptions);
}
 
}
