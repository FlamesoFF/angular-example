import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany, IOrder, IPerson } from '@apollo4u/types/backend/v3';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UrlService } from './URL';
import { CdbReponse, NRequest, Response } from "@/app/window/services/types";
import IRelation = NRequest.IRelation;

@Injectable()
export class RelationsService {
    constructor( private http: HttpClient, private url: UrlService ) {
    }

    getRelations() {
    }

    addRelation( docClass: string, docId: string, relation: IRelation ) {
        const url = this.url.Relations.ofEntity(docClass, docId);

        return this.http.post<CdbReponse>(url, relation);
    }

    removeRelation( docClass: string, docId: string, type: string, nodeId?: string ) {
        const url = this.url.Relations.ofEntity(docClass, docId);

        return this.http.delete<CdbReponse>(url, {
            params: { type, nodeId }
        })
    }

}
