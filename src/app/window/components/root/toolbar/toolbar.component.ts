import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from '@apollo4u/types/backend/v3';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthActions } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import { Router } from '@angular/router';
import { ROUTES } from '../../../shared/constants';
import { AppState } from '../../../store/app.state';
import browser from 'webextension-polyfill';

@Component({
  selector: 'app-toolbar',
  template: require('./toolbar.component.html'),
  styles: [require('./toolbar.component.scss')]
})
export class ToolbarComponent {
    constructor(private router: Router, private store: Store) {

    }

    @Select(AuthState.user) user$: Observable<IUser>;
    @Select(AuthState.authorized) authorized$: Observable<boolean>;
    @Select(AppState.settingsActive) inSettings$: Observable<boolean>;

    @Output() onExit = new EventEmitter();

    get username$(): Observable<string> {
      return this.user$.pipe(
          map(user => user && user.name)
      );
    }

    signOut() {
        this.store.dispatch(new AuthActions.SignOut());
    }

    openSettings() {
        this.router.navigateByUrl(ROUTES.settings);
    }

    private reload() {
        window.location.href = browser.runtime.getURL('window/index.html');
    }
}
