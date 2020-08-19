import { NMessagePayloads } from "../../shared/AppMessenger";
import { IAppStateModel } from "@/app/window/store/app.types";


export namespace AppActions {
    export class Preload {
        static readonly type = `[App] preload`;
        constructor(public state: IAppStateModel) { }
    }

    export class UpdateGmailInfo {
        static readonly type = `[App] gmailUpdate`;
        constructor(public threadData: NMessagePayloads.IThreadInfo) { }
    }

    export class SetProgress {
        static readonly type = `[App] setProgress`;
        constructor(public progress: boolean) { }
    }

    export class SetSettingsState {
        static readonly type = `[App] SetSettingsState`;
        constructor(public state: boolean) { }
    }
}
