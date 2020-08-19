import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { AuthActions } from '../store/auth/auth.actions';
import { AuthState } from '../store/auth/auth.state';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    @Select(AuthState.token) token: Observable<string>;

    constructor(
        public snackbar: MatSnackBar,
        private store: Store
    ) { }

    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

        let clonedRequest: HttpRequest<T>;

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        this.token.subscribe((token: string) => {
            if (token)
                clonedRequest = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
            else
                clonedRequest = request;
        });

        // send cloned request with header to the next handler.
        return next.handle(clonedRequest)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    if (response instanceof HttpErrorResponse) {
                        switch (response.status) {
                            case 400:
                                if (response.error) {
                                    this.snackbar.open(response.error.message);
                                }
                                else {
                                    this.snackbar.open(response.message);
                                }

                                break;

                            case 401:
                                this.snackbar.open(`Your session has expired. Signing out...`);
                                this.store.dispatch(new AuthActions.SignOut());

                                break;

                            // case 404:
                            //     this.snackbar.open(response.message);
                            //     break;

                            default:
                                // this.snackbar.open(`${response.message}!`);
                                break;
                        }
                    }

                    return Observable.throw(response);
                })
            )
    }
}