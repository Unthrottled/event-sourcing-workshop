import {Injectable, OnInit} from '@angular/core';
import {PodMember} from '../model/PodMember.model';
import {LocalPodMemberService} from './LocalPodMember.service';
import {RemotePodMemberService} from './RemotePodMember.service';
import {Action} from '../model/Action.model';
import {PodMemberPayload} from '../PodMembers.component';
import {EventDispatchService} from './EventDispatch.service';
import {Observable, ReplaySubject} from 'rxjs';


@Injectable()
export class PodMemberService implements OnInit {
    private podMembersIterator: PodMember[] = [];

    constructor(private localPodMemberService: LocalPodMemberService,
                private remotePodMemberService: RemotePodMemberService,
                private eventDispatchService: EventDispatchService) {

    }

    private _loadingObservable = new ReplaySubject<boolean>(1);

    get loadingObservable(): Observable<boolean> {
        return this._loadingObservable;
    }

    get podMembers(): PodMember[] {
        return this.podMembersIterator;
    }

    ngOnInit(): void {
        this.remotePodMemberService.fetchAllRemotePodMembers()
            .subscribe(remoteFile => {
                this.addPodMemberToList(remoteFile);
            }, error => {
                console.warn(error);
                this._loadingObservable.next(true);
            }, () => {
                this._loadingObservable.next(true);
            })
    }

    addPodMember(): Observable<PodMember> {
        let podMember: PodMember = this.localPodMemberService.createLocalPodMember();
        this.addPodMemberToList(podMember);
        const action: Action<PodMemberPayload> = {
            type: 'POD_MEMBER_CREATED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false,
            meta: {}
        };

        return this.eventDispatchService.dispatchPodAction<PodMemberPayload>(action)
            .map((it) => podMember);
    }

    removePodMember(podMember: PodMember): Observable<PodMember> {
        this.removePodMemberFromList(podMember);
        const action: Action<PodMemberPayload> = {
            type: 'POD_MEMBER_DELETED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false,
            meta: {}
        };
        return this.eventDispatchService.dispatchPodAction<PodMemberPayload>(action)
            .map((it) => podMember);
    }

    private addPodMemberToList(podMember: PodMember) {
        this.podMembersIterator.unshift(podMember);
    }

    private removePodMemberFromList(podMemberToRemove: PodMember) {
        this.podMembersIterator = this.podMembersIterator.filter(it => it.getIdentifier() !== podMemberToRemove.getIdentifier())

    }
}