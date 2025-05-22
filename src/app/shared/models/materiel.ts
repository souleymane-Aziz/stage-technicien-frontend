import { Deserializable } from "./deserializable";
import { TypeMateriel } from "./type-materiel";
import { Utilisateur } from "./utilisateur";
export class Materiel implements Deserializable<Materiel> {
  public adresse_ip: string;
  public adresse_mac: string;
  public caracteristique: string;
  public date_acquisition: Date;
  public date_debut:Date;
  public date_fin: Date;
  public id: number;
  public marque: string;
  public modele: string;
  public etat: string;
  public nom: string;
  public dateCreation: Date;
  public dateModification: Date;
  public typeMateriel: TypeMateriel;
  public utilisateur: Utilisateur;
  public enabled: boolean = true;
    deserialize(input: any): Materiel {
      Object.assign(this, input);
      return this;
    }
  }
