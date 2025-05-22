import { Injectable } from '@angular/core';
import { Deserializable } from './deserializable';
import { Profile } from './profile';

@Injectable()
export class Utilisateur implements Deserializable<Utilisateur> {
  public id: number;
  public prenom: string;
  public nom: string;
  public nomComplet: string;
  public telephone: string;
  public email: string;
  public adresse: string;
  public username: string;
  public password: string;
  public oldPassword: string;
  public newPassword: string;
  public statusConnexion: string;
  public token: string;
  public dateModification: Date;
  public dateCreation: Date = new Date();
  public enabled: boolean = true;
  public imageData: string;
  public imageName: string;
  public profile: Profile;
  public checked:boolean;
  /* transient */
  public montantByDay: number;
  public montantByNight: number;
  public majoration: number;
  public fraisPlusMajoration: number;
  deserialize(input: any): Utilisateur {
    Object.assign(this, input);
    return this;
  }
}
