import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonalInformation} from '../model/PersonalInformation';
import {TextPayload} from '../model/TextPayload';

const uuid = require('uuid/v1');

export interface FieldChanged extends PodMemberPersonal {
    value: string,
    field: string
}

@Component({
    selector: 'personal-information-editor',
    template: require('./PersonalInformationEditor.component.htm')
})
export class PersonalInformationEditorComponent {

    @Output()
    private personalInformationChanged = new EventEmitter<FieldChanged>();

    @Output()
    private interestRemoved = new EventEmitter<Interest>();

    @Output()
    private interestAdded = new EventEmitter<Interest>();



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

    set firstName(value: string) {
        this.personalInformation.firstName = value;
    }

    get lastName(): string {
        return this.personalInformation.lastName;
    }

    set lastName(value: string) {
        this.personalInformation.lastName = value;
    }

    get email(): string {
        return this.personalInformation.email;
    }

    set email(value: string) {
        this.personalInformation.email = value;
    }

    get phoneNumber(): string {
        return this.personalInformation.phoneNumber;
    }

    set phoneNumber(value: string) {
        this.personalInformation.phoneNumber = value;
    }

    get interests(): Interest[] {
        return this.personalInformation.interests
    }

    addInterest(textPayload: TextPayload) {
        let interest = new Interest(uuid(), textPayload.value);
        this.interestAdded.emit(interest);
        this.personalInformation.addInterest(interest)
    }

    removeInterest(interest: Interest) {
        this.interestRemoved.emit(interest);
        this.personalInformation.removeInterest(interest);
    }

    fieldChanged(event: FieldChanged): void {
        this.personalInformationChanged.emit(event);
    }
}

export class Interest {

    id: string;
    value: string;

    constructor(id: string, value: string) {
        this.id = id;
        this.value = value;
    }
}

export interface PodMemberPersonal {
    podMemberIdentifier: string
}