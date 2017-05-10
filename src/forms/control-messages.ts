import {Component, Input} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'control-messages',
    template: '<div class="help-block" *ngIf="errorMessage !== null">{{errorMessage}}</div>'
})
export class ControlMessagesComponent {
    @Input() control: FormControl;

    constructor() {
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                if (propertyName == 'required') {
                    if (this.control.dirty) {
                        return 'Nooo required'; // might do something smart
                    }
                } else {
                    return 'Oh no something else';
                }

            }
        }
        return null;
    }
}
