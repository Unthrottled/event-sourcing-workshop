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
var PodMember_service_1 = require("./service/PodMember.service");
var PodMembersComponent = /** @class */ (function () {
    function PodMembersComponent(podMemberService) {
        this.podMemberService = podMemberService;
    }
    PodMembersComponent.prototype.ngOnInit = function () {
        this.podMemberService.ngOnInit();
    };
    Object.defineProperty(PodMembersComponent.prototype, "podMembers", {
        get: function () {
            return this.podMemberService.podMembers;
        },
        enumerable: true,
        configurable: true
    });
    PodMembersComponent.prototype.addNewPodMember = function () {
        this.podMemberService.addPodMember().subscribe(function () { }, console.warn);
    };
    Object.defineProperty(PodMembersComponent.prototype, "loading", {
        get: function () {
            return this.podMemberService.loadingObservable;
        },
        enumerable: true,
        configurable: true
    });
    PodMembersComponent = __decorate([
        core_1.Component({
            selector: 'pod-member-component',
            template: require('./PodMembers.component.htm')
        }),
        __metadata("design:paramtypes", [PodMember_service_1.PodMemberService])
    ], PodMembersComponent);
    return PodMembersComponent;
}());
exports.PodMembersComponent = PodMembersComponent;
//# sourceMappingURL=PodMembers.component.js.map