export interface IStateFormBase<T = object> {
    form: {
        dirty: boolean,
        status: string,
        errors: object,
        model: T
    }
}

export const stateBase = <T = object>(model: T): IStateFormBase<T> => {
    return {
        form: {
            dirty: false,
            status: "",
            errors: {},
            model
        }
    }
}