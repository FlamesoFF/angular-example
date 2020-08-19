import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBusinessForm } from '../../../../shared/AppBusinessForm';
import { AppControlPanel } from '../../../../shared/Buttons';

@Component({
    selector: 'company-form',
    template: require('./company-form.component.html'),
    styles: [require('./company-form.component.scss')]
})
export class CompanyFormComponent extends AppBusinessForm implements OnInit {
    protected data: import("../../../../shared/AppBusinessForm").AppFormData<any, any, any, any, any, any, any>;
    formGroup = new FormGroup({});
    observableData: null;
    controls : AppControlPanel;
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
