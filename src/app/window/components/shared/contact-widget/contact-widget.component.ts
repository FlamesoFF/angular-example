import { Component, Input, Output } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngxs/store";
import { ContactState } from 'src/app/window/store/contact/contact.state';

@Component({
    selector: 'contact-widget',
    template: require('./contact-widget.component.html'),
    styles: [],
})
export class ContactWidgetComponent {

  contact$: any;

  constructor (private store: Store) {
    this.contact$ = this.store.select(state => state.contact.form.model)
  }

}