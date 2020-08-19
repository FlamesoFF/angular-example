import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DateTimeService } from '../../../../../../services/datetime.service';
import { AppControlButton, AppControlPanel } from '../../../../../../shared/Buttons';
import { Comment, Comments } from '../../../../../../shared/Comments';
import { CommentEditorComponent } from '../../../../components/editor/comment/comment-editor.component';
import { DialogComponent, IDialogEditorParameters } from '../../../dialog-module/components/dialog-list/dialog.component';
import { AppDialogService } from '../../../dialog-module/services/app-dialog.service';

@Component({
    selector: 'app-comments',
    template: require('./comments.component.html'),
    styles: [require('./comments.component.scss')]
})
export class CommentsComponent implements OnInit {
    @Input() entityId: string;
    @Input() comments: Comments;

    constructor(
        public dialog: AppDialogService,
        @Inject(DateTimeService) public date: DateTimeService
    ) {
    }

    ngOnInit() {
    }

    editComment(comment: Comment) {
        let textBuffer = comment.text;
        let dialogRef : MatDialogRef<DialogComponent>;

        const parameters: IDialogEditorParameters = {
            title: 'Edit comment',
            component: CommentEditorComponent,
            controlPanel: new AppControlPanel({
                add: new AppControlButton('Save', (item: Comment) => {
                    dialogRef.close();
                })
            }),
            inputs: {
                item: comment,
                entityId: this.entityId
            }
        };

        dialogRef = this.dialog.openEditor(parameters);
    }

    remove(comment: Comment){
        this.comments.remove(comment);
    }
}
