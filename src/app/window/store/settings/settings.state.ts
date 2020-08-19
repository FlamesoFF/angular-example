import { Action, Selector, State, NgxsOnInit, StateContext } from '@ngxs/store';
import { ISettingsState, TSettingsContext, IBaseUrlConfig } from './settings.types';
import { SettingsActions } from './settings.actions';
import { AppStorage } from '../../../shared/Storage';
import { MatSnackBar } from '@angular/material';
// import env from '@/environments/environment';

const env = {
    production: false,
    auth: { ip: '192.168.2.22', port: '8081' },
    api:  { ip: '192.168.2.22', port: '8082' },
}

// const { api, auth } = env;

const configValid = ({ ip, port }: IBaseUrlConfig, type: string): boolean => {
    const notEmpty = !!(ip || port);
    const notDefault = ip != env[type].ip || port != env[type].port;
    return notEmpty && notDefault;
};

const trimConfig = ({ ip, port }: IBaseUrlConfig) => {
    const trimmed: IBaseUrlConfig = {};
    if (ip != '') trimmed.ip = ip;
    if (port != '') trimmed.port = port;
    return trimmed;
}

// const configNotDefault = (config: IBaseUrlConfig, type: string): boolean => {
//     const { ip, port } = config;
//     return ip != env[type].ip || port != env[type].port;
// };

@State<ISettingsState>({
    name: 'settings',
    defaults: {
        form: {
            dirty: false,
            status: '',
            errors: {},
            model: {
                api:  { ip: '', port: '' },
                auth: { ip: '', port: '' }
            }
        }
    }
})
export class SettingsState implements NgxsOnInit {

    constructor( private snackbar: MatSnackBar ) {}

    ngxsOnInit({ patchState, getState }: StateContext<ISettingsState>) {

        AppStorage.load('configApi').subscribe(savedConfig => {
            const { auth } = getState().form.model;
            const config = { ...env.api, ...savedConfig };
            // dispatch(new SettingsActions.SetApi(newConfig));
            patchState({ form: { model: { api: config, auth } } });
        });

        AppStorage.load('configAuth').subscribe(savedConfig => {
            const { api } = getState().form.model;
            const config = { ...env.auth, ...savedConfig };
            // dispatch(new SettingsActions.SetAuth(newConfig));
            patchState({ form: { model: { auth: config, api } } });
        });
    }

    // Selectors

    @Selector()
    static form(state: ISettingsState): any {
        return state.form;
    }


    // Actions

    // @Action(SettingsActions.SetApi)
    // setApi({ patchState, getState }: TSettingsContext, { config }: SettingsActions.SetApi) {
    //     if (configValid(config)) {
    //         const { auth } = getState().form.model;
    //         // AppStorage.save('configApi', config);
    //         patchState({ form: { model: { api: config, auth } } });
    //     }
    // }

    // @Action(SettingsActions.SetAuth)
    // setAuth({ patchState, getState }: TSettingsContext, { config }: SettingsActions.SetAuth) {
    //     if (configValid(config)) {
    //         const { api } = getState().form.model;
    //         // AppStorage.save('configAuth', config);
    //         patchState({ form: { model: { auth: config, api } } });
    //     }
    // }

    @Action(SettingsActions.Save)
    save({ patchState, getState }: TSettingsContext, { config }: SettingsActions.Save) {
        const { api, auth } = config;
        // const { form: { model: { api, auth } } } = getState();
        let model = {};
        if (configValid(api, 'api')) {
            model = { api };
            // patchState({ form: { model: { api: config, auth } } });
            AppStorage.save('configApi', trimConfig(api));
        }
        if (configValid(auth, 'auth')) {
            model = { ...model, auth };
            AppStorage.save('configAuth', trimConfig(auth));
        }

        patchState({ form: { model } });
        this.snackbar.open('Settings saved.', 'OK');
    }

    @Action(SettingsActions.Reset)
    reset({ patchState }: TSettingsContext) {
        const { api, auth } = env;
        const model = { api, auth };
        patchState({ form: { model } });
        AppStorage.remove('configApi');
        AppStorage.remove('configAuth');
        this.snackbar.open('Settings reset and saved.', 'OK', {});
    }

}