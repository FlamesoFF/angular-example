import { ICourier, ICompany } from '@apollo4u/types/backend/v3';
import { Action, NgxsOnInit, Selector, State } from '@ngxs/store';
import { CourierApiService } from '../../services/courier.api.service';
import { stateBase } from '../store.shared';
import { CourierActions } from './courier.actions';
import { ICourierFormModel, ICourierState, TCourierContext } from './courier.types';
import { ISender, IReceiver } from '@apollo4u/types/backend/v2';
import { Observable, combineLatest } from 'rxjs';
import { IManager } from '@apollo4u/types/backend/time-tracker-api/v2/apollo/person';
import { combineAll } from 'rxjs/operators';
import { CommonApiService } from '../../services/common.api.service';


@State<ICourierState>({
    name: 'courier',
    defaults: {
        ...stateBase({
            client: '',
            sender: '',
            manager: '',
            courier: '',
            receiver: {
                address: '',
                contact: '',
                phone: '',
                country: ''
            },
            number: '',
            bill_to: '',
            company: '',
            contact: ''
        }),

        couriers: [],
        senders: [],
        receivers: [],
        managers: [],
        shippers: [],
        companies: []
    }
})
export class CourierState implements NgxsOnInit {
    constructor(private courierApiService: CourierApiService, private commonApiService: CommonApiService) { }


    ngxsOnInit({ getState, patchState }: TCourierContext) {
        const state = getState();

        combineLatest([
            this.courierApiService.listCouriers(),
            this.courierApiService.listSenders(),
            this.courierApiService.listReceivers(),
            this.commonApiService.listPersons(),
            this.courierApiService.listShippers(),
            this.commonApiService.listCompanies()

        ]).subscribe((result) => {
            const [
                couriers,
                senders,
                receivers,
                managers,
                shippers,
                companies
            ] = result;

            patchState({
                couriers,
                senders,
                companies,
                managers,
                receivers,
                shippers
            });
        });
    }

    /*
        Selectors
    */
    @Selector()
    static model(state: ICourierState): ICourierFormModel {
        return state.form.model;
    }
    @Selector()
    static couriers(state: ICourierState): ICourier[] {
        return state.couriers;
    }
    @Selector()
    static senders(state: ICourierState): string[] {
        return state.senders;
    }
    @Selector()
    static receivers(state: ICourierState): IReceiver[] {
        return state.receivers;
    }
    @Selector()
    static managers(state: ICourierState): IManager[] {
        return state.managers;
    }
    @Selector()
    static shippers(state: ICourierState): any[] {
        return state.shippers;
    }
    @Selector()
    static companies(state: ICourierState): ICompany[] {
        return state.companies;
    }


    /*
        Actions
    */


    @Action(CourierActions.CreateCourier)
    findByNumber({ patchState }: TCourierContext, { }: CourierActions.CreateCourier) {

    }
}