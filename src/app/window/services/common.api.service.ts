import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany, IOrder, IPerson } from '@apollo4u/types/backend/v3';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UrlService } from './URL';
import { Response } from "@/app/window/services/types";

@Injectable()
export class CommonApiService {
    constructor(private http: HttpClient, private url: UrlService) {}

    listPersons(): Observable<IPerson[]> {
        return this.http
            .get<Response.List<IPerson>>(this.url.Persons.base())
            .pipe(map(result => result.items));
    }

    listCompanies(): Observable<ICompany[]> {
        return this.http
            .get<Response.List<ICompany>>(this.url.Companies.base())
            .pipe(map(result => result.items));
    }

    listOrders(): Observable<IOrder[]> {
        return this.http
            .get<Response.List<IOrder>>(this.url.Orders.base())
            .pipe(map(result => result.items));
    }
}
