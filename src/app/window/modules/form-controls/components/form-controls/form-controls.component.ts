import {Component, EventEmitter, Host, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppFormGroup} from '../../../../shared/AppBusinessForm';
import {BehaviorSubject} from 'rxjs';
import {AppControlButton, AppControlPanel} from '../../../../shared/Buttons';

// Types
export type TControlButton = 'create' | 'update' | 'clear' | 'delete';




// Classes


// Component
@Component({
    selector: 'app-form-controls',
    template: require('./form-controls.component.html'),
    styles: [require('./form-controls.component.scss')]
})
export class FormControlsComponent implements OnInit {
    @Host() private appForm: AppFormGroup;
    @Input() formGroup?: FormGroup;
    @Input() controlPanel?: AppControlPanel;

    // private _buttons : [ControlButtons, AppControlButton][];

    // @Output() create?: EventEmitter<any> = new EventEmitter();
    //create?: AppControlButton;

    constructor() {
    }

    ngOnInit() {
        //this._buttons = Array.from(this.buttons.entries());

        // this.watchers.buttons.splice(0, this.watchers.buttons.length);
        // this.watchers.buttons = this.watchers.buttons.concat( Array.from(this.buttons.entries()) );
    }

    private onCreate() {
        //this.create.emitter.emit();
    }

    // private onUpdate() {
    //     this.update.emit();
    // }
    //
    // private onDelete() {
    //     this.delete.emit();
    // }
    //
    // private onClear() {
    //     this.clear.emit();
    // }

    getValidity() {
        const $validity = new BehaviorSubject(false);

        if (this.formGroup) {
            $validity.next(this.formGroup.valid);

            return this.formGroup.valid;
        }
        else {
            return true;
        }
    }
}
