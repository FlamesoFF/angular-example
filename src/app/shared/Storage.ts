import { IUser } from '@apollo4u/types/backend/v3';
import browser from 'webextension-polyfill';
import { Observable, from } from 'rxjs';
import { IAppConfiguration } from '../window/components/forms/application/settings/settings.types';


export namespace AppStorage {
    export type TItem =
        // TODO: rename config?
        'configApi' |
        'configAuth' |
        'token' |
        'messageId' |
        'threadId' |
        'messageSender' |
        'messageRecipients' |
        'messageDate' |
        'messageSubject' |
        'inboxUserData' |
        'user' |
        'configuration' |
        'contextMenus';

    export type TToken = string;
    export type TMessageId = string;
    export type TThreadId = string;
    export type TSender = any;
    export type TRecipients = any[];
    export type TDate = string;
    export type TSubject = string;
    export type TInboxUserData = any[];
    export type TUser = IUser;
    export type TConfiguration = IAppConfiguration;
    export type TContextMenus = any;

    // TODO: Rename functions
    export function save(key: TItem, data: any) {
        return from(browser.storage.local.set({ [key]: data }));
    }
    export function load<T>(key: TItem) {
        return new Observable<T>(subscriber => {
            browser.storage.local.get(key).then((data: T) => {
                if (data) {
                    subscriber.next(data[key]);
                    subscriber.complete();
                }
            });

            return subscriber;
        });
    }
    export const remove = (key: TItem) => {
        return from(browser.storage.local.remove(key));
    }
}
