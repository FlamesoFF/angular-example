import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Quote} from '../../../../../shared/Quotes';
import {Comment} from '../../../../../shared/Comments';
import {AppAttachment} from '../../../../../shared/AppAttachments';
import {IDialogParameters} from '../../../modules/dialog-module/components/dialog-list/dialog.component';
import {DateTimeService} from '../../../../../services/datetime.service';
import {IFormControls} from '../../../../../shared/AppBusinessForm';
import {DialogControl} from '../../../modules/dialog-module/components/dialog-controls/dialog-controls.component';

@Component({
    selector: 'app-quote-editor',
    template: require('./quote-editor.component.html'),
    styles: [require('./quote-editor.component.scss')]
})
export class QuoteEditorComponent implements OnInit {
    @Input() item: Quote;
    @Input() controls: DialogControl[];

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    type: string;


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

        // if(this.data.disabled){
        //     this.formGroup.controls.text.disable();
        // }


        if(this.item instanceof Quote) {
            const author = (<Quote>this.item).manager_id;
            const text = (<Quote>this.item).text;

            this.formGroup.patchValue({
                author: author,
                text: text
            });
        }
        // else if(this.item instanceof Comment){
        //
        // }
        // else if(this.item instanceof AppFile){
        //
        // }
    }

    save() {
        const values = <IFormControls>this.formGroup.getRawValue();


        if(this.item instanceof Quote) {
            this.item.text = values.text;
        }
        if(this.item instanceof Comment) {
            this.item.text = values.text;
        }

        this.formGroup.markAsPristine();

        // this.close();
    }

    close(){
        // this.onClose.emit();
    }
}

export interface IDialogEditorData {
    author: string
    text: string
}