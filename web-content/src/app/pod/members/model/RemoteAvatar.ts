import {Avatar} from "./Avatar.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Identifier} from "./Identifier.model";

export class RemoteAvatar implements Avatar {
    private imageBinaryReplay = new ReplaySubject<any>(1);

    /**
     *
     * @param {Identifier} identifier the unique identifier that will allow use of
     *                      the backend rest api.
     * @param {Observable<any>} remoteProjectFile project file from the backend
     */
    constructor(podmemberId: string, binary: string) {


        this.imageBinaryReplay.next(binary);

        this._identifier = podmemberId;
    }

    private _identifier: string;

    get identifier(): string {
        return this._identifier;
    }

    set identifier(value: string) {
        this._identifier = value;
    }

    /**
     * Replaces the current remote project file with the new binary.
     *
     * I am kind of torn at the moment because one you set the binary again
     * it is no longer a remote project file and does not fit int this current
     * abstraction.
     * @param {File} file
     */
    setNewFile(file: File): void {
    }

    getIdentifier(): string {
        return this._identifier;
    }

    /**
     * Actual binary received from the backend service.
     * @returns {Observable<any>}
     */
    imageBinary(): Observable<any> {
        return this.imageBinaryReplay
    }


}