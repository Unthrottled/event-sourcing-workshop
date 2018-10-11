import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../../services/BackendAPI.service";
import {WindowRef} from "../../../util/window";
import {RemoteAvatar} from "../model/RemoteAvatar";
import {Identifier} from "../model/Identifier.model";
import {Observable} from "rxjs/Observable";
import {PodMember} from '../model/PodMember.model';
import {RemoteAvatarService} from './RemoteAvatar.service';
import {RemotePodMember} from '../model/RemotePodMember';
import {PersonalInformation} from '../model/PersonalInformation';
import {RemotePersonalInformationService} from './RemotePersonalInformation.service';

@Injectable()
export class RemotePodMemberService {

    constructor(private backendAPISevice: BackendAPIService,
                private remoteAvatarService: RemoteAvatarService,
                private remotePersonalInformationService: RemotePersonalInformationService,
    ) {
    }

    public fetchPodMember(podMemberId: string): PodMember {
        return new RemotePodMember(new Identifier(podMemberId),
            this.remoteAvatarService.fetchRemoteAvatar(podMemberId),
            this.remotePersonalInformationService.fetchRemotePersonalInformation(podMemberId)
        );
    }

    public fetchAllRemotePodMembers(): Observable<PodMember> {
        return this.backendAPISevice.fetchAllPodMemberIdentifiers()
            .map(id => this.fetchPodMember(id));
    }

    removeProject(projectToRemove: PodMember): Observable<boolean> {
        return this.backendAPISevice.deleteImage(projectToRemove.getIdentifier());
    }
}