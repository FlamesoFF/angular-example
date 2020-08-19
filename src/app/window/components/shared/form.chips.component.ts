import { COMMA, SPACE } from "@angular/cdk/keycodes";
import { Component, Input, Output } from "@angular/core";
import { MatFormFieldControl } from "@angular/material/form-field";
import { Observable, Subject } from "rxjs";
import { FormGroup, FormControl, NgControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";

@Component({
    selector: 'test-component',
    template: require('./form.chips.component.html'),
    styles: [],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: FormChipsComponent
        }
    ]
})
export class FormChipsComponent<T> implements MatFormFieldControl<T> {
    stateChanges: Observable<void>;
    placeholder: string;
    setDescribedByIds(ids: string[]): void {
        throw new Error("Method not implemented.");
    }
    onContainerClick(event: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    @Output() value: T;
    id: string;
    ngControl: NgControl;
    focused: boolean;
    empty: boolean;
    shouldLabelFloat: boolean;
    required: boolean;
    disabled: boolean;
    errorState: boolean;
    controlType?: string;
    autofilled?: boolean;

    formGroup = new FormGroup({
        chipInput: new FormControl()
    });
}