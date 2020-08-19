import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-dialog-controls',
    template: require('./dialog-controls.component.html'),
    styles: [require('./dialog-controls.component.scss')]
})
export class DialogControlsComponent implements OnInit {
    @Input() controls: DialogControl[]

    constructor() {
    }

    ngOnInit() {
    }

}

export class DialogControl {
    constructor(
        private icon: string,
        private onClick: () => void
    ) {
    }
}