import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppDialogService} from '../../../../dialog-module/services/app-dialog.service';
import {DialogComponent, IDialogEditorParameters} from '../../../../dialog-module/components/dialog-list/dialog.component';
import {DialogControl} from '../../../../dialog-module/components/dialog-controls/dialog-controls.component';
import {Quote, QuoteSection} from '../../../../../../../shared/Quotes';
import {QuoteEditorComponent} from '../../../../../components/editor/quote/quote-editor.component';
import {BehaviorSubject, Observable} from 'rxjs';

abstract class Observer<T> {
    protected observable$: Observable<T> ;
    protected behaviour$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    constructor(){
        this.observable$ = this.behaviour$.asObservable();
    }
}

@Component({
    selector: 'app-quotes-section',
    template: require('./section.component.html'),
    styles: [require('./section.component.scss')]
})
export class SectionComponent extends Observer<Quote[]> implements OnInit {
    @Input() section: QuoteSection;
    @Input() sectionKey: string;

    @Output() onRemove: EventEmitter<string> = new EventEmitter();

    dialogRef: MatDialogRef<DialogComponent>;


    constructor(
        private ref: ChangeDetectorRef,
        private dialog: AppDialogService
    ) {
        super();
        //this.items$ = this.section$.asObservable();
    }

    ngOnInit() {
        //this.behaviour$.next(Section.getItems(this.section.items));
    }

    removeQuote(item: Quote) {
        const index = this.section.items.indexOf(item);
        this.section.items.splice(index, 1);
        // this.ref.detectChanges();

        if (this.section.items.length === 0) {
            this.onRemove.emit();
        }

        if(this.dialogRef) {
            this.dialogRef.close();
            delete this.dialogRef;
        }
    }


    openQuote(item: Quote) {
        // this.zone.run(() => {
        // this.editor.openEditor(new EditableItem(Editables.quote, this.item));
        // });

        const parameters: IDialogEditorParameters = {
            title: 'Quote',
            disabled: true,
            component: QuoteEditorComponent,
            dialogControls: [
                new DialogControl('delete', () => {
                    this.removeQuote(item);
                })
            ],
            inputs: {
                item
            },
            outputs: {
                onRemove: this.removeQuote
            }
        };

        this.dialogRef = this.dialog.openEditor(parameters);

        // let dialogRef = this.dialog.open(DialogEditorComponent, {
        //     width: '90%',
        //     maxWidth: '90%',
        //     data: new EditableItem(Editables.quote, item)
        // });



        // this.dialog.open<any, any, EditableItem>(EditorComponent, {
        //     width: '480px',
        //     data: this.item,
        //     autoFocus: true,
        //     hasBackdrop: true
        // });

        //this.onEdit.emit();

        /*const dialogRef : MatDialogRef<EditableItem> = EditorService.openEditor(
            this.dialog,
            new EditableItem(Editables.quote, this.item)
        );

        dialogRef.afterClosed().subscribe(result => {

        });*/
    }
}
