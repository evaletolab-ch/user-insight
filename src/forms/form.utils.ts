import {FormControl, FormBuilder, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export default class FormUtils {
    constructor(private formBuilder: FormBuilder) {
    }
    //this is rather pointless now
    getFormGroup(name:string,validator:string) {
        let formGroup = {};
        let validators = [];
        if (validator =="required") {
            validators.push(Validators.required);
        }
        formGroup[name] = new FormControl('', validators)
        return this.formBuilder.group(formGroup);
    }

     getState(control: FormControl) {
        var states = [];
        if (control.invalid) {
            states.push('ng-invalid');
        }
        if (control.dirty) {
            states.push('ng-dirty');
        }
        if (control.valid) {
            states.push('ng-valid');
        }
        return states;
    }

}