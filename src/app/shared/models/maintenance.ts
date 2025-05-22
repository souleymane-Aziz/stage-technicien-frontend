import { Deserializable } from "./deserializable";
import { Materiel } from "./materiel";
import { Prestataire } from "./prestataire";
import { Utilisateur } from "./utilisateur";

export class Maintenance implements Deserializable<Maintenance> {
  public date_debut: Date;
  public date_fin: Date;
  public id: number;
  public enabled: boolean;
  public etat: string;
  public dateCreation: Date;
  public dateModification: Date;
  public materiel: Materiel;
  public prestataire: Prestataire;
  public utilisateur: Utilisateur;

    deserialize(input: any): Maintenance {
      Object.assign(this, input);
      return this;
    }
  }
