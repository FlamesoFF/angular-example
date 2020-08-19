import { BehaviorSubject } from "rxjs";
import { NMessagePayloads } from "@/app/shared/AppMessenger";

declare global {
    export const InboxSDK: any;
}

export interface Window {
    threadData: BehaviorSubject<NMessagePayloads.IThreadInfo>
}

export interface IBackgroundWindow extends Window {
}