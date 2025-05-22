import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private serviceURL: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      this.serviceURL = environment.apiUrl;
      this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
    return this.http.post(this.serviceURL + '/dashboards/init', searchParam, this.httpOptions);
  }

}
