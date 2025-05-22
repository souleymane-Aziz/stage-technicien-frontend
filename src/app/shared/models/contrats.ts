import { Deserializable } from "./deserializable";
import { Type } from 'src/app/shared/models/action';
import { Employes } from "./employe";
import { TypeContrats } from "./typecontrat";

export class Contrats implements Deserializable<Contrats> {
    public id:number;
    public type : string;
    public description : string ;
    public dateDebut : Date ;
    public dateFin : Date ;
    public etat:string;
    public employe:Employes;
  enabled: any;
      deserialize(input: any): Contrats {
        Object.assign(this, input);
        return this;
      }
    }