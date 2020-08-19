import { COMMA, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ICompany, IOrder, IPerson } from '@apollo4u/types/backend/v3';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { appMessenger, NMessagePayloads as MessagePayloads } from '../../../../../shared/AppMessenger';
import { Filter } from '@/app/shared/filters';
import { AppAttachments } from '../../../../shared/AppAttachments';
import { AppBusinessForm, AppFormGroup, AppInfoBlock, IFormOnDropFile } from '../../../../shared/AppBusinessForm';
import { AppControlButton, AppControlPanel } from '../../../../shared/Buttons';
import { Comments } from '../../../../shared/Comments';
import { Quotes } from '../../../../shared/Quotes';
import { AuthState } from '../../../../store/auth/auth.state';
import { ContactState } from '../../../../store/contact/contact.state';
import { OrderActions } from '../../../../store/order/order.actions';
import { OrderState } from '../../../../store/order/order.state';
import { IContactFormModelReady } from '../../../../store/contact/contact.types';
import { IOrderForm } from '../../../../store/order/order.types';
import { IAuthUser } from '../../../../store/auth/auth.types';

export enum ControlButtons {
    create = 'Create',
    update = 'Update',
    clear = 'Clear',
}

@Component({
    selector: 'order-form',
    template: require('./order-form.component.html'),
    styles: [require('./order-form.component.scss')],
})
export class OrderFormComponent extends AppBusinessForm implements OnInit, IFormOnDropFile {


    @Select(AuthState.user) user$: Observable<IAuthUser>
    @Select(ContactState.model) contact$: Observable<IContactFormModelReady>
    @Select(OrderState.form) form$: Observable<IOrderForm>
    @Select(OrderState.orderList) orders$: Observable<IOrder[]>
    @Select(OrderState.orderId) orderId$: Observable<string>


    formGroup = new AppFormGroup({
        order: new FormControl(''),
        manager: new FormControl(''),
        contact: new FormGroup({
            name: new FormControl(''),
            initials: new FormControl('')
        }),
        client: new FormControl(''),
        clientReference: new FormControl('')
    });

    display = {
        order: (value: IOrder) => {
            if (value) {
                return value.number;
            }
        },
        client: (value: IPerson) => {
            if (value) {
                return value.name;
            }
        },
        company: (value: ICompany) => {
            if (value) {
                return value.name;
            }
        },
    }

    separatorKeysCodes = [COMMA, SPACE];

    controls = new AppControlPanel({
        create: new AppControlButton(
            ControlButtons.create,
            () => {
                // this.createOrder();
            },
            {
                initialValue: true,
                watcher$: observer => {
                    return this.formGroup.statusChanges.subscribe(result => {
                        observer.next(
                            this.formGroup.value.order === null &&
                            this.formGroup.valid
                        );
                    });
                },
            }
        ),
        // update: new AppControlButton(
        //     ControlButtons.update,
        //     () => {
        //         this.updateOrder();
        //     },
        //     {
        //         initialValue: false,
        //         watcher$: (observer) => {
        //             return this.formGroup.statusChanges.subscribe((value) => {
        //                 observer.next(this.formGroup.value.order !== null && this.formGroup.valid)
        //             })
        //         }
        //     }
        // ),
        clear: new AppControlButton(ControlButtons.clear, () => {
            super.clear();
        }),
    });

    infoBlock = new AppInfoBlock({
        quotes: new Quotes(),
        comments: new Comments(),
        attachments: new AppAttachments(),

        // events: new BusinessFormInfoBlockConnectors({
        //     attachFile: new Subject<IAttachmentParameters>(),
        //     addQuote: new Subject<IQuoteParameters>(),
        // }),
    });

    constructor(
        private store: Store
    ) {
        super();


        this.store.dispatch(new OrderActions.FindByNumber());

        combineLatest([
            this.contact$,
            this.user$
        ]).subscribe(result => {
            const [
                {
                    name,
                    initials,
                    client: {
                        name: clientName = ''
                    } = {}
                },
                { email }
            ] = result;

            this.store.dispatch(new OrderActions.SetOrder({
                manager: email,
                contact: {
                    name,
                    initials
                },
                client: clientName
            }))
        });

        this.formGroup.controls.order.valueChanges
            .pipe(Filter.strings)
            .subscribe((value: string) => {
                this.store.dispatch(new OrderActions.FindByNumber(value));
            });

        // Handler for quotes insertion
        appMessenger.on<MessagePayloads.IInsert>('INSERT', message => {
            const { type, text } = message;

        });
    }

    ngOnInit() {
    }

    onDrop(file: File): void {
        // this.infoBlock.events.inputs.attachFile.next({
        //     file,
        // });
    }

    onOrderSelected($event: MatAutocompleteSelectedEvent) {
        const {
            manager: { name: manager },
            contacts: [contact],
            client: { name: client },
            client_reference: clientReference,
            created_on: createdOn
        } = <IOrder>$event.option.value;

        this.store.dispatch(new OrderActions.SetOrder({
            client,
            clientReference,
            contact,
            createdOn,
            manager
        }));
    }
}
