import { Deserializable } from "./deserializable";
import { Materiel } from "./materiel";
import { Utilisateur } from "./utilisateur";

export class Affectation implements Deserializable<Affectation> {
  public date_debut: Date;
  public date_fin: Date;
  public dateAffectation: Date;
  public id: number;
  public enabled: boolean;
  public materiel: Materiel;
  public utilisateur: Utilisateur;
  public employe: Utilisateur;
  public dateCreation: Date;
  public dateModification: Date;
    deserialize(input: any): Affectation {
      Object.assign(this, input);
      return this;
    }
  }
