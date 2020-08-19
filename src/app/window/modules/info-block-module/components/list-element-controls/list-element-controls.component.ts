import {Component, Input, OnInit} from '@angular/core';
import {DialogListElementControls} from '../../../../shared/Dialog';

@Component({
    selector: 'app-list-element-controls',
    template: require('./list-element-controls.component.html'),
    styles: [require('./list-element-controls.component.scss')]
})
export class ListElementControlsComponent implements OnInit {
    @Input() controls: DialogListElementControls;

    constructor() {
    }

    ngOnInit() {
    }

    click($event: MouseEvent, fn: Function){
        if(fn) {
            fn();
        }

        $event.stopPropagation();
    }
}
