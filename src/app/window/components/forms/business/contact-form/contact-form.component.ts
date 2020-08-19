import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatSnackBar} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {combineLatest, Observable} from 'rxjs';
import {AppState} from 'src/app/window/store/app.state';
import {ContactActions} from 'src/app/window/store/contact/contact.actions';
import {ContactState} from 'src/app/window/store/contact/contact.state';
import {Filter} from '@/app/shared/filters';
import {TContactClient} from '../../../../services/contact.api.service';
import {AppBusinessForm, AppFormGroup} from '../../../../shared/AppBusinessForm';
import {AppControlButton, AppControlPanel} from '../../../../shared/Buttons';

@Component({
    selector: 'contact-form',
    template: require('./contact-form.component.html'),
    styles: [require('./contact-form.component.scss')],
})
export class ContactFormComponent extends AppBusinessForm implements OnInit, OnChanges {


    @Select(AppState.threadId) threadId$: Observable<string>;
    @Select(ContactState.model) model$: Observable<string>;
    @Select(ContactState.clientList) clients$: Observable<TContactClient[]>;
    @Select(ContactState.clientSelected) clientSelected$: Observable<boolean>;
    @Select(ContactState.clientAssigned) clientAssigned$: Observable<boolean>;


    formGroup = new AppFormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        initials: new FormControl(''),
        client: new FormControl({})
    });

    display = {
        client: value => value && value.name
    }

    controls = new AppControlPanel({
        create: new AppControlButton(
            'Assign',
            () => {
                // this.sendAssignment(REQUEST_TYPE.create);
                this.assign();
            },
            {
                initialValue: false,
                watcher$: observer => {
                    combineLatest([
                        this.clientAssigned$,
                        this.clientSelected$
                    ]).subscribe(values => {
                        const [assigned, selected] = values;

                        observer.next(!assigned && selected && this.formGroup.valid);
                    });
                },
            }
        ),
        // update: new AppControlButton(
        //     'Update',
        //     () => {
        //         // this.sendAssignment(REQUEST_TYPE.update);
        //         this.update();
        //     },
        //     {
        //         initialValue: false,
        //         watcher$: observer => {
        //             return this.formGroup.valueChanges.subscribe(value => {
        //                 observer.next(
        //                     typeof value.client !== 'string' &&
        //                     this.formGroup.valid
        //                 );
        //             });
        //         },
        //     }
        // ),

        remove: new AppControlButton(
            'Remove',
            () => {
                // this.remove();
            },
            {
                initialValue: false,
                watcher$: observer => {
                    const isDeveloper = true;

                    return this.clientAssigned$.subscribe(value => {
                        observer.next(value && isDeveloper);
                    });
                },
            }
        ),

        clear: new AppControlButton('Clear', () => {
            this.clear();
        }),
    });

    constructor(
        private snackBar: MatSnackBar,
        private store: Store
    ) {
        super();

        // Load clients
        this.store.dispatch(new ContactActions.SearchClients());

        // this.client$.subscribe(client => {
        //     this.formGroup.controls.client.setValue(client);
        // });


        this.formGroup.controls.client.valueChanges
            .pipe(Filter.strings)
            .subscribe(value => {
                this.store.dispatch(new ContactActions.SearchClients(value))
            });

        this.threadId$.subscribe(id => {
            this.store.dispatch(new ContactActions.FetchClient());
        });
    }

    ngOnInit() {
    }


    ngOnChanges(changes) {
        try {
            if (changes.formGroup.valid === true) {
                this.controls.buttons.create.enable();
            } else {
                this.controls.buttons.create.disable();
            }
        } catch (error) {
        }
    }

    onClientSelect($event: MatAutocompleteSelectedEvent) {
        const {
            value
        } = $event.option;

        this.store.dispatch(new ContactActions.UpdateClient(value))
    }

    searchClient(name: string) {
        this.store.dispatch(new ContactActions.SearchClients(name));
    }

    assign() {
        this.store.dispatch(new ContactActions.AssignContactToClient()).subscribe(result => {
            this.snackBar.open('Success!', null, {
                duration: 2000,
                verticalPosition: 'bottom',
            });
        });
    }

    update() {

    }

    protected clear() {
        super.clear();
        this.formGroup.enable();
        this.controls.buttons.create.enable();
        // this.controls.buttons.update.disable();
    }
}
