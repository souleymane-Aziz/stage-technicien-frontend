import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeMateriel } from 'src/app/shared/models/type-materiel';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterielService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
    return this.http.post(this.serviceURL + '/typeMateriels/find', searchParam, this.httpOptions);
}

public save(typeMateriel: TypeMateriel) {
    return this.http.post(this.serviceURL + '/typeMateriels/save', typeMateriel, this.httpOptions);
}

public update(typeMateriel: TypeMateriel) {
    return this.http.put(this.serviceURL + '/typeMateriels/update', typeMateriel, this.httpOptions);
}

public desactivate(typeMateriel: TypeMateriel) {
    return this.http.get(this.serviceURL + '/typeMateriels/desactivate/' + typeMateriel.id, this.httpOptions);
}

public activate(typeMateriel: TypeMateriel) {
    return this.http.get(this.serviceURL + '/typeMateriels/activate/' + typeMateriel.id, this.httpOptions);
}
 
}
