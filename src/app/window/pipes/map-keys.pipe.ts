import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'map'
})
export class MapKeysPipe implements PipeTransform {

    transform(map: Map<any, any>, args?: any): Iterable<any> {
        return Array.from(map.keys());
    }
}
