import { Deserializable } from "./deserializable";
import { Utilisateur } from "./utilisateur";

export class Prestataire implements Deserializable<Prestataire> {
  public id:number;
  public adresse:string;
  public email:	string;
  public nom:	string;
  public prenom:	string;
  public telephone: string;
  public nomComplet: string;
  public date_debut: Date;
  public date_fin: Date;
  public enabled: boolean;
  public utilisateur: Utilisateur;
  public dateCreation: Date;
  public dateModification: Date;
    deserialize(input: any): Prestataire {
      Object.assign(this, input);
      return this;
    }
  }
