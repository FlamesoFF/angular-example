import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Quote} from '../../../../../../../../shared/Quotes';

@Component({
    selector: 'app-quote-item',
    template: require('./quote.component.html'),
    styles: [require('./quote.component.scss')]
})
export class QuoteComponent implements OnInit {
    @Input() item: Quote;

    @Output() onRemove: EventEmitter<Quote> = new EventEmitter<Quote>();

    //@Output() onEdit: EventEmitter<Quote> = new EventEmitter<Quote>();

    constructor(
        private zone: NgZone
    ) {
    }

    ngOnInit() {
    }

    open(){

    }

    remove() {
        this.onRemove.emit();
    }
}
