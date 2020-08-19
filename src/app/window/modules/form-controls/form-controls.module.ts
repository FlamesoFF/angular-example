import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlsComponent} from './components/form-controls/form-controls.component';
import {ControlButtonComponent} from './components/form-controls/control-button/control-button.component';
import {PipesModule} from '../pipes-module/pipes.module';
import {AppMaterialModule} from '../app-material.module';

@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        AppMaterialModule
    ],
    exports: [
        FormControlsComponent,
        ControlButtonComponent
    ],
    declarations: [
        FormControlsComponent,
        ControlButtonComponent
    ]
})
export class FormControlsModule {
}
