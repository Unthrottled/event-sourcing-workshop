import {Component, Input} from '@angular/core';
import {Avatar} from '../model/Avatar.model';
import {PodMemberService} from '../service/PodMember.service';
import {PersonalInformation} from '../model/PersonalInformation';
import {PodMember} from '../model/PodMember.model';
import {Action} from '../model/Action.model';
import {LocalAvatar} from '../model/LocalAvatar';
import {ImageUploadService} from '../service/ImageUpload.service';
import {EventDispatchService} from '../service/EventDispatch.service';
import {FieldChanged, Interest, PodMemberPersonal} from './PersonalInformationEditor.component';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'pod-member-editor',
    template: require('./PodMemberEditor.component.htm')
})
export class PodMemberEditorComponent {

    constructor(private projectFileService: PodMemberService,
                private eventDispatchService: EventDispatchService,
                private imageUploadService: ImageUploadService) {
    }


    get personalInformation(): Observable<PersonalInformation> {
        return this.podMember.personalInformation;
    }

    private _podMember: PodMember;

    @Input()
    get podMember(): PodMember {
        return this._podMember;
    }

    set podMember(value: PodMember) {
        this._podMember = value;
    }

    get avatar(): Observable<Avatar> {
        return this.podMember.avatar;
    }

    updateAvatar(avatar: LocalAvatar): void {
        this.podMember.setAvatar(new BehaviorSubject(avatar));
        this.imageUploadService.uploadImage(avatar.selectedFile, this.podMember.getIdentifier())
            .subscribe(remoteIdentifier => {
                const uploadedAvatarAction: Action<AvatarPayload> = {
                    type: "AVATAR_UPLOADED",
                    payload: {
                        identifier: remoteIdentifier,
                    },
                    error: false,
            meta: {}
                }
                this.postEvent(uploadedAvatarAction)
            }, error =>{
                // should probably try again
                console.warn(error)
            } );
    }

    interestAdded(interest: Interest): void {
        const action: Action<Interest> = {
            type: 'INTEREST_CAPTURED',
            payload: {
                ...interest,
            },
            error: false,
            meta: {},
        };
        this.postEvent(action);
    }

    personalInformationChanged(fieldChanged: FieldChanged){
        const action: Action<FieldChanged> = {
            type: 'PERSONAL_INFO_CAPTURED',
            payload: {
                ...fieldChanged,
            },
            error: false,
            meta: {}
        };
        this.postEvent(action);
    }

    interestRemoved(interest: Interest): void {
        const action: Action<Interest> = {
            type: 'INTEREST_REMOVED',
            payload: {
                ...interest
            },
            error: false,
            meta: {}
        };
        this.postEvent(action);
    }

    postEvent<T>(action: Action<T>): void{
        this.eventDispatchService.dispatchPodMemberAction(action, this.podMember.getIdentifier())
            .subscribe((it)=>{}, console.warn)
    }
}

interface AvatarPayload {
    identifier: string;
}

interface InterestActionPayload extends Interest, PodMemberPersonal{

}

interface FieldChangedActionPayload extends FieldChanged, PodMemberPersonal{

}
