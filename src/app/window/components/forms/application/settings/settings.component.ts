import { SettingsActions } from '@/app/window/store/settings/settings.actions';
import { IBaseUrlConfig, ISettingsForm, ISettingsFormModel } from '@/app/window/store/settings/settings.types';
import env from '@/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators as V } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppFormGroup } from '../../../../shared/AppBusinessForm';
import { ROUTES } from '../../../../shared/constants';
import { AppActions } from '../../../../store/app.actions';
import { AuthState } from '../../../../store/auth/auth.state';
import { SettingsState } from '../../../../store/settings/settings.state';
// import env from '@/environments/environment'

@Component({
    template: require('./settings.component.html'),
    styles: [require('./settings.component.scss')]
})
export class SettingsComponent implements OnInit {
    // env = env || {};

    public env = env || {
        production: false,
        api: { ip: '192.168.2.22', port: '8082' },
        auth: { ip: '192.168.2.22', port: '8081' }
    };

    public ipRegex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

    $configFileName: BehaviorSubject<string>;

    @Select(AuthState.authorized) authorized$: Observable<string>;
    @Select(SettingsState.form) settings$: Observable<ISettingsForm>;


    get api$(): Observable<IBaseUrlConfig> {
        return this.settings$.pipe(
            map(form => form && form.model.api)
        );
    }
    get auth$(): Observable<IBaseUrlConfig> {
        return this.settings$.pipe(
            map(form => form && form.model.auth)
        );
    }

    formGroup = new AppFormGroup({
        auth: new FormGroup({
            ip: new FormControl('', [V.pattern(this.ipRegex), V.required]),
            port: new FormControl('', [V.min(1024), V.max(65535), V.required]),
        }),
        api: new FormGroup({
            ip: new FormControl('', [V.pattern(this.ipRegex), V.required]),
            port: new FormControl('', [V.min(1024), V.max(65535), V.required]),
        }),
    });

    constructor(
        private snack: MatSnackBar,
        private router: Router,
        private store: Store
    ) {
        this.$configFileName = new BehaviorSubject('');

        store.dispatch(new AppActions.SetSettingsState(true));

        this.store
            .select(state => state.settings.form.model)
            .subscribe((model: ISettingsFormModel) => {
                console.log(model);
                // tslint:disable-next-line:forin
                for (const prop in model) {
                    const { ip, port } = model[prop];
                    this.formGroup.patchValue({ [prop]: { ip, port } });
                    this.formGroup.controls[prop].setErrors(null)
                }
            });
    }

    public saveAll() {
        const auth = this.formGroup.get('auth').value;
        const api = this.formGroup.get('api').value;
        console.log(this.formGroup.valid, { auth, api })
        this.store.dispatch(new SettingsActions.Save({ auth, api }));
    }

    public reset() {
        this.store.dispatch(new SettingsActions.Reset());
    }


    // private updateConfigFileName(fileName: string): void {
    //     try {
    //         this.$configFileName.next(fileName);
    //     } catch (error) {
    //         this.$configFileName.next("Unable to get file name");
    //     }
    // }

    // private openSaveDialog(file: File) {
    //     const url = URL.createObjectURL(file);
    //     let id: number;

    //     chrome.downloads.download(
    //         {
    //             url,
    //             filename: file.name,
    //             saveAs: true
    //         },
    //         (downloadId: number) => {
    //             id = downloadId;
    //             URL.revokeObjectURL(url);
    //         }
    //     );

    //     chrome.downloads.onChanged.addListener(downloadDelta => {
    //         console.log(downloadDelta);
    //         try {
    //             if (
    //                 downloadDelta.id === id &&
    //                 downloadDelta.state.current === "complete"
    //             ) {
    //                 this.snack.open("Configuration saved successfully", null, {
    //                     duration: 2000
    //                 });
    //             }
    //         } catch (error) { }
    //     });
    // }

    ngOnInit() {
        //     this.load();
    }

    // save(): void {
    //     const config: IAppConfiguration = this.formGroup.value;

    //     // config.devMode = this.formGroup.controls.devMode;

    //     config.windowWidth = window.outerWidth;
    //     config.windowHeight = window.outerHeight;
    //     config.windowOffsetX = window.screenX;
    //     config.windowOffsetY = window.screenY;

    //     this.formGroup.patchValue({
    //         windowOffsetX: config.windowOffsetX,
    //         windowOffsetY: config.windowOffsetY,
    //         windowWidth: config.windowWidth,
    //         windowHeight: config.windowHeight
    //     });

    //     AppStorage.save('configuration', config);
    // }

    // load(): void {
    //     AppStorage.load<IAppConfiguration>('configuration')
    //         .subscribe(config => {
    //             this.formGroup.setValue(config);
    //         });
    // }

    // async readFromFile(fileInput: HTMLInputElement): Promise<any> {
    //     const fr = new FileReader();
    //     const file = fileInput.files[0];

    //     if (file) {
    //         return new Promise((resolve, reject) => {
    //             fr.addEventListener("loadend", event => {
    //                 const content = fr.result as string;

    //                 this.updateConfigFileName(file.name);

    //                 const config: IAppConfiguration = JSON.parse(content);

    //                 this.formGroup.reset();
    //                 this.formGroup.patchValue(config);

    //                 this.snack.open("Configuration loaded successfully", null, {
    //                     duration: 2000
    //                 });
    //                 resolve();
    //             });

    //             fr.readAsText(file);
    //         });
    //     }
    // }

    // static async updateWindowPosition(config: IAppConfiguration) {
    //     await new Promise((resolve, reject) => {
    //         chrome.windows.getCurrent(null, window => {
    //             chrome.windows.update(window.id, {
    //                 left: config.windowOffsetX,
    //                 top: config.windowOffsetY,
    //                 width: config.windowWidth,
    //                 height: config.windowHeight
    //             });

    //             resolve();
    //         });
    //     });
    // }

    // async writeToFile() {
    //     const encoder: TextEncoder = new TextEncoder();
    //     const configuration: IAppConfiguration = this.formGroup.value;

    //     const data: string = JSON.stringify(<IAppConfiguration>(
    //         this.formGroup.value
    //     ));
    //     const ui8arr: Uint8Array = encoder.encode(data);

    //     const file = new File(
    //         [<ArrayBuffer>ui8arr.buffer],
    //         "configuration.json",
    //         {
    //             type: "application/json"
    //         }
    //     );

    //     this.openSaveDialog(file);
    // }

    close() {
        this.authorized$.subscribe(data => {
            if (data) {
                this.router.navigateByUrl(ROUTES.contact);
            }
            else {
                this.router.navigateByUrl(ROUTES.login);
            }
        });

        this.store.dispatch(new AppActions.SetSettingsState(false));
    }
}
