import { TContactClient } from '../../services/contact.api.service';


export namespace ContactActions {
    export class SearchClients {
        static readonly type = `[ContactForm] SearchClients`;
        constructor(public name: string = '') { }
    }

    export class FetchClient {
        static readonly type = `[ContactForm] FetchClient`;
        constructor() { }
    }

    export class AssignContactToClient {
        static readonly type = `[ContactForm] AssignToClient`;  // probably not a best name
        constructor() { }
    }

    export class UpdateClient {
        static readonly type = `[ContactForm] UpdateClient`;  // probably not a best name
        constructor(public client: TContactClient = <TContactClient>{}) { }
    }

    // export class GetPersons {
    //     static readonly type = '[ContactForm] getPersons';
    //     constructor() {}
    // }
}