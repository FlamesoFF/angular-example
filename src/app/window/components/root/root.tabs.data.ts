import { Routes } from '@angular/router';
import { ROUTES } from '../../shared/constants';
import { AuthFormComponent } from '../forms/application/auth-form/auth-form.component';
import { SettingsComponent } from '../forms/application/settings/settings.component';
import { ContactFormComponent } from '../forms/business/contact-form/contact-form.component';
import { CourierFormComponent } from '../forms/business/courier-form/courier-form.component';
import { OrderFormComponent } from '../forms/business/order-form/order-form.component';

export class Tab {
    route: ROUTES;
    index: number;
    title: string;
    component: any;
}

export const TABS: Tab[] = [
    {
        route: ROUTES.contact,
        index: 0,
        title: 'Contact',
        component: ContactFormComponent
    },
    {
        route: ROUTES.order,
        index: 1,
        title: 'Order',
        component : OrderFormComponent
    },
    // {
    //     route: ROUTES.bill,
    //     index: 2,
    //     title: 'Bill',
    //     component : BillFormComponent
    // },
    {
        route: ROUTES.courier,
        index: 2,
        title: 'Courier',
        component: CourierFormComponent
    },
    // {
    //     route: ROUTES.company,
    //     index: 4,
    //     title: 'Company',
    //     component: CompanyFormComponent
    // },
    // {
    //     route: ROUTES.person,
    //     index: 5,
    //     title: 'Person',
    //     component: PersonFormComponent
    // }
];

export const appRoutes: Routes = [
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
    },
    {
        path: ROUTES.contact,
        pathMatch: 'full',
        component: ContactFormComponent
    },
    {
        path: ROUTES.order,
        pathMatch: 'full',
        component : OrderFormComponent
    },
    // {
    //     path: ROUTES.bill,
    //     pathMatch: 'full',
    //     component : BillFormComponent
    // },
    {
        path: ROUTES.courier,
        pathMatch: 'full',
        component: CourierFormComponent
    },
    // {
    //     route: ROUTES.company,
    //     index: 4,
    //     title: 'Company',
    //     component: CompanyFormComponent
    // },
    // {
    //     route: ROUTES.person,
    //     index: 5,
    //     title: 'Person',
    //     component: PersonFormComponent
    // }
];