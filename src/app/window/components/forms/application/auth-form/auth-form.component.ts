import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppFormGroup } from '../../../../shared/AppBusinessForm';
import { AuthActions } from '../../../../store/auth/auth.actions';


@Component({
    selector: 'auth-form',
    template: require('./auth-form.component.html'),
    styles: [require('./auth-form.component.scss')]
})
export class AuthFormComponent  {
    formGroup = new AppFormGroup({
        login: new FormControl('a.kopchinskiy', [
            Validators.required
        ]),
        password: new FormControl('69Aad1be', [
            Validators.required
        ])
    });


    constructor(
        private snackbar: MatSnackBar,
        private router: Router,
        private store: Store
    ) { }

    login() {
        const {
            login: { value: login },
            password: { value: password },
        } = this.formGroup.controls;

        this.store.dispatch(new AuthActions.Login(login, password)).subscribe((result) => {
            this.router.navigateByUrl('contact');
        });
    }
}
