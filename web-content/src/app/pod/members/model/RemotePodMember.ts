import {Avatar} from "./Avatar.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Identifier} from "./Identifier.model";
import {PodMember} from './PodMember.model';
import {PersonalInformation} from './PersonalInformation';

export class RemotePodMember implements PodMember {
    personalInformation: Observable<PersonalInformation>;
    avatar: Observable<Avatar>;
    private _identifier: Identifier;

    constructor(id: Identifier, avatar: Observable<Avatar>, personalInformation: Observable<PersonalInformation>) {
        this._identifier = id;
        this.avatar = avatar;
        this.personalInformation = personalInformation;
    }

    getIdentifier(): string {
        return this._identifier.id;
    }

    setAvatar(avatar: Observable<Avatar>): void {
        this.avatar = avatar;
    }
}