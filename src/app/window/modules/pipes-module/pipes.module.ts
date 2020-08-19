import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IteratorPipe } from '../../pipes/iterator.pipe';
import { MapValuesPipe } from '../../pipes/map-values.pipe';
import { ObjectPipe } from '../../pipes/object.pipe';
import { SetPipe } from '../../pipes/set.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        // Pipes
        MapValuesPipe,
        SetPipe,
        IteratorPipe,
        ObjectPipe
    ],
    exports: [
        // Pipes
        MapValuesPipe,
        SetPipe,
        IteratorPipe,
        ObjectPipe
    ]
})
export class PipesModule {
}
