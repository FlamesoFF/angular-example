// import { COMMA, ENTER, SEMICOLON, SPACE } from '@angular/cdk/keycodes';
// import { Component, OnDestroy, OnInit, ElementRef, NgZone, Inject } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { MatChipInputEvent, MatSnackBar } from '@angular/material';
// import { Crypto } from '@apollo4u/auxiliary';
// import { ICompany } from '@apollo4u/types/backend/v3';
// import { IPerson } from '@apollo4u/types/backend/v3';
// import { combineLatest, from, Observable, Subject } from 'rxjs';
// import { throwError } from 'rxjs/index';
// import { catchError, flatMap } from 'rxjs/internal/operators';
// import { APP_EVENT_TYPES, AppMessengerService } from '../../../../services/app-messenger.service';
// import { AppAttachments } from '../../../../shared/AppAttachments';
// import { AppBusinessForm, AppBusinessFormEventSubs, AppFormGroup, BusinessFormInfoBlockConnectors, IFormOnAttachFile, IFormOnDropFile, AppFormData } from '../../../../shared/AppBusinessForm';
// import { Bill, IAppBill, TBillAgent } from '../../../../shared/Bills';
// import { AppControlButton, AppControlPanel } from '../../../../shared/Buttons';
// import { STORAGE_ITEMS } from '../../../../shared/constants';
// import { DragNDrop } from '../../../../shared/DragNDrop';
// import { ControlButtons } from '../order-form/order-form.component';
// import { AppStorage } from '../../../../shared/storage';
// import { App } from '../../../../../content-script/App';

// @Component({
//     selector: 'app.content-bill-form',
//     template: require('./bill-form.component.html'),
//     styles: [require('./bill-form.component.scss')]
// })
// export class BillFormComponent extends AppBusinessForm implements OnInit, OnDestroy, IFormOnDropFile, IFormOnAttachFile {
//     /*
//     * Declarations
//     */
//     entityId = null;

//     data = new AppFormData({});

//     formGroup = new AppFormGroup({
//         _id: new FormControl(),
//         agent: new FormControl(),
//         billNumber: new FormControl(),
//         issuedOn: new FormControl(),
//         invoiceNumber: new FormControl()
//     });

//     observableData = {
//         bills$: new Observable<IInvoice[]>((observer) => {
//             this.backend.invoices.list().then(items => {
//                 observer.next(items);
//             })
//         }),
//         // TODO: Replace with proper data structure
//         agents$: new Observable<TBillAgent[]>((observer) => {
//             this.backend.entities.list().subscribe(items => {
//                 observer.next(items);
//             });
//         })
//     };

//     controls = new AppControlPanel({
//         update: new AppControlButton(
//             ControlButtons.update,
//             () => {
//                 this.updateBill();
//             },
//             {
//                 initialValue: false,
//                 watcher$: (observer) => {
//                     const check = () => {
//                         observer.next(this.formGroup.controls._id.value !== null);
//                     };


//                     this.appMessenger.addListener(
//                         APP_EVENT_TYPES.fileDrop
//                     ).subscribe((result) => {
//                         check();
//                     });

//                     this.infoBlockEvents.inputs.attachFile.subscribe((result) => {
//                         check();
//                     });

//                     this.formGroup.valueChanges.subscribe((value) => {
//                         check();
//                     })
//                 }
//             }
//         ),

//         clear: new AppControlButton(
//             ControlButtons.clear,
//             () => {
//                 this.formGroup.controls.billNumber.setValue(null);
//                 super.clear();
//             }
//         )
//     });

//     extractors = {
//         agents: (value: IPerson | ICompany) => {
//             if (value) {
//                 return value.name;
//             }
//         }
//     };

//     attachments = new AppAttachments();
//     // quotes = new Quotes();
//     // comments = new Comments();

//     infoBlockEvents = new BusinessFormInfoBlockConnectors({
//         attachFile: new Subject()
//     });

//     eventSubs = new AppBusinessFormEventSubs(
//         [
//             // this.appMessenger.addListener(
//             //     APP_EVENT_TYPES.fileDrop
//             // ).subscribe((file: File) => {
//             //     if (this.attachments.getCount() < 1) {
//             //         this.infoBlockEvents.inputs.attachFile.emit({
//             //             file: file
//             //         });
//             //     }
//             //     else {
//             //         this.snackbar.open('Invoice file is already attached');
//             //     }
//             // }),

//             this.chromeMessenger.listen<{ name: string, url: string }>(
//                 PORT_NAMES.contentToApp,
//                 MESSAGE_TYPES.download
//             ).subscribe((response) => {
//                 const { name, url } = response.data;

//                 this.onAttach(url);
//             })
//         ]
//     );

//     invoiceSearch = {
//         list: [],
//         searchResults: [],
//         separators: [ENTER, COMMA, SPACE, SEMICOLON],
//         selectable: true,
//         removable: true,
//         addOnBlur: true,
//         value: {
//             get: () => this.formGroup.controls.invoiceNumber.value
//         },

//         addAndSearch: ($event: MatChipInputEvent): void => {
//             const input = $event.input;
//             const value = $event.value.trim();

//             if (value) {
//                 if (!this.invoiceSearch.list.find(item => item === value)) {
//                     this.invoiceSearch.list.push(value);
//                 }
//             }

//             // Reset the input value
//             if (input) {
//                 input.value = '';
//             }

//             this.backend.invoices.searchByNumber(this.invoiceSearch.list)
//                 .subscribe((result) => {
//                     let client = result.body.items[0];

//                     if (client) {
//                         if (!this.invoiceSearch.searchResults.find(item => item === client)) {
//                             this.invoiceSearch.searchResults.push(client);
//                         }

//                         console.log(result.body);
//                     }
//                 });
//         },

//         remove: (invoice: string): void => {
//             const index = this.invoiceSearch.list.indexOf(invoice);

//             if (index >= 0) {
//                 this.invoiceSearch.list.splice(index, 1);
//             }

//             // clear companies
//             this.invoiceSearch.searchResults = [];
//         }
//     };


//     /*
//     * Logic
//      */
//     constructor(
//         private snackbar: MatSnackBar,
//         private element: ElementRef,
//         private zone: NgZone,
//         @Inject(BackendService) private backend: BackendService,
//         @Inject(DateTimeService) private date: DateTimeService,
//         @Inject(AppMessengerService) private appMessenger: AppMessengerService,
//         @Inject(ChromeMessengerService) private chromeMessenger: ChromeMessengerService,
//         @Inject(StoreService) private store: StoreService,
//         @Inject(ChromeStorageService) private chromeStorage: ChromeStorageService,
//         @Inject(ContextMenuService) private contextMenu: ContextMenuService
//     ) {
//         super();
//     }


//     ngOnInit() {
//         // this.initializeDataSources();
//         this.formGroup.reset();

//         this.formGroup.controls.agent.setValue(this.store.contact.assignee);

//         this.infoBlockEvents.outputs.onFileAttached.subscribe((parameters) => {
//             const file = parameters.content;

//             DragNDrop.readAsArrayBuffer(file).subscribe((arrayBuffer) => {
//                 this.createBill(file.name, file.type, arrayBuffer);
//             });
//         });

//         this.contextMenu.updateContextMenu('bill');

//         this.contextMenu.onMessage().subscribe((result) => {
//             if (result.data.agentName) {
//                 this.formGroup.controls.agent.setValue({
//                     name: result.data.agentName.info.selectionText.trim()
//                 });
//             }
//             if (result.data.invoiceNumber) {
//                 this.formGroup.controls.invoiceNumber.setValue(
//                     result.data.invoiceNumber.info.selectionText.trim()
//                 );
//             }
//         });
//     }

//     ngOnDestroy() {
//         super.onDestroy();
//     }

//     // TODO: implement communication between this method and app-drag-n-drop component on component level
//     onDrop(file: File): void {
//         if (this.attachments.getCount() < 1) {


//             this.infoBlockEvents.inputs.attachFile.next({ file });
//         } else {
//             this.snackbar.open('Invoice file is already attached');
//         }
//     }

//     onAttach(url: string) {
//         if (this.attachments.getCount() < 1) {
//             this.infoBlockEvents.inputs.attachFile.next({ downloadUrl: url });
//         } else {
//             this.snackbar.open('Invoice file is already attached');
//         }
//     }

//     protected prepareDataToSend(): Observable<IAppBill> {
//         return combineLatest([
//             this.chromeStorage.load<AppStorage.TSender>(STORAGE_ITEMS.messageSender),
//             this.chromeStorage.load<AppStorage.TInboxUserData>(STORAGE_ITEMS.inboxUserData),
//             this.chromeStorage.load<AppStorage.TMessageId>(STORAGE_ITEMS.messageId)
//         ]).pipe(
//             flatMap(result => {
//                 const sender = result[0];
//                 const receiver = result[1];
//                 const messageId = result[2];

//                 let _id: string = this.formGroup.controls._id.value,
//                     agent: TBillAgent = this.formGroup.controls.agent.value,
//                     billNumber: string = this.formGroup.controls.billNumber.value,
//                     issued_on: string = this.formGroup.controls.issuedOn.value,
//                     invoiceNumber: string = this.formGroup.controls.invoiceNumber.value;

//                 return Bill.create({
//                     _id: _id,
//                     sender: sender.emailAddress,
//                     relations: [
//                         // Agent
//                         (() => {
//                             if (agent && agent._id) {
//                                 return {
//                                     _id: agent._id,
//                                     class: 'company',
//                                     type: 'issued_by',
//                                     name: agent.name
//                                 };
//                             }
//                         })(),
//                         // receiver
//                         {
//                             _id: messageId,  // email id
//                             class: 'email',
//                             type: 'related_to',
//                             received_by: receiver.emailAddress
//                         }
//                     ]
//                 });
//             })
//         );
//     }

//     createBill(name: string, type: string, content?: ArrayBuffer) {
//         if (!content) {
//             this.snackbar.open('No attachment attached!');
//             return false;
//         }


//         const sendFile = (id) => {
//             return this.backend.invoices.addAttachment(id, name, type, content);
//         };

//         const sendMetadata = () => {
//             return this.prepareDataToSend().pipe(flatMap(result => {
//                 return this.backend.invoices.create(result);
//             }));
//         };

//         const complete = (invoice: IInvoice) => {
//             const agent = invoice.relations.filter(item => {
//                 if (item.type === 'issued_by') {
//                     return item;
//                 }
//             })[0];

//             if (invoice) {
//                 let invoiceNumber = invoice.number;

//                 this.formGroup.controls._id.setValue(invoice._id);
//                 this.formGroup.controls.billNumber.setValue(invoice.number);
//                 this.formGroup.controls.issuedOn.setValue(invoice.issued_on);
//                 this.formGroup.controls.agent.setValue(agent);

//                 if (invoice.number) {
//                     //this.formGroup.controls.billNumber.setValue(invoice.number);
//                     this.formGroup.controls.billNumber.disable();
//                 } else {
//                     this.formGroup.controls.billNumber.reset();
//                 }

//                 // TODO: Actualize invoice types
//                 if (invoice.issued_on) {
//                     //this.formGroup.controls.issuedOn.setValue(invoice.issued_on); // temp
//                     this.formGroup.controls.issuedOn.disable();
//                 } else {
//                     this.formGroup.controls.issuedOn.reset();
//                 }

//                 if (agent) {
//                     //this.formGroup.controls.agent.setValue(agent); // temp
//                     this.formGroup.controls.agent.disable();
//                 } else {
//                     this.formGroup.controls.agent.reset();
//                 }

//                 this.snackbar.open('Bill created!');
//             } else {
//                 this.snackbar.open('Unable to create bill!');
//             }
//         };

//         const createNewInvoice = () => {
//             sendMetadata().subscribe((result) => {
//                 sendFile(result._id).subscribe((result) => {
//                     complete(result.body);
//                 });
//             });
//         };

//         from(Crypto.generateHash('SHA-256', content))
//             .subscribe((shaHash) => {
//                 this.backend.invoices.searchBySha(shaHash).pipe(
//                     // invoice not found
//                     catchError((error, caught) => {
//                         if (error.status === 404) {
//                             createNewInvoice();
//                         }

//                         return throwError(error);
//                     })
//                 ).subscribe((result) => {
//                     // invoice found
//                     if (result.body.items.length > 0) {
//                         const invoice = result.body.items[0];

//                         complete(invoice);
//                     } else {
//                         createNewInvoice();
//                     }
//                 });
//             });
//     };


//     updateBill() {
//         this.prepareDataToSend().subscribe((result) => {
//             this.backend.invoices.update(result).pipe(
//                 catchError((err, caught) => {
//                     this.snackbar.open('Unable to update invoice!');

//                     return throwError(err);
//                 })
//             ).subscribe((result) => {
//                 this.snackbar.open('Invoice updated!');
//             });
//         });
//     }

//     searchInvoices($event) {
//         this.backend.invoices.searchByNumber($event.value)
//             .subscribe((result) => {
//                 console.log(result.body);
//             });
//     }

//     loadEntities(value: string) {
//         this.observableData.agents$ = new Observable<any[]>((observer) => {
//             this.backend.entities.list(value).subscribe(items => {
//                 observer.next(items);
//             });
//         });
//     }
// }