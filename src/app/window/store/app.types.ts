import { StateContext } from "@ngxs/store";
export type TAutocompleteElement<T> = T | string;

export interface IStoreForm {
    dirty?: boolean
    status?: string
    errors?: object
}

export interface IAppStateModel {
    threadId: string
    subject: string
    contact: any
    messageId: string
    messageRecepients: any[]
    progress: boolean
    settingsActive: boolean
}

export type TAppContext = StateContext<IAppStateModel>;