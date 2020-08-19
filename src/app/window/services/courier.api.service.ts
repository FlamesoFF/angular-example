import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourier } from '@apollo4u/types/backend/v3';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UrlService } from './URL';



@Injectable()
export class CourierApiService {
    constructor(private http: HttpClient, private url: UrlService) { }


    listCouriers(): Observable<ICourier[]> {
        return this.searchCouriers();
    }

    listSenders(): Observable<string[]> {
        throw new Error('not implemented');
        // return this.http
        //     .get<string[]>(UrlService.Senders.senders);
    }

    listReceivers(): Observable<string[]> {
        return of([]);
    }

    listShippers(): Observable<string[]> {
        return of([]);
    }

    searchCouriers(name?: string): Observable<ICourier[]> {   // Data source: GET /v2/entities?type=agent,client
        let params = {};

        name ? params = { name } : null;

        return this.http
            .get<ICourier[]>(this.url.Couriers.base(), { params });
    }
}
