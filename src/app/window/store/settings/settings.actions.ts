import { IBaseUrlConfig, ISettingsFormModel } from './settings.types';

export namespace SettingsActions {

    export class SetApi {
        static readonly type = `[Settings] SetApi`;
        constructor( public config: IBaseUrlConfig ) { }
    }

    export class SetAuth {
        static readonly type = `[Settings] SetAuth`;
        constructor( public config: IBaseUrlConfig ) { }
    }

    export class Save {
        static readonly type = `[Settings] Save`;
        constructor( public config: ISettingsFormModel ) { }
    }

    export class Reset {
        static readonly type = `[Settings] Reset`;
        constructor() { }
    }

}