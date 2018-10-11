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
var PodMember_service_1 = require("../service/PodMember.service");
var RemotePodMember_1 = require("../model/RemotePodMember");
var PodMemberComponent = /** @class */ (function () {
    function PodMemberComponent(projectFileService) {
        this.projectFileService = projectFileService;
        this._editMode = true;
    }
    Object.defineProperty(PodMemberComponent.prototype, "personalInformation", {
        get: function () {
            return this.podMember.personalInformation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberComponent.prototype, "podMember", {
        get: function () {
            return this._podMember;
        },
        set: function (value) {
            if (value instanceof RemotePodMember_1.RemotePodMember) {
                this._editMode = false;
            }
            this._podMember = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberComponent.prototype, "editMode", {
        get: function () {
            return this._editMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberComponent.prototype, "avatar", {
        get: function () {
            return this.podMember.avatar;
        },
        enumerable: true,
        configurable: true
    });
    PodMemberComponent.prototype.podMemberUpdated = function (projectFile) {
        this.podMember = projectFile;
    };
    PodMemberComponent.prototype.hideEdit = function () {
        this._editMode = false;
    };
    PodMemberComponent.prototype.showEdit = function () {
        this._editMode = true;
    };
    PodMemberComponent.prototype.delete = function () {
        this.projectFileService.removePodMember(this.podMember)
            .subscribe(function () { }, console.warn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PodMemberComponent.prototype, "podMember", null);
    PodMemberComponent = __decorate([
        core_1.Component({
            selector: 'pod-member',
            template: require('./PodMember.component.htm')
        }),
        __metadata("design:paramtypes", [PodMember_service_1.PodMemberService])
    ], PodMemberComponent);
    return PodMemberComponent;
}());
exports.PodMemberComponent = PodMemberComponent;
//# sourceMappingURL=PodMember.component.js.map