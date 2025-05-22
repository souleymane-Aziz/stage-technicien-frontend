import { Deserializable } from './deserializable';
import { Injectable } from '@angular/core';
import { Droit } from './droit';
@Injectable()
export class Profile implements Deserializable<Profile> {
  public id: number;
  public nom: string;
  public description: string;
  public dateCreation: Date = new Date();
  public dateModification: Date;
  public droits: Droit[];
  public otherDroits: Droit[];
  public etat: boolean

  deserialize(input: any): Profile {
    Object.assign(this, input);
    return this;
  }
}
