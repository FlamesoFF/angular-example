import {Component, Input, OnInit} from '@angular/core';
import {DialogControl} from '../dialog-controls/dialog-controls.component';

@Component({
  selector: 'app-dialog-toolbar',
  template: require('./dialog-toolbar.component.html'),
  styles: [require('./dialog-toolbar.component.scss')]
})
export class DialogToolbarComponent implements OnInit {
    @Input() title: string;
    @Input() controls: DialogControl[];

  constructor() { }

  ngOnInit() {
  }

}
