import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from '../components/forms/application/auth-form/auth-form.component';
import { SettingsComponent } from '../components/forms/application/settings/settings.component';
import { Tab, TABS, appRoutes } from '../components/root/root.tabs.data';
import { ROUTES } from '../shared/constants';


export const BASE_URI = 'app';
export const DEFAULT_ROUTE = ROUTES.contact;

export abstract class AppRoutes {
    static defaultRoutes: Routes = [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: ROUTES.login
        },
        {
            path: ROUTES.login,
            pathMatch: 'full',
            component: AuthFormComponent
        },
        {
            path: ROUTES.settings,
            pathMatch: 'full',
            component: SettingsComponent
        }
    ];

    static getRoutes(tabs: Tab[]): Routes {
        const routes = AppRoutes.defaultRoutes;

        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];

            routes.push({
                path: `${tab.route}`,
                pathMatch: 'full',
                component: tab.component
                //canActivate: [AuthGuard]
            });
        }

        return routes;
    }
}


console.log(DEFAULT_ROUTE);

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
