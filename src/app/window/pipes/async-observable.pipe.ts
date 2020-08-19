import {Pipe, PipeTransform} from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Pipe({
  name: 'asyncObservable'
})
export class AsyncObservablePipe implements PipeTransform {

  transform(value: Observable<any>, args?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        value.subscribe((observer : Observer<any>) => {

        });
    });
  }

}
