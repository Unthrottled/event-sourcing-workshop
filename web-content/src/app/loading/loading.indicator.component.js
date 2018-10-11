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
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var LoadingIndicatorComponent = /** @class */ (function () {
    function LoadingIndicatorComponent() {
        this._doneLoading = Observable_1.Observable.empty();
        this.completed = new BehaviorSubject_1.BehaviorSubject(false);
    }
    Object.defineProperty(LoadingIndicatorComponent.prototype, "doneLoading", {
        get: function () {
            return this._doneLoading;
        },
        set: function (value) {
            var _this = this;
            this._doneLoading = value;
            var emissionHandler = function () { _this.completed.next(true); };
            this.doneLoading.subscribe(emissionHandler, emissionHandler, emissionHandler);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingIndicatorComponent.prototype, "completedLoading", {
        get: function () {
            return this.completed;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Observable_1.Observable),
        __metadata("design:paramtypes", [Observable_1.Observable])
    ], LoadingIndicatorComponent.prototype, "doneLoading", null);
    LoadingIndicatorComponent = __decorate([
        core_1.Component({
            selector: 'loading-indicator',
            template: require('./loading.indicator.component.htm')
        }),
        __metadata("design:paramtypes", [])
    ], LoadingIndicatorComponent);
    return LoadingIndicatorComponent;
}());
exports.LoadingIndicatorComponent = LoadingIndicatorComponent;
//# sourceMappingURL=loading.indicator.component.js.map