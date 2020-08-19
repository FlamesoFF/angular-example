import {Observable} from 'rxjs';

export class DialogListElementControl {
    icon: string;
    onClick: (item: any) => void;
    presence?: Observable<boolean>;

    constructor(parameters: {
        icon: string
        onClick: (item: any) => void
        presence?: Observable<boolean>
    }){
        Object.assign(this, parameters);
    }
}

export class DialogListElementControls {
    constructor(public items: DialogListElementControl[]) {
        // if (items) {
        //     this.items = items;
        // }
    }
}