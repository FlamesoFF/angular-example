import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.api.service';
import { Store, Select } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    @Select(AuthState.authorized) authorized: Observable<boolean>

    constructor(
        private router: Router,
        private store: Store
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authorized.pipe(
            map(result => {
                this.router.navigateByUrl('contact');
                return result;
            })
        )
    }
}
