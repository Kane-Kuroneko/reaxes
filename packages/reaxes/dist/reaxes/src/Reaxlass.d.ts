import { Component } from 'react';
export declare class Reaxlass<Tprops extends {} = any, Tstate extends {} = any> extends Component<Tprops, Tstate> {
    private generateQueueID;
    JSX: {
        [p: string]: () => React.ReactElement | void | React.ReactNode;
    };
    actions: {
        [p: string]: Function;
    };
    mountedStack: {
        callback(): any;
        id: string;
    }[];
    unmountStack: {
        callback(): any;
        id: string;
    }[];
    updatedStack: {
        callback(): any;
        id: string;
    }[];
    renderedStack: {
        callback(): any;
        id: string;
    }[];
    lifecycle: Lifecycle;
    componentDidRender?(stage: "mount" | "update", prevProps?: Readonly<Tprops>, prevState?: Readonly<Tstate>, snapshot?: any): any;
}
