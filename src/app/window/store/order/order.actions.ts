import { IUser } from "@apollo4u/types/backend/v3";
import { IOrderFormModel } from "./order.types";

export namespace OrderActions {

    export class CreateOrder {
        static readonly type = `[OrderForm] CreateOrder`;
        constructor() { }
    }

    export class FindByNumber {
        static readonly type = `[OrderForm] FindByNumber`;
        constructor(public number: string = '') { }
    }

    export class SetOrder {
        static readonly type = `[OrderForm] SetOrder`;
        constructor(public order: IOrderFormModel) { }
    }

    export class SetContact {
        static readonly type = `[OrderForm] SetContact`;
        constructor(public contact: IUser) { }
    }
}