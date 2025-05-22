import { Deserializable } from "./deserializable";
import { Panne } from "./panne";
import { Prestataire } from "./prestataire";
import { Utilisateur } from "./utilisateur";

export class Depannage implements Deserializable<Depannage> {
  public date_debut: Date;
  public date_fin: Date;
  public frais: string;
  public type: string;
  public id: number;
  public enabled: boolean;
  public prestataire: Prestataire;
  public panne: Panne;
  public utilisateur: Utilisateur;
  public dateCreation: Date;
  public dateModification: Date;
    deserialize(input: any): Depannage {
      Object.assign(this, input);
      return this;
    }
  }
