export interface IAppConfiguration {
    authIp: string;
    authPort: number;
    entityIp: string;
    entityPort: number;
    windowWidth: number;
    windowHeight: number;
    windowOffsetX: number;
    windowOffsetY: number;
    devMode?: boolean;
}