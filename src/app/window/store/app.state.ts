
import { Action, Selector, State } from '@ngxs/store';
import { AppActions } from './app.actions';
import { IAppStateModel, TAppContext } from './app.types';


@State<IAppStateModel>({
    name: 'app',
    defaults: {
        threadId: '',
        subject: '',
        contact: {
            name: '',
            emailAddress: ''
        },
        messageId: '',
        messageRecepients: [],
        progress: false,
        settingsActive: false
    },
})
export class AppState {
    @Selector()
    static progress(state: IAppStateModel): boolean {
        return state.progress;
    }
    @Selector()
    static threadId(state: IAppStateModel): string {
        return state.threadId;
    }
    @Selector()
    static settingsActive(state: IAppStateModel): boolean {
        return state.settingsActive;
    }


    @Action(AppActions.UpdateGmailInfo)
    gmailUpdate({ patchState }: TAppContext, action: AppActions.UpdateGmailInfo) {
        const {
            threadId,
            subject,
            contact
        } = action.threadData;

        patchState({
            threadId,
            subject,
            contact
        });
    }

    @Action(AppActions.SetProgress)
    setLoadingState({ patchState }: TAppContext, action: AppActions.SetProgress) {
        patchState({ progress: action.progress || false });
    }

    @Action(AppActions.SetSettingsState)
    setSettingsState({ patchState }: TAppContext, action: AppActions.SetSettingsState) {
        patchState({ settingsActive: action.state });
    }
}