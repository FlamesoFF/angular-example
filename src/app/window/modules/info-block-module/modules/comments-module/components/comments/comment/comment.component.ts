import {Component, EventEmitter, Input, OnInit, Output, Inject} from '@angular/core';
import {Comment} from '../../../../../../../shared/Comments';
import {Observable} from 'rxjs';
import {DateTimeService} from '../../../../../../../services/datetime.service';
import {DialogListElementControl, DialogListElementControls} from '../../../../../../../shared/Dialog';
import { AppStorage } from '../../../../../../../../shared/Storage';

@Component({
    selector: 'app-comment-item',
    template: require('./comment.component.html'),
    styles: [require('./comment.component.scss')]
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;

    @Output() onDelete: EventEmitter<void> = new EventEmitter();
    @Output() onEdit: EventEmitter<void> = new EventEmitter();

    controls: DialogListElementControls;
    authority$: Observable<boolean>;

    constructor(
        @Inject(DateTimeService) public date: DateTimeService
    ) {

    }

    ngOnInit() {
        this.authority$ = new Observable(observer => {
            AppStorage.load<AppStorage.TUser>('user')
                .subscribe((user) => {
                    observer.next(this.comment.user._id === user._id);
                });
        });

        this.controls = new DialogListElementControls([
            new DialogListElementControl({
                icon: 'edit',
                presence: this.authority$,
                onClick: () => {
                    this.edit();
                }
            }),
            new DialogListElementControl({
                icon: 'delete',
                presence: this.authority$,
                onClick: () => {
                    this.remove();
                }
            })
        ]);
    }

    edit() {
        this.onEdit.emit();
    }

    remove() {
        this.onDelete.emit();
    }

    // toggleMode() {
    //     this.editMode = !this.editMode;
    // }

    getFormattedDate(dateStr: string) {
        return this.date.formatQuoteDate(new Date(Date.parse(dateStr)));
    }
}
