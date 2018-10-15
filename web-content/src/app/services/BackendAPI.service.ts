import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '../pod/members/model/Action.model';
import {PersonalInformation} from '../pod/members/model/PersonalInformation';
import {Observer} from "rxjs";

@Injectable()
export class BackendAPIService {

    constructor(private httpClient: HttpClient) {
    }

    postImage(podMemberId: string, formData: FormData): Observable<string> {
        return this.httpClient.post('./api/pod/member/' + podMemberId + '/avatar', formData, {
            responseType: 'text'
        });
    }

    fetchImage(podMemberId: string): Observable<ArrayBuffer> {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/avatar', {
            responseType: 'arraybuffer'
        });
    }

    deleteImage(podMemberId: string): Observable<boolean> {
        return this.httpClient.delete('./api/pod/member/' + podMemberId + '/avatar', {
            responseType: 'json'
        }).map(response => (<Boolean>response === true));
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error('aoeuaoeu', error);
            return Observable.of(result as T);
        };
    }

    fetchAllPodMemberIdentifiers(): Observable<string> {
        return this.httpClient.get('./api/pod/members', {
            responseType: 'json',
        })
            .map((response: any) => (response).map((podMemberIdentifier: any) => podMemberIdentifier._id))
            .flatMap((ids: string[]) => Observable.create((observer: Observer<String>) => {
                ids.forEach(_id => observer.next(_id));
                observer.complete();
            }));
    }

    fetchPersonalInformation(podMemberId: string): Observable<PersonalInformation> {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/information', {
            responseType: 'json',
        }).map((response: any) => new PersonalInformation(response))
    }

    postPodMemberEvent<T>(action: Action<T>, podMemberIdentifier: string): Observable<Action<T>> {
        return this.httpClient.post('./api/pod/member/' + podMemberIdentifier + '/event', action, {
            responseType: 'json'
        }).map((it: Action<T>) => it);
    }

    postEvent<T>(action: Action<T>): Observable<Action<T>> {
        return this.httpClient.post('./api/pod/event', action, {
            responseType: 'json'
        }).map((it: Action<T>) => it);
    }
}