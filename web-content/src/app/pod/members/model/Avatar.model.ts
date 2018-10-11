import {Observable} from "rxjs/Observable";

export interface Avatar {
    imageBinary(): Observable<any>;
    getIdentifier(): string;
    setNewFile(file: File): void;
}