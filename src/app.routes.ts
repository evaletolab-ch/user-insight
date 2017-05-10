import {HomeComponent} from "./home/home.component";
import {SettingsRoutes} from "./settings/settings.routes";

export const AppRoutes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    ...SettingsRoutes
];