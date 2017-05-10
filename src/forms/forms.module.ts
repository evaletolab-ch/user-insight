import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import FormUtils from "./form.utils";
import {ControlMessagesComponent} from "./control-messages";
// This is a shared module that can be used whenever a view (like settings) need a form
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [FormUtils],
    declarations: [ControlMessagesComponent],
    exports: [ControlMessagesComponent, ReactiveFormsModule]
})
export class FormsModule {
}