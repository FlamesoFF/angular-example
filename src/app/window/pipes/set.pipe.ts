import {Pipe, PipeTransform} from '@angular/core';
import {Quote} from '../shared/Quotes';

@Pipe({
    name: 'set'
})
export class SetPipe implements PipeTransform {

    transform(set: Set<any>, args?: any): void {
        set[Symbol.iterator] = function *() {
            let array : any[] = Array.from(this.values());

            for (let i = 0; i < array.length; i++) {
                yield array[i];
            }
        };


        // return Array.from(set.values());
    }

}
