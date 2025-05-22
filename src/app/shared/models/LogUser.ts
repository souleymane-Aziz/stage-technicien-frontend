import { Deserializable } from './deserializable';
import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
@Injectable()
export class LogUser implements Deserializable<LogUser> {
    actions: string
    agent: Utilisateur
    dateAction: string
    dateLog: string
    description: string
    idlogUser: number
    latitude: string
    longitude: string
    deserialize(input: any): LogUser {
        Object.assign(this, input);
        return this;
    }
}
