import {Component} from "@angular/core";
import FormUtils from "../forms/form.utils";
import {FormControl} from "@angular/forms";
@Component({
    selector: 'my-settings',
    templateUrl: 'settings/settings.component.html'
})
export class SettingsComponent {
    private settingsForm;
    constructor(private formUtils: FormUtils) {
        this.settingsForm = this.formUtils.getFormGroup('Setting','required');
    }
    onClicked() {
        alert('I clicked');
    }
    getState(control: FormControl) {
        return this.formUtils.getState(control);
    }

}