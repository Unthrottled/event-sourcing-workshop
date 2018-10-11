import {Component, EventEmitter, Output} from '@angular/core';
import {TextPayload} from '../model/TextPayload';


@Component({
    selector: 'text-submission',
    template: require('./TextSubmission.component.htm'),
})
export class TextSubmissionComponent {

    private textValue: string;

    @Output()
    private itemSubmitted = new EventEmitter<TextPayload>();

    onClick(){
        this.itemSubmitted.emit(new TextPayload(this.textValue))
        this.textValue = '';
    }

    submitMaybe(keystrokeEvent: any){
        if(keystrokeEvent.keyCode === 13){
            this.onClick();
        }
    }
}