"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersonalInformationEditor_component_1 = require("../edit/PersonalInformationEditor.component");
var PersonalInformation = /** @class */ (function () {
    function PersonalInformation(personalInformation) {
        this.interests = [];
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        if (personalInformation) {
            this.interests = personalInformation.interests.map(function (it) { return new PersonalInformationEditor_component_1.Interest(it.id, it.value); });
            this.email = personalInformation.email;
            this.firstName = personalInformation.firstName;
            this.lastName = personalInformation.lastName;
            this.phoneNumber = personalInformation.phoneNumber;
        }
    }
    PersonalInformation.prototype.addInterest = function (interest) {
        this.interests.push(interest);
    };
    PersonalInformation.prototype.removeInterest = function (interest) {
        this.interests = this.interests.filter(function (it) { return it.id !== interest.id; });
    };
    return PersonalInformation;
}());
exports.PersonalInformation = PersonalInformation;
//# sourceMappingURL=PersonalInformation.js.map