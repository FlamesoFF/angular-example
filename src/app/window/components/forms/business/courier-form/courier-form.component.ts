import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICompany, IManager, IReceiver } from '@apollo4u/types/backend/v2';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppBusinessForm, AppFormGroup } from '../../../../shared/AppBusinessForm';
import { AppControlPanel } from '../../../../shared/Buttons';
import { CourierState } from '../../../../store/courier/courier.state';
import { ICourierFormModel } from '../../../../store/courier/courier.types';


@Component({
    selector: 'courier-form',
    template: require('./courier-form.component.html'),
    styles: [require('./courier-form.component.scss')]
})
export class CourierFormComponent extends AppBusinessForm implements OnInit {
    @Select(CourierState.model) model$: Observable<ICourierFormModel>
    @Select(CourierState.senders) senders$: Observable<string[]>
    @Select(CourierState.managers) managers$: Observable<IManager[]>
    @Select(CourierState.receivers) receivers$: Observable<IReceiver[]>
    @Select(CourierState.shippers) shippers$: Observable<any[]>
    @Select(CourierState.companies) companies$: Observable<ICompany[]>


    formGroup = new AppFormGroup({
        number: new FormControl({ value: '', disabled: true }),
        client: new FormControl({ value: '',disabled: true }),
        sender: new FormControl({ value: '',disabled: true }),
        manager: new FormControl({ value: '',disabled: true }),
        courier: new FormControl({ value: '',disabled: true }),
        receiver: new FormGroup({
            name: new FormControl(''),
            address: new FormControl(''),
            contact: new FormControl(''),
            phone: new FormControl(''),
            country: new FormControl(''),
        }),
        bill_to: new FormControl(''),
        company: new FormControl(''),
        contact: new FormControl({ value: '',disabled: true })
    });

    display = {
        company: value => {
            return value ? value.name : '';
        },
        sender: value => {
            return value ? value.name : '';
        }
    }

    controls: AppControlPanel;

    constructor(private store: Store) {
        super();

        console.log(store);
    }

    ngOnInit() {
    }
}
