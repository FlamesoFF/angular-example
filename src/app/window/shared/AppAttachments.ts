import {Observable} from 'rxjs';
import { IFile, IFileRelation, IFileCreatedBy } from '@apollo4u/types/backend/v3';

export enum FILE_CLASSES {
    order = 'order',
    courier = 'courier',
    person = 'person',
    company = 'company'
}

export interface AppFileRelation {
    id: string,
    class: FILE_CLASSES,
    relation: 'related to',
    type: string,
    source: string,
    hash: string,
    url: string
}

export interface IAppFileInfo {
    url: string
    name: string
    'Content-Type': string
    size?: string
}

export interface IAppFile extends IAppFileInfo {
    message_id: string,
    existing: boolean,
    id: string
}

export interface IAppFileParameters {
    name: string;
    contentType: string;
    length: number;  // bytes
    entityId: string;
    created_on: string
    created_by: {
        id: string
        name: string
        email: string
    }

    _id?: string;
    alias?: string;
}

export class AppAttachment implements IFile {
    schema_id: string;
    class: string;
    name: string;
    extension: string;
    created_on: string;
    relations?: IFileRelation[];
    _id?: string;
    _rev?: string;
    created_by: IFileCreatedBy;

    constructor(metaData: IFile) {
        Object.assign(this, metaData);
    }

    // setData(data: File): void {
    //     this.content = data;
    // }

    getData() {
        // return this.content;
    }

    onEdit(event: Event): void {
    }

    onDetach(event: Event): void {
    }

    static getBuffer(appFile: AppAttachment): Observable<ArrayBuffer> {
        const fr = new FileReader();
        let ab;

        return new Observable(observer => {
            fr.addEventListener('load', () => {
                observer.next(<ArrayBuffer>fr.result);
            });

            // fr.readAsArrayBuffer(appFile.getData());
        });
    }
}

export class AppAttachments {
    items: AppAttachment[] = [];

    constructor(items?: AppAttachment[]) {
        if (items) {
            items.forEach(item => {
                if (item instanceof AppAttachment) {
                    this.add(item);
                }
                else {
                    console.error('item is not an instance of AppFile!');
                }
            });
        }
    }

    add(file: AppAttachment) {
        if (!this.checkDuplicates(file)) {
            this.items.push(file);
        }
    }

    remove(file: AppAttachment) {
        this.items.splice(this.items.indexOf(file), 1);
    }

    clear() {
        this.items = [];
    }

    getCount() {
        return this.items.length;
    }

    private checkDuplicates(newFile: AppAttachment): boolean {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i]._id === newFile._id) {
                return true;
            }
        }

        return false;
    }
}