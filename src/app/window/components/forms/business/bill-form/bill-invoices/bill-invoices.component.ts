import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-bill-invoices',
    template: require('./bill-invoices.component.html'),
    styles: [require('./bill-invoices.component.scss')]
})
export class BillInvoicesComponent implements OnInit {
    @Input() list : string[];

    private separators = /[,\. ]/;
    private selectable = true;
    private removable = true;
    private addOnBlur = true;

    constructor() {
    }

    ngOnInit() {
    }

    remove(invoice){

    }
}
