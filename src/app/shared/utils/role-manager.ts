import {Injectable} from '@angular/core';
import { AppUtil } from './App-util';

@Injectable()
export class RoleManager {

  public droitsID: number[];

  constructor() {
    this.droitsID = new AppUtil().getDroitsID();
  }

  /**
   * @return boolean
   */
  public isDroitVoirMenuTableauBord(): boolean {
    return this.droitsID.includes(1);
  }
  public isDroitVoirMenuParametre(): boolean {
    return this.droitsID.includes(2);
  }
  // ================Utilisateur==================
  public isDroitVoirMenuUtilisateur(): boolean {
    return this.droitsID.includes(3);
  }
  public isDroitAjouterUtilisateur(): boolean {
    return this.droitsID.includes(4);
  }
  public isDroitModifierUtilisateur(): boolean {
    return this.droitsID.includes(5);
  }
  public isDroitChercherUtilisateur(): boolean {
    return this.droitsID.includes(6);
  }
  public isDroitChangerPasswordUtilisateur(): boolean {
    return this.droitsID.includes(7);
  }
  public isDroitReinitialiserPasswordUtilisateur(): boolean {
    return this.droitsID.includes(8);
  }
  public isDroitDesactiverUtilisateur(): boolean {
    return this.droitsID.includes(9);
  }
  public isDroitActiverUtilisateur(): boolean {
    return this.droitsID.includes(10);
  }
  // ================Profile==================
  public isDroitVoirMenuProfile(): boolean {
    return this.droitsID.includes(11);
  }
  public isDroitAjouterProfile(): boolean {
    return this.droitsID.includes(12);
  }
  public isDroitModifierProfile(): boolean {
    return this.droitsID.includes(13);
  }
  public isDroitDesactiverProfile(): boolean {
    return this.droitsID.includes(14);
  }
  public isDroitActiverProfile(): boolean {
    return this.droitsID.includes(15);
  }
  public isDroitChercherProfile(): boolean {
    return this.droitsID.includes(16);
  }
  // ================Log==================
  public isDroitVoirMenuLog(): boolean {
    return this.droitsID.includes(17);
  }
  public isDroitChercherLog(): boolean {
    return this.droitsID.includes(18);
  }
 
}
