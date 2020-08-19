import { StateContext } from "@ngxs/store";

export interface IAuthStateModel {
    token?: string
}

export type TAuthContext = StateContext<IAuthStateModel>;

export interface IAuthUser {
    _id: string;
    id: string;
    name: string;
    login: string;
    email: string;
    roles: string[];
    organization: string;
    occupation: string;
    country: string;
    nationality: string[];
    phone: string;
    sms_notifications_enabled: boolean;
    avatar: any;
    time: number;
    type: string[];
    iat: number;
    exp: number;
}
