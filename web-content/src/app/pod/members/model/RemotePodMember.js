"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemotePodMember = /** @class */ (function () {
    function RemotePodMember(id, avatar, personalInformation) {
        this._identifier = id;
        this.avatar = avatar;
        this.personalInformation = personalInformation;
    }
    RemotePodMember.prototype.getIdentifier = function () {
        return this._identifier.id;
    };
    RemotePodMember.prototype.setAvatar = function (avatar) {
        this.avatar = avatar;
    };
    return RemotePodMember;
}());
exports.RemotePodMember = RemotePodMember;
//# sourceMappingURL=RemotePodMember.js.map