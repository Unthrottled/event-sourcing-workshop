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
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var PersonalInformation_1 = require("../pod/members/model/PersonalInformation");
var BackendAPIService = /** @class */ (function () {
    function BackendAPIService(httpClient) {
        this.httpClient = httpClient;
    }
    BackendAPIService.prototype.postImage = function (podMemberId, formData) {
        return this.httpClient.post('./api/pod/member/' + podMemberId + '/avatar', formData, {
            responseType: 'text'
        });
    };
    BackendAPIService.prototype.fetchImage = function (podMemberId) {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/avatar', {
            responseType: 'arraybuffer'
        });
    };
    BackendAPIService.prototype.deleteImage = function (podMemberId) {
        return this.httpClient.delete('./api/pod/member/' + podMemberId + '/avatar', {
            responseType: 'json'
        }).map(function (response) { return (response === true); });
    };
    BackendAPIService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error('aoeuaoeu', error);
            return Observable_1.Observable.of(result);
        };
    };
    BackendAPIService.prototype.fetchAllPodMemberIdentifiers = function () {
        return this.httpClient.get('./api/pod/members', {
            responseType: 'json',
        })
            .map(function (response) { return (response).map(function (podMemberIdentifier) { return podMemberIdentifier._id; }); })
            .flatMap(function (ids) { return Observable_1.Observable.create(function (observer) {
            ids.forEach(function (_id) { return observer.next(_id); });
            observer.complete();
        }); });
    };
    BackendAPIService.prototype.fetchPersonalInformation = function (podMemberId) {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/information', {
            responseType: 'json',
        }).map(function (response) { return new PersonalInformation_1.PersonalInformation(response); });
    };
    BackendAPIService.prototype.postPodMemberEvent = function (action, podMemberIdentifier) {
        return this.httpClient.post('./api/pod/member/' + podMemberIdentifier + '/event', action, {
            responseType: 'json'
        }).map(function (it) { return it; });
    };
    BackendAPIService.prototype.postEvent = function (action) {
        return this.httpClient.post('./api/pod/event', action, {
            responseType: 'json'
        }).map(function (it) { return it; });
    };
    BackendAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], BackendAPIService);
    return BackendAPIService;
}());
exports.BackendAPIService = BackendAPIService;
//# sourceMappingURL=BackendAPI.service.js.map