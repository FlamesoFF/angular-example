import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TextUtils } from '@apollo4u/auxiliary';
import { IUser } from '@apollo4u/types/backend/v2';
import { IOrder } from '@apollo4u/types/backend/v3';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Request } from './services';
import { UrlService } from './URL';
import { IOrderFormModelReady } from "@/app/window/store/order/order.types";
import { Response } from "@/app/window/services/types";


export interface IOrderCreateRequest {
    type: 'has_contact'
    name: string
    email: string
    initials: string
}

@Injectable()
export class OrderApiService {
    constructor(private http: HttpClient, private url: UrlService) { }

    searchOrders(number: string): Observable<IOrder[]> {
        const params = { number };

        return this.http
            .get<Response.List<IOrder>>(this.url.Orders.base(), { params })
            .pipe(map(response => response.items));
    }

    fetchOrder(emailAddress: string): Observable<IOrder> {
        const params = { 'contact-email': emailAddress };

        return this.http
            .get<Response.List<IOrder>>(this.url.Orders.base(), { params })
            .pipe(map(result => result.items[0]));
    }

    createOrder(
        formData: IOrderFormModelReady,
        manager: IUser & any
    ) {
        const {
            order: { _id },
            clientReference
        } = formData;

        const payload: Request.ICreateOrder = {
            client_reference: clientReference,
            client: undefined,
            manager: {
                id: manager.id,
                email: manager.emailAddress,
                initials: TextUtils.nameToInitials(manager.name),
                name
            },
            message_ids: []
        }

        return this.http.post<IOrder>(this.url.Orders.base(), payload);
    }

    // updateOrder(formData: IOrderFormModel) {
    //     const {
    //         order: { _id: id, },
    //         clientReference
    //     } = formData;

    //     const payload: Request.ICreateOrder = {
    //         class: 'order',
    //         client_reference: clientReference,
    //         comments: [],
    //         companies : [],
    //         contacts: [],
    //     }

    //     return this.http.post<IOrder>(Url.Orders.getUpdateUrl(id), payload);
    // }
}
