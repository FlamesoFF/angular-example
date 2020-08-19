import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UrlService } from './URL';

export interface ITokenResponse {
    token: string
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private url: UrlService) { }

    logIn(login: string, password: string): Observable<string> {
        const params = { password };

        return this.http
            .post<ITokenResponse>(this.url.Auth.getAuthenticationUrl(login), params)
            .pipe(map(result => result.token));
    }
}
