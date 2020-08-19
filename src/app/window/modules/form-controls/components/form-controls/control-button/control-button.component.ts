import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppControlButton} from '../../../../../shared/Buttons';

@Component({
    selector: 'control-button',
    template: require('./control-button.component.html'),
    styles: [require('./control-button.component.scss')]
})
export class ControlButtonComponent implements OnInit {
    @Input() button: AppControlButton;
    @Input() formGroup: FormGroup;
    @Output() onClick: EventEmitter<any>;

    // Dynamic behavior
    @Input() controller: EventEmitter<boolean> = new EventEmitter();

    // private presence: boolean = true;

    constructor() {
        this.onClick = new EventEmitter<any>();
    }

    ngOnInit() {
        //this._presence.next(this.presence);

        // this.controller.subscribe((result: boolean) => {
        //     this.presence = result;
        // });
    }

    click(){
        this.onClick.emit();
    }
}