import {Interest} from '../edit/PersonalInformationEditor.component';

export class PersonalInformation {
    interests: Interest[] = [];
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';


    constructor(personalInformation?: any) {
        if(personalInformation){
            this.interests = personalInformation.interests.map((it: Interest) => new Interest(it.id, it.value));
            this.email = personalInformation.email;
            this.firstName = personalInformation.firstName;
            this.lastName = personalInformation.lastName;
            this.phoneNumber = personalInformation.phoneNumber;
        }

    }

    addInterest(interest: Interest): void {
        this.interests.push(interest)
    }

    removeInterest(interest: Interest): void {
        this.interests = this.interests.filter(it => it.id !== interest.id)
    }
}

