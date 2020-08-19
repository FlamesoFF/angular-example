import {EditableItem} from '../../../../../shared/Editor';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DialogComponent, IDialogEditorParameters, IDialogParameters} from '../components/dialog-list/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogEditorComponent} from '../components/dialog-editor/dialog-editor.component';

@Injectable()
export class AppDialogService {
    opened$: Observable<boolean>;
    private _opened$: BehaviorSubject<boolean>;
    private data : Subject<EditableItem> = new Subject<EditableItem>();
    private data$  = this.data.asObservable();

    constructor(private dialog: MatDialog) {

        this._opened$ = new BehaviorSubject(false);
        this.opened$ = this._opened$.asObservable();
    }

    openList(parameters: IDialogParameters) : MatDialogRef<DialogComponent> {
        return this.dialog.open<any, IDialogParameters>(DialogComponent, {
            width: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            panelClass: 'app-mat-dialog',
            data: parameters
        });
    }

    openEditor(parameters: IDialogEditorParameters) : MatDialogRef<DialogComponent> {
        return this.dialog.open<any, IDialogEditorParameters>(DialogComponent, {
            width: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            panelClass: 'app-mat-dialog',
            data: parameters
        });
    }

    close() {
        this._opened$.next(false);
    }

    private updateData(item: EditableItem) {
        this.data.next(item);
    }

    onUpdate(): Observable<EditableItem> {
        return this.data$;
    }
}
