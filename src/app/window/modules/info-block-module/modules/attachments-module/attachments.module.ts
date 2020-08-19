import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AttachmentsComponent} from './components/attachments/attachments.component';
import {AppMaterialModule} from '../../../app-material.module';
import {DialogModule} from '../dialog-module/dialog.module';

@NgModule({
    declarations: [
        AttachmentsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppMaterialModule,
        DialogModule
    ],
    entryComponents: [
        AttachmentsComponent
    ],
    exports: [
        AttachmentsComponent
    ]
})
export class AttachmentsModule {
}
