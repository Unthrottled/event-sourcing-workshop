import {Avatar} from './Avatar.model';
import {Identifier} from './Identifier.model';
import {PodMember} from './PodMember.model';
import {PersonalInformation} from './PersonalInformation';
import {Observable} from 'rxjs';

export class LocalPodMember implements PodMember {
    personalInformation: Observable<PersonalInformation> = Observable.of(new PersonalInformation());
    avatar: Observable<Avatar>;
    private _identifier: Identifier;

    constructor(id: Identifier, avatar: Observable<Avatar>) {
        this._identifier = id;
        this.avatar = avatar;
    }

    getIdentifier(): string {
        return this._identifier.id;
    }

    setAvatar(avatar: Observable<Avatar>): void {
        this.avatar = avatar;
    }
}