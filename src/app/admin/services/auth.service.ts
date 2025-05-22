import {Injectable} from '@angular/core';
import {Utilisateur} from '../../shared/models/utilisateur';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { AppUtil } from 'src/app/shared/utils/App-util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serviceUrl: string;
  private httpOptions: any;
  private currentUser: Utilisateur;
  private appUtil: AppUtil;

  constructor(private http: HttpClient) {
    this.appUtil = new AppUtil();
    this.serviceUrl = environment.apiUrl;
    this.httpOptions = this.appUtil.httpHeaders();
    this.currentUser = this.appUtil.getCurrentUser();
  }
  public loginUser(authUser: AuthUser) {
    return this.http.post(this.serviceUrl + '/auth/login', authUser, this.httpOptions);
  }

  public authenticate(authUser: AuthUser) {
    return this.http.get(this.serviceUrl + '/auth/' + authUser.username+ '/' + authUser.password);
  }

  public logout(userId) {
    return this.http.get(this.serviceUrl + '/auth/logout/' + userId, this.httpOptions);
  }

  public checkLicenceValidity(userId: number) {
    return this.http.get(this.serviceUrl + '/auth/licence/' + userId, this.httpOptions);
  }

  public resetPassword(userId: number, newPassword: string) {
    return this.http.get(this.serviceUrl + '/auth/reset/password/' + userId + '/' + newPassword, this.httpOptions);
  }

  public changePassword(passwordObject: any) {
    return this.http.get(this.serviceUrl + '/auth/update/password/' + passwordObject.userId + '/' + passwordObject.oldPassword + '/' + passwordObject.newPassword, this.httpOptions);
  }
}
