import { IOrder } from '@apollo4u/types/backend/v3';
import { Action, Selector, State } from '@ngxs/store';
import { OrderApiService } from '../../services/order.api.service';
import { OrderActions } from './order.actions';
import { IOrderForm, IOrderFormModel, IOrderState, TOrderContext } from './order.types';
import { stateBase } from '../store.shared';
import { tap } from 'rxjs/operators';


// @State<IOrderState>({
//     name: 'order',
//     defaults: {
//         form: {
//             dirty: false,
//             status: "",
//             errors: {},
//             model: {
//                 order: '',
//                 manager: '',
//                 contact: {
//                     name: '',
//                     initials: ''
//                 },
//                 client: '',
//                 clientReference: '',
//                 createdOn: ''
//             }
//         },
//         orders: []
//     }
// })

@State<IOrderState>({
    name: 'order',
    defaults: {
        ...stateBase({
            order: '',
            manager: '',
            contact: {
                name: '',
                initials: ''
            },
            client: '',
            clientReference: '',
            createdOn: ''
        }),
        orders: []
    }
})
export class OrderState {
    constructor(private orderApiService: OrderApiService) { }

    /*
        Selectors
    */

    @Selector()
    static form(state: IOrderState): IOrderForm {
        return state.form;
    }
    @Selector()
    static model(state: IOrderState): IOrderFormModel {
        return state.form.model;
    }
    @Selector()
    static orderList(state: IOrderState): IOrder[] {
        return state.orders;
    }
    @Selector()
    static orderId(state: IOrderState): string {
        const { order } = state.form.model;
        return typeof order === 'object' ? order._id : null;
    }

    /*
        Actions
    */

    @Action(OrderActions.FindByNumber)
    findByNumber({ patchState }: TOrderContext, { number }: OrderActions.FindByNumber) {
        return this.orderApiService.searchOrders(number).pipe(tap(
            orders => patchState({
                orders
            })
        ));
    }

    @Action(OrderActions.CreateOrder)
    createOrder({ getState, patchState }: TOrderContext) {
        const state = getState();

        // this.orderApiService
        //     .createOrder(<IOrderFormModelReady>state.form.model)
        //     .subscribe(order =>
        //         patchState({
        //             form: {
        //                 model: {
        //                     order: order.number,
        //                     clientReference: order.client_reference
        //                 }
        //             }
        //         })
        //     );
    }

    @Action(OrderActions.SetContact)
    setContact({ getState, patchState }: TOrderContext, { contact }: OrderActions.SetContact) {

        patchState({
            form: { model: { contact } }
        });
    }

    @Action(OrderActions.SetOrder)
    setOrder({ patchState }: TOrderContext, { order }: OrderActions.SetOrder) {
        patchState({
            form: { model: order }
        });
    }
}