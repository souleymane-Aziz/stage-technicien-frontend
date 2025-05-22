import { Affectation } from "./affectation";
import { Depannage } from "./depannage";
import { Deserializable } from "./deserializable";
import { Utilisateur } from "./utilisateur";

export class Panne implements Deserializable<Panne> {
  public date_debut: Date;
  public date_fin: Date;
  public id: number;
  public type: string;
  public libelle: string;
  public enabled: boolean;
  public datePanne: Date;
  public dateCreation: Date;
  public dateModification: Date;
  public utilisateur: Utilisateur;
  public affectation: Affectation;

    deserialize(input: any): Panne {
      Object.assign(this, input);
      return this;
    }
  }
