import exp from "constants";

export namespace NRequest {

    export interface INode {
        _id?: string
        class?: string
        name: string
        [key: string]: string
    }

    export interface IRelation {
        type: string
        node: INode
        [key: string]: any
    }

}

export namespace Response {
    export interface List<T> {
        items: T[]
    }
}

export interface CdbReponse {
    ok: boolean
    id?: string
    rev?: string
}