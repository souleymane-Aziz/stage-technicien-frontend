import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenance } from 'src/app/shared/models/maintenance';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
      return this.http.post(this.serviceURL + '/maintenances/find', searchParam, this.httpOptions);
  }

  public save(maintenance: Maintenance) {
      return this.http.post(this.serviceURL + '/maintenances/save', maintenance, this.httpOptions);
  }

  public update(maintenance: Maintenance) {
      return this.http.put(this.serviceURL + '/maintenances/update', maintenance, this.httpOptions);
  }

  public desactivate(maintenance: Maintenance) {
      return this.http.get(this.serviceURL + '/maintenances/desactivate/' + maintenance.id, this.httpOptions);
  }

  public activate(maintenance: Maintenance) {
      return this.http.get(this.serviceURL + '/maintenances/activate/' + maintenance.id, this.httpOptions);
  }
  findMaintenances(){
    return this.http.get( this.serviceURL+'maintenances/getMaintenance')
  }
  saveMaintenance(maintenance: Maintenance){
    return this.http.post(this.serviceURL+'maintenances/addMaintenance', maintenance)
  }
  deleteMaintenance(maintenance:any){
    return this.http.get(this.serviceURL+'maintenances/getMaintenance/'+maintenance.id)
  }
}
