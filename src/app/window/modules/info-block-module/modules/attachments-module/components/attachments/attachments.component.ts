import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DateTimeService } from '@/app/window/services/datetime.service';
import { AppAttachment, AppAttachments } from '@/app/window/shared/AppAttachments';

@Component({
    selector: 'app-attachments',
    template: require('./attachments.component.html'),
    styles: [require('./attachments.component.scss')]
})
export class AttachmentsComponent implements OnInit {
    @Input() entityId: string;
    @Input() attachments: AppAttachments;

    private table = {
        columns: ['alias', 'name', 'size']
    };

    constructor(
        private snackbar: MatSnackBar,
        @Inject(DateTimeService) private date: DateTimeService
    ) {
    }

    ngOnInit() {
    }

    edit() {

    }

    remove(attachment: AppAttachment) {
    }


    // private blobifyData(data: ArrayBuffer, type: string): string {
    //     const blob = new Blob([data], {type});
    //     return window.URL.createObjectURL(blob);
    // }
}