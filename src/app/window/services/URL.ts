import { Store, Select } from '@ngxs/store';
import {
    ISettingsState,
    ISettingsForm,
    ISettingsFormModel,
} from '../store/settings/settings.types';
import { SettingsState } from '../store/settings/settings.state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const host = 'http://192.168.2.22';
const ports = {
    auth: 8081,
    data: 8082,
};
const version = 'v3';

export enum ENDPOINTS_DEV {
    attachments = 'attachments/fd',
    invoices = 'invoices',
}

export const DEV_ROLES = new Set([
    // 'manager',
    'administrator',
    'developer',
]);

@Injectable()
export class UrlService {
    @Select(SettingsState.form) settings$: Observable<ISettingsForm>;

    private static hosts: ISettingsFormModel = {};

    constructor( private store: Store ) {
        this.settings$.subscribe(( form: ISettingsForm ) => {
            if ( !form ) return;
            const { api, auth } = form.model;

            UrlService.hosts.api = api;
            UrlService.hosts.auth = auth;
        });
    }

    static get authHost() {
        const { ip, port } = this.hosts.auth;
        // return `http://${ip}:${port}/${version}`;
        return `http://${ ip }:${ port }/v2`;
    }

    get dataHost() {
        const { ip, port } = UrlService.hosts.api;
        return `https://${ ip }:${ port }/${ version }`;
    }

    Auth = {
        get base() {
            return `${ UrlService.authHost }/users`;
        },

        getAuthenticationUrl: ( userId: string ): string =>
            `${ this.Auth.base }/${ userId }/sign-in`
    }

    Companies = {
        base: () => {
            return `${ this.dataHost }/companies`;
        }
    }
    Persons = {
        base: () => {
            return `${ this.dataHost }/persons`;
        }
    };

    Files = {
        base: () => {
            return `${ this.dataHost }/attachments`;
        },

        getRelationsUrl: ( fileId: string ) =>
            `${ this.Files.base }/${ fileId }/relations`,

        getDownloadUrl: ( fileId: string ) => `${ this.Files.base }/${ fileId }`,

        getRemoveUrl: ( fileId: string, entityId: string ) =>
            `${ this.Files.base }/${ fileId }/${ entityId }`
    };

    Orders = {
        base: () => {
            return `${ this.dataHost }/orders`;
        },

        getUpdateUrl: ( orderId: string ) => `${ this.Orders.base }/${ orderId }`
    };

    Entities = {
        base: () => `${ this.dataHost }/entities`,

        getEntityAttachmentsUrl: ( entityId: string ) =>
            `/${ this.Entities.base }/${ entityId }/attachments`,

        Contact: {
            getAssignUrl: ( clientId: string ) =>
                `${ this.Entities.base }/${ clientId }/contacts`,
        }
    };

    Relations = {
        ofEntity: (
            entityClass: string,
            entityId: string
        ) => `${ this.dataHost }/${ entityClass }/${ entityId }/relations`
    }

    Couriers = {
        base: () => `${ this.dataHost }/couriers`
    };

    Contacts = {
        base: () => `${ this.dataHost }/contacts`
    };
}

// export namespace Url {
//     export namespace Common {
//         export const entities = `${host}:${ports.data}/${version}/${
//             ENDPOINTS.entities
//         }`;
//         export const persons = `${host}:${ports.data}/${version}/${
//             ENDPOINTS.persons
//         }`;
//         export const companies = `${host}:${ports.data}/${version}/${
//             ENDPOINTS.companies
//         }`;
//         export const orders = `${host}:${ports.data}/${version}/${
//             ENDPOINTS.orders
//         }`;
//         export const files = `${host}:${ports.data}/${version}/${
//             ENDPOINTS.files
//         }`;
//         export const users = `${host}:${ports.auth}/${version}/${
//             ENDPOINTS.users
//         }`;
//     }

//     export namespace Auth {
//         export const getAuthenticationUrl = (userId: string): string =>
//             `${Common.users}/${userId}/sign-in`;
//     }

//     export namespace Contact {
//         export const getAssignUrl = (clientId: string) =>
//             `${Common.entities}/${clientId}/contacts`;
//     }

//     export namespace Companies {}

//     export namespace Persons {}

//     export namespace Files {
//         export const getRelationsUrl = (fileId: string) =>
//             `${Common.files}/${fileId}/relations`;

//         export const getDownloadUrl = (fileId: string) =>
//             `${Common.files}/${fileId}`;

//         export const getRemoveUrl = (fileId: string, entityId: string) =>
//             `${Common.files}/${fileId}/${entityId}`;
//     }

//     export namespace Orders {
//         export const getUpdateUrl = (orderId: string) =>
//             `${Common.orders}/${orderId}`;
//     }

//     export namespace Entities {
//         export const getEntityAttachmentsUrl = (entityId: string) =>
//             `/${Common.entities}/${entityId}/attachments`;
//     }
// }
