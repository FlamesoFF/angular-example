import jwt from 'jsonwebtoken';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IUser } from '@apollo4u/types/backend/v3';
import { Action, InitState, Selector, State } from '@ngxs/store';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, tap } from 'rxjs/operators';
import { AppStorage } from '../../../shared/Storage';
import { DEV_ROLES } from '../../services/URL';
import { AuthService } from '../../services/auth.api.service';
import { ROUTES } from '../../shared/constants';
import { AuthActions } from './auth.actions';
import { IAuthStateModel, IAuthUser, TAuthContext } from './auth.types';


@State<IAuthStateModel>({
    name: 'auth',
    defaults: {
        token: ''
    }
})
export class AuthState {

    @Selector()
    static authorized( state: IAuthStateModel ): boolean {
        return !!state.token;
    }

    @Selector()
    static token( state: IAuthStateModel ): string {
        return state.token;
    }

    @Selector([AuthState.token])
    static user( state: IAuthStateModel, token: string ): IAuthUser {
        return jwt.decode(token) as IAuthUser;
    }

    @Selector()
    static isDeveloper( state: IAuthStateModel ): boolean {
        let devRole = false;

        DEV_ROLES.forEach(( role ) => {
            const data: any = jwt.decode(state.token);

            if ( data.roles.includes(role) ) {
                devRole = true;
            }
        });

        return devRole;
    }

    constructor(
        private authApiService: AuthService,
        private snackbar: MatSnackBar,
        private router: Router
    ) {
    }


    @Action(InitState)
    init( { setState }: TAuthContext ) {
        return AppStorage.load<string>('token').pipe(tap(( token: string ) => {
            setState({ token });
        }));
    }

    @Action(AuthActions.Login)
    login( { setState }: TAuthContext, action: AuthActions.Login ) {
        const {
            login,
            password
        } = action;

        return this.authApiService.logIn(login, password).pipe(map(
            (token: string) => {
                AppStorage.save('token', token);
                setState({ token });
            }
        )).pipe(
            catchError(( error: any, caught ) => {
                this.snackbar.open('Incorrect username or password!');
                return throwError(error);
            })
        );
    }

    @Action(AuthActions.UpdateToken)
    updateToken( { patchState }: TAuthContext, action: AuthActions.UpdateToken ) {
        patchState({
            token: action.token
        })
    }

    @Action(AuthActions.SignOut)
    signOut( { setState }: TAuthContext ) {
        setState({ token: '' });
        AppStorage.remove('token');
        return this.router.navigateByUrl(ROUTES.login);
    }
}