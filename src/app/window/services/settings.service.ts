import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class SettingsService {
    constructor() {}

    public devMode$: Observable<boolean> = new Observable(observer => {

    });
}
