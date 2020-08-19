import { Observable, Observer, Subject, Subscription } from 'rxjs';


// Interfaces
export type TAppControlPanelButtons<T> = {
    [K in keyof T]: AppControlButton
}

export class AppControlButton {
    private controller: Subject<boolean> = new Subject();
    public presence$?: Observable<boolean>;

    constructor(
        public text: string,
        public onClick: Function,
        public state?: {
            initialValue: boolean,
            watcher$: (observer: Observer<boolean>) => void
        }
    ) {
        if (this.state) {
            this.presence$ = new Observable(observer => {
                observer.next(this.state.initialValue);
                return state.watcher$(observer);
            });
        }

        this.controller.next(true);
    }

    enable() {
        this.controller.next(true);
    }

    disable() {
        this.controller.next(false);
    }
}

export class AppControlPanel<T = any> {
    constructor(public buttons: TAppControlPanelButtons<T>) {
        this.buttons = buttons;
        // Builder.build(this, buttons);
    }
}