import {Avatar} from './Avatar.model';
import {PersonalInformation} from './PersonalInformation';
import {Observable} from 'rxjs';

export interface PodMember {
    avatar: Observable<Avatar>;
    personalInformation: Observable<PersonalInformation>;
    getIdentifier(): string;
    setAvatar(avatar: Observable<Avatar>): void;

}