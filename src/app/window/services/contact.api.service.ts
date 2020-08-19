import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany, IPerson, IRelation } from '@apollo4u/types/backend/v3';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UrlService } from './URL';
import { IContactFormModelReady } from '../store/contact/contact.types';
import { NRequest } from './types';
import INode = NRequest.INode;


export interface TContactClient {
    _id:    string
    name:     string;
    type:     string;
    email:    string;
    initials: string;
    node:     INode;
}


interface IAddNewRelationRequest extends NRequest.IRelation {
    type: 'has_contact'
}


@Injectable()
export class ContactApiService {
    constructor(private http: HttpClient, private url: UrlService) { }

    searchClients(name: string): Observable<TContactClient[]> {
        // Load assigned client for the contact
        const params = {
            type: ['agent', 'client'].join(','),
            name
        };

        return this.http.get<TContactClient[]>(this.url.Entities.base(), { params });
    }

    fetchClient(emailAddress: string): Observable<TContactClient> {
        return this.http.get<TContactClient>(`${this.url.Contacts.base()}/${emailAddress}`);
    }

    getAssignedContact(formData: IContactFormModelReady) {
        const {email} = formData;

        const url = `${this.url.dataHost}/contacts/${email}`;

        return this.http.get(url);
    }

    assignContactToClient(formData: IContactFormModelReady) {
        const {
            client: { _id: clientId, },
            email,
            initials,
            name
        } = formData;

        const payload: IAddNewRelationRequest = {
            type: 'has_contact',
            node: {
                initials,
                name
            },
            email
        }

        const url = `${this.url.dataHost}/entities/${clientId}/relations`;


        return this.http.post<IRelation>(url, payload);
    }
}
