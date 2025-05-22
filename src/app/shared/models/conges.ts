import { Deserializable } from "./deserializable";
import { TypeConge } from "./typeconge";

export class Conges implements Deserializable<Conges> {
    public id: number;
    public type:TypeConge;
    public etat:string;
    public description:string;
    public dateDebut:Date;
    public dateFin:Date;
    public dateCreation:Date;
    public delete:boolean;
    deserialize(input: any): Conges {
        Object.assign(this, input);
        return this;
    }
}