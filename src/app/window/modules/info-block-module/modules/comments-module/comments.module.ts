import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppMaterialModule} from '../../../app-material.module';
import {CommentsComponent} from './components/comments/comments.component';
import {CommentComponent} from './components/comments/comment/comment.component';
import {DialogModule} from '../dialog-module/dialog.module';

@NgModule({
    declarations: [
        CommentComponent,
        CommentsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppMaterialModule,
        DialogModule
    ],
    exports: [
        CommentsComponent
    ]
})
export class CommentsModule {
}
