export abstract class Utils {
    static async onDocumentReady(): Promise<void> {
        if (document.readyState === 'complete') {
            Promise.resolve();
        }
        else {
            document.onreadystatechange = () => {
                if (document.readyState === 'complete') {
                    Promise.resolve();
                }
            }
        }
    }

    static deepMerge<T, S>(target: T, source: S): T & S {
        for (let [k, v] of Object.entries(source)) {
            if (!(k in target))
                target[k] = source[k];
            else if (v.constructor.name === 'Object')
                this.deepMerge(target[k], source[k]);
            else
                target[k] = source[k];
        }

        return target as T & S;
    }
}