import {Injectable} from "@angular/core";
import {LocalPodMember} from "../model/LocalPodMember";
import {Identifier} from "../model/Identifier.model";
import {LocalProjectFileService} from './LocalProjectFile.service';

const uuid = require("uuid/v1");

@Injectable()
export class LocalPodMemberService {

    constructor(private localProjectFileService: LocalProjectFileService){}

    public createLocalPodMember(): LocalPodMember {
        return new LocalPodMember(new Identifier(uuid()),
            this.localProjectFileService.createLocalProject());
    }

}