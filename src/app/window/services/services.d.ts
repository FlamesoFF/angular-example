export namespace Request {
    export interface ICreateOrder  {
        client: {
            id: string;
            name: string;
        };
        manager: {
            id: string;
            name: string;
            email: string;
            initials: string;
        };
        client_reference: string;
        contacts?: {
            id: string;
            name: string;
            initials: string;
            email: string;
        }[];
        quotes?: any[];
        notes?: string;
        companies?: {
            id?: string;
            name: string;
            code?: string;
        }[];
        message_ids: string[];
        type?: string[];
    }
}