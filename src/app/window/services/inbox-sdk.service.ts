// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import browser from 'webextension-polyfill';
import { NMessagePayloads } from '../../shared/AppMessenger';
import { AppActions } from '../store/app.actions';
import { IBackgroundWindow } from "@/globals";


@Injectable()
export class InboxSdkService {
    private threadData: BehaviorSubject<NMessagePayloads.IThreadInfo>

    constructor (private store: Store) {
        browser.runtime.getBackgroundPage().then((page: IBackgroundWindow) => {
          this.threadData = page.threadData;

          this.threadData.subscribe(payload => {
            console.log(payload);
            this.store.dispatch(new AppActions.UpdateGmailInfo(payload));
          })
        });
    }
}