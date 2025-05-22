import { Deserializable } from "./deserializable";
export class MaterielExportModel implements Deserializable<MaterielExportModel>{
  Nom: string;
  Marque: string;
  Modele: string;
  deserialize(input: any): MaterielExportModel {
    Object.assign(this, input);
    return this;
  }
}
