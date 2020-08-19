import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoadingService {
    public inProgress$ = new BehaviorSubject(false);

  constructor() { }

  start(){
      this.inProgress$.next(true);
  }
  stop(){
      this.inProgress$.next(false);
  }
}
