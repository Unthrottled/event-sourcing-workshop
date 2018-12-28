"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RemoteAvatar_service_1 = require("./service/RemoteAvatar.service");
var AvatarChoose_component_1 = require("./choose/AvatarChoose.component");
var PodMemberList_component_1 = require("./list/PodMemberList.component");
var AvatarView_component_1 = require("./view/AvatarView.component");
var PodMembers_component_1 = require("./PodMembers.component");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var ProjectFileManipulation_component_1 = require("./manipulation/ProjectFileManipulation.component");
var PodMember_service_1 = require("./service/PodMember.service");
var PodMember_component_1 = require("./view/PodMember.component");
var LocalProjectFile_service_1 = require("./service/LocalProjectFile.service");
var ImageUpload_service_1 = require("./service/ImageUpload.service");
var PersonalInformation_component_1 = require("./view/PersonalInformation.component");
var InterestList_component_1 = require("./list/InterestList.component");
var TextSubmission_component_1 = require("./manipulation/TextSubmission.component");
var AvatarEditor_component_1 = require("./edit/AvatarEditor.component");
var PersonalInformationEditor_component_1 = require("./edit/PersonalInformationEditor.component");
var RemotePodMember_service_1 = require("./service/RemotePodMember.service");
var LocalPodMember_service_1 = require("./service/LocalPodMember.service");
var PodMemberEditor_component_1 = require("./edit/PodMemberEditor.component");
var EventDispatch_service_1 = require("./service/EventDispatch.service");
var RemotePersonalInformation_service_1 = require("./service/RemotePersonalInformation.service");
var loading_indicator_component_1 = require("../../loading/loading.indicator.component");
var material_1 = require("@angular/material");
var MembersModule = /** @class */ (function () {
    function MembersModule() {
    }
    MembersModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatGridListModule,
            ],
            exports: [
                AvatarChoose_component_1.AvatarChooseComponent,
                PodMemberList_component_1.PodMemberListComponent,
                AvatarView_component_1.AvatarViewComponent,
                PodMember_component_1.PodMemberComponent,
                PodMembers_component_1.PodMembersComponent,
                ProjectFileManipulation_component_1.ProjectFileManipulationComponent
            ],
            declarations: [
                AvatarChoose_component_1.AvatarChooseComponent,
                PodMemberList_component_1.PodMemberListComponent,
                AvatarView_component_1.AvatarViewComponent,
                AvatarEditor_component_1.AvatarEditorComponent,
                PodMember_component_1.PodMemberComponent,
                PodMembers_component_1.PodMembersComponent,
                ProjectFileManipulation_component_1.ProjectFileManipulationComponent,
                PersonalInformation_component_1.PersonalInformationComponent,
                PersonalInformationEditor_component_1.PersonalInformationEditorComponent,
                InterestList_component_1.InterestListComponent,
                TextSubmission_component_1.TextSubmissionComponent,
                loading_indicator_component_1.LoadingIndicatorComponent,
                PodMemberEditor_component_1.PodMemberEditorComponent,
            ],
            bootstrap: [],
            providers: [
                RemoteAvatar_service_1.RemoteAvatarService,
                RemotePersonalInformation_service_1.RemotePersonalInformationService,
                PodMember_service_1.PodMemberService,
                LocalProjectFile_service_1.LocalProjectFileService,
                EventDispatch_service_1.EventDispatchService,
                ImageUpload_service_1.ImageUploadService,
                RemotePodMember_service_1.RemotePodMemberService,
                LocalPodMember_service_1.LocalPodMemberService,
            ],
            schemas: []
        })
    ], MembersModule);
    return MembersModule;
}());
exports.MembersModule = MembersModule;
//# sourceMappingURL=Members.module.js.map