import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mapValues'
})
export class MapValuesPipe implements PipeTransform {

    transform(map: Map<any, any>, args?: any): Iterable<any> {
        return Array.from(map.values());
    }

}
