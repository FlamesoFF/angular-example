import { BackgroundApp } from './app';
import { BehaviorSubject } from 'rxjs';
import { appMessenger, NMessagePayloads } from 'src/app/shared/AppMessenger';

window['threadData'] = new BehaviorSubject(<NMessagePayloads.IThreadInfo>{})

export const isAppLaunched = false;
// Running the background script!
BackgroundApp.run();


appMessenger.on('THREAD_CHANGE', payload => {
    console.log('Fired: THREAD_CHANGE');

    window['threadData'].next(payload)
});