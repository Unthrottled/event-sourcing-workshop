import {Injectable} from '@angular/core';
import {BackendAPIService} from '../../../services/BackendAPI.service';
import {WindowRef} from '../../../util/window';
import {RemoteAvatar} from '../model/RemoteAvatar';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class RemoteAvatarService {

    constructor(private backendAPISevice: BackendAPIService, private windowRef: WindowRef) {
    }

    public fetchRemoteAvatar(podMemberId: string): Observable<RemoteAvatar> {
        const avatarReplay = new ReplaySubject<RemoteAvatar>(1);
        this.backendAPISevice.fetchImage(podMemberId)
            .map(arrayBuffer => this.convertToImageBinary(arrayBuffer))
            .map(base64Binary => new RemoteAvatar(podMemberId, base64Binary))
            .subscribe(avatarReplay);
        return avatarReplay;

    }

    private convertToImageBinary(arrayBuffer: any): any {
        let binary = '';
        let bytes = new Uint8Array(arrayBuffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + this.windowRef.nativeWindow.btoa(binary);
    }
}