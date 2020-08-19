import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogEditorComponent} from './components/dialog-editor/dialog-editor.component';
import {AppDialogService} from './services/app-dialog.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppMaterialModule} from '../../../app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogToolbarComponent} from './components/dialog-toolbar/dialog-toolbar.component';
import {DialogControlsComponent} from './components/dialog-controls/dialog-controls.component';
import {DialogComponent} from './components/dialog-list/dialog.component';
import {DynamicComponentDirective} from '../../directives/dynamic-component.directive';
import {FormControlsModule} from '../../../form-controls/form-controls.module';
import {ListElementControlsComponent} from '../../components/list-element-controls/list-element-controls.component';

@NgModule({
    declarations: [
        // Components
        DialogControlsComponent,
        DialogToolbarComponent,
        DialogComponent,
        DialogEditorComponent,
        ListElementControlsComponent,
        // Directives
        DynamicComponentDirective
    ],
    providers: [
        AppDialogService
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
    ],
    exports: [
        DialogEditorComponent,
        ListElementControlsComponent
    ],
    entryComponents: [
        DialogEditorComponent
    ]
})
export class DialogModule {
}
