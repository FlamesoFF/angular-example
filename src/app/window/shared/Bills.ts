// import { Builder } from '@apollo4u/auxiliary';
// import { Observable } from 'rxjs';
// import { InfoBlockModel } from './InfoBlockModel';
// import { ICompany, IPerson } from '@apollo4u/types/backend/v3';

// export type TBillAgent = ICompany | IPerson;

// export interface IAppBillRelation {
//     _id: string;
//     class: string;
//     type: string;
//     received_by?: string;
// }

// export interface IAppBill extends IInvoice{
//     class: string;
//     type: string;
//     sender: string;
//     relations: IAppBillRelation[]
// }

// export interface IAppBillParameters {

// }

// interface IBillParams {
//     _id?: string;
//     sender: string;
//     relations: IAppBillRelation[]
// }

// export abstract class Bill {
//     private static Template = class implements IAppBill {
//         readonly class: string = 'document';
//         readonly type: string = 'invoice';
//         sender: string;
//         relations: IAppBillRelation[];
//         issued_on:string;
//         due:string;
//         files:[]

//         constructor(data: IBillParams) {
//             Builder.build(this, data);
//         }
//     };

//     static create(data: IBillParams): Observable<IAppBill> {
//         // TODO: add as parameters instead of using ChromeStorageService
//         return new Observable(observer => {
//             const billInstance = new this.Template(data);

//             // constant for bill
//             billInstance.relations.push({
//                 _id: 'apollo_ae',
//                 class: 'company',
//                 type: 'issued_to'
//             });


//             observer.next(billInstance);
//         });
//     }
// }

// export class Bills extends InfoBlockModel {
//     items: Bill[] = [];

//     constructor(items?: Bill[]) {
//         super();
//     }

//     getCount() {
//         return this.items.length;
//     }
// }
