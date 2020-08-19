import { Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, ViewChild, ContentChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppAttachment } from '../../../../../../shared/AppAttachments';
import { AppControlPanel } from '../../../../../../shared/Buttons';
import { Comment } from '../../../../../../shared/Comments';
import { Quote } from '../../../../../../shared/Quotes';
import { DynamicComponentDirective } from '../../../../directives/dynamic-component.directive';
import { DialogControl } from '../dialog-controls/dialog-controls.component';

@Component({
    selector: 'app-dialog',
    template: require('./dialog.component.html'),
    styles: [require('./dialog.component.scss')]
})
export class DialogComponent implements AfterViewInit, OnDestroy {
    @ViewChild(DynamicComponentDirective, { static: false }) container: DynamicComponentDirective


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogParameters,
        private resolver: ComponentFactoryResolver
    ) {
    }


    ngAfterViewInit() {
        const componentFactory = this.resolver.resolveComponentFactory(<any>this.data.component);

        this.container.viewContainerRef.clear();

        const componentRef = this.container.viewContainerRef.createComponent(componentFactory);
        const componentInstance = componentRef.instance;

        if (this.data.inputs) {
            Object.entries(this.data.inputs).forEach(entry => {
                componentInstance[entry[0]] = entry[1];
            });
        }
        if (this.data.outputs) {
            Object.entries(this.data.inputs).forEach(entry => {
                componentInstance[entry[0]] = entry[1];
            });
        }

        componentRef.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
    }
}

export interface IDialogParameters {
    title: string;
    component: any;
    disabled?: boolean;
    dialogControls?: DialogControl[];
    controlPanel?: AppControlPanel;
    inputs?: {
        [key: string]: any
    };
    outputs?: {
        [key: string]: any
    };
}

export interface IDialogEditorParameters extends IDialogParameters {
    inputs?: {
        item: Quote | Comment | AppAttachment
        [key: string]: any
    };
}