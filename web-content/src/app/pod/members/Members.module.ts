import {NgModule} from "@angular/core";
import {RemoteAvatarService} from "./service/RemoteAvatar.service";
import {AvatarChooseComponent} from "./choose/AvatarChoose.component";
import {PodMemberListComponent} from "./list/PodMemberList.component";
import {AvatarViewComponent} from "./view/AvatarView.component";
import {PodMembersComponent} from "./PodMembers.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ProjectFileManipulationComponent} from "./manipulation/ProjectFileManipulation.component";
import {PodMemberService} from "./service/PodMember.service";
import {PodMemberComponent} from "./view/PodMember.component";
import {LocalProjectFileService} from "./service/LocalProjectFile.service";
import {ImageUploadService} from "./service/ImageUpload.service";
import {PersonalInformationComponent} from './view/PersonalInformation.component';
import {InterestListComponent} from './list/InterestList.component';
import {TextSubmissionComponent} from './manipulation/TextSubmission.component';
import {AvatarEditorComponent} from './edit/AvatarEditor.component';
import {PersonalInformationEditorComponent} from './edit/PersonalInformationEditor.component';
import {RemotePodMemberService} from './service/RemotePodMember.service';
import {LocalPodMemberService} from './service/LocalPodMember.service';
import {PodMemberEditorComponent} from './edit/PodMemberEditor.component';
import {EventDispatchService} from './service/EventDispatch.service';
import {RemotePersonalInformationService} from './service/RemotePersonalInformation.service';
import {LoadingIndicatorComponent} from '../../loading/loading.indicator.component';

@NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,

        ],
        exports: [
            AvatarChooseComponent,
            PodMemberListComponent,
            AvatarViewComponent,
            PodMemberComponent,
            PodMembersComponent,
            ProjectFileManipulationComponent

        ],
        declarations:[
            AvatarChooseComponent,
            PodMemberListComponent,
            AvatarViewComponent,
            AvatarEditorComponent,
            PodMemberComponent,
            PodMembersComponent,
            ProjectFileManipulationComponent,
            PersonalInformationComponent,
            PersonalInformationEditorComponent,
            InterestListComponent,
            TextSubmissionComponent,
            LoadingIndicatorComponent,
            PodMemberEditorComponent,
        ],
        bootstrap: [],
        providers: [
            RemoteAvatarService,
            RemotePersonalInformationService,
            PodMemberService,
            LocalProjectFileService,
            EventDispatchService,
            ImageUploadService,
            RemotePodMemberService,
            LocalPodMemberService,
        ],
        schemas: []
})
export class MembersModule {

}