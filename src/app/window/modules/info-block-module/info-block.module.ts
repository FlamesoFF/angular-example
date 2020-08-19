import { NgModule } from '@angular/core';
import { QuotesModule } from './modules/quotes-module/quotes.module';
import { AppMaterialModule } from '../app-material.module';
import { DialogModule } from './modules/dialog-module/dialog.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommentsModule } from './modules/comments-module/comments.module';
import { DialogComponent } from './modules/dialog-module/components/dialog-list/dialog.component';
import { CommentsComponent } from './modules/comments-module/components/comments/comments.component';
import { QuotesComponent } from './modules/quotes-module/components/quotes/quotes.component';
import { CommonModule } from '@angular/common';
import { AppDialogService } from './modules/dialog-module/services/app-dialog.service';
import { CommentEditorComponent } from './components/editor/comment/comment-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlsModule } from '../form-controls/form-controls.module';
import { QuoteEditorComponent } from './components/editor/quote/quote-editor.component';
import { ListElementControlsComponent } from './components/list-element-controls/list-element-controls.component';


@NgModule({
    declarations: [
        CommentEditorComponent,
        QuoteEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        BrowserModule,
        DialogModule,
        QuotesModule,
        // AttachmentsModule,
        CommentsModule,
        FormControlsModule
    ],
    providers: [
        AppDialogService
    ],
    exports: [
        ListElementControlsComponent
    ],
    entryComponents: [
        DialogComponent,
        CommentEditorComponent,
        QuoteEditorComponent,
        QuotesComponent,
        CommentsComponent,
        // AttachmentsComponent
    ]
})
export class InfoBlockModule {
}

/** @todo
 *  @class DialogComponent - for listing quotes, comments and attachments;
 *  @class DialogEditorComponent - for editing comments and attachments, and for viewing quotes;
 */