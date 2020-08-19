import { Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-drag-n-drop',
    template: require('./drag-n-drop.component.html'),
    styles: [require('./drag-n-drop.component.scss')]
})
export class DragNDropComponent implements OnInit {
    @Output() onDrop = new EventEmitter<File>();

    private dragging: boolean = false;

    constructor(
        private element: ElementRef
    ) {
        this.hide();
    }

    ngOnInit() {
    }


    @HostListener('document:dragover', ['$event'])
    dragOverHandler = ($event: DragEvent) => {
        $event.preventDefault();
        this.show();
    };

    @HostListener('document:dragleave', ['$event'])
    dragLeaveHandler = ($event: DragEvent) => {
        $event.preventDefault();
        this.hide();
    };

    @HostListener('document:drop', ['$event'])
    dropHandler = ($event: DragEvent) => {
        $event.preventDefault();

        const file = $event.dataTransfer.files[0];

        // this.appMessenger.send(APP_EVENT_TYPES.fileDrop, file);

        this.onDrop.emit(file);

        this.hide();
    };

    private show() {
        this.element.nativeElement.style.display = 'flex';
    }

    private hide() {
        this.element.nativeElement.style.display = 'none';
    }
}
