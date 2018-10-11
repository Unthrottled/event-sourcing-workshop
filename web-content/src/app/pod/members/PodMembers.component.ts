import {Component, OnInit} from "@angular/core";
import {PodMember} from "./model/PodMember.model";
import {PodMemberService} from "./service/PodMember.service";
import {Observable} from 'rxjs';

@Component({
    selector: 'pod-member-component',
    template: require('./PodMembers.component.htm')
})
export class PodMembersComponent implements OnInit {
    ngOnInit(): void {
        this.podMemberService.ngOnInit();
    }

    constructor(private podMemberService: PodMemberService){}

    get podMembers(): Iterable<PodMember> {
        return this.podMemberService.podMembers;
    }

    addNewPodMember(): void {
        this.podMemberService.addPodMember().subscribe(()=>{},console.warn);
    }

    get loading(): Observable<boolean>{
        return this.podMemberService.loadingObservable
    }
}

export interface PodMemberPayload {
    identifier: string
}