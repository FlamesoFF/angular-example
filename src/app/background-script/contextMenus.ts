export interface IContextMenusConfig {
    [key: string]: chrome.contextMenus.CreateProperties[]
}

export interface IContextMenuMessage {
    [ket: string]: {
        info: chrome.contextMenus.OnClickData
    }
}

export const contextMenusConfig: IContextMenusConfig = {
    order: [
        {
            id: 'number',
            title: 'Number'
        }
    ],
    bill: [
        {
            id: 'agentName',
            title: 'Agent Name'
        },
        {
            id: 'invoiceNumber',
            title: 'Invoice Number'
        }
    ]
};