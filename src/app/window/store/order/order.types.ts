import { IOrder, IUser } from "@apollo4u/types/backend/v3";
import { TAutocompleteElement } from "../app.types";
import { StateContext } from "@ngxs/store";

export interface IOrderState {
    form: IOrderForm
    orders: IOrder[]
}

export interface IOrderForm {
    dirty?: boolean
    status?: string
    errors?: object
    model: IOrderFormModel
}

export interface IOrderFormModel {
    order?: TAutocompleteElement<IOrder>
    manager?: string
    contact?: IUser
    client?: string
    clientReference?: string
    createdOn?: string
}

// @Farid : discuss the name for this interface
export interface IOrderFormModelReady extends IOrderFormModel {
    order?: IOrder
}

export type TOrderContext = StateContext<IOrderState>;