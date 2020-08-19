
import './polyfills';   // Always on TOP!!!
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './app.styles.scss';

import { DeveloperInfoComponent } from './components/developer-info/developer-info.component';
import { AuthFormComponent } from './components/forms/application/auth-form/auth-form.component';
import { SettingsComponent } from './components/forms/application/settings/settings.component';
import { BillInvoicesComponent } from './components/forms/business/bill-form/bill-invoices/bill-invoices.component';
import { CompanyFormComponent } from './components/forms/business/company-form/company-form.component';
import { ContactFormComponent } from './components/forms/business/contact-form/contact-form.component';
import { CourierFormComponent } from './components/forms/business/courier-form/courier-form.component';
import { OrderFormComponent } from './components/forms/business/order-form/order-form.component';
import { PersonFormComponent } from './components/forms/business/person-form/person-form.component';
import { RootComponent } from './components/root/root.component';
import { ToolbarComponent } from './components/root/toolbar/toolbar.component';
import { FormChipsComponent } from './components/shared/form.chips.component';
import { ContactWidgetComponent } from './components/shared/contact-widget/contact-widget.component';
import { DragNDropComponent } from './drag-n-drop/drag-n-drop.component';

import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { FormControlsModule } from './modules/form-controls/form-controls.module';
import { InfoBlockModule } from './modules/info-block-module/info-block.module';
import { PipesModule } from './modules/pipes-module/pipes.module';

import { AuthService } from './services/auth.api.service';
import { CommonApiService } from './services/common.api.service';
import { ContactApiService } from './services/contact.api.service';
import { ContextMenuService } from './services/context-menu.service';
import { DateTimeService } from './services/datetime.service';
import { LoadingService } from './services/loading.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { OrderApiService } from './services/order.api.service';
import { SettingsService } from './services/settings.service';
import { UrlService } from './services/URL';

import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ContactState } from './store/contact/contact.state';
import { AppState } from './store/app.state';
import { AuthState } from './store/auth/auth.state';
import { OrderState } from './store/order/order.state';
import { SettingsState } from './store/settings/settings.state';
import { CourierState } from './store/courier/courier.state';
import { CourierApiService } from './services/courier.api.service';
import { RelationsService } from "@/app/window/services/relations.api.service";
import { FilesService } from "@/app/window/services/files.api.service";



@NgModule({
    declarations: [
        RootComponent,
        ContactFormComponent,
        OrderFormComponent,
        CourierFormComponent,
        PersonFormComponent,
        CompanyFormComponent,
        AuthFormComponent,
        SettingsComponent,
        ToolbarComponent,
        // BillFormComponent,
        DeveloperInfoComponent,
        DragNDropComponent,
        BillInvoicesComponent,
        ContactWidgetComponent,
        FormChipsComponent,

        // experimantal
        // AppMatAutocomplete
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        // Customs
        AppMaterialModule,
        AppRoutingModule,
        InfoBlockModule,
        PipesModule,
        FormsModule,
        FormControlsModule,

        NgxsModule.forRoot([
            AppState,
            AuthState,
            ContactState,
            OrderState,
            CourierState,
            SettingsState,
        ]),
        NgxsFormPluginModule.forRoot(),
    ],
    providers: [
        AuthService,
        // BackendService,
        ContextMenuService,
        DateTimeService,
        LoadingService,
        SettingsService,
        ContactApiService,
        CommonApiService,
        UrlService,
        OrderApiService,
        CourierApiService,
        RelationsService,
        FilesService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptorService,
            multi: true
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3000,
                panelClass: 'app-snackbar'
            }
        }
    ],
    bootstrap: [RootComponent]
})
export class AppModule {
    constructor() {
        // Prevent attachment drag-n-drop default behavior
        document.addEventListener('dragover', function (event) {
            // prevent default to allow drop
            event.preventDefault();
        });

        document.addEventListener('drop', function (event) {
            // prevent default action (open as link for some elements)
            event.preventDefault();
        });
    }
}

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);