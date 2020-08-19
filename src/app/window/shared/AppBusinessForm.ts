import { AbstractControl, FormGroup } from '@angular/forms';
// import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteDefaultOptions } from '@angular/material/autocomplete/typings/autocomplete';
import { Subject, Subscription } from 'rxjs';
import { AppAttachment, AppAttachments } from './AppAttachments';
import { AppControlPanel } from './Buttons';
import { Comments } from './Comments';
import { Quotes } from './Quotes';


export type TAppFormLoader = (value: string) => void;


export interface IFormControls {
    author: string
    text: string
}

// export interface InfoBlockConnectorsInputs {
//     attachFile?: Subject<IAttachmentParameters>
//     addQuote?: Subject<IQuoteParameters>
// }

export interface InfoBlockConnectorsOutputs {
    onFileAttached?: Subject<AppAttachment>
}

export interface IFormOnDropFile {
    onDrop(file: File): void
}

export interface IFormOnAttachFile {
    onAttach(url: string): void
}


export class AppFormGroup<T = any, V = { [K in keyof T]?: any }> extends FormGroup implements FormGroup {
    constructor(public controls: { [K in keyof T]: AbstractControl }) {   // TODO types
        super(controls);
    }

    patchValue: (
        value: V,
        options?: {
            onlySelf?: boolean
            emitEvent?: boolean
        }
    ) => void

    setValue: (
        value: V,
        options?: {
            onlySelf?: boolean
            emitEvent?: boolean
        }
    ) => void

    reset: (
        value?: V,
        options?: {
            onlySelf?: boolean
            emitEvent?: boolean
        }
    ) => void;
}
//
// export class BusinessFormInfoBlockConnectors {
//     inputs?: InfoBlockConnectorsInputs = {};
//     outputs: InfoBlockConnectorsOutputs = {
//         onFileAttached: new Subject()
//     };
//
//     constructor(
//         inputs?: InfoBlockConnectorsInputs
//     ) {
//         if (inputs) {
//             this.inputs = inputs;
//         }
//     }
// }

export class AppBusinessFormEventSubs {
    items: Set<Subscription> = new Set();

    constructor(subs: Subscription[]) {
        this.items = new Set(subs);
    }

    purge() {
        this.items.forEach(sub => {
            if (sub instanceof Subscription) {
                sub.unsubscribe();
                this.items.delete(sub);
            }
        })
    }
}

type TAppFormExtractor<T> = { [K in keyof T]: (value: any) => void };
export class AppFormData<
    T,
    O,
    D,
    L,
    E extends TAppFormExtractor<E>,
    C extends AppControlPanel<C>,
    I extends AppInfoBlock<any, any, any>
    >{
    mainEntity?: T
    observable?: O
    dynamic?: D
    loaders?: L
    extractors?: E
    infoBlock?: I

    constructor(parameters: AppFormData<T, O, D, L, E, C, I>) {
        const {
            mainEntity,
            observable,
            dynamic,
            loaders,
            extractors,
            infoBlock
        } = parameters;

        this.mainEntity = mainEntity;
        this.observable = observable;
        this.dynamic = dynamic;
        this.loaders = loaders;
        this.extractors = extractors;
        this.infoBlock = infoBlock;
    }
}

export class AppInfoBlock<T extends Quotes, C extends Comments, A extends AppAttachments> {
    quotes?: Quotes
    comments?: Comments
    attachments?: AppAttachments
    // events?: BusinessFormInfoBlockConnectors;

    constructor(parameters: AppInfoBlock<T, C, A>) {
        const {
            quotes,
            comments,
            attachments,
            // events
        } = parameters;

        this.quotes = quotes;
        this.comments = comments;
        this.quotes = quotes;
        this.attachments = attachments;
        // this.events = events;
    }
}

export abstract class AppBusinessForm {
    infoBlock: AppInfoBlock<any, any, any>

    protected abstract formGroup: AppFormGroup<any>;
    protected abstract controls: AppControlPanel<any>;

    // protected abstract initializeDataSources(): void


    // protected updateEntityId($event: MatAutocompleteSelectedEvent) {
    //     this.entityId = $event.option.value._id;
    // }

    protected setValues(values: object, form: FormGroup) {
        form.patchValue(values);
    }

    protected clear() { // TODO: unify logic
        this.formGroup.reset();
        this.formGroup.enable();

        if (this.infoBlock.quotes) {
            this.infoBlock.quotes.clear();
        }
        if (this.infoBlock.comments) {
            this.infoBlock.comments.clear();
        }
        if (this.infoBlock.attachments) {
            this.infoBlock.attachments.clear();
        }
    }
}
