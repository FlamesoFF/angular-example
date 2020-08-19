import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Quotes } from '../../../../../../shared/Quotes';


@Component({
    selector: 'app-quotes',
    template: require('./quotes.component.html'),
    styles: [require('./quotes.component.scss')]
})
export class QuotesComponent implements OnInit, OnChanges {
    @Input() quotes: Quotes;
    // @Input() onClear: EventEmitter<any>;


    constructor(
        private ref: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        // this.onClear.subscribe(result => {
        //     this.clearAll();
        // });

        // setInterval(() => {
        //     this.addQuote('test', this.quotes.sections['Message subject one here']);
        // }, 1000)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.quotes) {
            console.log(changes)
        }
    }

    removeSection(sectionKey: string): void {
        this.quotes.sections.forEach((item, index) => {
            if (item[0] === sectionKey) {
                this.quotes.sections.splice(index, 1);
                //this.ref.detectChanges();
            }
        });

        // delete this.quotes.sections[sectionKey];
    }


    // clearAll() {
    //     Object.keys(this.quotes.sections).forEach(key => {
    //         delete this.quotes.sections[key];
    //     });
    // }
}
