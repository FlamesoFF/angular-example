/*
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Data, Token } from '@apollo4u/auxiliary';
import { Observable } from 'rxjs';
import { BackendService } from '../../../../../../../services/backend.service';
import { AppAttachment } from '../../../../../../../shared/AppAttachments';
import { DialogListElementControl, DialogListElementControls } from '../../../../../../../shared/Dialog';

@Component({
    selector: 'app-attachment-component',
    template: require('./attachment-component.component.html'),
    styles: [require('./attachment-component.component.scss')]
})
export class AttachmentComponentComponent implements OnInit {
    @Input() attachment: AppAttachment;

    @Output() onRemove = new EventEmitter<AppAttachment>();

    authority$: Observable<boolean>;
    controls : DialogListElementControls;

    constructor(
    ) {
        // this.authority$ = new Observable(observer => {
        //     Observable.from(AppStorage.load<IUser>(STORAGE_ITEMS.user))
        //         .subscribe((user) => {
        //             observer.next(this.attachment.user.id === user._id);
        //         });
        // });
    }

    ngOnInit() {
        console.log(this.attachment);

        this.controls = new DialogListElementControls([
            /!*new DialogListElementControl({
                icon: 'edit',
                //presence: this.authority$,
                onClick: () => {
                    //this.edit();
                }
            }),*!/
            new DialogListElementControl({
                icon: 'delete',
                //presence: this.authority$,
                onClick: (file: AppAttachment) => {
                    this.remove(this.attachment);
                }
            }),
            new DialogListElementControl({
                icon: 'arrow_downward',
                onClick: () => {
                    this.downloadAttachment(this.attachment);
                }
            })
        ]);
    }

    downloadAttachment(file: AppAttachment) {
        Token.checkExpiration('');

        this.backend.attachments.download(file._id).subscribe((result) => {
            const url = Data.arrayBufferToBlob(result, file.extension || file['Content-Type']);

            chrome.downloads.download({
                url: url,
                filename: this.attachment.name,
                saveAs: true
            });
        });
    }

    getFileExtension(file: AppAttachment): string {
        const exp = /.+\.(\w+)$/i;
        return exp.exec(file.name)[1].toUpperCase();
    }

    remove(file: AppAttachment){
        this.onRemove.emit(file);
    }
}
*/
