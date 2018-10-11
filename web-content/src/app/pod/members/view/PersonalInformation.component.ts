import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonalInformation} from '../model/PersonalInformation';
import {TextPayload} from '../model/TextPayload';
import {Interest} from '../edit/PersonalInformationEditor.component';

@Component({
    selector: 'personal-information',
    template: require('./PersonalInformation.component.htm')
})
export class PersonalInformationComponent {

    @Output()
    private projectFileEmmiter = new EventEmitter<PersonalInformation>();

    constructor() {
    }

    private _personalInformation: PersonalInformation;

    @Input()
    get personalInformation(): PersonalInformation {
        return this._personalInformation;
    }

    set personalInformation(value: PersonalInformation) {
        this._personalInformation = value;
    }

    get firstName(): string {
        return this.personalInformation.firstName;
    }

    get lastName(): string {
        return this.personalInformation.lastName;
    }

    get email(): string {
        return this.personalInformation.email;
    }

    get interests(): Interest[] {
        return this.personalInformation.interests;
    }

    get phoneNumber(): string {
        return this.personalInformation.phoneNumber;
    }
}