import { filter } from "rxjs/operators";
import { MonoTypeOperatorFunction } from "rxjs";
import check from 'check-types';

export namespace Filter {
    export const strings: MonoTypeOperatorFunction<string> = filter(v => check.string(v))
    export const objects: MonoTypeOperatorFunction<object> = filter(v => check.object(v))
}