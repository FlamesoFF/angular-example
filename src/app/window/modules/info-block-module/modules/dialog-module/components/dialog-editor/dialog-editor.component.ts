import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Comment } from '../../../../../../shared/Comments';
import { Quote } from '../../../../../../shared/Quotes';
import { DateTimeService } from '../../../../../../services/datetime.service';
import { IFormControls } from '../../../../../../shared/AppBusinessForm';
import { IDialogParameters } from '../dialog-list/dialog.component';
import { AppAttachment } from '../../../../../../shared/AppAttachments';

@Component({
    selector: 'app-dialog-editor',
    template: require('./dialog-editor.component.html'),
    styles: [require('./dialog-editor.component.scss')]
})
export class DialogEditorComponent implements OnInit {
    @Input() item: Quote | Comment | AppAttachment;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    type: string;
    // private item : EditableItem;


    formGroup: FormGroup = new FormGroup({
        author: new FormControl(),
        text: new FormControl()
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogParameters,
        private myElement: ElementRef<HTMLElement>,
        @Inject(DateTimeService) private date: DateTimeService,
    ) {
    }

    ngOnInit() {
        this.item = this.data.inputs.item;

        this.formGroup.controls.author.disable();

        if (this.data.disabled) {
            this.formGroup.controls.text.disable();
        }


        if (this.item instanceof Quote) {
            const author = (<Quote>this.item).manager_id;
            const text = (<Quote>this.item).text;

            this.formGroup.patchValue({
                author: author,
                text: text
            });
        }
        else if (this.item instanceof Comment) {

        }
        else if (this.item instanceof AppAttachment) {

        }


        // this.data.subscribe((item : EditableItem ) => {
        //     this.item = item;
        //     this.type = item.type;
        //
        //     this.formGroup.patchValue({
        //         author: item.content.manager_id,
        //         text: item.content.text
        //     });
        // });

        // this.myElement
        //     .nativeElement
        //     .querySelector('mat-card')
        //     .addEventListener('click', event => {
        //         event.stopPropagation();
        //     });
    }

    save() {
        const values = <IFormControls>this.formGroup.getRawValue();

        if (
            (
                this.item instanceof Quote ||
                this.item instanceof Comment
            ) && this.item.text
        ) {
            this.item.text = values.text;   // TODO: fix typo
        }

        if(this.item instanceof AppAttachment){
            this.item.name = values.text;
        }

        this.formGroup.markAsPristine();

        // this.close();
    }

    close() {
        // this.onClose.emit();
    }
}

export interface IDialogEditorData {
    author: string
    text: string
}