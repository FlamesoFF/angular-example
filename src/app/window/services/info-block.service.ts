// import { formatDate } from '@angular/common';
// import { Inject, Injectable, NgZone } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
// import { Crypto, Token } from '@apollo4u/auxiliary';
// import { combineLatest, from, throwError } from 'rxjs';
// import { catchError } from 'rxjs/internal/operators';
// import { AppAttachment } from '../shared/AppAttachments';
// import { Quote, Quotes, QuoteSection } from '../shared/Quotes';
// import { IUser } from '@apollo4u/types/backend/v3';
// import { AppStorage } from '../../shared/Storage';
// import { FilesService } from "@/app/window/services/files.api.service";
//
// @Injectable()
// export class InfoBlockService {
//     entityId: string;
//     entityCategory: string;
//
//     constructor(
//         private zone: NgZone,
//         private snackbar: MatSnackBar,
//         private filesService: FilesService
//     ) {
//     }
//
//
//     addQuote(quotes: Quotes, quoteText: string, section?: QuoteSection): void {
//         AppStorage.load<AppStorage.TToken>('token')
//             .subscribe((token) => {
//                 const user: IUser = Token.parseJwt(token);
//
//                 if (section) {
//                     this.zone.run(() => {
//                         section.items.push(
//                             new Quote(user._id, quoteText)
//                         );
//                     });
//                 }
//                 else {
//                     combineLatest([
//                         AppStorage.load<AppStorage.TSubject>('messageSubject'),
//                         AppStorage.load<AppStorage.TSender>('messageSender'),
//                         AppStorage.load<AppStorage.TMessageId>('messageId'),
//                         AppStorage.load<AppStorage.TRecipients>('messageRecipients')
//                     ]).subscribe((result) => {
//                         const subject: string = result[0];
//                         const sender: InboxSDK.Contact = result[1];
//                         const message_id: string = result[2];
//                         const addressee: InboxSDK.Contact[] = result[3];
//                         const existingSection = Quotes.findBySubject(subject, quotes.sections);
//
//
//                         if (existingSection) {
//                             this.zone.run(() => {
//                                 existingSection.items.push(
//                                     new Quote(user._id, quoteText)
//                                 );
//                             });
//                         }
//                         else {
//                             this.zone.run(() => {
//                                 quotes.sections.push([
//                                     subject,
//                                     new QuoteSection(
//                                         {
//                                             subject,
//                                             message_id,
//                                             from: sender.name,
//                                             to: addressee[0].name,
//                                             date: formatDate(Date(), 'y-MM-dd h:mm', 'en-US')
//                                         },
//                                         [
//                                             new Quote(user._id, quoteText)
//                                         ]
//                                     )
//                                 ]);
//                             });
//                         }
//                     });
//                 }
//             });
//
//         //this.ref.detectChanges();
//     }
//
//     addFile(downloadUrl: string, file: File): void {
//         let fileType: string;
//
//
//         // Search file by sha if it exists
//         const addRelation = (fileId?: string): void => {
//             this.filesService
//                 .addRelation(fileId, this.entityId, this.entityCategory)
//                 .subscribe((fileMetadata) => {
//                     const appAttachment = new AppAttachment(fileMetadata);
//
//                     // appAttachment.setData(file);
//
//                     // observer.next(appAttachment);
//                     // return appAttachment;
//
//                     // this.attachments.add(appAttachment);
//                 });
//         };
//
//         // Generate sha hash
//         const generateSha = (buffer: ArrayBuffer): void => {
//             from(Crypto.generateHash('SHA-256', buffer))
//                 .subscribe((sha) => {
//                     return this.filesService.search(sha).pipe(
//                         catchError((error: any, caught) => {
//                             // If attachment doesn't exist - upload and add relation
//                             this.filesService.upload(file).subscribe((result) => {
//                                 addRelation(result._id);
//                             });
//
//                             this.snackbar.open('Uploading the attachment...');
//
//                             return throwError(error);
//                         })
//                     ).subscribe((response) => {
//                         this.snackbar.open('Existing attachment found. Attaching...');
//                         // If attachment exists - add relation
//                         addRelation(response._id);
//                     });
//                 });
//         };
//
//         // Convert Blob to ArrayBuffer
//         const processAttachment = (): void => {
//             const fr = new FileReader();
//
//             fr.addEventListener('load', () => {
//                 generateSha(<ArrayBuffer>fr.result);
//             });
//
//             fr.readAsArrayBuffer(file);
//         };
//
//
//         if (downloadUrl) {
//             // Download file from Gmail
//             this.filesService
//                 .downloadRawFile(downloadUrl)
//                 .subscribe(response => {
//                     const blob = response.body;
//                     const name = response.headers.get('content-disposition').match(/filename="(.+)"/)[1];
//
//                     file = new File([blob], name);
//                     fileType = blob.type;
//
//                     processAttachment();
//                 });
//         }
//         else if (file instanceof File) {
//             // Add attachment from PC
//             fileType = file.type;
//
//             processAttachment();
//         }
//
//         this.snackbar.open('File is attached');
//     }
// }
