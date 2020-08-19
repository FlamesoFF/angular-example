import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './URL';

@Injectable()
export class FilesService {
    constructor( private http: HttpClient, private url: UrlService ) {
    }

    search( fileId: string, entityId: string, entityCategory: string ) {
        return this.http
            .get(this.url.Files.base(), {
                [fileId]: {}
            });
    }

    download( fileId: string ): Observable<ArrayBuffer> {
        const url = this.url.Files.getDownloadUrl(fileId);

        return this.http.get(url, {
            responseType: 'arraybuffer'
        });
    }

    downloadRawFile( url: string ): Observable<HttpResponse<Blob>> {
        return this.http.get(url, {
            observe: 'response',
            responseType: 'blob'
        });
    }
}
