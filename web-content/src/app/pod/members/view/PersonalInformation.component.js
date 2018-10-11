"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PersonalInformation_1 = require("../model/PersonalInformation");
var PersonalInformationComponent = /** @class */ (function () {
    function PersonalInformationComponent() {
        this.projectFileEmmiter = new core_1.EventEmitter();
    }
    Object.defineProperty(PersonalInformationComponent.prototype, "personalInformation", {
        get: function () {
            return this._personalInformation;
        },
        set: function (value) {
            this._personalInformation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PersonalInformationComponent.prototype, "firstName", {
        get: function () {
            return this.personalInformation.firstName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PersonalInformationComponent.prototype, "lastName", {
        get: function () {
            return this.personalInformation.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PersonalInformationComponent.prototype, "email", {
        get: function () {
            return this.personalInformation.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PersonalInformationComponent.prototype, "interests", {
        get: function () {
            return this.personalInformation.interests;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PersonalInformationComponent.prototype, "phoneNumber", {
        get: function () {
            return this.personalInformation.phoneNumber;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PersonalInformationComponent.prototype, "projectFileEmmiter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", PersonalInformation_1.PersonalInformation),
        __metadata("design:paramtypes", [PersonalInformation_1.PersonalInformation])
    ], PersonalInformationComponent.prototype, "personalInformation", null);
    PersonalInformationComponent = __decorate([
        core_1.Component({
            selector: 'personal-information',
            template: require('./PersonalInformation.component.htm')
        }),
        __metadata("design:paramtypes", [])
    ], PersonalInformationComponent);
    return PersonalInformationComponent;
}());
exports.PersonalInformationComponent = PersonalInformationComponent;
//# sourceMappingURL=PersonalInformation.component.js.map