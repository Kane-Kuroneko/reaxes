export declare const Timer: {
    new (): {
        "__#1@#subscribeList": any[];
        "__#1@#currentTime": number;
        "__#1@#interval": any;
        "__#1@#currentTimeout": any;
        "__#1@#status": boolean;
        start: (time: any) => void | any;
        subscribe(callback: any): any;
        unsubscribe(callback: any): any;
        destroy(): void;
        stop(): any;
    };
};
