import { ICourierFormModel } from "./courier.types";

export namespace CourierActions {

    export class CreateCourier {
        static readonly type = `[CourierForm] CreateCourier`;
        constructor(public courier: ICourierFormModel) { }
    }
}