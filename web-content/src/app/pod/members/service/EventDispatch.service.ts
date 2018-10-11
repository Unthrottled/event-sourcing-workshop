import {Injectable} from '@angular/core';
import {Action} from '../model/Action.model';
import {BackendAPIService} from '../../../services/BackendAPI.service';
import {Observable} from 'rxjs';

@Injectable()
export class EventDispatchService {

    constructor(private backendAPI: BackendAPIService) {
    }

    public dispatchPodMemberAction<T>(action: Action<T>, podMemberIdentifier: string): Observable<Action<T>> {
        console.log(action);
        return this.backendAPI.postPodMemberEvent(action,podMemberIdentifier);
    }

    public dispatchPodAction<T>(action: Action<T>): Observable<Action<T>> {
        console.log(action);
        return this.backendAPI.postEvent(action);
    }

}