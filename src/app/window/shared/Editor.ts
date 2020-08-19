import {Quote} from './Quotes';
import {Comment} from './Comments';

export enum EDITABLES {
    quote = 'quote',
    comment = 'comment'
}

export interface IEditableItemContent {
    author: string
    text: string
}

export class EditableItem {
    constructor(
        public type: EDITABLES,
        public content: IEditableItemContent
    ) {
    }
}