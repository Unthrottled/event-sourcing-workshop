export class TextPayload {
    private _value: string;

    get value(): string {
        return this._value;
    }


    constructor(value: string) {
        this._value = value;
    }

    set value(value: string) {
        this._value = value;
    }
}