import { IOrder, IUser } from "@apollo4u/types/backend/v3";
import { TAutocompleteElement } from "../app.types";
import { StateContext } from "@ngxs/store";

export interface ICourierState {
    form: ICourierForm

    couriers: any[],
    senders: any[],
    receivers: any[],
    managers: any[],
    shippers: any[],
    companies: any[]
}

export interface ICourierForm {
    dirty?: boolean
    status?: string
    errors?: object

    model: ICourierFormModel
}

export interface ICourierFormModel {
    client: string
    sender: string
    manager: string
    courier: string
    receiver: {
        address: string
        contact: string
        phone: string
        country: string
    },
    number: string
    bill_to: string
    company: string
    contact: string
}

// @Farid : discuss the name for this interface
// export interface IOrderFormModelReady extends ICourierFormModel {
//     order?: IOrder
// }

export type TCourierContext = StateContext<ICourierState>;