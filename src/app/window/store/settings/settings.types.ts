import { IStoreForm } from "../app.types";
import { StateContext } from "@ngxs/store";

export interface ISettingsState {
    form: ISettingsForm
}

export interface ISettingsForm extends IStoreForm {
    model: ISettingsFormModel
}

export interface ISettingsFormModel {
    api?: IBaseUrlConfig;
    auth?: IBaseUrlConfig;
}

export interface IBaseUrlConfig {
    ip?: string;
    port?: string;
}

export type TSettingsContext = StateContext<ISettingsState>;