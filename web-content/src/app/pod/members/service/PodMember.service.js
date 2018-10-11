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
var LocalPodMember_service_1 = require("./LocalPodMember.service");
var RemotePodMember_service_1 = require("./RemotePodMember.service");
var EventDispatch_service_1 = require("./EventDispatch.service");
var rxjs_1 = require("rxjs");
var PodMemberService = /** @class */ (function () {
    function PodMemberService(localPodMemberService, remotePodMemberService, eventDispatchService) {
        this.localPodMemberService = localPodMemberService;
        this.remotePodMemberService = remotePodMemberService;
        this.eventDispatchService = eventDispatchService;
        this.podMembersIterator = [];
        this._loadingObservable = new rxjs_1.ReplaySubject(1);
    }
    Object.defineProperty(PodMemberService.prototype, "loadingObservable", {
        get: function () {
            return this._loadingObservable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberService.prototype, "podMembers", {
        get: function () {
            return this.podMembersIterator;
        },
        enumerable: true,
        configurable: true
    });
    PodMemberService.prototype.ngOnInit = function () {
        var _this = this;
        this.remotePodMemberService.fetchAllRemotePodMembers()
            .subscribe(function (remoteFile) {
            _this.addPodMemberToList(remoteFile);
        }, function (error) {
            console.warn(error);
            _this._loadingObservable.next(true);
        }, function () {
            _this._loadingObservable.next(true);
        });
    };
    PodMemberService.prototype.addPodMember = function () {
        var podMember = this.localPodMemberService.createLocalPodMember();
        this.addPodMemberToList(podMember);
        var action = {
            type: 'POD_MEMBER_CREATED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false,
            meta: {}
        };
        return this.eventDispatchService.dispatchPodAction(action)
            .map(function (it) { return podMember; });
    };
    PodMemberService.prototype.removePodMember = function (podMember) {
        this.removePodMemberFromList(podMember);
        var action = {
            type: 'POD_MEMBER_DELETED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false,
            meta: {}
        };
        return this.eventDispatchService.dispatchPodAction(action)
            .map(function (it) { return podMember; });
    };
    PodMemberService.prototype.addPodMemberToList = function (podMember) {
        this.podMembersIterator.unshift(podMember);
    };
    PodMemberService.prototype.removePodMemberFromList = function (podMemberToRemove) {
        this.podMembersIterator = this.podMembersIterator.filter(function (it) { return it.getIdentifier() !== podMemberToRemove.getIdentifier(); });
    };
    PodMemberService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [LocalPodMember_service_1.LocalPodMemberService,
            RemotePodMember_service_1.RemotePodMemberService,
            EventDispatch_service_1.EventDispatchService])
    ], PodMemberService);
    return PodMemberService;
}());
exports.PodMemberService = PodMemberService;
//# sourceMappingURL=PodMember.service.js.map