import { Deserializable } from './deserializable';
import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Droit } from './droit';
@Injectable()
export class ProfileDroit implements Deserializable<ProfileDroit> {
  public id: number;
  public profile: Profile;
  public commentaire: string;
  public droit: Droit;
  public enabled: boolean;

  deserialize(input: any): ProfileDroit {
    Object.assign(this, input);
    return this;
  }
}
