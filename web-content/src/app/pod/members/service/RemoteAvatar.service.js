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
var BackendAPI_service_1 = require("../../../services/BackendAPI.service");
var window_1 = require("../../../util/window");
var RemoteAvatar_1 = require("../model/RemoteAvatar");
var rxjs_1 = require("rxjs");
var RemoteAvatarService = /** @class */ (function () {
    function RemoteAvatarService(backendAPISevice, windowRef) {
        this.backendAPISevice = backendAPISevice;
        this.windowRef = windowRef;
    }
    RemoteAvatarService.prototype.fetchRemoteAvatar = function (podMemberId) {
        var _this = this;
        var avatarReplay = new rxjs_1.ReplaySubject(1);
        this.backendAPISevice.fetchImage(podMemberId)
            .map(function (arrayBuffer) { return _this.convertToImageBinary(arrayBuffer); })
            .map(function (base64Binary) { return new RemoteAvatar_1.RemoteAvatar(podMemberId, base64Binary); })
            .subscribe(avatarReplay);
        return avatarReplay;
    };
    RemoteAvatarService.prototype.convertToImageBinary = function (arrayBuffer) {
        var binary = '';
        var bytes = new Uint8Array(arrayBuffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + this.windowRef.nativeWindow.btoa(binary);
    };
    RemoteAvatarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService, window_1.WindowRef])
    ], RemoteAvatarService);
    return RemoteAvatarService;
}());
exports.RemoteAvatarService = RemoteAvatarService;
//# sourceMappingURL=RemoteAvatar.service.js.map