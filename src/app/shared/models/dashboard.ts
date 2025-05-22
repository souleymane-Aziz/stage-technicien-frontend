import { Deserializable } from './deserializable';
import { Injectable } from '@angular/core';

@Injectable()
export class Dashbard implements Deserializable<Dashbard> {
  public id: number;
  public nombreDepannage: number = 0;
  public nombrePanne: number = 0;
  public nombreMaintenance: number = 0;
  public nombreMateriel: number = 0;
  deserialize(input: any): Dashbard {
    Object.assign(this, input);
    return this;
  }
}
