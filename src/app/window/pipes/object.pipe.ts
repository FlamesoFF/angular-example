import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'object'
})
export class ObjectPipe implements PipeTransform {

    transform(object: Object, args?: any): Object[] {
        return Object.values(object);

        //     object[Symbol.iterator] = function* () {
        //         let keys: string[] = Object.keys(this);
        //
        //         for (let i = 0; i < keys.length; i++) {
        //             yield this[keys[i++]];
        //         }
        //     };
        // }
    }

}
