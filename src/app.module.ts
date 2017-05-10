import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {SettingsModule} from "./settings/settings.module";
import {AppRoutes} from "./app.routes";
import {HomeComponent} from "./home/home.component";
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, {useHash: true}),
        SettingsModule
    ],
    declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}