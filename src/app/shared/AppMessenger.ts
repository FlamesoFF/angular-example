import browser from 'webextension-polyfill';

export type TMessageType =
    | 'START'
    | 'STOP'
    | 'DATA'
    | 'QUOTE'
    | 'FILE'
    | 'INSERT'
    | 'HASH_CHANGE'
    | 'TAB_CHANGE'
    | 'THREAD_CHANGE';

export namespace NMessagePayloads {
    export type TInsertionType = 'FIELD' | 'QUOTE' | 'FILE';

    export interface IThreadInfo {
        threadId: string
        subject: string
        contact: any
    }

    export interface IInsert {
        type: TInsertionType
        text?: string
    }
}

export type TMessageHandler<T = any> = (payload: T) => void;

export interface IAppMessage<T = any> {
    type: TMessageType;
    payload?: T;
}

export class AppMessenger {
    private handlers = new Set<AppMessageHandler>();

    constructor() {
        browser.runtime.onMessage.addListener((message: IAppMessage<any>) => {
            this.handleMessage(message);
        });
    }

    send(message: IAppMessage<any>) {
        browser.runtime.sendMessage(message);
    }

    on<T = any>(type: TMessageType, fn: TMessageHandler<T>): void {
        const appMessageHandler = new AppMessageHandler<T>(type, fn);

        this.handlers.add(appMessageHandler);
    }

    private handleMessage(message: IAppMessage<any>): void {
        this.handlers.forEach(handler => {
            if (message.type === handler.type) {
                handler.fn(message.payload);
            }
        });
    }
}

export class AppMessageHandler<T = any> {
    constructor(public type: TMessageType, public fn: TMessageHandler<T>) { }
}


export const appMessenger = new AppMessenger();