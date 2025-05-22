import { Deserializable } from "./deserializable";
import { Utilisateur } from "./utilisateur";

export class TypeMateriel implements Deserializable<TypeMateriel> {
  public id: number;
  public numeroSerie: string;
  public libelle: string;
  public description: string;
  public etat: string;
  public enabled: boolean = true;
  public dateCreation: Date;
  public dateModification: Date;
  public utilisateur: Utilisateur;
    deserialize(input: any): TypeMateriel {
      Object.assign(this, input);
      return this;
    }
  }
