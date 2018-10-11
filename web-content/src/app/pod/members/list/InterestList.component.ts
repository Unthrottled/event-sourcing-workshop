import {Component, Input} from '@angular/core';
import {TextPayload} from '../model/TextPayload';


@Component({
    selector: 'text-list',
    template: require('./InterestList.component.htm'),
})
export class InterestListComponent {

    private _interests: TextPayload[] = [];

    @Input()
    get interests(): TextPayload[] {
        return this._interests;
    }

    set interests(value: TextPayload[]) {
        this._interests = value;
    }
}