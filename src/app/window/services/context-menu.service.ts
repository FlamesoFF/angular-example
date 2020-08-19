import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { appMessenger } from '../../shared/AppMessenger';

@Injectable()
export class ContextMenuService {
    private handler = new Subject();

    constructor() {
    }

    updateContextMenu(form: string) {
        appMessenger.send({
            type: 'TAB_CHANGE',
            payload: {form}
        });
    }
}
