import {Component, OnInit} from '@angular/core';
import {AppBusinessForm} from '../../../../shared/AppBusinessForm';
import {AppControlButton} from '../../../../shared/Buttons';
import {FormGroup} from '@angular/forms';
import {AppControlPanel} from '../../../../shared/Buttons';

export enum ControlButtons {
    create = 'Create',
    update = 'Update',
    clear = 'Clear'
}

@Component({
    selector: 'person-form',
    template: require('./person-form.component.html'),
    styles: [require('./person-form.component.scss')]
})
export class PersonFormComponent extends AppBusinessForm implements OnInit {
    formGroup = new FormGroup({});
    observableData = {};
    controls: AppControlPanel;
    extractors = {};

    constructor() {
        super();
    }

    ngOnInit() {
    }

    initializeDataSources(){}

    protected prepareDataToSend() {
    }
}
