import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { Droit } from '../models/droit';
import * as SecureLS from 'secure-ls';
import { SessionData } from './session-data';


@Injectable()
export class AppConfig {

  public dateExpiration: Date;
  public currentUser: Utilisateur;
  public droits: Droit[];
  public agents: Utilisateur[];

  constructor() {
    this.initSession();
  }

  initSession() {
    const ls = new SecureLS({ encodingType: 'aes', encryptionSecret: 'AdminAppManager' });
    if (ls.get('current_session_app')) {
      const config: SessionData = JSON.parse(ls.get('current_session_app'));
      this.dateExpiration = config.dateExpiration;
      this.currentUser = JSON.parse(ls.get('current_session_app'));
      this.droits = this.currentUser?.profile ? this.currentUser?.profile?.droits : [];
    }
  }
}
