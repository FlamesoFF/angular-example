import { Component, Input, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
    selector: 'app-developer-info',
    template: require('./developer-info.component.html'),
    styles: [require('./developer-info.component.scss')]
})
export class DeveloperInfoComponent implements OnInit {
    @Input('title') title: string;

    constructor(
        @Inject(SettingsService) private settings: SettingsService,
    ) {
    }

    ngOnInit() {
    }

}
