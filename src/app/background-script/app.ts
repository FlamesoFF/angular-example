import {appMessenger} from '@/app/shared/AppMessenger';
import browser from 'webextension-polyfill';
import {Layer} from '../shared/Layer';
import {AppStorage} from '../shared/Storage';
import {contextMenusConfig} from './contextMenus';
import {IAppConfiguration} from '../window/components/forms/application/settings/settings.types';

let app: BackgroundApp;

export class BackgroundApp extends Layer {
    private appWindow: chrome.windows.Window;
    private isApplicationLaunched: boolean = false;

    private constructor() {
        super();

        appMessenger.on('START', message => {
            this.startApp();
        });

        // this.initializeMessaging();

        browser.runtime.onStartup.addListener(() => {
            if (this.appWindow) {
                this.stopApp();
            }
        });

    }

    async startApp() {
        const url: string = browser.runtime.getURL('/window/index.html');

        AppStorage.load('configuration').subscribe((config: IAppConfiguration) => {
            let windowOptions: chrome.windows.CreateData;

            if (config) {
                windowOptions = {
                    url,    // Replace URL with document.html.innerHTML
                    left: config.windowOffsetX,
                    top: config.windowOffsetY,
                    width: config.windowWidth,
                    height: config.windowHeight,
                    focused: true,
                    type: 'popup'
                };
            } else {
                windowOptions = {
                    url,    // Replace URL with document.html.innerHTML
                    left: 200,
                    top: 200,
                    width: 400,
                    height: 600,
                    focused: true,
                    type: 'popup'
                };
            }

            //this.appWindow = window.open(url, 'Gmail App', windowOptions);

            browser.windows.onCreated.addListener(createdWindow => {
                this.appWindow = createdWindow;
            });

            browser.windows.create(windowOptions);
            this.isApplicationLaunched = true;

            browser.windows.onRemoved.addListener((id: number) => {
                if (id === this.appWindow.id) {
                    this.isApplicationLaunched = false;
                }
            });
        });
    }


    stopApp() {
        //chrome.windows.remove(this.appWindow.id);
        this.isApplicationLaunched = false;
    }


    static run() {
        if (!app) {
            app = new BackgroundApp();
        } else {
            throw 'Background script is already running!';
        }
    }

    private updateContextMenu(form: string) {
        const baseId = 'GG2';
        let formContextMenus: chrome.contextMenus.CreateProperties[] = contextMenusConfig[form] || [];

        chrome.contextMenus.removeAll(() => {
            // Main Item
            chrome.contextMenus.create({
                id: baseId,
                title: 'Gmail Grabber 2',
                contexts: ['selection']
            });


            // Context items
            formContextMenus.forEach(menu => {
                chrome.contextMenus.create({
                    id: menu.id,
                    title: menu.title,
                    parentId: baseId,
                    contexts: ['selection'],

                    onclick: (info, tab) => {
                        appMessenger.send({
                            type: 'DATA',
                            payload: {
                                [menu.id]: {info}
                            }
                        })
                    }
                });
            });
        });

    }
}