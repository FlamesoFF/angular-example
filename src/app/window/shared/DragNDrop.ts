import {Observable} from 'rxjs';

export interface IExtractedFile {
    meta: File,
    content: ArrayBuffer
}

export abstract class DragNDrop {
    static extractFile(event: DragEvent): Observable<IExtractedFile> {
        const fr = new FileReader();
        const files = event.dataTransfer.files;
        let file: File;

        if (files.length > 0) {
            file = files[0];
        }

        return new Observable<IExtractedFile>(observer => {
            fr.addEventListener('load', () => {
                observer.next({
                    meta: file,
                    content: <ArrayBuffer>fr.result
                });

                if (!fr.result) {
                    observer.next();
                }

                observer.complete();
            });

            fr.readAsArrayBuffer(file);
        });
    }

    static readAsArrayBuffer(fileBlob: File | Blob): Observable<ArrayBuffer> {
        const fr = new FileReader();

        return new Observable(observer => {
            fr.addEventListener('load', () => {

                observer.next(<ArrayBuffer>fr.result);
                observer.complete();
            });

            fr.readAsArrayBuffer(fileBlob);
        });
    }
}