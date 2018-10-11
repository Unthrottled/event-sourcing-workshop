import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../../services/BackendAPI.service";
import {WindowRef} from "../../../util/window";
import {RemoteAvatar} from "../model/RemoteAvatar";
import {Identifier} from "../model/Identifier.model";
import {Observable} from "rxjs/Observable";
import {PersonalInformation} from '../model/PersonalInformation';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class RemotePersonalInformationService {

    constructor(private backendAPISevice: BackendAPIService) {
    }

    public fetchRemotePersonalInformation(podMemberId: string): Observable<PersonalInformation> {
        const personalInformationReplay = new ReplaySubject<PersonalInformation>(1)
        this.backendAPISevice.fetchPersonalInformation(podMemberId)
            .subscribe(personalInformationReplay);
        return personalInformationReplay;
    }

}