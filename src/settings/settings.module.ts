import {NgModule} from "@angular/core";
import {SettingsComponent} from "./settings.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "../forms/forms.module";
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
    imports: [BrowserModule,HttpModule,FormsModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]
})
export class SettingsModule {


}