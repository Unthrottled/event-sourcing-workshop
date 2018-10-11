import {Injectable} from "@angular/core";
import {LocalAvatar} from "../model/LocalAvatar";
import {Identifier} from "../model/Identifier.model";
import {Observable} from 'rxjs';

@Injectable()
export class LocalProjectFileService {
    private static localProjectCount: number = 0;

    constructor(){}

    public createLocalProject(): Observable<LocalAvatar> {
        return Observable.empty();
    }

}