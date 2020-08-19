import jwt from 'jsonwebtoken';

import { formatDate } from '@angular/common';
import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IUser } from '@apollo4u/types/backend/v3';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DateTimeService } from '../../../../services/datetime.service';
import { AppAttachments } from '../../../../shared/AppAttachments';
import { InfoBlockConnectorsOutputs } from '../../../../shared/AppBusinessForm';
import { AppControlButton, AppControlPanel } from '../../../../shared/Buttons';
import { Comment, Comments } from '../../../../shared/Comments';
import { Quote, Quotes, QuoteSection } from '../../../../shared/Quotes';
import { AppState } from '../../../../store/app.state';
import { AuthState } from '../../../../store/auth/auth.state';
import { AttachmentsComponent } from '../../modules/attachments-module/components/attachments/attachments.component';
import { CommentsComponent } from '../../modules/comments-module/components/comments/comments.component';
import { DialogControl } from '../../modules/dialog-module/components/dialog-controls/dialog-controls.component';
import {
    DialogComponent,
    IDialogEditorParameters,
    IDialogParameters
} from '../../modules/dialog-module/components/dialog-list/dialog.component';
import { AppDialogService } from '../../modules/dialog-module/services/app-dialog.service';
import { QuotesComponent } from '../../modules/quotes-module/components/quotes/quotes.component';
import { CommentEditorComponent } from '../editor/comment/comment-editor.component';
import { IAuthStateModel } from "@/app/window/store/auth/auth.types";
import { IAppStateModel } from "@/app/window/store/app.types";

export interface IAttachmentParameters {
    downloadUrl?: string
    file?: File
}

export interface IQuoteParameters {
    quoteText: string
    section?: QuoteSection
}

@Component({
    selector: 'info-block',
    template: require('./info-block.component.html'),
    styles: [require('./info-block.component.scss')]
})
export class InfoBlockComponent implements OnInit, OnDestroy {
    @Input() entityId: string;
    @Input() entityCategory: string;
    @Input() quotes?: Quotes;
    @Input() comments?: Comments;
    @Input() attachments?: AppAttachments;
    /*
        EVENTS
    */

    // @Input() inputs: InfoBlockConnectorsInputs;
    @Input() outputs: InfoBlockConnectorsOutputs;

    @Select(AppState) appData : Observable<IAppStateModel>
    @Select(AuthState) authData : Observable<IAuthStateModel>
    @Select(AuthState.user) user : Observable<IUser>

    constructor(
        private dialog: AppDialogService,
        private router: Router,
        private resolver: ComponentFactoryResolver,
        private snackbar: MatSnackBar,
        @Inject(DateTimeService) private date: DateTimeService,
        private zone: NgZone,
        private element: ElementRef,
    ) {
    }

    ngOnInit() {
        // if(this.inputs) {
        //     if (this.inputs.addQuote) {
        //         this.inputs.addQuote.subscribe((parameters: IQuoteParameters) => {
        //             const {quoteText, section} = parameters;
        //
        //             this.addQuote(quoteText, section);
        //         });
        //     }
        //
        //     if (this.inputs.attachFile) {
        //         this.inputs.attachFile.subscribe((parameters: IAttachmentParameters) => {
        //             const {downloadUrl, file} = parameters;
        //
        //             this.addAttachment(downloadUrl, file);
        //         });
        //     }
        // }
    }

    ngOnDestroy() {
    }

    openQuotes() {
        let dialogRef: MatDialogRef<DialogComponent>;

        if (this.quotes.getCount() === 0) {
            return false;
        }

        const parameters: IDialogParameters = {
            title: 'Quotes',
            component: QuotesComponent,
            // controls: [
            //     new DialogControl('close', () => {
            //         this.dialog.closeAll();
            //     })
            // ],
            inputs: {
                quotes: this.quotes,
            }
        };

        dialogRef = this.dialog.openList(parameters);

        return dialogRef;
    }

    openComments() {
        let dialogRef: MatDialogRef<DialogComponent>;

        const parameters: IDialogParameters = {
            title: 'Comments',
            component: CommentsComponent,
            dialogControls: [
                new DialogControl('add_comment', () => {
                    this.openNewCommentEditor();
                })
            ],
            inputs: {
                comments: this.comments,
                entityId: this.entityId
            }
        };

        dialogRef = this.dialog.openList(parameters);

        return dialogRef;
    }

    private openNewCommentEditor() {
        let dialogRef: MatDialogRef<DialogComponent>;

        this.user.subscribe(user => {
            const comment = new Comment({
                user : {
                    _id: user._id,
                    name: user.name
                },
                text: '',
                created_on: this.date.formatCommentDate(new Date())
            });

            const parameters: IDialogEditorParameters = {
                title: 'Add comment',
                component: CommentEditorComponent,
                controlPanel: new AppControlPanel({
                    add: new AppControlButton('Add', (item: Comment) => {
                        this.comments.items.push(comment);
                        dialogRef.close();
                    })
                }),
                inputs: {
                    item: comment,
                    entityId: this.entityId
                }
            };

            dialogRef = this.dialog.openEditor(parameters);
        });

    }

    openAttachments() {
        let dialogRef: MatDialogRef<DialogComponent>;

        if (this.attachments.getCount() === 0) {
            return false;
        }

        const parameters: IDialogParameters = {
            title: 'Attachments',
            component: AttachmentsComponent,
            inputs: {
                entityId: this.entityId,
                attachments: this.attachments
            }
        };

        dialogRef = this.dialog.openList(parameters);

        return dialogRef;
    }


    addQuote(quoteText: string, section?: QuoteSection) {
        this.authData.subscribe(data => {
            const user = jwt.decode(data.token) as IUser;

            if (section) {
                this.zone.run(() => {
                    section.items.push(new Quote(user._id, quoteText));
                });
            }
            else {
                this.appData.subscribe((result) => {
                    const {
                        messageId: message_id,
                        messageRecepients: [addressee],
                        contact: sender,
                        subject,
                        threadId
                    } = result;

                    const existingSection = Quotes.findBySubject(subject, this.quotes.sections);


                    if (existingSection) {
                        this.zone.run(() => {
                            existingSection.items.push(new Quote(user._id, quoteText));
                        });
                    }
                    else {
                        this.zone.run(() => {
                            this.quotes.sections.push([
                                subject,
                                new QuoteSection(
                                    {
                                        subject,
                                        message_id,
                                        from: sender.name,
                                        to: addressee.name,
                                        date: formatDate(Date(), 'y-MM-dd h:mm', 'en-US')
                                    },
                                    [
                                        new Quote(user._id, quoteText)
                                    ]
                                )
                            ]);
                        });
                    }
                });
            }
        });

        //this.ref.detectChanges();
    }

/*
    addAttachment(downloadUrl?: string, file?: File) {
        let fileType: string;
        // let blob: Blob;

        // if(attachment){
        //     blob = new Blob([attachment], {
        //         type: attachment.type
        //     });
        // }

        // Search attachment by sha if it exists
        const addRelation = (fileId?: string) => {
            this.backend.attachments.addRelation(fileId, this.entityId, this.entityCategory)
                .subscribe((fileMetadata) => {
                    const appFile = new AppAttachment(fileMetadata);

                    appFile.setData(file);

                    this.attachments.add(appFile);
                    this.outputs.onFileAttached.next(appFile);

                    this.snackbar.open('File is attached');
                });
        };

        // Generate sha hash
        const generateSha = (buffer: ArrayBuffer) => {
            return from(Crypto.generateHash('SHA-256', buffer)).subscribe((sha) => {
                this.backend.attachments.search(sha).pipe(
                    catchError((error: any, caught) => {
                        // If attachment doesn't exist - upload and add relation
                        this.backend.attachments.upload(file).subscribe((result) => {
                            addRelation(result._id);
                        });

                        this.snackbar.open('Uploading the attachment...');

                        return throwError(error);
                    }))
                    .subscribe((response) => {
                        this.snackbar.open('Existing attachment found. Attaching...');
                        // If attachment exists - add relation
                        addRelation(response._id);
                    });
            });
        };

        // Convert Blob to ArrayBuffer
        const processAttachment = () => {
            const fr = new FileReader();

            fr.addEventListener('load', () => {
                generateSha(<ArrayBuffer>fr.result);
            });

            fr.readAsArrayBuffer(file);
        };


        if (downloadUrl) {
            // Download attachment from Gmail
            this.backend.attachments
                .downloadRawFile(downloadUrl)
                .subscribe(response => {
                    const blob = response.body;
                    const name = response.headers.get('content-disposition').match(/filename="(.+)"/)[1];

                    file = new File([blob], name);
                    fileType = blob.type;

                    processAttachment();
                });
        }
        else if (file instanceof File) {
            // Add attachment from PC
            fileType = file.type;

            processAttachment();
        }
    }
*/
}
