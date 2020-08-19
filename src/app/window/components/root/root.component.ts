import { HttpClient } from "@angular/common/http";
import { Component, HostListener, OnInit } from "@angular/core";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { appMessenger, NMessagePayloads } from "@/app/shared/AppMessenger";
import { AppStorage } from "@/app/shared/Storage";
import { DEFAULT_ROUTE } from "../../modules/app-routing.module";
import { AppActions } from "../../store/app.actions";
import { AppState } from "../../store/app.state";
import { AuthActions } from "../../store/auth/auth.actions";
import { AuthState } from "../../store/auth/auth.state";
import { Tab, TABS } from "./root.tabs.data";
import browser from 'webextension-polyfill';
import { IBackgroundWindow } from "@/globals";


@Component({
    selector: "app-root",
    template: require("./root.component.html"),
    styles: [require("./root.component.scss")]
})
export class RootComponent implements OnInit {
    userName: string;
    matTabGroup: MatTabGroup;

    @Select(AuthState.authorized) authorized$: Observable<boolean>
    @Select(AppState.progress) progress$: Observable<boolean>
    @Select(AppState.settingsActive) settingsActive$: Observable<boolean>

    constructor(
        private router: Router,
        private store: Store,
        private http: HttpClient
    ) {
        appMessenger.on<NMessagePayloads.IThreadInfo>('THREAD_CHANGE', payload => {
            this.store.dispatch(new AppActions.UpdateGmailInfo(payload));
        });

        AppStorage.load<string>('token').subscribe(token => {
            this.store.dispatch(new AuthActions.UpdateToken(token))
        });

        browser.runtime.getBackgroundPage().then((page: IBackgroundWindow) => {
            page.threadData.subscribe(payload => {
                console.log(payload)
                this.store.dispatch(new AppActions.UpdateGmailInfo(payload));
            })
        });
    }

    ngOnInit() {
        this.authorized$.subscribe(result => {
            // initial check for authorization;

            if (result) {
                this.router.navigateByUrl(DEFAULT_ROUTE);
            } else {
                this.router.navigateByUrl("login");
            }

        });
    }

    @HostListener("window:beforeunload", ["$event"])
    private onBeforeUnload($event) {
        appMessenger.send({
            type: 'STOP'
        });
    }

    private getTabs(): Tab[] {
        return TABS;
    }

    private navigate($event: MatTabChangeEvent) {
        const tab = TABS[$event.index];

        this.router.navigateByUrl(tab.route).then(response => {
            console.log(response);
        });
    }

    private exit() {
        this.store.dispatch(AuthActions.SignOut);
    }
}
