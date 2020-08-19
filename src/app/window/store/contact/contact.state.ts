import { TextUtils } from '@apollo4u/auxiliary';
import { Action, Selector, State } from '@ngxs/store';
import { ContactApiService, TContactClient } from '../../services/contact.api.service';
import { AppActions } from '../app.actions';
import { ContactActions } from './contact.actions';
import {
    IContactForm,
    IContactFormModel,
    IContactFormModelReady,
    TContactState,
    TContactContext
} from './contact.types';
import { tap } from 'rxjs/operators';
import { RelationsService } from "@/app/window/services/relations.api.service";
import { NRequest } from "@/app/window/services/types";
import IRelation = NRequest.IRelation;


@State<TContactState>({
    name: 'contact',
    defaults: {
        form: {
            dirty: false,
            status: '',
            errors: {},
            model: {
                name: '',
                email: '',
                initials: '',
                client: ''
            }
        },
        clients: []
    }
})
export class ContactState {
    constructor( private contactApiService: ContactApiService, private relationsService: RelationsService ) {
    }

    /*
     Selectors
     */
    @Selector()
    static clientSelected( { form: { model } }: TContactState ): boolean {
        const { client } = model;
        return !!(client && typeof client !== 'string' && client.email);
    }

    @Selector([ContactState.clientSelected])
    static clientAssigned( { form: { dirty } }: TContactState, clientSelected: boolean ): boolean {
        return clientSelected && dirty === false;
    }

    @Selector()
    static model( { form: { model } }: TContactState ): IContactFormModel {
        return model;
    }

    @Selector()
    static clientList( { clients }: TContactState ): TContactClient[] {
        return clients || [];
    }

    /*
     Actions
     */

    @Action(ContactActions.SearchClients)
    searchClients( { patchState }: TContactContext, action: ContactActions.SearchClients ) {
        return this.contactApiService.searchClients(action.name).pipe(tap(
            clients => patchState({ clients })
        ));
    }

    @Action(ContactActions.FetchClient)
    fetchClient( { getState, patchState }: TContactContext ) {
        const { email = '' } = getState().form.model;

        return this.contactApiService.fetchClient(email).pipe(
            tap(( response ) => patchState({
                form: {
                    model: {
                        client: response
                    }
                }
            }))
        );
    }

    @Action(ContactActions.AssignContactToClient)
    assignContactToClient( { patchState, getState }: TContactContext ) {
        const { model } = getState().form;
        const { type, _id } = (<TContactClient>model.client);

        const relation: IRelation = {
            type: 'has_contact',
            node: {
                class: 'person',
                name: model.name
            },
            email: model.email
        }

        return this.relationsService.addRelation(type, _id, relation);
    }

    @Action(ContactActions.UpdateClient)
    updateClient( { patchState }: TContactContext, { client }: ContactActions.UpdateClient ) {
        patchState({
            form: { model: { client } }
        })
    }

    @Action(AppActions.UpdateGmailInfo)
    updateGmailInfo( { patchState }: TContactContext, { threadData }: AppActions.UpdateGmailInfo ) {
        const { contact: sender } = threadData;
        const { name, emailAddress: email } = sender;
        const initials = TextUtils.nameToInitials(name);

        patchState({
            form: { model: { name, email, initials } }
        });
    }
}