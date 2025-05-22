import {Injectable} from '@angular/core';
import {Deserializable} from '../models/deserializable';
import {Utilisateur} from '../models/utilisateur';
import {Droit} from '../models/droit';

@Injectable()
export class SessionData implements Deserializable<SessionData> {

  public dateExpiration: Date;
  public utilisateur: Utilisateur;
  public droits: Droit[];
  public agents:Utilisateur[]

  deserialize(input: any): SessionData {
    Object.assign(this, input);
    return this;
  }
}
