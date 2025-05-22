import {Injectable} from '@angular/core';
import {Deserializable} from '../models/deserializable';

@Injectable()
export class SearchParam implements Deserializable<SearchParam> {
  public id: number;
  public entityId: number;
  public dateDebut: Date;
  public dateFin: Date;
  public date: Date;
  public query: string;
  public type: string;
  public typeOperation: string;
  public criteria: string;
  public enabled: boolean;
  public etat: string;
  public attente: boolean;


  deserialize(input: any): SearchParam {
    Object.assign(this, input);
    return this;
  }

  equals(obj: any): boolean {
    return true;
  }

}
