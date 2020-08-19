import { TContactClient } from '../../services/contact.api.service';
import { TAutocompleteElement } from '../app.types';
import { StateContext } from '@ngxs/store';

export interface TContactState {
    form: IContactForm
    clients: TContactClient[]
}

export interface IContactForm {
    dirty?: boolean,
    status?: string,
    errors?: object
    model: IContactFormModel
}

export interface IContactFormModel {
    name?: string;
    email?: string;
    initials?: string;
    client?: TAutocompleteElement<TContactClient>
}

export interface IContactFormModelReady extends IContactFormModel {
    client: TContactClient
}

export type TContactContext = StateContext<TContactState>;