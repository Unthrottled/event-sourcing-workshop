"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var RemoteAvatar = /** @class */ (function () {
    /**
     *
     * @param {Identifier} identifier the unique identifier that will allow use of
     *                      the backend rest api.
     * @param {Observable<any>} remoteProjectFile project file from the backend
     */
    function RemoteAvatar(podmemberId, binary) {
        this.imageBinaryReplay = new ReplaySubject_1.ReplaySubject(1);
        this.imageBinaryReplay.next(binary);
        this._identifier = podmemberId;
    }
    Object.defineProperty(RemoteAvatar.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (value) {
            this._identifier = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Replaces the current remote project file with the new binary.
     *
     * I am kind of torn at the moment because one you set the binary again
     * it is no longer a remote project file and does not fit int this current
     * abstraction.
     * @param {File} file
     */
    RemoteAvatar.prototype.setNewFile = function (file) {
    };
    RemoteAvatar.prototype.getIdentifier = function () {
        return this._identifier;
    };
    /**
     * Actual binary received from the backend service.
     * @returns {Observable<any>}
     */
    RemoteAvatar.prototype.imageBinary = function () {
        return this.imageBinaryReplay;
    };
    return RemoteAvatar;
}());
exports.RemoteAvatar = RemoteAvatar;
//# sourceMappingURL=RemoteAvatar.js.map