import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../../shared/models/utilisateur';
import { SearchParam } from '../../shared/utils/search-param';
import { AppUtil } from 'src/app/shared/utils/App-util';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private restUri: string;
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.restUri = new AppUtil().getBaseUrlService();
    this.httpOptions = new AppUtil().httpHeaders();
  }

  public search(searchParam: SearchParam) {
    return this.http.post(this.restUri + '/utilisateurs/find', searchParam, this.httpOptions);
  }

  public save(utilisateur: Utilisateur) {
    return this.http.post(this.restUri + '/utilisateurs', utilisateur, this.httpOptions);
  }

  public update(utilisateur: Utilisateur) {
    return this.http.put(this.restUri + '/utilisateurs', utilisateur, this.httpOptions);
  }

  public desactivateOrActivate(utilisateur: Utilisateur) {
    return this.http.put(this.restUri + '/utilisateurs/activateOrDesactivate/' + utilisateur.id, this.httpOptions);
  }

  public delete(utilisateur: Utilisateur) {
    return this.http.put(this.restUri + '/utilisateurs/delete', utilisateur, this.httpOptions);
  }

  public changePassword(utilisateur: Utilisateur) {
    return this.http.put(this.restUri + '/utilisateurs/password/change', utilisateur, this.httpOptions);
  }

  public resetPassword(utilisateur: Utilisateur) {
    return this.http.put(this.restUri + '/utilisateurs/password/reset/' + utilisateur.newPassword + '/' + utilisateur.id, this.httpOptions);
  }
}
