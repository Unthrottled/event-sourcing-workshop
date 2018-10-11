import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '../pod/members/model/Action.model';
import {PersonalInformation} from '../pod/members/model/PersonalInformation';
import {Observer} from 'rxjs';
declare var oboe: any;

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
        return Observable.create((observer: Observer<String>) => {
            oboe({
                'url': './api/pod/members',
                'method': 'GET',
                'body': '',
                'cached': false,
                'withCredentials': true
            }).done((jsonThingo: any) => {
                observer.next(jsonThingo._id);
            }).fail((error: any) => {
                observer.error(error);
            }).on('end',()=>{
                observer.complete();
            })
        });
    }

    fetchPersonalInformation(podMemberId: string): Observable<PersonalInformation> {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/information', {
            responseType: 'json',
        }).map((response: any) => new PersonalInformation(response))
    }

    postPodMemberEvent<T>(action: Action<T>, podMemberIdentifier: string): Observable<Action<T>> {
        return this.httpClient.post('./api/pod/member/' + podMemberIdentifier + '/event', action, {
            responseType: 'json'
        }).map((it: Action<T>)=>it);
    }

    postEvent<T>(action: Action<T>): Observable<Action<T>> {
        return this.httpClient.post('./api/pod/event', action, {
            responseType: 'json'
        }).map((it: Action<T>)=>it);
    }
}