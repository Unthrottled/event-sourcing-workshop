"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var ImageUpload_service_1 = require("../service/ImageUpload.service");
var EventDispatch_service_1 = require("../service/EventDispatch.service");
var rxjs_1 = require("rxjs");
var PodMemberEditorComponent = /** @class */ (function () {
    function PodMemberEditorComponent(projectFileService, eventDispatchService, imageUploadService) {
        this.projectFileService = projectFileService;
        this.eventDispatchService = eventDispatchService;
        this.imageUploadService = imageUploadService;
    }
    Object.defineProperty(PodMemberEditorComponent.prototype, "personalInformation", {
        get: function () {
            return this.podMember.personalInformation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberEditorComponent.prototype, "podMember", {
        get: function () {
            return this._podMember;
        },
        set: function (value) {
            this._podMember = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberEditorComponent.prototype, "avatar", {
        get: function () {
            return this.podMember.avatar;
        },
        enumerable: true,
        configurable: true
    });
    PodMemberEditorComponent.prototype.updateAvatar = function (avatar) {
        var _this = this;
        this.podMember.setAvatar(new rxjs_1.BehaviorSubject(avatar));
        this.imageUploadService.uploadImage(avatar.selectedFile, this.podMember.getIdentifier())
            .subscribe(function (remoteIdentifier) {
            var uploadedAvatarAction = {
                type: "AVATAR_UPLOADED",
                payload: {
                    identifier: remoteIdentifier,
                },
                error: false,
                meta: {}
            };
            _this.postEvent(uploadedAvatarAction);
        }, function (error) {
            // should probably try again
            console.warn(error);
        });
    };
    PodMemberEditorComponent.prototype.interestAdded = function (interest) {
        var action = {
            type: 'INTEREST_CAPTURED',
            payload: __assign({}, interest),
            error: false,
            meta: {},
        };
        this.postEvent(action);
    };
    PodMemberEditorComponent.prototype.personalInformationChanged = function (fieldChanged) {
        var action = {
            type: 'PERSONAL_INFO_CAPTURED',
            payload: __assign({}, fieldChanged),
            error: false,
            meta: {}
        };
        this.postEvent(action);
    };
    PodMemberEditorComponent.prototype.interestRemoved = function (interest) {
        var action = {
            type: 'INTEREST_REMOVED',
            payload: __assign({}, interest),
            error: false,
            meta: {}
        };
        this.postEvent(action);
    };
    PodMemberEditorComponent.prototype.postEvent = function (action) {
        this.eventDispatchService.dispatchPodMemberAction(action, this.podMember.getIdentifier())
            .subscribe(function (it) { }, console.warn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PodMemberEditorComponent.prototype, "podMember", null);
    PodMemberEditorComponent = __decorate([
        core_1.Component({
            selector: 'pod-member-editor',
            template: require('./PodMemberEditor.component.htm')
        }),
        __metadata("design:paramtypes", [PodMember_service_1.PodMemberService,
            EventDispatch_service_1.EventDispatchService,
            ImageUpload_service_1.ImageUploadService])
    ], PodMemberEditorComponent);
    return PodMemberEditorComponent;
}());
exports.PodMemberEditorComponent = PodMemberEditorComponent;
//# sourceMappingURL=PodMemberEditor.component.js.map