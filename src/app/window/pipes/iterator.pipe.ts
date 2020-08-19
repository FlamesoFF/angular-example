import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterator'
})
export class IteratorPipe implements PipeTransform {
    cache: any[] = [];

    transform(iterator: IterableIterator<any>, args?: any): Iterable<any> {
        this.cache.splice(0, this.cache.length);
        this.cache = this.cache.concat( Array.from(iterator) );

        return this.cache;
    }

}
