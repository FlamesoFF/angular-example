import browser from 'webextension-polyfill';
import { appMessenger, NMessagePayloads } from '../shared/AppMessenger';
import { Inbox } from '../shared/InboxModule';
import { Layer } from '../shared/Layer';
import { AppStorage } from '../shared/Storage';
import { Utils } from '../shared/Utils';
import './content.styles.scss';


abstract class Content extends Layer {

    static findPivotElement(messageElement: HTMLElement): Element {
        const selector = 'tr.acZ:not(.xD) td.gH.acX';
        return messageElement.closest(selector);
    }

    constructor() {
        super();

        // Todo convert to AppMessenger's message
        window.addEventListener('hashchange', (event: HashChangeEvent) => {
            const { newURL, oldURL } = event;
            const inThread = newURL.lastIndexOf('/') > 32;

            if (inThread) {
                console.log(newURL);

                appMessenger.send({ type: 'HASH_CHANGE' });
            }
        });
    }


    static async run() {
        await Inbox.initialize();

        AppStorage.save('user', await Inbox.SDK.User.getEmailAddress());    // user email

        /*
            Inbox SDK hooks
        */
        Inbox.SDK.Toolbars.registerThreadButton({
            title: "Apollo Gmail App",
            iconUrl: browser.extension.getURL('../../../../assets/images/grabber-icon.png'),
            onClick: event => {
                appMessenger.send({ type: 'START' });
            }
        });

        Inbox.SDK.Conversations.registerThreadViewHandler(async threadView => {
            const threadId = await threadView.getThreadIDAsync();
            const subject = threadView.getSubject();
            const contact = threadView.getMessageViews()[0].getSender();

            // AppStorage.save('threadId', threadId);
            // AppStorage.save('messageSubject', subject);
            // AppStorage.save('messageSender', sender);

            appMessenger.send({
                type: 'THREAD_CHANGE',
                payload: <NMessagePayloads.IThreadInfo>{
                    threadId,
                    contact,
                    subject
                }
            });
        });
    }
}

Utils.onDocumentReady().then(() => {
    Content.run();
});