export abstract class Inbox {
    private static INBOXSDK_APP_ID = 'sdk_45854919378_9c045e44cf';
    static SDK: any;    // TODO: fix types or replace deprecated and unmaintained library


    static async initialize(): Promise<void> {
        this.SDK = await InboxSDK.load('1.0', this.INBOXSDK_APP_ID);
    }

    static getMessageBody(messageView) {
        return messageView.getBodyElement();
    }

    static getThread(messageView) {
        return messageView.getThreadView();
    }

    static async getRecepients(messageView) {
        return await messageView.getRecipientsFull();
    }

    static getDate(messageView) {
        return messageView.getDateString();
    }

    static getSubject(messageView) {
        return messageView.getThreadView().getSubject();
    }

    static async getMessageId(messageView) {
        return await messageView.getMessageIDAsync();
    }

    static async getThreadId(messageView) {
        return await messageView.getThreadView().getThreadIDAsync();
    }

    static getUserEmail() {
        return this.SDK.User.getEmailAddress();
    }

    static getUserAccountsInfo() {
        return this.SDK.User.getAccountSwitcherContactList();
    }
}