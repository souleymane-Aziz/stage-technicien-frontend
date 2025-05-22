import { Deserializable } from "./deserializable";
import { TypeConge } from "./typeconge";

export class Employes implements Deserializable<Employes> {
    public id: number;
    public nom: string;
    public prenom: string;
    public dateDeNaissance: Date;
    public adresse: string;
    public ville: string;
    public numeroDeTelephone: string;
    
    deserialize(input: any): Employes {
        Object.assign(this, input);
        return this;
    }
}