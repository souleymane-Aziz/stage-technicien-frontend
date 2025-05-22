import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../../shared/models/profile';
import {SearchParam} from '../../shared/utils/search-param';
import { AppUtil } from 'src/app/shared/utils/App-util';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private serviceURL: string;
    private httpOptions: any;

    constructor(private http: HttpClient) {
        this.serviceURL = environment.apiUrl;
        this.httpOptions = new AppUtil().httpHeaders();
    }

    public search(searchParam: SearchParam) {
      return this.http.post(this.serviceURL + '/profiles/find', searchParam , this.httpOptions);
    }

    public findDroitForProfil(profile: Profile) {
      return this.http.get(this.serviceURL + '/profiles/droit/'+profile.id, this.httpOptions);
    }

    public save(profile: Profile) {
        return this.http.post(this.serviceURL + '/profiles/save', profile, this.httpOptions);
    }

    public update(profile: Profile) {
        return this.http.put(this.serviceURL + '/profiles/update', profile, this.httpOptions);
    }

    public activateOrDesactivate(profile: Profile) {
        return this.http.get(this.serviceURL + '/profiles/activateOrDesactivate/'+profile.id, this.httpOptions);
    }
}
